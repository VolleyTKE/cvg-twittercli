const program = require('commander')
const pkg = require('../package.json')
const configure = require('../commands/configure')
const util = require('../lib/util')

program
    .version(pkg.version)

program
    .command('consumer')
    .description('Add a Twitter API key and secret')
    .action(() => configure.account(pkg.name).catch(util.handleError))
    // .action(async () => {
    //     await configure.consumer(pkg.name)
     //  })

program
    .command('account')
    .description('Authorize acces to a Twitter Account')
    .action(() => configure.account(pkg.name).catch(util.handleError))
    // .action(async () => {
    //     await configure.account(pkg.name)
   // })    
    
program
    .parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp()
}
