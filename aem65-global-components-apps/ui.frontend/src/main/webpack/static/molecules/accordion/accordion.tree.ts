import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import accordionHTML from './accordion.html';

// Define a story
const accordionStory = new UIComponent('accordion');

// Define Variant
const defaultVariant = new ComponentVariant('Default', accordionHTML);

// Add variants to story
accordionStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(accordionStory, 'molecules');
