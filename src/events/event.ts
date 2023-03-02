export interface Event<T extends object> {
  type: string;
  payload: T;
}
