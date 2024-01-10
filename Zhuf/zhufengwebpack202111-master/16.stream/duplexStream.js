//const { Duplex } = require('stream');
const Duplex = require('./Duplex');
//双工流，既可以读，也可以写，读和写之间没有关系
let cell = ['1', '2', '3', '4', '5'];
let idx = 0;
const duplexStream = new Duplex({
    read() {
        if (idx >= cell.length) {
            this.push(null);
        } else {
            this.push(cell[idx]);
        }
        idx++;
    },
    write(data, encoding, next) {
        console.log(data.toString());
        setTimeout(next, 1000);
    }
});
module.exports = duplexStream;