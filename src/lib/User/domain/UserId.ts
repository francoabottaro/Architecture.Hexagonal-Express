export class UserId {
  value: string;
  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }
  private ensureIsValid() {
    if (this.value.length < 5) {
      throw new Error(`UserId must at laest 5 character long`);
    }
  }
}
