import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import iconsHTML from './icons.html';
// ---- Define a story
let consComponentStory = new UIComponent('Icons');

// ----------- Define Variant
let consDefaultVariant = new ComponentVariant('Default', iconsHTML);

// --------------------- Define Knobs for variants
consComponentStory.addVariant(consDefaultVariant);
treeConfig.addComponentToCategory(consComponentStory, 'content');