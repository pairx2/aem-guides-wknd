import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import columnControlHTML from './columncontrol-3.html';
import columnControl2424HTML from './columncontrol-2-4-2-4.html';
import columnControl822HTML from './columncontrol-8-2-2.html';
import columnControl363HTML from './columncontrol-3-6-3.html';
import columnControl48HTML from './columncontrol-4-8.html';
import columnControl102HTML from './columncontrol-10-2.html';
// Define a story
const columnControlStory = new UIComponent('Column Control');

const columnControlRatios=['4', '2', '3', '5', '6', '7', '8'];

// Define Variant
const defaultVariant = new ComponentVariant('Three Columns', columnControlHTML);
const ratio2424Variant = new ComponentVariant('ratio 2:4:2:4', columnControl2424HTML);
const ratio822Variant = new ComponentVariant('ratio 8:2:2', columnControl822HTML);
const ratio363Variant = new ComponentVariant('ratio 3:6:3', columnControl363HTML);
const ratio48Variant = new ComponentVariant('ratio 4:8', columnControl48HTML);
const ratio102Variant = new ComponentVariant('ratio 10:2', columnControl102HTML);
// Add variants to story
columnControlStory.addVariant(defaultVariant);
columnControlStory.addVariant(ratio2424Variant);
columnControlStory.addVariant(ratio822Variant);
columnControlStory.addVariant(ratio363Variant);
columnControlStory.addVariant(ratio48Variant);
columnControlStory.addVariant(ratio102Variant);

const columnControlWidthKnob = new Knob('container-width', 'Full Width', 'dropdown', ['', 'columncontrol-full-width']);

const columnControlDividerKnob = new Knob('container-divider', 'Divider', 'dropdown', ['', 'column-divider']);

const columnOneRatio = new Knob('one-ratio', 'Column One Ratio', 'dropdown', columnControlRatios);
const columnTwoRatio = new Knob('two-ratio', 'Column Two Ratio', 'dropdown', columnControlRatios);
const columnThreeRatio = new Knob('three-ratio', 'Column Three Ratio', 'dropdown',columnControlRatios);
const columnAlignmentKnob = new Knob('column-alignment', 'Column Alignment', 'dropdown', ['column-align--center', 'column-align--left', 'column-align--right', 'column-align--space-around', 'column-align--space-between', 'column-align--space-evenly']);

defaultVariant.addKnob(columnControlWidthKnob);
defaultVariant.addKnob(columnControlDividerKnob);
defaultVariant.addKnob(columnOneRatio);
defaultVariant.addKnob(columnTwoRatio);
defaultVariant.addKnob(columnThreeRatio);
defaultVariant.addKnob(columnAlignmentKnob);

ratio2424Variant.addKnob(columnControlWidthKnob);
ratio2424Variant.addKnob(columnControlDividerKnob);

ratio822Variant.addKnob(columnControlWidthKnob);
ratio822Variant.addKnob(columnControlDividerKnob);

ratio363Variant.addKnob(columnControlWidthKnob);
ratio363Variant.addKnob(columnControlDividerKnob);

ratio48Variant.addKnob(columnControlWidthKnob);
ratio48Variant.addKnob(columnControlDividerKnob);

ratio102Variant.addKnob(columnControlWidthKnob);
ratio102Variant.addKnob(columnControlDividerKnob);

// Add story to tree
treeConfig.addComponentToCategory(columnControlStory, 'atoms');
