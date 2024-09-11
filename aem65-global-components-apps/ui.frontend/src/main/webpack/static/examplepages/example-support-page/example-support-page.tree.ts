import {
    treeConfig,
    UIComponent,
    ComponentVariant
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";
import examplesupportpageHTML from "./example-support-page.html";

// Define a story
const exampleSupportStory = new UIComponent("Support Page");

// Define Variant
const defaultVariant = new ComponentVariant("Default", examplesupportpageHTML);

// Add variants to story
exampleSupportStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(exampleSupportStory, "example pages");
