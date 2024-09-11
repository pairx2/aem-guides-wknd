import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import termsSectionHtml from './terms-section.html';

// ---- Define a story
const termsSectionStory = new UIComponent('terms Section');

// ----------- Define Variant
const termsSectionVariant = new ComponentVariant('Default', termsSectionHtml);

termsSectionStory.addVariant(termsSectionVariant);


const containerStyleKnob = new Knob('container-bg', 'Container background', 'dropdown', ['light', 'dark']);

termsSectionVariant.addKnob(containerStyleKnob);


treeConfig.addComponentToCategory(termsSectionStory, 'molecules');