import {
    ComponentVariant,
    treeConfig,
    UIComponent,
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";

import exampleHomePageHtml from "./example-home-page.html";

// Define a story
const exampleHomeStory = new UIComponent("Home Page");

//Add variant
const exampleHomeVariant = new ComponentVariant('Default', exampleHomePageHtml);

exampleHomeStory.addVariant(exampleHomeVariant);

// Add story to tree
treeConfig.addComponentToCategory(exampleHomeStory, "example pages");
