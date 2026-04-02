import { NotificationService } from "./notification";
import { UserService } from "./user";

describe("NotificationService", () => {
  it("sends a notification", () => {
    const service = new NotificationService();
    service.send({
      to: "alice@example.com",
      subject: "Hello",
      body: "World",
    });

    expect(service.getSent()).toHaveLength(1);
    expect(service.getSent()[0].to).toBe("alice@example.com");
  });

  it("tracks multiple notifications", () => {
    const service = new NotificationService();
    service.send({ to: "a@b.com", subject: "s1", body: "b1" });
    service.send({ to: "c@d.com", subject: "s2", body: "b2" });

    expect(service.getSent()).toHaveLength(2);
  });
});

describe("UserService with notifications", () => {
  it("sends welcome email on user creation", () => {
    const notifications = new NotificationService();
    const users = new UserService(notifications);

    users.create("Alice", "alice@example.com");

    const sent = notifications.getSent();
    expect(sent).toHaveLength(1);
    expect(sent[0].to).toBe("alice@example.com");
    expect(sent[0].subject).toBe("Welcome to the platform!");
  });

  it("works without notification service", () => {
    const users = new UserService();
    const user = users.create("Charlie", "charlie@example.com");
    expect(user.name).toBe("Charlie");
  });
});
