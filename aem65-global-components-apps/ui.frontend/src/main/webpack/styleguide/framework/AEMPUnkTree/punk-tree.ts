import { unzipComponentInheritance } from "./component-inheritance";

class KnobValueSet {
    id: string;
    value: string;
    constructor(id: string, value: string) {
        this.id = id;
        this.value = value;
    }
}

class Knob {
    id: string;
    lable: string;
    type: string;
    options: string[];
    value: string;
    constructor(id: string, lable: string, type: string, options?: string[], value?: string);
    constructor(id: string, lable: string, type: string, options: string[] = [], value: string = "Default Text") {

        if (id.indexOf(' ') >= 0) {
            throw new Error("Id of Knob should not be having any spaces. Please edit the knob id:" + id);
        }
        this.id = id;
        this.lable = lable;
        if (type == "text" || type == "textarea" || type == "dropdown") {
            this.type = type;
        }
        else {
            throw new Error("Unknown Knob type, use one of the options below:\n text (or) textarea (or) dropdown");
        }
        this.options = options
        this.value = value;
    }

    setValue(value: string) {
        this.value = value;
    }

    setOptions(options: string[]) {
        this.options = options;
    }
}

class ComponentVariant {
    id: string;
    name: string;
    knobs: Knob[] = [];
    html: string;
    unzipedHtml: string = '';
    decodedHtmlDefault: string;
    constructor(name: string, html: string, knobs: Knob[] = []) {
        this.id = name.trim().replace(/ /g, "-").toLowerCase();
        this.name = name;
        this.knobs = knobs;
        this.html = html.replace(/\n|\t/g, ' ');
    }

    getHTML(){
        if(this.unzipedHtml === ''){
            this.unzipedHtml = unzipComponentInheritance(this.html);
        }
        return this.unzipedHtml;
    }

    isKnobAvailable(knobId: String): boolean {
        for (let curKnob of this.knobs) {
            if (knobId == curKnob.id) {
                return true;
            }
        }
        return false;
    }

    getKnob(knobLable: string): Knob {
        if (this.isKnobAvailable(knobLable)) {
            for (let curKnob of this.knobs) {
                if (knobLable == curKnob.lable) {
                    return curKnob;
                }
            }
        }
        return null;
    }

    addKnob(knob: Knob) {
        if (this.isKnobAvailable(knob.id)) {
            alert("ERROR: Duplicate Knob found. Please see logs for more details.");
            throw new Error("Knob with ID:" + knob.id + " already exists. Please use a different ID");
        }
        this.knobs.push(knob);
        return this.getKnob(knob.lable);
    }


    getDefaultKnobSets() {
        let knobsSetsArry: KnobValueSet[] = [];
        for (let i in this.knobs) {
            let knobIn = this.knobs[i];
            let knobId = knobIn.id;
            let knobVal: string;
            if (knobIn.type == 'text' || knobIn.type == 'textarea') {
                knobVal = knobIn.value;
                if (typeof knobVal === 'undefined') {
                    throw new Error("Undefined default value found for knob with id:" + knobIn.id + "\n" + JSON.stringify(knobId));
                }
            }
            else {
                if (knobIn['options'].length != 0) {
                    knobVal = knobIn.options[0];
                }
                else {
                    throw new Error("Options for Knob are empty:" + knobIn.id + "\n" + JSON.stringify(knobId));
                }
            }
            knobsSetsArry.push(new KnobValueSet(knobId, knobVal));
        }
        return knobsSetsArry;
    }

    getDecodedHTMLFromKnobSets(knobsSets: KnobValueSet[]) {
        let finalDom = this.getHTML();
        let unusedKnobKeys = [];
        for (let i in knobsSets) {
            let knobSetIn = knobsSets[i];
            let keyIn = "{{knobkey." + knobSetIn['id'] + "}}";
            if (finalDom.indexOf(keyIn) !== -1) {
              finalDom = finalDom.split(keyIn).join(knobSetIn.value);
            }
            else {
                unusedKnobKeys.push(knobSetIn.id);
            }
        }

        if (unusedKnobKeys.length > 0) {
            alert('ERROR: Unused Knobs. See console log for details');
            throw new Error('Below knobs are not used in .html file. Please use these keys below.\n' + JSON.stringify(unusedKnobKeys));
        }
        if (finalDom.indexOf("{{") !== -1) {
          let found = [],
                rxp = /{([^}]+)}/g,
                curMatch;

            while (curMatch = rxp.exec(finalDom)) {
                found.push(curMatch[1]);
            }
            alert('ERROR: Unknown Knobs used in .html. Please see console log for details');
            throw new Error('Unknown Knob keys used in .html file of current component\n' + JSON.stringify(found));
        }
        return finalDom;
    }

    getDefaultHTML() {
        let defaultKnobsSet = this.getDefaultKnobSets();
        return this.getDecodedHTMLFromKnobSets(defaultKnobsSet);
    }
}

class UIComponent {
    id: string;
    name: string;
    variants: ComponentVariant[];

    constructor(name: string, variants: ComponentVariant[] = []) {
        this.id = name.trim().replace(/ /g, "-").toLowerCase();
        this.name = name;
        this.variants = variants;
    }

    isVariantAvailable(variantIn: ComponentVariant): boolean {
        for (let variant of this.variants) {
            if (variant.name == variantIn.name) {
                return true;
            }
        }
        return false;
    }

    getVariant(variantIn: ComponentVariant): ComponentVariant {
        for (let variant of this.variants) {
            if (variant.name == variantIn.name) {
                return variant;
            }
        }
        return null;
    }

    getVariantById(id: string) {
        for (let variant of this.variants) {
            if (variant.id == id) {
                return variant;
            }
        }
        throw new Error("Unknown component variant with id:" + id + " requested");
    }

    addVariant(newVariant: ComponentVariant): ComponentVariant {
        this.variants.push(newVariant);
        return this.getVariant(newVariant);
    }
}

class PunkBranch {
    id: string;
    name: string;
    iconClass: string;
    components: UIComponent[];
    constructor(name: string, iconClass: string = "fas fa-ad", components: UIComponent[] = []) {
        this.id = name.trim().replace(/ /g, "-").toLowerCase();
        this.name = name;
        this.iconClass = iconClass;
        this.components = components;
    }

    getComponentByName(compName: string): UIComponent {
        for (let comp of this.components) {
            if (comp.name == compName) {
                return comp;
            }
        }
        alert("ERROR: Unknown component with name:" + compName + " requested");
        throw new Error("Unknown component with name:" + compName + " requested");
    }

    getComponentById(compId: string): UIComponent {
        for (let comp of this.components) {
            if (comp.id == compId) {
                return comp;
            }
        }
        alert("ERROR: Unknown component with id:" + compId + " requested");
        throw new Error("Unknown component with id:" + compId + " requested");
    }

    isComponentAvailableById(compId: string): boolean {
        for (let comp of this.components) {
            if (comp.id == compId) {
                return true;
            }
        }
        return false;
    }

}

class PunkViewPort {
    id:string;
    name: string;
    label: string;
    x: number;
    y: number;
    constructor(name: string, label: string, x: number, y: number) {
        this.id = name.trim().replace(/ /g, "-").toLowerCase();
        this.name = name;
        this.label = label;
        this.x = x;
        this.y = y;
    }
}

class PunkTree {
    branches: PunkBranch[];
    viewports: PunkViewPort[];
    constructor(branches: PunkBranch[] = [], viewports: PunkViewPort[] = []) {
        this.branches = branches;
        this.viewports = viewports;
    }

    addViewPort(name: string, label: string, x: number, y: number) {
        this.viewports.push(new PunkViewPort(name, label, x, y));
    }

    addCategory(category: PunkBranch) {
        if (this.isCategoryAvailable(category.name)) {
            console.error("ERROR: Category with name '" + category.name + "' already exists");
        }
        this.branches.push(category);
    }

    isCategoryAvailable(categoryName: string) {
        for (let currCategory of this.branches) {
            if (currCategory.name == categoryName) {
                return true;
            }
        }
        return false;
    }

    getArrayofNamesOfAllCatetories() {
        let arrayOfNames: string[] = [];
        for (let categoryIn of this.branches) {
            arrayOfNames.push(categoryIn.name);
        }
        return arrayOfNames;
    }

    getCategoryByName(categoryName: string): PunkBranch {
        for (let categoryIn of this.branches) {
            if (categoryIn.name == categoryName) {
                return categoryIn;
            }
        }
    }

    getCategoryById(categoryid: string): PunkBranch {
        for (let categoryIn of this.branches) {
            if (categoryIn.id == categoryid) {
                return categoryIn;
            }
        }
    }

    addComponentToCategory(component: UIComponent, categoryName: string): UIComponent {
        // check if categoryName exists
        //throw error if category name is not available
        if (!this.isCategoryAvailable(categoryName)) {
            alert("Error: Unknown category used while adding the component. See console log for details");
            throw new Error("Unknown category used while adding the component. Please use below categories only or create a new category\n" + JSON.stringify(this.getArrayofNamesOfAllCatetories()));
        }

        this.getCategoryByName(categoryName).components.push(component);
        return this.getCategoryByName(categoryName).getComponentByName(component.name);
    }

}


const NavigationTree = {
    entry: "",
    categories: [
        {
            name: "Layouts",
            icon: "",
            components: [
            ]
        },
        {
            name: "Content",
            components: [
                {
                    name: "Card",
                    htmlFile: "",
                    variants: [
                        {
                            title: "root",
                            knobs: [
                                {
                                    lable: "Card Head",
                                    type: "dropdown",
                                    options: [
                                        "btn-primary",
                                        "btn-secondary"
                                    ]
                                },
                                {
                                    lable: "Card Title",
                                    type: "text",
                                    value: ""
                                },
                                {
                                    lable: "Card Title",
                                    type: "textarea",
                                    value: ""
                                }
                            ]
                        }
                    ],


                },
            ]
        }]
}

let treeConfig = new PunkTree()

export { treeConfig, UIComponent, PunkBranch, ComponentVariant, Knob, KnobValueSet, PunkViewPort }
