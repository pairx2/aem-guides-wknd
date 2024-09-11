import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import searchBarHTML from './poi-locator.html';
// Define a story
const searchBarStory = new UIComponent('POI Locator');

// Define Variant
const defaultVariant = new ComponentVariant('Default', searchBarHTML,);

// Add variants to story
searchBarStory.addVariant(defaultVariant);

// ---------------------define knobs
//Plain text

// Add story to tree
treeConfig.addComponentToCategory(searchBarStory, 'organisms');