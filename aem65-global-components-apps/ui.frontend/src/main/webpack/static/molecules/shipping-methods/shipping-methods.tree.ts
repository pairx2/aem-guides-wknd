import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import shippingMethodsHTML from './shipping-methods.html';

// Define a story
const shippingMethodsStory = new UIComponent('Shipping Methods');

// Define Variant
const defaultVariant = new ComponentVariant('Default', shippingMethodsHTML);

// Add variants to story
shippingMethodsStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(shippingMethodsStory, 'molecules');
