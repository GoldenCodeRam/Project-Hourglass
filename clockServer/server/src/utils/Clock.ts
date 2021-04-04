/* eslint-disable @typescript-eslint/ban-types */
export default class Clock {
  public date: Date;
  public callback: Function | undefined;
  
  constructor(callback: Function | undefined = undefined) {
    this.date = new Date();
    this.callback = callback;
    this.startClock();
  }

  public offsetDate(dateString: string): number {
    return new Date(dateString).valueOf() - this.date.valueOf();
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
