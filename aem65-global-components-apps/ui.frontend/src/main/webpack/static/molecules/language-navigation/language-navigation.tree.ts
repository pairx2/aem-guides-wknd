import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import languageNavigationHTML from './language-navigation-v1.html';
import languageNavigationDefaultHTML from './language-navigation-default.html';
import languageNavigationSimpleHTML from './language-navigation-simple.html';


// Define a story
const languageNavigationStory = new UIComponent('Language Navigation');

// Define Variant
const defaultVariant = new ComponentVariant('Default', languageNavigationDefaultHTML);
const simpleVariant = new ComponentVariant('Simple', languageNavigationSimpleHTML);
const tabularVariant = new ComponentVariant('Tabular', languageNavigationHTML);
// Add variants to story
languageNavigationStory.addVariant(defaultVariant);
languageNavigationStory.addVariant(simpleVariant);
languageNavigationStory.addVariant(tabularVariant);


treeConfig.addComponentToCategory(languageNavigationStory, 'molecules');