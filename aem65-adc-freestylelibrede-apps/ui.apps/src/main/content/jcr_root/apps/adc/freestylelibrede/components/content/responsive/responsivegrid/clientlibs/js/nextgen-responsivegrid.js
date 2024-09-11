
//Fix to declare custom container as responsive
(function ($, ns, channel, window) {
    ns.responsive.isResponsiveGrid = function (editable) { 
        return editable.type === 'wcm/foundation/components/responsivegrid' || 'adc/freestylelibrede/components/content/responsive/responsivegrid'; 
    } 
}
(jQuery, Granite.author, jQuery(document), this)); 