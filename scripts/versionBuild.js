const fs = require('fs');
const path = require('path')
const manifest = require('../static/manifest.json')

const versions = manifest.version.split('.').map(v => parseInt(v))
versions[versions.length - 1] = versions[versions.length - 1] + 1
const newVer = versions.join('.')
manifest.version = newVer
console.log('version', newVer)

fs.writeFileSync(path.resolve('./static/manifest.json'), JSON.stringify(manifest, null, 4))



