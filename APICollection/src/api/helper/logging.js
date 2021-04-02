const chalk = require('chalk');

const info = chalk.bold.blue;
const debug = chalk.green;
const db = chalk.cyan;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

const logging = {
    log: (...messages) => console.log(...messages),
    info: (...messages) => console.log(info(...messages)),
    debug: (...messages) => console.log(debug(...messages)),
    db: (...messages) => console.log(db(...messages)),
    error: (...messages) => console.log(error(...messages)),
    warning: (...messages) => console.log(warning(...messages))
}

module.exports = {
    chalk,
    logging
}