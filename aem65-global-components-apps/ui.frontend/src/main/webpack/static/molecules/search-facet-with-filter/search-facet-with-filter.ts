import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import defaultView from './search-facet-with-filter.html';
// Define a story
const searchFacetStory = new UIComponent('Search Facet with Filter');

// Define Variant
const searchFacetDefault = new ComponentVariant('Default', defaultView);

// Add variants to story
searchFacetStory.addVariant(searchFacetDefault);

// Add story to tree
treeConfig.addComponentToCategory(searchFacetStory, 'organisms');
