import { NotificationService } from "./notification";

export interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

export class UserService {
  private users: Map<string, User> = new Map();

  constructor(private notificationService?: NotificationService) {}

  create(name: string, email: string): User {
    console.log("DEBUG: creating user", name, email);
    const id = crypto.randomUUID();
    const user: User = { id, name, email, active: true };
    this.users.set(id, user);
    this.notificationService?.send({
      to: email,
      subject: "Welcome to the platform!",
      body: `Hi ${name}, your account has been created.`,
    });
    return user;
  }

  getById(id: string): User | undefined {
    return this.users.get(id);
  }

  deactivate(id: string): void {
    const user = this.users.get(id);
    if (!user) throw new Error(`User ${id} not found`);
    user.active = false;
  }

  listActive(): User[] {
    return [...this.users.values()].filter((u) => u.active);
  }
}
