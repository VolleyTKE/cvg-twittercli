const Configstore = require("configstore")
const keytar = require("keytar-prebuild")

class CredentialManager {
    constructor (name) {
        this.conf = new Configstore(name)
        this.service = name
    }
    async getKeyAndSecret (prop) {
        let key = this.conf.get(prop)
        if (!key) {
            throw new Error('API Key not found')
        }
        let secret = await keytar.getPassword(this.service, key)
        return [key, secret]
    }
    async storeKeyAndSecret (prop, key, secret) {
        this.conf.set(prop, key)
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
        let key = this.conf.get(prop)
        this.conf.delete(prop)
        await keytar.deletePassword(this.service, key)
    }
}

module.exports = CredentialManager