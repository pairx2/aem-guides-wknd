import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import miniCartHtml from './minicart.html';

// Story
const miniCartStory = new UIComponent('Mini Cart');

// Variants
let miniCartDefaultVariant = new ComponentVariant('default', miniCartHtml);

miniCartStory.addVariant(miniCartDefaultVariant);

treeConfig.addComponentToCategory(miniCartStory, 'molecules');
