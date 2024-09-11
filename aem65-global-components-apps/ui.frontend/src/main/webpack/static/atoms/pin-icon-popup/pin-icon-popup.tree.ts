import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import pinIconPopupHtml from './pin-icon-popup.html';

const pinIconPopupStory = new UIComponent('Pin Icon Popup');

const defaultVariant = new ComponentVariant('Default', pinIconPopupHtml);

pinIconPopupStory.addVariant(defaultVariant);

treeConfig.addComponentToCategory(pinIconPopupStory, 'atoms');
