/* eslint-disable @typescript-eslint/ban-types */
export default class Clock {
  public date: Date;
  public callback: Function | undefined;
  
  constructor(callback: Function | undefined = undefined) {
    // Initialize server clock with the offset of Bogotá, Colombia
    this.date = new Date(Date.now());
    this.callback = callback;
    this.startClock();
  }

  public offsetDate(unixTime: number): number {
    console.log(unixTime);
    console.log("Getting the date offset for", this.date.valueOf(), unixTime - this.date.valueOf());
    return unixTime - this.date.valueOf();
  }

  private startClock() {
    this.advanceClock();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    setInterval(() => { self.advanceClock() }, 1000);
  }

  private advanceClock() {
    this.date = new Date(
      this.date.setSeconds(this.date.getSeconds() + 1)
    );
    if (this.callback) this.callback(this.date);
  }
}
