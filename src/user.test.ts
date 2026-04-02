import { UserService } from "./user";

describe("UserService", () => {
  it("creates a user", () => {
    const service = new UserService();
    const user = service.create("Alice", "alice@example.com");

    expect(user.name).toBe("Alice");
    expect(user.email).toBe("alice@example.com");
    expect(user.active).toBe(true);
  });

  it("retrieves a user by id", () => {
    const service = new UserService();
    const created = service.create("Bob", "bob@example.com");
    const found = service.getById(created.id);

    expect(found).toEqual(created);
  });

  it("deactivates a user", () => {
    const service = new UserService();
    const user = service.create("Charlie", "charlie@example.com");
    service.deactivate(user.id);

    expect(service.getById(user.id)?.active).toBe(false);
  });

  it("lists only active users", () => {
    const service = new UserService();
    service.create("Active", "active@example.com");
    const toDeactivate = service.create("Inactive", "inactive@example.com");
    service.deactivate(toDeactivate.id);

    const active = service.listActive();
    expect(active).toHaveLength(1);
    expect(active[0].name).toBe("Active");
  });
});
