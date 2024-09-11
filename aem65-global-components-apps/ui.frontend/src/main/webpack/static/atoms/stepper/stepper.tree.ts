import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import stepperPlainTextHTML from './stepper.html';

// Define a story
const stepperStory = new UIComponent('Stepper');

// Define Variant
const defaultVariant = new ComponentVariant('Default', stepperPlainTextHTML);

// Add variants to story
stepperStory.addVariant(defaultVariant);

//knobs
//define stepper values
const stepperDefaultValKnob = new Knob('stepper-val', 'Stepper Default Value', 'text', null, '3');
const stepperMinValKnob = new Knob('stepper-min-val', 'Stepper Min Value', 'text', null, '1');
const stepperMaxValKnob = new Knob('stepper-max-val', 'Stepper Max Value', 'text', null, '6');
const stepperMinErrorMassage = new Knob('stepper-errrormessage-min', 'Stepper Min Error Message ', 'text', null, 'Sorry, the minium value was reachedddfer');
const stepperMaxErrorMassage = new Knob('stepper-errrormessage-max', 'Stepper Max Error Message ', 'text', null, 'Sorry, the max value was reachedddfer');

//Add the Knobs to variants
defaultVariant.addKnob(stepperDefaultValKnob);
defaultVariant.addKnob(stepperMinValKnob);
defaultVariant.addKnob(stepperMaxValKnob);
defaultVariant.addKnob(stepperMinErrorMassage);
defaultVariant.addKnob(stepperMaxErrorMassage);


// Add story to tree
treeConfig.addComponentToCategory(stepperStory, 'atoms');
