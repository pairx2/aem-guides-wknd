import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import popOverWithImageHTML from './pop-over-with-image.html';
import popOverWithImageActionHTML from './pop-over-with-image-action.html';
import popOverWithTextHTML from './pop-over-with-text.html';
import popOverWithActionHTML from './pop-over-with-action.html';

// Define a story
const popoverStory = new UIComponent('Pop Over');

// Define Variant
const defaultVariant = new ComponentVariant('Default', popOverWithImageHTML);
const popOverWithImageAtion = new ComponentVariant('Pop Over With Image Action', popOverWithImageActionHTML);
const popOverWithText = new ComponentVariant('pop Over With Text', popOverWithTextHTML);
const popOverWithAction = new ComponentVariant('pop Over With Action', popOverWithActionHTML);

// Add variants to story
popoverStory.addVariant(defaultVariant);
popoverStory.addVariant(popOverWithImageAtion);
popoverStory.addVariant(popOverWithText);
popoverStory.addVariant(popOverWithAction);

// Add story to tree
treeConfig.addComponentToCategory(popoverStory, 'molecules');
