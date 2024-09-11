import {
  treeConfig,
  UIComponent,
  ComponentVariant,
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";
import formAlertHTML from "./form-alert.html";

// Define a story
const formAlertStory = new UIComponent("Form Alert");

// Define Variant
const defaultVariant = new ComponentVariant("Default", formAlertHTML);

// Add variants to story
formAlertStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(formAlertStory, "atoms");
