class Optional<T> {
  private constructor(private value: T | null) {}

  static Some<T>(value: T): Optional<T> { return new Optional(value); }

  static None<T>(): Optional<T> { return new Optional<T>(null); }

  public is_some(): boolean { return this.value !== null; }

  public is_none(): boolean { return this.value === null; }

  public unwrap(): T {
    if (this.value === null) {
      throw new Error("Called unwrap on a None value");
    }
    return this.value;
  }

  public unwrap_or(default_value: T): T {
    return this.value !== null ? this.value : default_value;
  }

  public expect(message: string): T {
    if (this.value === null) {
      throw new Error(message);
    }
    return this.value;
  }

  public map<U>(fn: (val: T) => U): Optional<U> {
    return this.value !== null ? Optional.Some(fn(this.value)) : Optional.None<U>();
  }
}
