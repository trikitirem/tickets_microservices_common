export abstract class BusEvent<T extends object> {
  abstract type: string;
  payload: T;

  public constructor(payload: T) {
    this.payload = payload;
  }

  toJson() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}
