/**
 * Progress bar
 */
(function(){
    'use strict';
    class ProgressBar {

        public $ele: JQuery<Element>;
        private _status: string;
        private _totalProgress : Number;

        constructor(ele) {
            this.$ele = $(ele);
            this._status = this.$ele.find('.a-progressbar__status').attr('aria-valuenow');
            this._totalProgress = parseInt(this._status);

            this._progressBarStatus();

        }

        private _progressBarStatus() {

            this.$ele.find('.a-progressbar__status').css('width', this._totalProgress + '%');

        }
    }

    $(document).ready(function() {
        document.querySelectorAll('[data-js-component="progress-bar"]').forEach(function(ele){
            new ProgressBar(ele);
        });
    })

})();
