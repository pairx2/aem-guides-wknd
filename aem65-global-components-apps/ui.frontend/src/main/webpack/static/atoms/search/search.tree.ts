import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import searchHTML from './search.html';

// Define a story
const searchStory = new UIComponent('Search');

// Define Variant
const defaultVariant = new ComponentVariant('Default', searchHTML);

// Add variants to story
searchStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(searchStory, 'atoms');
