(function($, CUI, $document){
    let GROUP = "eaem-aem-fonts",
        FONT_FEATURE = "applyFont",
        EAEM_APPLY_FONT_DIALOG = "eaemTouchUIApplyFontDialog",
        SENDER = "eaem-aem", REQUESTER = "requester", $eaemFontPicker,
        CANCEL_CSS = "[data-foundation-wizard-control-action='cancel']",
        FONT_SELECTOR_URL = "/apps/abbott-platform/clientlibs/clientlibs-colorpicker/color-picker.html",
        url = document.location.pathname;

    if( url.indexOf(FONT_SELECTOR_URL) == 0 ){
        handlePicker();
        return;
    }

    function handlePicker(){
        $document.on("foundation-contentloaded", fillDefaultValues);

        $document.on("click", CANCEL_CSS, sendCancelMessage);

        $document.submit(sentTextAttributes);
    }

    function queryParameters() {
        let result = {}, param,
            params = document.location.search.split(/[?&]/);

        params.forEach( function(it) {
            if (_.isEmpty(it)) {
                return;
            }

            param = it.split("=");
            result[param[0]] = param[1];
        });

        return result;
    }

    function setWidgetValue(form, selector, value, enable){
        Coral.commons.ready(form.querySelector(selector), function (field) {
            if(field.tagName == "CORAL-CHECKBOX"){
                if(value == "true"){
                    field.checked = true;
                }
            }else{
                field.value = _.isEmpty(value) ? "" : decodeURIComponent(value);
            }

            if(enable){
                delete field.disabled;
            }else{
                field.disabled = "disabled";
            }
        });
    }

    function fillDefaultValues(){
        const queryParams = queryParameters(),
            $form = $("form");

        if(_.isEmpty(queryParams.features)){
            return;
        }

        setWidgetValue($form[0], "[name='./color']", queryParams.color, true);

        setWidgetValue($form[0], "[name='./bgColor']", queryParams.bgColor, true);

        $form.css("background-color", "#fff");
    }

    function sentTextAttributes(){
        let message = {
            sender: SENDER,
            action: "submit",
            data: {}
        }, $form = $("form"), $field;

        _.each($form.find("[name^='./']"), function(field){
            $field = $(field);
            message.data[$field.attr("name").substr(2)] = $field.val();
        });

        getParent().postMessage(JSON.stringify(message), "*");
    }

    function sendCancelMessage(){
        const message = {
            sender: SENDER,
            action: "cancel"
        };

        getParent().postMessage(JSON.stringify(message), "*");
    }

    function getParent() {
        if (window.opener) {
            return window.opener;
        }

        return parent;
    }

    addPlugin();

    addPluginToDefaultUISettings();

    addDialogTemplate();

    function addDialogTemplate(){
        const fontSelectorUrl = Granite.HTTP.externalize(FONT_SELECTOR_URL) + "?" + REQUESTER + "=" + SENDER;

        const html = "<iframe width='560px' height='340px' frameBorder='0' src='" + fontSelectorUrl + "'></iframe>";

        if(_.isUndefined(CUI.rte.Templates)){
            CUI.rte.Templates = {};
        }

        if(_.isUndefined(CUI.rte.templates)){
            CUI.rte.templates = {};
        }

        try{
            CUI.rte.templates['dlg-' + EAEM_APPLY_FONT_DIALOG] = CUI.rte.Templates['dlg-' + EAEM_APPLY_FONT_DIALOG] = Handlebars.compile(html);
        }catch(err){
            console.log("Ignoring font plugin error", err);
        }
    }

    function rgbToHex(color){
        if(_.isEmpty(color)){
            return color;
        }

        if(color.indexOf("rgb") == 0){
            color = CUI.util.color.RGBAToHex(color);
        }

        return color;
    }

    function addPluginToDefaultUISettings(){
        let groupFeature = GROUP + "#" + FONT_FEATURE,
            toolbar = CUI.rte.ui.cui.DEFAULT_UI_SETTINGS.dialogFullScreen.toolbar;

        if(toolbar.includes(groupFeature)){
            return;
        }
        toolbar.splice(3, 0, groupFeature);
    }

    let EAEMApplyFontDialog = new Class({
        extend: CUI.rte.ui.cui.AbstractDialog,

        toString: "EAEMApplyFontDialog",

        initialize: function(config) {
            this.exec = config.execute;
        },

        getDataType: function() {
            return EAEM_APPLY_FONT_DIALOG;
        }
    });

    function addPlugin(){
        let EAEMTouchUIFontPlugin = new Class({
            toString: "EAEMTouchUIFontPlugin",

            extend: CUI.rte.plugins.Plugin,

            pickerUI: null,

            getFeatures: function() {
                return [ FONT_FEATURE ];
            },

            initializeUI: function(tbGenerator) {
                const plg = CUI.rte.plugins;

                addPluginToDefaultUISettings();

                if (!this.isFeatureEnabled(FONT_FEATURE)) {
                    return;
                }

                this.pickerUI = tbGenerator.createElement(FONT_FEATURE, this, false, { title: "Color" });
                tbGenerator.addElement(GROUP, plg.Plugin.SORT_FORMAT, this.pickerUI, 10);

                const groupFeature = GROUP + "#" + FONT_FEATURE;
                tbGenerator.registerIcon(groupFeature, "colorPalette");
            },

            notifyPluginConfig: function (pluginConfig) {
                pluginConfig = pluginConfig || {};

                CUI.rte.Utils.applyDefaults(pluginConfig, {
                    'tooltips': {
                        applyFont: {
                            'title': 'Apply Font',
                            'text': 'Apply Font to selected text'
                        }
                    }
                });

                this.config = pluginConfig;
            },

            execute: function (pluginCommand, value, envOptions) {
                const context = envOptions.editContext,
                    ek = this.editorKernel;

                if (pluginCommand != FONT_FEATURE) {
                    return;
                }

                if(!isValidSelection()){
                    return;
                }

                let selection = CUI.rte.Selection.createProcessingSelection(context),
                    startNode = selection.startNode;

                if ( (selection.startOffset === startNode.length) && (startNode != selection.endNode)) {
                    startNode = startNode.nextSibling;
                }

                let $tag = $(CUI.rte.Common.getTagInPath(context, startNode, "span")),
                    clazz = $tag.attr("class"),
                    size = $tag.css("font-size"),dialog,dm = ek.getDialogManager(),
                    $container = CUI.rte.UIUtils.getUIContainer($(context.root)),
                    propConfig = {
                        'parameters': {
                            'command': this.pluginId + '#' + FONT_FEATURE
                        }
                    };

                let color = this.getColorAttributes($tag);

                if(this.eaemApplyFontDialog){
                    dialog = this.eaemApplyFontDialog;

                    dialog.$dialog.find("iframe").attr("src", this.getPickerIFrameUrl(this.config.features, size, clazz, color.color, color.bgColor));
                }else{
                    dialog = new EAEMApplyFontDialog();

                    dialog.attach(propConfig, $container, this.editorKernel);

                    dialog.$dialog.css("-webkit-transform", "scale(0.9)").css("-webkit-transform-origin", "0 0")
						 .css("-moz-transform", "scale(0.9)").css("-moz-transform-origin", "0px 0px").css("left","50% !important").css("transform-X","-50% !important");

                    setTimeout(function() {
                        if (dialog.$dialog.position().left < 0) {
                            dialog.$dialog.addClass("leftHidden");
                        }
                	}, 100);

                    dialog.$dialog.find("iframe").attr("src",
                        this.getPickerIFrameUrl(this.config.features, size, clazz, color.color, color.bgColor));

                    this.eaemApplyFontDialog = dialog;
                }

                dm.show(dialog);

                $(window).off('message', receiveMessage).on('message', receiveMessage);

                function isValidSelection(){
                    const winSel = window.getSelection();
                    return winSel && winSel.rangeCount == 1 && winSel.getRangeAt(0).toString().length > 0;
                }

                function receiveMessage(event) {
                    event = event.originalEvent || {};

                    if (_.isEmpty(event.data)) {
                        return;
                    }

                    let message, action;

                    try{
                        message = JSON.parse(event.data);
                    }catch(err){
                        return;
                    }

                    if (!message || message.sender !== SENDER) {
                        return;
                    }

                    action = message.action;

                    if(action === "submit"){
                        ek.relayCmd(pluginCommand, message.data);
                    }

                    dialog.hide();
                }
            },

            getColorAttributes: function($tag){
                let key, color = { color: "", bgColor : ""};

                if(!$tag.attr("style")){
                    return color;
                }

                //donot use .css("color"), it returns default font color, if color is not set
                const parts = $tag.attr("style").split(";");

                _.each(parts, function(value){
                    value = value.split(":");

                    key = value[0] ? value[0].trim() : "";
                    value = value[1] ? value[1].trim() : "";

                    if(key == "color"){
                        color.color = rgbToHex(value);
                    }else if(key == "background-color"){
                        color.bgColor = rgbToHex(value);
                    }
                });

                return color;
            },

            showFontModal: function(scrUrl){
                let self = this, $iframe = $('<iframe>'),
                    $modal = $('<div>').addClass('eaem-cfm-font-size coral-Modal');

                $iframe.attr('src', scrUrl).appendTo($modal);

                $modal.appendTo('body').modal({
                    type: 'default',
                    buttons: [],
                    visible: true
                });

                $eaemFontPicker = $modal;

                $eaemFontPicker.eaemFontPlugin = self;

                $modal.nextAll(".coral-Modal-backdrop").addClass("cfm-coral2-backdrop");
            },

            getPickerIFrameUrl: function(features, size, clazz, color, bgColor){
                let fsurl = Granite.HTTP.externalize(FONT_SELECTOR_URL) + "?" + REQUESTER + "=" + SENDER;

                if(features === "*"){
                    features = [TEXT_COLOR_FEATURE , TEXT_BG_COLOR_FEATURE];
                }

                fsurl = fsurl + "&features=" + features.join(",");

                if(!_.isEmpty(color)){
                    fsurl = fsurl + "&color=" + encodeURIComponent(color);
                }

                if(!_.isEmpty(bgColor)){
                    fsurl = fsurl + "&bgColor=" + encodeURIComponent(bgColor);
                }

                if(!_.isEmpty(size)){
                    fsurl = fsurl + "&size=" + size;
                }

                if(!_.isEmpty(clazz)){
                    fsurl = fsurl + "&class=" + clazz;
                }

                return fsurl;
            },

            updateState: function(selDef) {
                const hasUC = this.editorKernel.queryState(FONT_FEATURE, selDef);

                if (this.pickerUI != null) {
                    this.pickerUI.setSelected(hasUC);
                }
            }
        });

        let EAEMTouchUIFontCmd = new Class({
            toString: "EAEMTouchUIFontCmd",

            extend: CUI.rte.commands.Command,

            isCommand: function (cmdStr) {
                return (cmdStr.toLowerCase() == FONT_FEATURE);
            },

            getProcessingOptions: function () {
                const cmd = CUI.rte.commands.Command;
                return cmd.PO_SELECTION | cmd.PO_BOOKMARK | cmd.PO_NODELIST;
            },

            getTagObject: function(textData) {
                let style = "";

                if(!_.isEmpty(textData.color)){
                    style = "color: " + textData.color + ";";
                }

                if(!_.isEmpty(textData.size)){
                    style = style + "font-size: " + textData.size + ";";
                }

                if(!_.isEmpty(textData.bgColor)){
                    style = style + "background-color: " + textData.bgColor;
                }

                let spanTag = {
                    "tag": "span",
                    "attributes": {
                        "style" : style
                    }
                };

                const clazz = textData.style;

                if(!_.isEmpty(clazz)){
                    spanTag.attributes.class = clazz;
                }

                return spanTag;

            },

            execute: function (execDef) {
                let textData = execDef.value, selection = execDef.selection,
                    nodeList = execDef.nodeList;

                if (!selection || !nodeList) {
                    return;
                }

                let common = CUI.rte.Common,
                    context = execDef.editContext,
                    tagObj = this.getTagObject(textData);

                if(_.isEmpty(textData.size) && _.isEmpty(textData.color)
                            && _.isEmpty(textData.bgColor) && _.isEmpty(textData.style)
                            && !textData.hideOnMobile && !textData.hideOnDesktop && !textData.hideOnTablet){
                    nodeList.removeNodesByTag(execDef.editContext, tagObj.tag, undefined, true);
                    return;
                }

                const tags = common.getTagInPath(context, selection.startNode, tagObj.tag);

                //remove existing color before adding new color
                if (tags != null) {
                    nodeList.removeNodesByTag(execDef.editContext, tagObj.tag, tags.attributes ? tags.attributes : undefined, true);
                }

                nodeList.surround(execDef.editContext, tagObj.tag, tagObj.attributes);
            },

            queryState: function(selectionDef, cmd) {
                return false;
            }
        });

        CUI.rte.commands.CommandRegistry.register(FONT_FEATURE, EAEMTouchUIFontCmd);

        CUI.rte.plugins.PluginRegistry.register(GROUP,EAEMTouchUIFontPlugin);
    }
}(jQuery, window.CUI,jQuery(document)));