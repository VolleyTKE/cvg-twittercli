const Configstore = require("configstore")

const keytar = require("keytar-prebuild")

class CredentialManager {
    constructor (name) {
        this.conf = new configstore(name)
        this.service = name
    }
    async getKeyAndSecret () {
        let key = this.conf.get('apiKey')
        if (!key) {
            throw new Error('API Key not found')
        }
        let secret = await keytar.getPassword(this.service, key)
        return [key, secret]
    }
    async storeKeyAndSecret (key, secret) {
        this.conf.set('apiKey', key)
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
    async clearKeyAndSecret () {
        let key = this.conf.get('apiKey')
        this.conf.delete('apiKey')
        await keytar.deletePassword(this.service, key)
    }
}

module.exports = CredentialManager