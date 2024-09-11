import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import defaultView from './search-results-with-filter.html';
// Define a story
const searchResultsStory = new UIComponent('Search Results with Filter');

// Define Variant
const searchResultsDefault = new ComponentVariant('Default', defaultView);

// Add variants to story
searchResultsStory.addVariant(searchResultsDefault);

// Add story to tree
treeConfig.addComponentToCategory(searchResultsStory, 'organisms');
