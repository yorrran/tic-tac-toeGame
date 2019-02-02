"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const readLine = readline_1.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});
class Tic {
    constructor() {
        this.printTic = () => {
            readLine.question('what is your name: ', name => {
                console.log('tic toe: ', name);
                this.printMap();
                readLine.close();
            });
        };
        this.printMap = () => {
            const map = new Array(3).fill(0).map(() => new Array(3).fill(0));
            console.log("printMap:", map);
        };
    }
}
exports.default = Tic;
//# sourceMappingURL=tic.js.map