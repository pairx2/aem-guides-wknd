import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import orderDetailsItemListHtml from './order-details-item-list.html';

// Story
const orderDetailsItemListStory = new UIComponent('Order Details Item List');

// Variants
let orderDetailsItemListDefaultVariant = new ComponentVariant('default', orderDetailsItemListHtml);

orderDetailsItemListStory.addVariant(orderDetailsItemListDefaultVariant);

treeConfig.addComponentToCategory(orderDetailsItemListStory, 'molecules');
