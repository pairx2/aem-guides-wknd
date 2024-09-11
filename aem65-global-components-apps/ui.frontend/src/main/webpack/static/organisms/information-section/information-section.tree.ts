import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import infoSectionHtml from './information-section.html';

//Define story
const infoSectionStory = new UIComponent('Information Section');

//define variants
const defaultVariant = new ComponentVariant('Default', infoSectionHtml);

//add variant to the story

infoSectionStory.addVariant(defaultVariant);

const colorKnob = new Knob('color', 'Color Variation', 'dropdown',['o-info-section--light', 'o-info-section--dark'], '');

defaultVariant.addKnob(colorKnob);

//add story to the tree
treeConfig.addComponentToCategory(infoSectionStory, 'organisms');