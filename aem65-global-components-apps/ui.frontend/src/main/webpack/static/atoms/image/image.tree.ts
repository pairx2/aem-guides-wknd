import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import imagePlainTextHTML from './image.html';

// Define a story
const imageStory = new UIComponent('Image');

// Define Variant
const defaultVariant = new ComponentVariant('Default', imagePlainTextHTML);

// Add variants to story
imageStory.addVariant(defaultVariant);

// Knobs
const imageSizeKnob = new Knob('image-size', 'Image size', 'dropdown',['a-image__default', 'a-image__original']);
const imageAlignKnob = new Knob('image-align', 'Image Alignment', 'dropdown',['','image--align-left', 'image--align-center', 'image--align-right']);
defaultVariant.addKnob(imageSizeKnob);
defaultVariant.addKnob(imageAlignKnob);
// Add story to tree
treeConfig.addComponentToCategory(imageStory, 'atoms');