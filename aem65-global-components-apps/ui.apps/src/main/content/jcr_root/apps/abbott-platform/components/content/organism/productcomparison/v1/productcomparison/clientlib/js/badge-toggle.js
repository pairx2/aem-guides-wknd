(function (document, $) {
    "use strict";

    const MULTIFIELD_CONTENT    = 'coral-multifield-item-content';
    const TARGET_WRAPPER        = '.coral-Form-fieldwrapper';
    const HIDE_CLASS            = 'hide';

    const attributes = {
        source: 'data-toggle-checkbox_source',
        target: 'data-toggle-checkbox_target'
    };

    const selectors = {
        source: '[' + attributes.source + ']',
        target: '[' + attributes.target + ']'
    };

    let toggleFn = function(source, $targets) {
        const isChecked = source[0].hasAttribute('checked');
        $targets.each(function() {
            const hide = isChecked.toString() === $(this).attr(attributes.target);
            const $wrapper = $(this).parent(TARGET_WRAPPER);
            hide ? $wrapper.addClass(HIDE_CLASS) : $wrapper.removeClass(HIDE_CLASS);
        });
    };

    $(document).on('foundation-contentloaded', function(e) {
        const $dialog = $(e.target);
        if ($dialog && $dialog.length === 1) {
            const $sources = $dialog.find(selectors.source);

            if ($sources) {
                $sources.each(function() {
                    let $source = $(this);
                    const $container = $source.parents(MULTIFIELD_CONTENT);
                    const $targets = $container.find(selectors.target);

                    if ($targets) {
                        toggleFn($source, $targets);
                        $source.on('change', function() {
                    		toggleFn($source, $targets);
                		});
                    }
                });
            }
        }
    });

})(document, Granite.$);
