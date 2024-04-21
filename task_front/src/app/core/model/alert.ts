export type Alert = {
  message: string;
  alertType: AlertType;
}

export enum AlertType {
  Success,
  Error
}
