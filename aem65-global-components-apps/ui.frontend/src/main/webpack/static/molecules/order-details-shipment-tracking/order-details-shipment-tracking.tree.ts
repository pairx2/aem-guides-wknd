import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import orderDetailsShipmentTrackingHtml from './order-details-shipment-tracking.html';

// Story
const orderDetailsShipmentTrackingStory = new UIComponent('Order Details Shipment Tracking');

// Variants
let orderDetailsShipmentTrackingDefaultVariant = new ComponentVariant('default', orderDetailsShipmentTrackingHtml);

orderDetailsShipmentTrackingStory.addVariant(orderDetailsShipmentTrackingDefaultVariant);

treeConfig.addComponentToCategory(orderDetailsShipmentTrackingStory, 'molecules');
