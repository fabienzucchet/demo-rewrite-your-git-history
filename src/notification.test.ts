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

  // TODO: add more tests
});
