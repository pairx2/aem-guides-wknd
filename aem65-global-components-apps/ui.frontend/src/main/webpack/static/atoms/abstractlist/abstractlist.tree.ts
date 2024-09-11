import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';

import abstractListHMTL from './abstractlist.html';
import abstractHorizontalListHTML from './abstractlist-horizontal.html';


// Define a story
const abstractListStory = new UIComponent('Abstract List');

// Define Variant
const defaultVariant = new ComponentVariant('Default List', abstractListHMTL);
const horizontalVariant = new ComponentVariant('Horizontal List', abstractHorizontalListHTML);

// Add variants to story
abstractListStory.addVariant(defaultVariant);
abstractListStory.addVariant(horizontalVariant);

// Add story to tree
treeConfig.addComponentToCategory(abstractListStory, 'atoms');