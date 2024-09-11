const fs = require('fs')
const fg = require('fast-glob')
const yaml = require('js-yaml')
const env = require('./env')

module.exports = function () {
    const entries = []

    const files = fg.sync(
        [
            '**/*.yml'
        ], {
            cwd: env.resources,
            absolute: true
        }
    )

    for (let i = 0; i < files.length; i++) {
        const filePath = files[i]

        const entry = yaml.safeLoad(
            fs.readFileSync(filePath)
        )

        entries.push(entry)
    }

    return entries
}


