(function(ABBOTT) {

    ABBOTT.subscriptionTitle = (function() {

        var $subscribedTitle = jQuery('.subscribe-show'),
            $trialTitle = jQuery('.trial-show'),
            $placeholderTitle = jQuery('.placeholder__title-bar');

        document.addEventListener('title.dataLoaded', function(event) {
            if(event.detail.trialEligible === 'yes') {
                $placeholderTitle.remove();
                $subscribedTitle.remove();
                $trialTitle.removeClass('d-none');
            } else {
                $placeholderTitle.remove();
                $trialTitle.remove();
                $subscribedTitle.removeClass('d-none');
            }
        });

    })();

})(window.ABBOTT || (window.ABBOTT = {}));