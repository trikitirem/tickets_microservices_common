import amqp from "amqplib";
import { Event } from "./event";

export class EventBus {
  private static instance: EventBus;
  private static queue = "tickets";

  private channel?: amqp.Channel;

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }

    return EventBus.instance;
  }

  public async connect(onMessage?: (message: amqp.Message | null) => void) {
    const connection = await amqp.connect(process.env.EVENT_BUS_URI!);

    const channel = await connection.createChannel();
    channel.assertQueue(EventBus.queue, { durable: false });

    if (onMessage) {
      channel.consume(EventBus.queue, onMessage, { noAck: true });
    }

    this.channel = channel;
    console.log("Connected to RabbitMQ");
  }

  public async sendEvent<T extends object>(event: Event<T>) {
    if (this.channel) {
      const convertedEvent = JSON.stringify(event);
      const buffer = Buffer.from(convertedEvent);

      this.channel.sendToQueue(EventBus.queue, buffer);
      console.log(`Event sent: ${convertedEvent}`);
    }
  }
}
