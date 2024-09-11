import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import switcherPlainTextHTML from './switcher.html';

// Define a story
const switcherStory = new UIComponent('Switcher');

// Define Variant
const defaultVariant = new ComponentVariant('Default', switcherPlainTextHTML);

// Add variants to story
switcherStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(switcherStory, 'atoms');
