import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import checkboxHTML from './checkbox.html';
import checkboxDisabledHTML from './checkbox-disabled.html';
import checkboxMultiOntionHTML from './checkbox-multiple.html';

// Define a story
const checkboxStory = new UIComponent('Checkbox');

// Define Variant
const defaultVariant = new ComponentVariant('Default', checkboxHTML);
// Disabled Variant
const checkboxDisabledVariant = new ComponentVariant('checkbox disabled', checkboxDisabledHTML);
// Multiple Option Varient
const checkboxMultiOntionVariant = new ComponentVariant('checkbox multiple', checkboxMultiOntionHTML);


// Add variants to story
checkboxStory.addVariant(defaultVariant);
checkboxStory.addVariant(checkboxDisabledVariant);
checkboxStory.addVariant(checkboxMultiOntionVariant);

// Knobs
const checkboxTitleKnob = new Knob('checkbox-title', 'checkbox title', 'text', null, 'Checkbox Title');
const checkboxClassKnob = new Knob('checkbox-class', 'checkbox alignment', 'dropdown',['', 'a-checkbox--vertical','a-checkbox--horizontal']);
const checkboxStateKnob = new Knob('checkbox-state', 'checkbox states', 'dropdown',['a-checkbox--disabled', 'a-checkbox--selected','a-checkbox--indeterminate','a-checkbox--checked-disabled','a-checkbox--error','a-checkbox--default']);
const checkboxIdKnob = new Knob('checkbox-id', 'checkbox id', 'text', null, 'c1');
const checkboxNameKnob = new Knob('checkbox-name', 'checkbox Name', 'text', null, 'C2');
const checkboxTextKnob = new Knob('checkbox-text', 'checkbox text', 'text', null, 'Checkbox');
const checkboxValueKnob = new Knob('checkbox-value', 'Checkbox Value', 'text', null, 'Value');
const checkboxLabelColorKnob= new Knob('checkbox-label-color', 'Label color', 'dropdown',['', 'a-options-label--color-alternate']);

defaultVariant.addKnob(checkboxTitleKnob);
defaultVariant.addKnob(checkboxIdKnob);
defaultVariant.addKnob(checkboxTextKnob);
defaultVariant.addKnob(checkboxValueKnob);
defaultVariant.addKnob(checkboxNameKnob);
defaultVariant.addKnob(checkboxLabelColorKnob);

checkboxDisabledVariant.addKnob(checkboxTitleKnob);
checkboxDisabledVariant.addKnob(checkboxIdKnob);
checkboxDisabledVariant.addKnob(checkboxTextKnob);
checkboxDisabledVariant.addKnob(checkboxStateKnob);

checkboxMultiOntionVariant.addKnob(checkboxTitleKnob);
checkboxMultiOntionVariant.addKnob(checkboxClassKnob);
checkboxMultiOntionVariant.addKnob(checkboxNameKnob);

// Add story to tree
treeConfig.addComponentToCategory(checkboxStory, 'atoms');