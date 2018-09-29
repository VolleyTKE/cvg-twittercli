const Configstore = require("configstore")
const keytar = require("keytar-prebuild")

class CredentialManager {
    constructor (name) {
        this.conf = new Configstore(name)
        this.service = name
    }
    async getKeyAndSecret (prop) {
        let key = this.conf.get(`keys.${prop}`)
        if (!key) {
            throw new Error(`Missing ${prop} key -- have you run 'configure ${prop}'?`)
        }
        let secret = await keytar.getPassword(this.service, key)
        if (!secret) {
            throw new Error(`Missing ${prop} secret -- have you run 'configure ${prop}'?`)
        }
        return [key, secret]
    }
    async storeKeyAndSecret (prop, key, secret) {
        this.conf.set(`keys.${prop}`, key)
        await keytar.setPassword(this.service, key, secret)
    }
    //     else {
    //         let answers = await inquirer.prompt([
    //             {type: 'input', name: 'key', message: 'Enter your API Key'},
    //             {type: 'password', name: 'secret', message: 'Enter your API Secret'}
    //         ])
    //         this.conf.set('apiKey', answers.key)
    //         await keytar.setPassword(this.service, answers.key, answers.secret)
    //         return [answers.key, answers.secret]
    //     }
    // }
    async clearKeyAndSecret (prop) {
        let key = this.conf.get(`keys.${prop}`)
        this.conf.delete(`keys.${prop}`)
        await keytar.deletePassword(this.service, key)
    }
    async clearAll () {
        for (let prop of Object.keys(this.conf.get('keys'))) {
            await this.clearKeyAndSecret(prop)
        }
    }
}

module.exports = CredentialManager