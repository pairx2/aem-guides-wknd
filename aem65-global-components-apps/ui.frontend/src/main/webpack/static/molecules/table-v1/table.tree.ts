import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import tableHtml from './table.html';
// Define a story
const tableStory = new UIComponent('Table');

// Define variant
const defaultVariant = new ComponentVariant('Default', tableHtml);

// Add variants to story
tableStory.addVariant(defaultVariant);


const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgba(0,0,0,0.5)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');
const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgba(0,0,0,0)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['a-table--gradient-start', 'a-table--gradient-center', 'a-table--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');

defaultVariant.addKnob(gradientStart);
defaultVariant.addKnob(gradientStartPosition);
defaultVariant.addKnob(gradientEnd);
defaultVariant.addKnob(gradientEndPosition);
defaultVariant.addKnob(gradientKnob);
defaultVariant.addKnob(randomKnob);

// Add story to tree
treeConfig.addComponentToCategory(tableStory, 'molecules');
