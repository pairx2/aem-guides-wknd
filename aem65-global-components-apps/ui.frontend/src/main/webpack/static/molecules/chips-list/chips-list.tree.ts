import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import chipsListHtml from './chips-list.html';

// Define a story
const chipsListStory = new UIComponent('Chips List');

// Define Variant
const defaultVariant = new ComponentVariant('Default', chipsListHtml);

// Add variants to story
chipsListStory.addVariant(defaultVariant);

// Knobs

// Plain text
const chipsListTitleKnob = new Knob('chips-list-title', 'Section Title', 'text', null, 'Top 5 searches');


defaultVariant.addKnob(chipsListTitleKnob);



// Add story to tree
treeConfig.addComponentToCategory(chipsListStory, 'molecules');
