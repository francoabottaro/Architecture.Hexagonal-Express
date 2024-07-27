export class UserEmail {
  value: string;
  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }
  private ensureIsValid() {
    const mailIsValid = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (mailIsValid.test(this.value)) {
      throw new Error(`Email must be a valid mail address`);
    }
  }
}
