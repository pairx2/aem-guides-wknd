import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import cookieBarHtml from './cookie-bar.html';

// Story
const cookieBarStory = new UIComponent('Cookie');

// Variants
let cookieVariant = new ComponentVariant('default',  cookieBarHtml);

cookieBarStory.addVariant(cookieVariant);

treeConfig.addComponentToCategory(cookieBarStory, 'molecules');
