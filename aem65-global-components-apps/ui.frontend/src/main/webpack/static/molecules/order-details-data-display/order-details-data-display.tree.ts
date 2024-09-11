import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import orderDetailsDataDisplayHtml from './order-details-data-display.html';

// Story
const orderDetailsDataDisplayStory = new UIComponent('Order Details Data Display');

// Variants
let orderDetailsDataDisplayDefaultVariant = new ComponentVariant('default', orderDetailsDataDisplayHtml);

orderDetailsDataDisplayStory.addVariant(orderDetailsDataDisplayDefaultVariant);

treeConfig.addComponentToCategory(orderDetailsDataDisplayStory, 'molecules');
