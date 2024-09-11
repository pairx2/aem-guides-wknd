import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import heroHTML from './hero.html';
import heroFluidHTML from './hero-fluid.html';
import heroFormHTML from './hero-form.html';

// Define a story
const heroStory = new UIComponent('Hero');

// Define Variant
const defaultVariant = new ComponentVariant('Default', heroHTML);
const fluidVariant = new ComponentVariant('Fluid', heroFluidHTML);
const formVariant = new ComponentVariant('Hero with Form', heroFormHTML);

// Add variants to story
heroStory.addVariant(defaultVariant);
heroStory.addVariant(fluidVariant);
heroStory.addVariant(formVariant);

// ---------------------define knobs
//Plain text
const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgba(0,0,0,0.5)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');

const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgba(0,0,0,0)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const mediaImgDesktop = new Knob('media-image-desktop', 'Media Image', 'text', null, 'https://images.unsplash.com/photo-1509624776920-0fac24a9dfda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
const mediaImgTablet = new Knob('media-image-tablet', 'Media Image', 'text', null, 'https://images.unsplash.com/photo-1509624776920-0fac24a9dfda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
const mediaImgMobile = new Knob('media-image-mobile', 'Media Image', 'text', null, 'https://images.unsplash.com/photo-1509624776920-0fac24a9dfda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');


const widthKnob = new Knob('width', 'Width', 'dropdown',['m-hero--full-width', 'm-hero--half-width'],
'm-hero--full-width');

const optionsKnob = new Knob('option', 'Options/Variations', 'dropdown',['m-hero--content-start',
'm-hero--content-center', 'm-hero--content-end', 'm-hero--media-start', 'm-hero--media-end'
], 'm-hero--content-start');

const bodyWeight = new Knob('weight', 'Body Text Weight', 'dropdown',['m-hero--body-regular', 'm-hero--body-strong'],
 'm-hero--body-regular');

const sizeKnob = new Knob('size', 'Size', 'dropdown',['m-hero--tall', 'm-hero--medium',
'm-hero--short'], 'm-hero--tall');

const contrastKnob = new Knob('contrast', 'Contrast', 'dropdown',['m-hero--light', 'm-hero--dark'], 'm-hero--light');
const alignKnob = new Knob('align', 'Text Align', 'dropdown',['m-hero--text-align-start', 'm-hero--text-align-center', 'm-hero--text-align-end'], 'm-hero--text-align-start');
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['m-hero--gradient-start', 'm-hero--gradient-center', 'm-hero--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');
const buttonAlignentKnob = new Knob('button-alignment', 'Button Alignment', 'dropdown',['','m-hero--button-vertical'], '');
const textVerticalPlacementKnob = new Knob('text-vertical-alignment', 'Text vertical alignment', 'dropdown',['','m-hero--text-vertical-align-top', 'm-hero--text-vertical-align-center'], '');


const removeTopSpacingKnob = new Knob('remove-top-space', 'Remove Top-Spacing', 'dropdown',['','mt-0 pt-0'], '');
const removeBottomSpacingKnob = new Knob('remove-bottom-space', 'Remove Bottom-Spacing', 'dropdown',['','mb-0 m-hero--remove-bottom-spacing'], '');
const ImagePositionforMobileKnob = new Knob('image-position', 'Image Position for mobile - Fix image to top', 'dropdown',['','m-hero--image-position'], '');
const bgPrimaryForMobileTab = new Knob('background-for-tab-mobile', 'Background for tab & mobile', 'dropdown',['','m-hero--mobile-tab--bg-primary'], '');

defaultVariant.addKnob(gradientStart);
defaultVariant.addKnob(gradientStartPosition);
defaultVariant.addKnob(gradientEnd);
defaultVariant.addKnob(gradientEndPosition);
defaultVariant.addKnob(mediaImgDesktop);
defaultVariant.addKnob(mediaImgTablet);
defaultVariant.addKnob(mediaImgMobile);
defaultVariant.addKnob(widthKnob);
defaultVariant.addKnob(optionsKnob);
defaultVariant.addKnob(sizeKnob);
defaultVariant.addKnob(contrastKnob);
defaultVariant.addKnob(bodyWeight);
defaultVariant.addKnob(alignKnob);
defaultVariant.addKnob(gradientKnob);
defaultVariant.addKnob(randomKnob);
defaultVariant.addKnob(buttonAlignentKnob);
defaultVariant.addKnob(textVerticalPlacementKnob);
defaultVariant.addKnob(removeTopSpacingKnob);
defaultVariant.addKnob(removeBottomSpacingKnob);
defaultVariant.addKnob(ImagePositionforMobileKnob);
defaultVariant.addKnob(bgPrimaryForMobileTab);

fluidVariant.addKnob(gradientStart);
fluidVariant.addKnob(gradientStartPosition);
fluidVariant.addKnob(gradientEnd);
fluidVariant.addKnob(gradientEndPosition);
fluidVariant.addKnob(mediaImgDesktop);
fluidVariant.addKnob(mediaImgTablet);
fluidVariant.addKnob(mediaImgMobile);
fluidVariant.addKnob(widthKnob);
fluidVariant.addKnob(optionsKnob);
fluidVariant.addKnob(sizeKnob);
fluidVariant.addKnob(contrastKnob);
fluidVariant.addKnob(bodyWeight);
fluidVariant.addKnob(alignKnob);
fluidVariant.addKnob(gradientKnob);
fluidVariant.addKnob(randomKnob);
fluidVariant.addKnob(buttonAlignentKnob);
fluidVariant.addKnob(textVerticalPlacementKnob);
fluidVariant.addKnob(bgPrimaryForMobileTab);

formVariant.addKnob(gradientStart);
formVariant.addKnob(gradientStartPosition);
formVariant.addKnob(gradientEnd);
formVariant.addKnob(gradientEndPosition);
formVariant.addKnob(mediaImgDesktop);
formVariant.addKnob(mediaImgTablet);
formVariant.addKnob(mediaImgMobile);
formVariant.addKnob(widthKnob);
formVariant.addKnob(optionsKnob);
formVariant.addKnob(sizeKnob);
formVariant.addKnob(contrastKnob);
formVariant.addKnob(bodyWeight);
formVariant.addKnob(alignKnob);
formVariant.addKnob(gradientKnob);
formVariant.addKnob(randomKnob);
formVariant.addKnob(bgPrimaryForMobileTab);
// Add story to tree
treeConfig.addComponentToCategory(heroStory, 'organisms');
