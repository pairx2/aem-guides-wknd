import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import counterPlainTextHTML from './counter.html';

// Define a story
const counterStory = new UIComponent('Counter');

// Define Variant
const defaultVariant = new ComponentVariant('Default', counterPlainTextHTML);

// Add variants to story
counterStory.addVariant(defaultVariant);

// Knobs

const switcherTextKnob = new Knob('counter-number', 'Counter number', 'text', null, '1');
defaultVariant.addKnob(switcherTextKnob);

// Add story to tree
treeConfig.addComponentToCategory(counterStory, 'atoms');