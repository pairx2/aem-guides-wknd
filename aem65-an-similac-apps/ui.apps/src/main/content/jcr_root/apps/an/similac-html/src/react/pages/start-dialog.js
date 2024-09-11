(function($,win){
    $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
        _title: function(title) {
            if (!this.options.title ) {
                title.html("&#160;");
            } else {
                title.html(this.options.title);
            }
        }
    }));
    $.extend( $.ui.dialog.prototype.options.classes, {
        "ui-dialog": "similac-modal",
        "ui-dialog-titlebar": "swal-title",
        "ui-dialog-title": "modal-title",
        "ui-dialog-titlebar-close": "close",
        "ui-dialog-content": "swal-content",
        "ui-dialog-buttonpane": "swal-footer"
    });
    $("#start-dialog").dialog({
        modal: true,
        resizable: false,
        autoOpen: true,
        // show: { effect: "fade" },
        open:function(){
            $('.ui-dialog-titlebar-close')
            .html('<span class="sim-icons" data-icon="close"><svg viewBox="0 0 100 100" class="sim-icon"><use href="#icon-close"></use></svg></span>');
            const title = $(this).dialog( "option", "title" );
        },
        close:function(){
            console.log("close");
        }
    });
})(jQuery,window)