var path = require('path');
const jsonPath = require.context('../json/', false, /\.(json)$/)
module.exports = function (relPath) {
    var obj = jsonPath('./'+relPath);
    return JSON.stringify(obj).replace(/(\\)/g, "\\$1").replace(/(")/g, "\\$1");
};