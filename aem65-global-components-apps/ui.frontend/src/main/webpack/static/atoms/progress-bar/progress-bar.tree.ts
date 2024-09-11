import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import progressBarHTML from './progress-bar.html';

// Define a story
const progressBarStory = new UIComponent('Progress bar');

// Define Variant
const defaultVariant = new ComponentVariant('Default', progressBarHTML);

// Add variants to story
progressBarStory.addVariant(defaultVariant);

//knobs
//define stepper values
const progressBarKnob = new Knob('progress-width', 'progress size', 'dropdown', ['small', 'large']);

//Add the Knobs to variants
defaultVariant.addKnob(progressBarKnob);



// Add story to tree
treeConfig.addComponentToCategory(progressBarStory, 'atoms');
