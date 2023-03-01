import amqp from "amqplib";
import { BusEvent } from "./event";

export class EventBus {
  private static instance: EventBus;
  private static queue = "queue";

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
      channel.consume(EventBus.queue, onMessage);
    }

    this.channel = channel;
  }

  public async sendEvent<T extends object>(event: BusEvent<T>) {
    if (this.channel) {
      const convertedEvent = JSON.stringify(event.toJson());
      const buffer = Buffer.from(convertedEvent);

      this.channel.sendToQueue(EventBus.queue, buffer);
    }
  }
}
