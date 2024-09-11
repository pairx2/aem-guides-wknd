import { KnobValueSet, treeConfig } from "./punk-tree";
import { extractRequiredHTML } from "../../components/utilitybox/html";

let extractKnobSet;
extractKnobSet = (treeCompVariantDOM) => {
    treeCompVariantDOM = $(treeCompVariantDOM);
    let knobsSetsArry: KnobValueSet[] = [];
    treeCompVariantDOM.find('tree-knob-set').each(function (index, element) {
        let knobId = element.getAttribute('data-knob-id');
        let knobValue = element.getAttribute('data-knob-value');
        let knobSet = new KnobValueSet(knobId, knobValue);
        knobsSetsArry.push(knobSet);
    });
    return knobsSetsArry;
}

let unzipOneComp;
unzipOneComp = (treeCompVariantDOM: HTMLElement) => {
    let componentId = treeCompVariantDOM.getAttribute('data-comp-id');
    let compsBranch = treeCompVariantDOM.getAttribute('data-comp-branch');
    let variantId = treeCompVariantDOM.getAttribute('data-variant-id');
    let unzipedHTML = 'ERROR: unable to unzip the inherited component';
    if (treeConfig.isCategoryAvailable(compsBranch)) {
        let branch = treeConfig.getCategoryById(compsBranch);
        if (branch.isComponentAvailableById(componentId)) {
            let comp = branch.getComponentById(componentId);
            let variant = comp.getVariantById(variantId);
            let knobsSetsArry = extractKnobSet(treeCompVariantDOM);          
            let resultHTML = variant.getDecodedHTMLFromKnobSets(knobsSetsArry);
            unzipedHTML = resultHTML;   
        } else
            throw new Error('Unknown component id "' + componentId + '" used while inheriting other component');
    }
    else 
        throw new Error('Unknown category/branch "' + compsBranch + '" used while inheriting other component');
    let cleanedUpHTML = extractRequiredHTML(unzipedHTML);
    return cleanedUpHTML;
}


let unzipComponentInheritance;
unzipComponentInheritance = (htmlIn: string) => {
    const compVariantNode = $($.parseHTML(htmlIn));
    let treeCompDOMS = compVariantNode.find('tree-comp-variant');
    if(treeCompDOMS.length ){
        treeCompDOMS.each(function (index, element) {
            let unzipedCompHTML = unzipOneComp(element);
            $(element).replaceWith($(unzipedCompHTML));
        });
    }
    return compVariantNode.prop('outerHTML');
}

export { unzipComponentInheritance }