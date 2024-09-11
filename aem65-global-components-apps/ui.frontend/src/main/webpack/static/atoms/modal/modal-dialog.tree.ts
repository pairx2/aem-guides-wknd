import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import modalContainerRegularHTML from './modal-dialog-regular.html';

// ---- Define a story
const modalContainerStory = new UIComponent('Modal');
// ----------- Define Variant
const defaultVariant = new ComponentVariant('Default', modalContainerRegularHTML);

modalContainerStory.addVariant(defaultVariant);

treeConfig.addComponentToCategory(modalContainerStory, 'atoms');
