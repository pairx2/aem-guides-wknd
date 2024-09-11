import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import resultHTML from './result.html';

// Define a story
const resultStory = new UIComponent('result');

// Define Variant
const defaultVariant = new ComponentVariant('Default', resultHTML);

// Add variants to story
resultStory.addVariant(defaultVariant);
// Knobs

// Plain text
const resultTitleKnob = new Knob('result-title', 'Result Title', 'text', null, 'result title');
const resultUrlKnob = new Knob('result-title-url', 'Result Url', 'text', null, '#');
const resultDescriptionKnob = new Knob('result-description', 'Result Description', 'text', null, 'result description');

defaultVariant.addKnob(resultTitleKnob);
defaultVariant.addKnob(resultUrlKnob);
defaultVariant.addKnob(resultDescriptionKnob);

// Add story to tree
treeConfig.addComponentToCategory(resultStory, 'atoms');