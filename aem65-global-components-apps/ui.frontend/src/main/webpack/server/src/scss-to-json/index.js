'use strict';

/**
 * The entire scss to json conversion CODE is taken from scss-to-json npm module and customized on top of that.
 */

var Processor = require('./processor');

function scssToJson(path, options) {
  var processor = new Processor(path, options);
  return processor.object;
}

module.exports = scssToJson;
