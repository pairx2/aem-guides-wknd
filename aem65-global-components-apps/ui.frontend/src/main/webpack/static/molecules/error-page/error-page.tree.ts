import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import errorPageHTML from './error-page.html';

// Define a story
const errorPageStory = new UIComponent('error page');

// Define Variant
const defaultVariant = new ComponentVariant('Default', errorPageHTML);

// Add variants to story
errorPageStory.addVariant(defaultVariant);

// Knobs
// BG Image Source Path
const bgImageSourcePathKnob = new Knob('bg-image-path', 'Bg Image Path', 'text', null, '/public/resources/images/bg.png');
// Image Alternate Text
const bgImageAltTextKnob = new Knob('bg-alt-text', 'Bg Alternate Text', 'text', null, '404 Error Page');

defaultVariant.addKnob(bgImageSourcePathKnob);
defaultVariant.addKnob(bgImageAltTextKnob);

// Add story to tree
treeConfig.addComponentToCategory(errorPageStory, 'molecules');
