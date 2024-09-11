import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import spinnerHTML from './spinner.html';
import spinnerBlock from './spinner-block.html';

// Define a story
const spinnerStory = new UIComponent('Spinner');


// Define Variant
const defaultVariant = new ComponentVariant('Default', spinnerHTML);
const spinnerBlockBtn = new ComponentVariant('Spinner Block', spinnerBlock);

// Add variants to story
spinnerStory.addVariant(defaultVariant);
spinnerStory.addVariant(spinnerBlockBtn);


// Add story to tree
treeConfig.addComponentToCategory(spinnerStory, 'atoms');