'use strict';

var sass = require('node-sass');
var cssmin = require('cssmin');

function wrapValue(value) {
  return '.test { content: ' + value + ' };';
}

function unwrapValue(value) {
  return value.replace('.test{content:', '').replace('}', '');
}

var Compile = {
  fromString: function(value) {
    try {
      var wrappedValue = wrapValue(value);
      var s = sass.renderSync({ data: wrappedValue });
      var compiled = String(s.css);
      var minifiedCompiled = cssmin(compiled);
      return unwrapValue(minifiedCompiled);
    } catch(e) {

    }
  }
};

if (process.env.NODE_ENV === 'test') {
  Compile.wrapValue = wrapValue;
  Compile.unwrapValue = unwrapValue;
}

module.exports = Compile;
