import {
  treeConfig,
  UIComponent,
  ComponentVariant,
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";
import imageList from "./image-list.html";

// Story
const imageListStory = new UIComponent("Image List");

// Variants
let defaultVariant = new ComponentVariant("default", imageList);

imageListStory.addVariant(defaultVariant);

treeConfig.addComponentToCategory(imageListStory, "atoms");
