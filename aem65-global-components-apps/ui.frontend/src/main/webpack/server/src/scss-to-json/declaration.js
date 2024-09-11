'use strict';

const compile = require('./compile');
const utilities = require('./utilities');

var ASSIGNMENT_OPERATOR = ':';

function transforms(value) {
  return utilities.removeInlineComments(utilities.removeFlags(value));
}

function Value(scssString) {
  this._parse(scssString);
}

Value.prototype = {
  _parse: function(scssString) {
    // console.log(scssString);
    var transformed = transforms(scssString);
    var compiled = compile.fromString(transformed);
    // console.log(compiled);
    this.value = compiled ? compiled.trim() : '';
  }
};

function Variable(scssString) {
  this._parse(scssString);
}

Variable.prototype = {
  _parse: function(scssString) {
    this.value = utilities.stripSpaces(scssString);
  }
};

function hasGlobalFlag(value) {
  var regex = new RegExp('\\!global(\\s|\$|\\W)');
  return !!value.match(regex);
}

function Declaration(line, declarationStore) {
  this._parse(line, declarationStore);
}

Declaration.prototype = {
  _parse: function(line, declarationStore) {
    var assignmentIndex = line.indexOf(ASSIGNMENT_OPERATOR);
    var assignedVariable = line.substring(0, assignmentIndex).trim();
    var assignedValue = line.substring(assignmentIndex + 1, line.length).trim();

    var replacedValue = declarationStore.replaceVariables(assignedValue);
    this.variable = new Variable(assignedVariable);
    this.value = new Value(replacedValue);
    this.global = hasGlobalFlag(replacedValue);
    declarationStore.addDeclaration(this);
    
    // if (this.value.value === '') {
    //   console.log('value', this.value);
    //   console.log('variable', this.variable);
    // }
  }
};

module.exports = Declaration;
