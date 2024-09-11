import {
  treeConfig,
  UIComponent,
  ComponentVariant,
  Knob,
} from "../../../styleguide/framework/AEMPUnkTree/punk-tree";
import payOnFormHtml from "./pay-on-form.html";

// Story
const payOnStory = new UIComponent("Pay-on Form");

// Variants
let payOnFormDefaultVariant = new ComponentVariant("default", payOnFormHtml);

payOnStory.addVariant(payOnFormDefaultVariant);

treeConfig.addComponentToCategory(payOnStory, "molecules");
