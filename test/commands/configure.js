const path = require('path')
const fs = require('fs')
const chai = require('chai')
const expect = chai.expect
const dirtyChai = require('dirty-chai')
const sinon = require('sinon')
const inquirer = require('inquirer')
const configure = require('../../commands/configure')
const CredentialManager = require('../../lib/credential-manager')

describe('the configure module', () => {
    var creds
    before(() => {
        creds = new CredentialManager('twcli-test')
    })
    it('should add credentials when none are found', async () => {
        sandbox.stub(inquirer, 'prompt').resolves({key: 'one', secret: 'two'})
        await configure.consumer('twine-test')
        let [key, secret] = await creds.getKeyAndSecret('apiKey')
        expect(key).to.equal('one')
        expect(secret).to.equal('two')
        expect(inquirer.prompt.calledOnce).to.be.true()
      })
      it('should overwrite existing credentials', async () => {
        sandbox.stub(inquirer, 'prompt').resolves({key: 'three', secret: 'four'})
        await configure.consumer('twine-test')
        let [key, secret] = await creds.getKeyAndSecret('apiKey')
        expect(key).to.equal('three')
        expect(secret).to.equal('four')
        expect(inquirer.prompt.calledOnce).to.be.true()
      })
})
