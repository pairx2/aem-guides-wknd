(function(){
    if(typeof EAEM === "undefined"){
        var EAEM = {};
    }
 
    //the function executed when user clicks collapse; returns summary of multifield item data
    EAEM.showProductName = function(fields){
        return Object.values(fields)[0];
    }
}());
 
(function ($, $document, gAuthor) {
    let titleCreators 					= {},
        CORAL_MULTIFIELD 				= "coral-multifield",
        CORAL_MULTIFIELD_ITEM 			= "coral-multifield-item",
        CORAL_MULTIFIELD_ITEM_CONTENT 	= "coral-multifield-item-content",
        EAEM_SHOW_ON_COLLAPSE 			= "eaem-show-on-collapse",
        RS_MULTIFIELD 					= "granite/ui/components/coral/foundation/form/multifield";
 
    $document.on("dialog-ready", addCollapsers);
 
    function addCollapsers(){
        let $multifields = $(CORAL_MULTIFIELD).css("padding-right", "2.5rem");
 
        if(_.isEmpty($multifields)){
            return;
        }
 
        $multifields.find(CORAL_MULTIFIELD_ITEM).each(handler);
 
        $multifields.on('change', function(){
            $multifields.find(CORAL_MULTIFIELD_ITEM).each(handler);
        });
 
        loadAccordionTitleCreatorFns();
 
        addExpandCollapseAll($multifields);
 
        function handler(){
            const $mfItem = $(this);
 
            if(!_.isEmpty($mfItem.find("[icon=accordionUp]"))){
                return;
            }
 
            addAccordionIcons($mfItem);
 
            addAccordionTitleSection($mfItem);
        }
    }
 
    function addAccordionTitleSection($mfItem){
        const $accordionTitleSection = $("<div/>").insertAfter($mfItem.find(CORAL_MULTIFIELD_ITEM_CONTENT))
            .addClass("coral-Well").css("cursor", "pointer").hide();
 
        $accordionTitleSection.click(function(){
            $mfItem.find("[icon='accordionDown']").click();
        });
    }
 
    function addExpandCollapseAll($multifields){
        let $mfAdd, expandAll, collapseAll;
 
        $multifields.find("[coral-multifield-add]").each(handler);
 
        function handler(){
            $mfAdd = $(this);
 
            expandAll = new Coral.Button().set({
                variant: 'secondary',
                innerText: "Expand All"
            });
 
            $(expandAll).css("margin-left", "10px").click(function(event){
                event.preventDefault();
                $(this).closest(CORAL_MULTIFIELD).find("[icon='accordionDown']").click();
            });
 
            collapseAll = new Coral.Button().set({
                variant: 'secondary',
                innerText: "Collapse All"
            });
 
            $(collapseAll).css("margin-left", "10px").click(function(event){
                event.preventDefault();
                $(this).closest(CORAL_MULTIFIELD).find("[icon='accordionUp']").click();
            });
 
            $mfAdd.after(expandAll).after(collapseAll);
        }
    }

    function loadAccordionTitleCreatorFns() {
        const editable = gAuthor.DialogFrame.currentDialog.editable;
        if (editable) {
            $.ajax(editable.config.dialog + ".infinity.json").done(function(obj) {
                _.isObject(obj) && !_.isEmpty(obj) && fillLabelCreatorFns(obj);
            });
        }
    }

    function fillLabelCreatorFns(obj) {
        _.each(obj, function(value) {
            if (value["sling:resourceType"] === RS_MULTIFIELD && !_.isEmpty(value.field) && !_.isEmpty(value.field.name)) {
                titleCreators[value.field.name] = value[EAEM_SHOW_ON_COLLAPSE];
            } else {
                _.isObject(value) && !_.isEmpty(value) && fillLabelCreatorFns(value);
            }
        });
    }
 
    function addAccordionIcons($mfItem){
        let up = new Coral.Button().set({
            variant: "quiet",
            icon: "accordionUp",
            title: "Collapse"
        });
 
        up.setAttribute('style', 'position:absolute; top: 0; right: -2.175rem');
        $(up).on('click', handler);
 
        $mfItem.append(up);
 
        let down = new Coral.Button().set({
            variant: "quiet",
            icon: "accordionDown",
            title: "Expand"
        });
 
        down.setAttribute('style', 'position:absolute; top: 0; right: -2.175rem');
        $(down).on('click', handler).hide();
 
        $mfItem.append(down);
 
        function handler(event){
            event.preventDefault();
 
            const mfName = $(this).closest(CORAL_MULTIFIELD).attr("data-granite-coral-multifield-name"),
                $mfItemInner = $(this).closest(CORAL_MULTIFIELD_ITEM),
                $accordionTitleSection = $mfItemInner.children("div");
 
            $accordionTitleSection.html(getAccordionTitle($mfItemInner, mfName));
 
            adjustUI.call(this, $accordionTitleSection);
        }
 
        function adjustUI($accordionTitleSection){
            const icon = $(this).find("coral-icon").attr("icon"),
                $content = $mfItem.find(CORAL_MULTIFIELD_ITEM_CONTENT);
 
            if(icon == "accordionUp"){
                if($accordionTitleSection.css("display") !== "none"){
                    return;
                }
 
                $accordionTitleSection.show();
 
                $content.slideToggle( "fast", function() {
                    $content.hide();
                });
 
                $(up).hide();
                $(down).show();
            }else{
                if($accordionTitleSection.css("display") === "none"){
                    return;
                }
 
                $accordionTitleSection.hide();
 
                $content.slideToggle( "fast", function() {
                    $content.show();
                });
 
                $(up).show();
                $(down).hide();
            }
        }
    }
 
    function getAccordionTitle($mfItem, mfName){
        let accordionTitle = "Click to expand";
 
        try{
            if(titleCreators[mfName]){
                let fields = {};
 
                $mfItem.find("input").each(function(){
                    const $input = $(this);
                    fields[$input.attr("name")] = $input.val();
                });
                 const method = titleCreators[mfName] ? titleCreators[mfName] : null;
                if (fields) {
                    if (typeof method === 'function') {
                        accordionTitle = method?.apply(titleCreators, fields);
                    }
                }
            }
        }catch(err){}
 
        if(!accordionTitle){
            accordionTitle = "Click to expand";
        }
 
        return accordionTitle;
    }
}(jQuery, jQuery(document), Granite.author));
