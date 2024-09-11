import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import bgImageHtml from './background-image.html';

// Story
const bgImgStory = new UIComponent('Background Image');

// Variants
let defaultVariant = new ComponentVariant('default',  bgImageHtml);

bgImgStory.addVariant(defaultVariant);

const bgImgKnob = new Knob('bg-img', 'Background Image', 'text', null, '../../../public/resources/images/bg.png');

defaultVariant.addKnob(bgImgKnob);


treeConfig.addComponentToCategory(bgImgStory, 'atoms');
