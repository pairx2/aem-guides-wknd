import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import logoHTML from './logo.html';
import logoNewLineHTML from './logo-variation-1.html';
import logoFreestyleHTML from './logo-variation-2.html';
import logoFreestyleLibreLineHTML from './logo-variation-3.html';
// Define a story
const logoImageStory = new UIComponent('logo');

// Define Variant
const defaultVariant = new ComponentVariant('Default', logoHTML);
const logoNewLineVariant = new ComponentVariant('Logo Variation 1', logoNewLineHTML);
const logoFreestyleVariant = new ComponentVariant('Logo Variation 2', logoFreestyleHTML);
const logoFreestyleLibreVariant = new ComponentVariant('Logo Variation 3', logoFreestyleLibreLineHTML);
// Add variants to story
logoImageStory.addVariant(defaultVariant);
logoImageStory.addVariant(logoNewLineVariant);
logoImageStory.addVariant(logoFreestyleVariant);
logoImageStory.addVariant(logoFreestyleLibreVariant);

// Knobs
// Image Source Path
const imageLogoSourcePathKnob = new Knob('image-source-path', 'Image Source Path', 'text', null, '/public/resources/images/abbott-logo-1.svg');
const imageNewLineSourcePathKnob = new Knob('image-source-path', 'Image Source Path', 'text', null, '/public/resources/images/abbott-logo-2.svg');
const imageFreestyleSourcePathKnob = new Knob('image-source-path', 'Image Source Path', 'text', null, '/public/resources/images/free-style-2.svg');
const imageFreestyleLibreSourcePathKnob = new Knob('image-source-path', 'Image Source Path', 'text', null, '/public/resources/images/free-style-1.svg');
// Image Alternate Text
const imageLogoAltTextKnob = new Knob('image-alt-text', 'Image Alternate Text', 'text', null, 'Abbott logo');
//Image URL link
const imageLinkURLKnob = new Knob('image-link-url', 'Image Link URL', 'text', null, '#');

// Add the Knobs to variants
//Default Variant
defaultVariant.addKnob(imageLogoSourcePathKnob);
defaultVariant.addKnob(imageLogoAltTextKnob);
defaultVariant.addKnob(imageLinkURLKnob);

//Image 2 lines Variant
logoNewLineVariant.addKnob(imageNewLineSourcePathKnob);
logoNewLineVariant.addKnob(imageLogoAltTextKnob);
logoNewLineVariant.addKnob(imageLinkURLKnob);

//Image freestyle Variant
logoFreestyleVariant.addKnob(imageFreestyleSourcePathKnob);
logoFreestyleVariant.addKnob(imageLogoAltTextKnob);
logoFreestyleVariant.addKnob(imageLinkURLKnob);

//Image freestyle libre Variant
logoFreestyleLibreVariant.addKnob(imageFreestyleLibreSourcePathKnob);
logoFreestyleLibreVariant.addKnob(imageLogoAltTextKnob);
logoFreestyleLibreVariant.addKnob(imageLinkURLKnob);

// Add story to tree
treeConfig.addComponentToCategory(logoImageStory, 'atoms');
