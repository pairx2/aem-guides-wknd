import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import orderDetailsSummaryHtml from './order-details-summary.html';

// Story
const orderDetailsSummaryStory = new UIComponent('Order Details Summary');

// Variants
let orderDetailsSummaryDefaultVariant = new ComponentVariant('default', orderDetailsSummaryHtml);

orderDetailsSummaryStory.addVariant(orderDetailsSummaryDefaultVariant);

treeConfig.addComponentToCategory(orderDetailsSummaryStory, 'molecules');
