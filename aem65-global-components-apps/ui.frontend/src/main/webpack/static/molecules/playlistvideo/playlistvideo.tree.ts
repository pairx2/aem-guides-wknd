import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import playlistHTML from './playlistvideo.html';



// Define a story
const playlistStory = new UIComponent('Text');

// Define Variant
let playlistStoryVariant = new ComponentVariant('Default', playlistHTML );



// Add variants to story
playlistStory.addVariant(playlistStoryVariant);


// Knobs

// Plain text
const titleTextColorKnob = new Knob('title-color', 'Title color', 'dropdown', ['', 'a-text--fg-default', 'a-text--fg-reversed', 'a-text--fg-primary', 'a-text--fg-alternate'], '');
playlistStoryVariant.addKnob(titleTextColorKnob);

// Add story to tree
treeConfig.addComponentToCategory(playlistStory, 'atoms');	
