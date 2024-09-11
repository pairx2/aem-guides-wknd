import "bootstrap";
/**
 * Tooltip 
 */

(function () {
  'use strict';
  class Tooltip {
    public $ele:any;
    public _tooltipDiv: JQuery<Element>;

    constructor(ele) {
      this.$ele = $(ele);
      this._tooltipDiv = this.$ele.find('[data-toggle="tooltip"]');
      this._tooltipDiv.tooltip({ container:  this.$ele });
    }

  }

  $(document).ready(function () {
    document.querySelectorAll('[data-js-component="tooltip"]').forEach(function (ele) {
      new Tooltip(ele);
    });
  })

})();
