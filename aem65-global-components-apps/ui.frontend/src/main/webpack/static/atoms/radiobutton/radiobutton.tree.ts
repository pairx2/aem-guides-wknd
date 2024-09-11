import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import radiobuttonHTML from './radiobutton.html';
import radiobuttonDisabledHTML from './radiobutton-disabled.html';
import radioMultiOptionHTML from './radiobutton-multiple.html';

// Define a story
const radioButtonStory = new UIComponent('Radio Button');

// Define Variant
const defaultVariant = new ComponentVariant('Default', radiobuttonHTML);
// Disabled Variant
const radiobuttonDisabledVariant = new ComponentVariant('radiobutton disabled', radiobuttonDisabledHTML);
// Multiple Option Varient
const radioMultiOptionVariant = new ComponentVariant('radiobutton multiple', radioMultiOptionHTML);

// Add variants to story
radioButtonStory.addVariant(defaultVariant);
radioButtonStory.addVariant(radiobuttonDisabledVariant);
radioButtonStory.addVariant(radioMultiOptionVariant);

// Knobs
const radiobuttonTitleKnob = new Knob('radiobutton-title', 'radio title', 'text', null, 'Radio Title');
const radiobuttonClassKnob = new Knob('radiobutton-class', 'radio alignment', 'dropdown',['', 'a-radio--vertical','a-radio--horizontal']);
const radiobuttonStateKnob = new Knob('radiobutton-state', 'radiobutton states', 'dropdown',['a-radio--disabled', 'a-radio--selected','a-radio--checked-disabled','a-radio--error','a-radio--default']);
const radiobuttonIdKnob = new Knob('radiobutton-id', 'radiobutton id', 'text', null, 'r1');
const radiobuttonNameKnob = new Knob('radiobutton-name', 'radiobutton name', 'text', null, 'name');
const radiobuttonTextKnob = new Knob('radiobutton-text', 'radiobutton text', 'text', null, 'Checkbox');
const radiobuttonValueKnob = new Knob('radiobutton-value', 'Radiobutton Value', 'text', null, 'Value');
const radiobuttonLabelColorKnob= new Knob('radiobutton-label-color', 'Label color', 'dropdown',['', 'a-options-label--color-alternate']);


defaultVariant.addKnob(radiobuttonTitleKnob);
defaultVariant.addKnob(radiobuttonIdKnob);
defaultVariant.addKnob(radiobuttonNameKnob);
defaultVariant.addKnob(radiobuttonTextKnob);
defaultVariant.addKnob(radiobuttonValueKnob);
defaultVariant.addKnob(radiobuttonLabelColorKnob);


radiobuttonDisabledVariant.addKnob(radiobuttonTitleKnob);
radiobuttonDisabledVariant.addKnob(radiobuttonIdKnob);
radiobuttonDisabledVariant.addKnob(radiobuttonTextKnob);
radiobuttonDisabledVariant.addKnob(radiobuttonStateKnob);

radioMultiOptionVariant.addKnob(radiobuttonTitleKnob);
radioMultiOptionVariant.addKnob(radiobuttonClassKnob);
radioMultiOptionVariant.addKnob(radiobuttonNameKnob);

// Add story to tree
treeConfig.addComponentToCategory(radioButtonStory, 'atoms');
