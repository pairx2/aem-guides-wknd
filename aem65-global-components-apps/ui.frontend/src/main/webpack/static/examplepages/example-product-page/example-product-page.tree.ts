import {
    ComponentVariant,
    treeConfig,
    UIComponent,
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";
import exampleProductPageHtml from "./example-product-page.html";

// Define a story
const exampleProductStory = new UIComponent("Product Page");

//Add variant
const exampleProductVariant = new ComponentVariant('Default', exampleProductPageHtml);

exampleProductStory.addVariant(exampleProductVariant);
// Add story to tree
treeConfig.addComponentToCategory(exampleProductStory, "example pages");
