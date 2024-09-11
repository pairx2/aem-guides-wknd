import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import chipsPlainTextHTML from './chips.html';

// Define a story
const chipsStory = new UIComponent('chips');

// Define Variant
const defaultVariant = new ComponentVariant('Default', chipsPlainTextHTML);


// Add variants to story
chipsStory.addVariant(defaultVariant);

// Knobs

// Plain text
const chipsTextKnob = new Knob('chips-text', 'Chips Text', 'text', null, 'ketone');
const chipsTextUrlKnob = new Knob('chips-text-url', 'Chips url', 'text', null, '#');

defaultVariant.addKnob(chipsTextKnob);
defaultVariant.addKnob(chipsTextUrlKnob);

// Add story to tree
treeConfig.addComponentToCategory(chipsStory, 'atoms');
