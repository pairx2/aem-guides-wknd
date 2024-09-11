import {
  treeConfig,
  UIComponent,
  ComponentVariant,
 
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";
import addToCartHTML from "./add-to-cart.html";

// Define a story
const addToCartStory = new UIComponent("Add To Cart");

// Define Variant
const defaultVariant = new ComponentVariant("Default", addToCartHTML);

// Add variants to story
addToCartStory.addVariant(defaultVariant);


// Add story to tree
treeConfig.addComponentToCategory(addToCartStory, "atoms");
