module.exports = function(RED) {
    function Pip(config) {
        RED.nodes.createNode(this,config)
        let node = this
        let argument = ''
        let action = ''
        let command = ''
        const path = require('path')
        const fs = require('fs')
        const jsonPath = path.join(path.dirname(__dirname), 'path.json')
        const json = fs.readFileSync(jsonPath)

        const pythonPath = JSON.parse(json).NODE_PYENV_PYTHON
        const execSync = require('child_process').execSync

        node.on('input', function(msg) {
            command = pythonPath + ' ' + 'reazonspeech-nemo-asr ' + config.voicePath
            msg.payload = String(execSync(command))
            node.send(msg)
        })
    }
    RED.nodes.registerType('reazonspeech',Pip)
}
