// RTE ColorPicker Plugin code
(function ($, CUI) {
    const GROUP = "colorformat",
        COLOR_PICKER_FEATURE = "colorPicker",
        DIALOG = "colorPickerDialog",
        PICKER_NAME_IN_POPOVER = "color",
        REQUESTER = "requester",
        TITLE = "Color Picker",
        ICON = "textColor",
        PICKER_URL = "/apps/adc/freestylelibrede/components/commons/rte/plugins/popovers/color-picker/_cq_dialog.html";
    
    if (document.location.pathname.indexOf("/editor.html/") > -1)
        addDialogTemplate();
    
    
    let ColorPickerDialog = new Class({
        extend: CUI.rte.ui.cui.AbstractDialog,
        
        toString: "ColorPickerDialog",
        
        initialize: function (config) {
            this.exec = config.execute;
        },
        
        getDataType: function () {
            return DIALOG;
        }
    });
    
    let ColorPickerPlugin = new Class({
        toString: "ColorPickerPlugin",
        
        extend: CUI.rte.plugins.Plugin,
        
        pickerUI: null,
        
        getFeatures: function () {
            return [COLOR_PICKER_FEATURE];
        },
        
        initializeUI: function (tbGenerator) {
            let plg = CUI.rte.plugins;
            
            if (!this.isFeatureEnabled(COLOR_PICKER_FEATURE)) {
                return;
            }
            
            this.pickerUI = tbGenerator.createElement(COLOR_PICKER_FEATURE, this, false, {
                title: TITLE
            });
            tbGenerator.addElement(GROUP, plg.Plugin.SORT_FORMAT, this.pickerUI, 10);
            
            let groupFeature = GROUP + "#" + COLOR_PICKER_FEATURE;
            tbGenerator.registerIcon(groupFeature, ICON);
        },
        
        execute: function (id, value, envOptions) {
            if (!isValidSelection()) {
                return;
            }
            
            let context = envOptions.editContext,
                selection = CUI.rte.Selection.createProcessingSelection(context),
                ek = this.editorKernel,
                startNode = selection.startNode;
            
            if ((selection.startOffset === startNode.length) && (startNode != selection.endNode)) {
                startNode = startNode.nextSibling;
            }
            
            let tag = CUI.rte.Common.getTagInPath(context, startNode, "span"),
                plugin = this,
                dialog,
                color = $(tag).css("color"),
                dm = ek.getDialogManager(),
                $container = CUI.rte.UIUtils.getUIContainer($(context.root)),
                propConfig = {
                    'parameters': {
                        'command': this.pluginId + '#' + COLOR_PICKER_FEATURE
                    }
                };
            
            if (this.ColorPickerDialog) {
                dialog = this.ColorPickerDialog;
            } else {
                dialog = new ColorPickerDialog();
                
                dialog.attach(propConfig, $container, this.editorKernel);
                
                dialog.$dialog.css("-webkit-transform", "scale(0.9)").css("-webkit-transform-origin", "0 0")
                    .css("-moz-transform", "scale(0.9)").css("-moz-transform-origin", "0px 0px");
                
                dialog.$dialog.find("iframe").attr("src", getPickerIFrameUrl(color));
                
                this.ColorPickerDialog = dialog;
            }
            
            dm.show(dialog);
            
            registerReceiveDataListener(receiveMessage);
            
            function isValidSelection() {
                let winSel = window.getSelection();
                return winSel && winSel.rangeCount == 1 && winSel.getRangeAt(0).toString().length > 0;
            }
            
            function getPickerIFrameUrl(color) {
                let url = PICKER_URL + "?" + REQUESTER + "=" + GROUP;
                
                if (!_.isEmpty(color)) {
                    url = url + "&" + PICKER_NAME_IN_POPOVER + "=" + color;
                }
                
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
                        ek.relayCmd(id, message.data);
                    }
                    plugin.AEMLabStyleSelectDialog = null;
                } else if (action === "remove") {
                    ek.relayCmd(id);
                    plugin.ColorPickerDialog = null;
                } else if (action === "cancel") {
                    plugin.ColorPickerDialog = null;
                }
                
                dialog.hide();
                
                removeReceiveDataListener(receiveMessage);
            }
        },
        
        //to mark the icon selected/deselected
        updateState: function (selDef) {
            let hasUC = this.editorKernel.queryState(COLOR_PICKER_FEATURE, selDef);
            
            if (this.pickerUI != null) {
                this.pickerUI.setSelected(hasUC);
            }
        }
    });
    
    CUI.rte.plugins.PluginRegistry.register(GROUP, ColorPickerPlugin);
    
    let ColorPickerCmd = new Class({
        toString: "ColorPickerCmd",
        
        extend: CUI.rte.commands.Command,
        
        isCommand: function (cmdStr) {
            return (cmdStr.toLowerCase() == COLOR_PICKER_FEATURE);
        },
        
        getProcessingOptions: function () {
            let cmd = CUI.rte.commands.Command;
            return cmd.PO_SELECTION | cmd.PO_BOOKMARK | cmd.PO_NODELIST;
        },
        
        _getTagObject: function (color) {
            return {
                "tag": "span",
                "attributes": {
                    "style": "color: " + color
                }
            };
        },
        
        execute: function (execDef) {
            let color = execDef.value ? execDef.value[PICKER_NAME_IN_POPOVER] : undefined,
                selection = execDef.selection,
                nodeList = execDef.nodeList;
            
            if (!selection || !nodeList) {
                return;
            }
            
            let common = CUI.rte.Common,
                context = execDef.editContext,
                tagObj = this._getTagObject(color);
            
            //if no color value passed, assume delete and remove color
            if (_.isEmpty(color)) {
                nodeList.removeNodesByTag(execDef.editContext, tagObj.tag, undefined, true);
                return;
            }
            
            let tags = common.getTagInPath(context, selection.startNode, tagObj.tag);
            
            //remove existing color before adding new color
            if (tags != null) {
                nodeList.removeNodesByTag(execDef.editContext, tagObj.tag, undefined, true);
                nodeList.commonAncestor = nodeList.nodes[0].dom.parentNode;
            }
            
            nodeList.surround(execDef.editContext, tagObj.tag, tagObj.attributes);
        }
    });
    
    CUI.rte.commands.CommandRegistry.register(COLOR_PICKER_FEATURE, ColorPickerCmd);
    
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



// RTE ColorPicker Plugin Popover code
(function ($, $document) {
    const SENDER = "colorformat",
        REQUESTER = "requester",
        COLOR = "color",
        ADD_COLOR_BUT = "#CP_ADD_COLOR",
        REMOVE_COLOR_BUT = "#CP_REMOVE_COLOR",
        DIALOG_CLASS = "color-Picker-Dialog";
    
    
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
        let $dialog = $("coral-dialog.cq-Dialog");
        $dialog.addClass(DIALOG_CLASS);
        
        if (_.isEmpty($dialog)) {
            return;
        }
        
        $dialog[0].open = true;
        
        let $addColor = $dialog.find(ADD_COLOR_BUT),
            $removeColor = $dialog.find(REMOVE_COLOR_BUT),
            color = queryParameters()[COLOR],
            $colorPicker = $dialog.find("[name='./" + COLOR + "']");
        
        if (!_.isEmpty(color)) {
            color = decodeURIComponent(color);
            
            if (color.indexOf("rgb") == 0) {
                color = CUI.util.color.RGBAToHex(color);
            }
            
            $colorPicker.val(color);
        }
        
        adjustHeader($dialog);
        
        $addColor.click(sendDataMessage);
        
        $removeColor.click(sendRemoveMessage);
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
            
            sendCancelMessage();
        });
    }
    
    function sendCancelMessage() {
        let message = {
            sender: SENDER,
            action: "cancel"
        };
        
        parent.postMessage(JSON.stringify(message), "*");
    }
    
    function sendRemoveMessage() {
        let message = {
            sender: SENDER,
            action: "remove"
        };
        
        parent.postMessage(JSON.stringify(message), "*");
    }
    
    function sendDataMessage() {
        let message = {
                sender: SENDER,
                action: "submit",
                data: {}
            },
            $dialog, color;
        
        $dialog = $("." + DIALOG_CLASS);
        
        color = $dialog.find("[name='./" + COLOR + "']").val();
        
        if (color && color.indexOf("rgb") >= 0) {
            color = CUI.util.color.RGBAToHex(color);
        }
        
        message.data[COLOR] = color;
        
        parent.postMessage(JSON.stringify(message), "*");
    }
    
})(jQuery, jQuery(document));