import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import orderDetailsContainerHtml from './order-details-container.html';

// Story
const orderDetailsContainerStory = new UIComponent('Order Details Container');

// Variants
let orderDetailsContainerDefaultVariant = new ComponentVariant('default', orderDetailsContainerHtml);

orderDetailsContainerStory.addVariant(orderDetailsContainerDefaultVariant);

treeConfig.addComponentToCategory(orderDetailsContainerStory, 'molecules');
