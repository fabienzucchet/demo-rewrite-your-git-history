import { NotificationService } from "./notification";

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
