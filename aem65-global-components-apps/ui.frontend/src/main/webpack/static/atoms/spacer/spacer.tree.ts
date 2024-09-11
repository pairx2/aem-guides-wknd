import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import spacerHtml from './spacer.html';

// Define a story
const spacerStory = new UIComponent('Search');

// Define Variant
const defaultVariant = new ComponentVariant('Default', spacerHtml);

// Add variants to story
spacerStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(spacerStory, 'atoms');
