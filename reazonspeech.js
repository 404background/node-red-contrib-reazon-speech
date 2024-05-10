module.exports = function(RED) {
    function ReazonSpeech(config) {
        RED.nodes.createNode(this,config)
        let node = this
        let command = ''
        const path = require('path')
        const fs = require('fs')
        const jsonPath = path.join(__dirname, 'path.json')
        const json = fs.readFileSync(jsonPath)

        const pythonPath = JSON.parse(json).NODE_PYENV_PYTHON
        const execSync = require('child_process').execSync

        node.on('input', function(msg) {
            command = path.dirname(pythonPath) + '/reazonspeech-nemo-asr ' + config.voicePath
            msg.payload = String(execSync(command))
            node.send(msg)
        })
    }
    RED.nodes.registerType('reazonspeech',ReazonSpeech)
}
