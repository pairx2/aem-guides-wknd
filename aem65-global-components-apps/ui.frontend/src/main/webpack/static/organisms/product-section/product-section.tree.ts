import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import productSectionHtml from './product-section.html';
import productSectionVideoHtml from './product-section-with-video.html';
import productSectionCustomTextHtml from './product-section-with-custom-text-list.html';

// Story
const productSectionStory = new UIComponent('Product Section');

// Variants
let productSectionVariant = new ComponentVariant('default',  productSectionHtml);
let productSectionWithVideoVariant = new ComponentVariant('Product with video',  productSectionVideoHtml);
let productSectionWithCustomTextVariant = new ComponentVariant('Product with custom text list',  productSectionCustomTextHtml);

productSectionStory.addVariant(productSectionVariant);
productSectionStory.addVariant(productSectionWithVideoVariant);
productSectionStory.addVariant(productSectionWithCustomTextVariant);

const productConetentAlignmentKnob = new Knob('text-align', 'Text Alignment', 'dropdown', ['o-product-section--text-left', 'o-product-section--text-right']);
const badgeAlignmentKnob = new Knob('badge-align', 'Badge Alignment', 'dropdown', ['o-product-section--top-left', 'o-product-section--top-right']);
const imageSizeKnob = new Knob('image-size', 'Image Size', 'dropdown', ['o-product-section--small', 'o-product-section--large']);

const titleColor = new Knob('title-color', 'Title Color', 'dropdown', ['o-product-section--title-default', 'o-product-section--title-reversed']);
const descriptionColor = new Knob('description-color', 'Description Color', 'dropdown', ['o-product-section--description-default', 'o-product-section--description-reversed']); 

const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgba(0,0,0,0.5)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');
const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgba(0,0,0,0)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['o-product-section--gradient-start', 'o-product-section--gradient-center', 'o-product-section--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');

productSectionVariant.addKnob(gradientStart);
productSectionVariant.addKnob(gradientStartPosition);
productSectionVariant.addKnob(gradientEnd);
productSectionVariant.addKnob(gradientEndPosition);
productSectionVariant.addKnob(gradientKnob);
productSectionVariant.addKnob(randomKnob);

productSectionVariant.addKnob(productConetentAlignmentKnob);
productSectionVariant.addKnob(badgeAlignmentKnob);
productSectionVariant.addKnob(imageSizeKnob);

productSectionVariant.addKnob(titleColor);
productSectionVariant.addKnob(descriptionColor);

productSectionWithVideoVariant.addKnob(productConetentAlignmentKnob);
productSectionWithVideoVariant.addKnob(badgeAlignmentKnob);

productSectionWithCustomTextVariant.addKnob(productConetentAlignmentKnob);
productSectionWithCustomTextVariant.addKnob(badgeAlignmentKnob);
productSectionWithCustomTextVariant.addKnob(imageSizeKnob);

treeConfig.addComponentToCategory(productSectionStory, 'organisms');
