import {
  treeConfig,
  UIComponent,
  ComponentVariant,
 
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";
import fileUploadAndCropping from "./fileuploadandcropping.html";

// Define a story
const fileUploadAndCroppingStory = new UIComponent("File upload and cropping");

// Define Variant
const defaultVariant = new ComponentVariant("Default", fileUploadAndCropping);

// Add variants to story
fileUploadAndCroppingStory.addVariant(defaultVariant);


// Add story to tree
treeConfig.addComponentToCategory(fileUploadAndCroppingStory, "molecules");
