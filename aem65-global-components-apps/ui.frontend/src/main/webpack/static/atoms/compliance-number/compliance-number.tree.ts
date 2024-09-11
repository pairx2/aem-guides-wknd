import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import complianceHTML from './compliance-number.html';

// Define a story
const complianceStory = new UIComponent('Compliance Number');

// Define Variant
let complianceStoryVariant = new ComponentVariant('Default', complianceHTML );



// Add variants to story
complianceStory.addVariant(complianceStoryVariant);


// Plain text

// Add story to tree
treeConfig.addComponentToCategory(complianceStory, 'atoms');	
