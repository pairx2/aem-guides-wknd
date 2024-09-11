// RTE StylePicker Plugin code
(function ($, CUI) {
    const GROUP = "styleformat",
        STYLES_FEATURE = "styles",
        DIALOG = "stylePickerDialog",
        PICKER_NAME_IN_POPOVER = "style",
        REQUESTER = "requester",
        TITLE = "Style Picker",
        ICON = "colorPalette",
        PICKER_URL = "/apps/adc/freestylelibrede/components/commons/rte/plugins/popovers/style-picker/_cq_dialog.html";
    
    if (document.location.pathname.indexOf("/editor.html/") > -1)
        addDialogTemplate();
    
    
    let StylePickerDialog = new Class({
        extend: CUI.rte.ui.cui.AbstractDialog,
        
        toString: "StylePickerDialog",
        
        initialize: function (config) {
            this.exec = config.execute;
        },
        
        getDataType: function () {
            return DIALOG;
        }
    });
    
    let StylePickerPlugin = new Class({
        toString: "StylePickerPlugin",
        
        extend: CUI.rte.plugins.Plugin,
        
        pickerUI: null,
        
        getFeatures: function () {
            return [STYLES_FEATURE];
        },
        
        initializeUI: function (tbGenerator) {
            let plg = CUI.rte.plugins;
            
            if (!this.isFeatureEnabled(STYLES_FEATURE)) {
                return;
            }
            
            this.pickerUI = tbGenerator.createElement(STYLES_FEATURE, this, false, {
                title: TITLE
            });
            tbGenerator.addElement(GROUP, plg.Plugin.SORT_FORMAT, this.pickerUI, 10);
            
            let groupFeature = GROUP + "#" + STYLES_FEATURE;
            tbGenerator.registerIcon(groupFeature, ICON);
        },
        
        execute: function (id, value, envOptions) {
            
            if (!isValidSelection()) {
                return;
            }
            
            let context = envOptions.editContext,
                dialog,
                ek = this.editorKernel,
                selection = context.win.getSelection(),
                startNode = selection.baseNode,
                styleClasses = $(startNode).attr('class'),
                plugin = this,
                dm = ek.getDialogManager(),
                $container = CUI.rte.UIUtils.getUIContainer($(context.root)),
                propConfig = {
                    'parameters': {
                        'command': this.pluginId + '#' + STYLES_FEATURE
                    }
                };
            
            
            if (this.StylePickerDialog) {
                dialog = this.StylePickerDialog;
            } else {
                dialog = new StylePickerDialog();
                
                dialog.attach(propConfig, $container, this.editorKernel);
                
                dialog.$dialog.css("-webkit-transform", "scale(0.8)").css("-webkit-transform-origin", "0 0")
                    .css("-moz-transform", "scale(0.8)").css("-moz-transform-origin", "0px 0px");
                
                
                if (typeof styleClasses === 'undefined') {
                    styleClasses = "";
                }
                dialog.$dialog.find("iframe").attr("src", getPickerIFrameUrl(styleClasses));
                
                this.StylePickerDialog = dialog;
            }
            
            dm.show(dialog);
            registerReceiveDataListener(receiveMessage);
            
            function isValidSelection() {
                let winSel = window.getSelection();
                return winSel && winSel.rangeCount == 1 && winSel.getRangeAt(0).toString().length > 0;
            }
            
            function getPickerIFrameUrl(style) {
                let url = PICKER_URL + "?" + REQUESTER + "=" + GROUP;
                
                if (!_.isEmpty(style)) {
                    url = url + "&" + PICKER_NAME_IN_POPOVER + "=" + style;
                }
                url = encodeURI(url)
                return url;
            }
            
            function removeReceiveDataListener(handler) {
                if (window.removeEventListener) {
                    window.removeEventListener("message", handler);
                } else if (window.detachEvent) {
                    window.detachEvent("onmessage", handler);
                }
            }
            
            function registerReceiveDataListener(handler) {
                if (window.addEventListener) {
                    window.addEventListener("message", handler, false);
                } else if (window.attachEvent) {
                    window.attachEvent("onmessage", handler);
                }
            }
            
            function receiveMessage(event) {
                
                if (_.isEmpty(event.data)) {
                    return;
                }
                let message = JSON.parse(event.data),
                    action;
                if (!message || message.sender !== GROUP) {
                    return;
                }
                
                action = message.action;
                
                if (action === "submit") {
                    if (!_.isEmpty(message.data)) {
                        if (startNode.nodeType == 3) {
                            $(startNode).parent().addClass(message.data.style);
                        } else {
                            $(startNode).addClass(message.data.style);
                        }
                    }
                } else if (action === "remove") {
                    if (startNode.nodeType == 3) {
                        $(startNode).parent().removeClass(message.data.style);
                    } else {
                        $(startNode).removeClass(message.data.style);
                    }
                }
                
                if (action === "submit" || action === "remove" || action === "cancel") {
                    plugin.StylePickerDialog = null;
                }
                
                dialog.hide();
                removeReceiveDataListener(receiveMessage);
            }
        },
        
        //to mark the icon selected/deselected
        updateState: function (selDef) {
            let hasUC = this.editorKernel.queryState(STYLES_FEATURE, selDef);
            
            if (this.pickerUI !== null) {
                this.pickerUI.setSelected(hasUC);
            }
        }
    });
    
    CUI.rte.plugins.PluginRegistry.register(GROUP, StylePickerPlugin);
    
    let StylePickerCmd = new Class({
        toString: "StylePickerCmd",
        
        extend: CUI.rte.commands.Command,
        
        isCommand: function (cmdStr) {
            return (cmdStr.toLowerCase() == STYLES_FEATURE);
        },
        
        getProcessingOptions: function () {
            let cmd = CUI.rte.commands.Command;
            return cmd.PO_SELECTION | cmd.PO_BOOKMARK | cmd.PO_NODELIST;
        }
    });
    
    CUI.rte.commands.CommandRegistry.register(STYLES_FEATURE, StylePickerCmd);
    
    
    function addDialogTemplate() {
        let url = PICKER_URL + "?" + REQUESTER + "=" + GROUP;
        
        let html = "<iframe width='500px' height='300px' frameBorder='0' src='" + url + "'></iframe>";
        
        if (_.isUndefined(CUI.rte.Templates)) {
            CUI.rte.Templates = {};
        }
        
        if (_.isUndefined(CUI.rte.templates)) {
            CUI.rte.templates = {};
        }
        
        CUI.rte.templates['dlg-' + DIALOG] = CUI.rte.Templates['dlg-' + DIALOG] = Handlebars.compile(html);
        
    }
}(jQuery, window.CUI));


// RTE StylePicker Plugin Popover code
(function ($, $document) {
    const SENDER = "styleformat",
        REQUESTER = "requester",
        STYLE = "style",
        ADD_STYLE_BTN = "#ADD_STYLE",
        REMOVE_STYLE_BTN = "#REMOVE_STYLE",
        DIALOG_CLASS = "style-Picker-Dialog";
    
    if (queryParameters()[REQUESTER] !== SENDER) {
        return;
    }
    
    $(function () {
        _.defer(setupPopoverIframe);
    });
    
    function queryParameters() {
        let result = {},
            param,
            params = document.location.search.split(/\?|\&/);
        
        params.forEach(function (it) {
            if (_.isEmpty(it)) {
                return;
            }
            
            param = it.split("=");
            result[param[0]] = param[1];
        });
        
        return result;
    }
    
    function setupPopoverIframe() {
        let queryParams = queryParameters(),
            $dialog = $("coral-dialog.cq-Dialog");
        $dialog.addClass(DIALOG_CLASS);
        
        if (_.isEmpty($dialog)) {
            return;
        }
        
        $dialog[0].open = true;
        
        let $addColor = $dialog.find(ADD_STYLE_BTN),
            $removeColor = $dialog.find(REMOVE_STYLE_BTN),
            $stylePicker = $document.find('.coral3-Select[name="./style"]');
        
        
        if (!_.isEmpty(queryParameters()[STYLE])) {
            let param = decodeURIComponent(queryParams[STYLE]).split(" ");
            let items = $stylePicker.find('coral-select-item');           
            let found = false;
            items.each(function (index) {
                
                for (let i = 0; i < param.length; i++) {
                    if (param[i] == $(this).val()) {
                        $(this).attr('selected', 'selected')
                        found = true;
                    }
                }
                if (found) {
                    return;
                }
                
            });
        }
        
        adjustHeader($dialog);
        $addColor.click(function () {
            sendDataMessage("submit");
        });
        $removeColor.click(function () {
            sendDataMessage("remove");
        });
    }
    
    function adjustHeader($dialog) {
        let $header = $dialog.find(".coral-Dialog-header");
        if (_.isEmpty($header)) {
            $header = $dialog.find(".coral3-Dialog-header");
        }
        
        $header.find(".cq-dialog-submit").remove();
        $header.find(".cq-dialog-cancel").click(function (event) {
            event.preventDefault();
            $dialog.remove();
            sendDataMessage("cancel");
        });
    }
    
    function sendDataMessage(actionType) {
        let message = {
                sender: SENDER,
                action: actionType,
                data: {}
            },
            $dialog, style;
        if (actionType != "cancel") {
            $dialog = $("." + DIALOG_CLASS);
            style = $dialog.find("[name='./" + STYLE + "']").val();
            message.data[STYLE] = style;
        }
        
        parent.postMessage(JSON.stringify(message), "*");
    }
})(jQuery, jQuery(document));