import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import searchBarHTML from './search-bar.html';
import searchAutoSuggestionHTML from './search-auto-suggestion.html';
import searchBarWithResetHTML from './search-bar-with-reset.html';

// Define a story
const searchBarStory = new UIComponent('search bar');

// Define Variant
const defaultVariant = new ComponentVariant('Default', searchBarHTML);
const autoSuggestionVariant = new ComponentVariant('Auto Suggestion Search', searchAutoSuggestionHTML);
const resetBtnVariant = new ComponentVariant('Search with Reset', searchBarWithResetHTML);

// Add variants to story
searchBarStory.addVariant(defaultVariant);
searchBarStory.addVariant(autoSuggestionVariant);
searchBarStory.addVariant(resetBtnVariant);

// ---------------------define knobs
//Plain text
const searchBarPlaceholderKnob = new Knob('search-bar-placeholder', 'search bar placeholder', 'text', null, 'Search here');
const autoSuggestionPlaceholderKnob = new Knob('auto-suggestion-placeholder', 'auto suggestion placeholder', 'text', null, 'Search here');

defaultVariant.addKnob(searchBarPlaceholderKnob);
autoSuggestionVariant.addKnob(autoSuggestionPlaceholderKnob);
resetBtnVariant.addKnob(searchBarPlaceholderKnob);

// Add story to tree
treeConfig.addComponentToCategory(searchBarStory, 'molecules');