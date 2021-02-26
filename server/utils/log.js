// * USE FOR CONSOLE
const chalk = require('chalk');
const log = console.log;
const printError = (msm) => {
    log(chalk.red.bgGrey.italic(msm));
}
const printLog = (msm) => {
    log(chalk.blueBright.bgGrey.bold(msm));
}


module.exports = {
    printError, printLog
}

// module.exports = {
//     printError : (msm) => {
//         log(chalk.red.bgGrey.italic(msm));
//     },
//     printLog : (msm) => {
//         log(chalk.blueBright.bgGrey.bold(msm));
//     }
// };

