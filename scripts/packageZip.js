const zipFolder = require('zip-folder');
const manifest = require('../dist/manifest.json')

const release = `./releases/inline.search.${manifest.version}.zip`
zipFolder('./dist', release, function (err) {
  if (err) {
    console.error(err);
    return -1;
  } else {
    console.log('release ready');
  }
});
