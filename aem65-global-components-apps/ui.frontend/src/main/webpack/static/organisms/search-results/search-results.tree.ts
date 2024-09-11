import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import defaultView from './search-results.html';
import searchWithResetBtnView from './search-results-with-reset.html';

// Define a story
const searchResultsStory = new UIComponent('Search Results');

// Define Variant
const searchResultsDefault = new ComponentVariant('Default', defaultView);
const searchResultsWithReset = new ComponentVariant('With Reset Button', searchWithResetBtnView);

// Add variants to story
searchResultsStory.addVariant(searchResultsDefault);
searchResultsStory.addVariant(searchResultsWithReset);

// Add story to tree
treeConfig.addComponentToCategory(searchResultsStory, 'organisms');
