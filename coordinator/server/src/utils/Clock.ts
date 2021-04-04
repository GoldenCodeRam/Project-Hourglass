import axios from "axios";
import { clockLogger } from "./Logger";

/* eslint-disable @typescript-eslint/ban-types */
export default class Clock {
  public date: Date;
  public callback: Function | undefined;

  constructor(callback: Function | undefined = undefined) {
    this.date = new Date();
    this.callback = callback;
    this.startClock();
  }

  private async startClock() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    setInterval(() => { self.advanceClock() }, 1000);
    setInterval(() => { self.setTimeFromApi() }, 10000);
  }

  private advanceClock() {
    this.date = new Date(
      this.date.setSeconds(this.date.getSeconds() + 1)
    );
    if (this.callback) this.callback(this.date);
  }

  private async setTimeFromApi() {
    const response = await axios.get("http://worldtimeapi.org/api/timezone/America/Bogota", { timeout: 5000 }).catch((error) => {
      clockLogger.error("Something went wrong with the GET action on the API, trying again...");
    });
    if (response) {
      if (response.data) this.date = new Date(response.data.utc_datetime);
    }
  }
}
