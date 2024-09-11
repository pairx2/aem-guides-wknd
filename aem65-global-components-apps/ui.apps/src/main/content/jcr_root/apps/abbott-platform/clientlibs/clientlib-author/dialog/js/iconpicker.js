(function (document, $) {
    "use strict";
    const $doc = $(document);

    $doc.on('foundation-contentloaded', function(e) {

        const container = e.target;

        const iconpickerElement = $('.abbott-icon-picker', container).fontIconPicker({
                    'theme' : 'fip-coral'
        });

        $.getJSON('/apps/abbott-platform/clientlibs/clientlib-iconpicker/resources/icons/selection.json', function(data) {
            // Get the class prefix
            let classPrefix = data.preferences.fontPref.prefix,
                icomoonIcons = [],
                icomoonSearch = [];

            // For each icon
            $.each(data.icons, function(i, v) {

                // Set the source
                icomoonIcons.push('abt-icon ' + classPrefix + v.properties.name );

                // Create and set the search source
                if ( v.icon && v.icon.tags && v.icon.tags.length ) {
                    icomoonSearch.push( v.properties.name + ' ' + v.icon.tags.join(' ') );
                } else {
                    icomoonSearch.push( v.properties.name );
                }
            });

            iconpickerElement.setIcons(icomoonIcons, icomoonSearch);
        });

    });

})(document, Granite.$);