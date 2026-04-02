export interface Notification {
  to: string;
  subject: string;
  body: string;
}

export class NotificationService {
  private sent: Notification[] = [];

  send(notification: Notification): void {
    // TODO: actually send email
    console.log("sending email to", notification.to);
    this.sent.push(notification);
  }

  getSent(): Notification[] {
    return this.sent;
  }
}
