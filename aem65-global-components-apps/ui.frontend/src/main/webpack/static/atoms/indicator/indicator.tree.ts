import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import indicatorHTML from './indicator.html';

// Define a story
const indicatorStory = new UIComponent('Indicator');

// Define Variant
const defaultVariant = new ComponentVariant('Default', indicatorHTML);

// Add variants to story
indicatorStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(indicatorStory, 'atoms');
