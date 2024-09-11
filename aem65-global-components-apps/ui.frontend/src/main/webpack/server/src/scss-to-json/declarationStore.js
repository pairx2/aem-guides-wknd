'use strict';

function DeclarationStore() {
  this.declarations = [];
}

DeclarationStore.prototype = {
  keyName: '',
  addDeclaration: function(declaration) {
    if (declaration.value.value === '') {
      this.keyName = declaration.variable.value;
    } else if (declaration.variable.value === '') {
      this.keyName = '';
    }
    if (declaration.variable.value) {
      if (this.keyName) {
        this.declarations[this.keyName] = this.declarations[this.keyName] || [];
        this.declarations[this.keyName].push(declaration);
      } else {
        this.declarations.push(declaration);
      }
      // console.log(this.declarations);
    }
  },

  replaceVariables: function(scssString) {
    var replacedString = scssString;

    this.declarations.forEach(function(declaration) {
      var variable = declaration.variable.value;
      var value = declaration.value.value;

      var subsetRegex = new RegExp('\\' + variable + '[\\w_-]', 'g');
      var isSubset = !!replacedString.match(subsetRegex);

      try {
        if (!isSubset) {
          var regex = new RegExp('(\\' + variable + ')([\\W\\,]?)', 'g');
          replacedString = replacedString.replace(regex, value + '$2');
        }
      } catch (e) {
        // swallow
      }
    });
    // console.log(replacedString);
    return replacedString;
  }
};

module.exports = DeclarationStore;
