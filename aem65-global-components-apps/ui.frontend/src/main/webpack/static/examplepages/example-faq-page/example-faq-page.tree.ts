import {
    treeConfig,
    UIComponent,
    ComponentVariant
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";
import examplefaqpageHTML from "./example-faq-page.html";

// Define a story
const exampleFaqPageStory = new UIComponent("FAQ Page");

// Define Variant
const defaultVariant = new ComponentVariant("Default",  examplefaqpageHTML);

// Add variants to story
exampleFaqPageStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(exampleFaqPageStory, "example pages");
