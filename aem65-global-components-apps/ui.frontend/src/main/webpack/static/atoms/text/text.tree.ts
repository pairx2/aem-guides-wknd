import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import textHTML from './text.html';



// Define a story
const textStory = new UIComponent('Text');

// Define Variant
let textStoryVariant = new ComponentVariant('Default', textHTML );



// Add variants to story
textStory.addVariant(textStoryVariant);


// Knobs

// Plain text
const titleTextColorKnob = new Knob('title-color', 'Title color', 'dropdown', ['', 'a-text--fg-default', 'a-text--fg-reversed', 'a-text--fg-primary', 'a-text--fg-alternate'], '');
const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgba(0,0,0,0.5)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');
const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgba(0,0,0,0)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['a-text a-text--gradient-start', 'a-text a-text--gradient-center', 'a-text a-text--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');

textStoryVariant.addKnob(gradientStart);
textStoryVariant.addKnob(gradientStartPosition);
textStoryVariant.addKnob(gradientEnd);
textStoryVariant.addKnob(gradientEndPosition);
textStoryVariant.addKnob(gradientKnob);
textStoryVariant.addKnob(randomKnob);
textStoryVariant.addKnob(titleTextColorKnob);

// Add story to tree
treeConfig.addComponentToCategory(textStory, 'atoms');	
