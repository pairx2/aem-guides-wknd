import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import defaultView from './search-results-item-with-filter.html';
// Define a story
const searchResultsItemStory = new UIComponent('Search Results Item with Filter');

// Define Variant
const searchResultsItemDefault = new ComponentVariant('Default', defaultView);

// Add variants to story
searchResultsItemStory.addVariant(searchResultsItemDefault);

// Add story to tree
treeConfig.addComponentToCategory(searchResultsItemStory, 'organisms');
