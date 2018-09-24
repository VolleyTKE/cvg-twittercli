#! /usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
    .version(pkg.version)
    .parse(process.argv)


// const CredentialManager = require('../lib/credential-manager')

// async function main () {
//     const creds = new CredentialManager('twittercli')
//     let [key, secret] = await creds.getKeyAndSecret()
//     console.log(key, secret)
// }

// main().catch(console.error)