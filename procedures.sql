CREATE DATABASE task_db
GO

USE task_db
GO

CREATE TABLE tb_task
(
	id INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(250) NOT NULL,
	created_at DATETIME DEFAULT GETDATE()
)
GO

-- insert
CREATE PROCEDURE pr_task_create
	@name VARCHAR(250)
AS
INSERT INTO tb_task (name)
VALUES
	(@name)
GO

-- update
CREATE PROCEDURE pr_task_update
	@id INT,
	@name VARCHAR(250)
AS
UPDATE tb_task
SET
	name = @name
WHERE 
	id = @id
GO

-- delete
CREATE PROCEDURE pr_task_delete
	@id INT
AS
DELETE FROM tb_task
WHERE id = @id
GO

-- getTask
CREATE PROCEDURE pr_task_get_by_id
	@id INT
AS
	SELECT * FROM tb_task
	WHERE id = @id
GO

-- getTasks
CREATE PROCEDURE pr_task_get_all
	@search_text VARCHAR(250) = NULL,
	@sort VARCHAR(250) = 'desc',		-- desc = descending | asc = ascending
	@page_size INT = 5,
	@skip_rows INT
AS
	DECLARE @sql NVARCHAR(MAX)
	
	SET @sql = '
		SELECT * FROM tb_task
		WHERE 
			(name LIKE ''%'' + @search_text + ''%'' OR @search_text IS NULL)
		ORDER BY created_at ' + @sort + '
		OFFSET @skip_rows ROWS FETCH NEXT @page_size ROWS ONLY
	'

	EXEC sp_executesql @sql, N'@skip_rows INT, @page_size INT, @search_text VARCHAR(250)', @skip_rows, @page_size, @search_text
GO

-- getTotalRecords
CREATE PROCEDURE pr_task_get_total_records
	@search_text VARCHAR(250) = NULL
AS
SELECT 
	COUNT(*) totalRecords
FROM 
	tb_task
WHERE 
	name LIKE '%' + @search_text + '%' OR @search_text IS NULL