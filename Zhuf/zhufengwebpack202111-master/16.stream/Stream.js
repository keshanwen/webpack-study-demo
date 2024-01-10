const EventEmitter = require('events');
const { inherits } = require('util');
function Stream(options) {
    this.options = options;
    EventEmitter.call(this);
}
//Object.setPrototypeOf(Stream.prototype, EventEmitter);
inherits(Stream, EventEmitter);
// class Stream extends EventEmitter
module.exports = Stream;