"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-types */
var Clock = /** @class */ (function () {
    function Clock(callback) {
        if (callback === void 0) { callback = undefined; }
        this.date = new Date();
        this.callback = callback;
        this.startClock();
    }
    Clock.prototype.offsetDate = function (dateString) {
        return new Date(dateString).valueOf() - this.date.valueOf();
    };
    Clock.prototype.startClock = function () {
        this.advanceClock();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var self = this;
        setInterval(function () { self.advanceClock(); }, 1000);
    };
    Clock.prototype.advanceClock = function () {
        this.date = new Date(this.date.setSeconds(this.date.getSeconds() + 1));
        if (this.callback)
            this.callback(this.date);
    };
    return Clock;
}());
exports.default = Clock;
