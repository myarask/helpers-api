const glob = require('glob');
const path = require('path');

module.exports = glob.sync('./routes/*/**/index.js').map(file => require(path.resolve(file)));
