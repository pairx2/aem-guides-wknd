import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import featurePageHTML from './feature-page.html';



// Define a story
const featurePageStory = new UIComponent('FeaturePage');

// Define Variant
let featurePageStoryVariant = new ComponentVariant('Default', featurePageHTML );



// Add variants to story
featurePageStory.addVariant(featurePageStoryVariant);


// Knobs

// Plain featurePage
const titlefeaturePageColorKnob = new Knob('title-color', 'Title color', 'dropdown', ['', 'a-featurePage--fg-default', 'a-featurePage--fg-reversed', 'a-featurePage--fg-primary', 'a-featurePage--fg-alternate'], '');
featurePageStoryVariant.addKnob(titlefeaturePageColorKnob);

// Add story to tree
treeConfig.addComponentToCategory(featurePageStory, 'atoms');	
