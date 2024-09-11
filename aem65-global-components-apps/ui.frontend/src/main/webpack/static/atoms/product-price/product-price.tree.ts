import {
  treeConfig,
  UIComponent,
  ComponentVariant,
  Knob,
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";
import productPriceHTML from "./product-price.html";

// Define a story
const productPriceStory = new UIComponent("Product Price");

// Define Variant
const defaultVariant = new ComponentVariant("Default", productPriceHTML);

// Add variants to story
productPriceStory.addVariant(defaultVariant);

// Knobs

// List-item-text knob
const normalPriceKnob = new Knob(
  "normal-price",
  "Normal Price",
  "text",
  null,
  "$65"
);
//List-item-link knob
const vatPriceKnob = new Knob(
  "discount-price",
  "VAT price",
  "text",
  null,
  "$80"
);

defaultVariant.addKnob(normalPriceKnob);
defaultVariant.addKnob(vatPriceKnob);

// Add story to tree
treeConfig.addComponentToCategory(productPriceStory, "atoms");
