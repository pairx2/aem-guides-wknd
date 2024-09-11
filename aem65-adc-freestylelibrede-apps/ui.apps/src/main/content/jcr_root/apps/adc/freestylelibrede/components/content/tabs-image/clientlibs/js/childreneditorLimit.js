(function($, ns, channel, window) {
    "use strict";

    const selectors = {
        self: "[data-cmp-is='childrenEditor']",
        add: "[data-cmp-hook-childreneditor='add']"
    };

    let ChildrenEditorLimit = function(config) {
        this._config = config;
        this._elements = {};
        this._init();
    };

    ChildrenEditorLimit.prototype = (function() {
        return {
            constructor: ChildrenEditorLimit,
            _init: function() {
                this._elements.self = this._config.el;
                this._elements.add = this._elements.self.querySelectorAll(selectors.add)[0];

                // store a reference to the Children Editor object
                $(this._elements.self).data("childrenEditor", this);

                this._bindEvents();
            },
            _bindEvents: function() {
                let that = this;

                Coral.commons.ready(that._elements.self, function() {
                    that._elements.self.on("coral-collection:add", function(event) {
                        if (that._element.self.items.length >= 4) {
                        	//TODO: Jordy Elst
                        	console.log("remove it");
						}
                    });
                });
            }
        };
    })();

    channel.on("foundation-contentloaded", function(event) {
        $(event.target).find(selectors.self).each(function() {
            new ChildrenEditor({
                el: this
            });
        });
    });

}(jQuery, Granite.author, jQuery(document), this));
