class Switcher {
    constructor(options) {
        $(options).on('click', this.toggleSwitcherLabel);
    }

    toggleSwitcherLabel(e = event) {
        e.preventDefault();

        let $switch = $(this).siblings('.custom-control-input');
        if (($switch.attr('checked')) != undefined) {
            $switch.removeAttr('checked');
            let offlabel = $(this).attr('data-offlabel');
            $(this).text(offlabel);
            $switch.attr('aria-label', offlabel);
        } else {
            $switch.attr('checked', 'checked');
            let onlabel = $(this).attr('data-onlabel');
            $(this).text(onlabel);
            $switch.attr('aria-label', onlabel);
        }
    }

}

document.querySelectorAll('[data-component="switcher"]').forEach(function (ele) {
    new Switcher(ele);
});
