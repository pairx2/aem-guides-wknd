import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import headerHtml from './header.html';
import headerAutoSuggestHtml from './header-auto-suggestions.html';
import headerV2Html from './header-v2.html';

//Define story
const headerStory = new UIComponent('header');

//define variants
const defaultVariant = new ComponentVariant('Default', headerHtml);
const autoSuggestionVariant = new ComponentVariant('Predictive Search Header', headerAutoSuggestHtml);
const headerV2Variant = new ComponentVariant('Header V2', headerV2Html);

//add variant to the story
headerStory.addVariant(defaultVariant);
headerStory.addVariant(autoSuggestionVariant);
headerStory.addVariant(headerV2Variant);

//knobs
//copyright plain text for footer
// const copyrightTextKnob = new Knob('copyright-text', 'Copyright Text', 'text', null, '&#169; 2020 Abbott. All Rights Reserved.');
// defaultVariant.addKnob(copyrightTextKnob);
//add story to the tree
treeConfig.addComponentToCategory(headerStory, 'organisms');