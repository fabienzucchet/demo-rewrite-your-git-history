export interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

export class UserService {
  private users: Map<string, User> = new Map();

  create(name: string, email: string): User {
    const id = crypto.randomUUID();
    const user: User = { id, name, email, active: true };
    this.users.set(id, user);
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
