import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import orderReturnFormHtml from './order-return-form.html';

// Story
const orderReturnFormStory = new UIComponent('Order Return Form');

// Variants
let orderReturnFormDefaultVariant = new ComponentVariant('default', orderReturnFormHtml);

orderReturnFormStory.addVariant(orderReturnFormDefaultVariant);

treeConfig.addComponentToCategory(orderReturnFormStory, 'molecules');
