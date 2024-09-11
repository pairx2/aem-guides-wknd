import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import videoBannerHTML from './video-banner.html';

// Define a story
const videoBannerStory = new UIComponent('Video Banner');

// Define Variant
const defaultVariant = new ComponentVariant('Default', videoBannerHTML);

// Add variants to story
videoBannerStory.addVariant(defaultVariant);

// ---------------------define knobs
//Plain text


const widthKnob = new Knob('width', 'Width', 'dropdown',['m-video-banner--full-width', 'm-video-banner--half-width'],
'm-video-banner--half-width');

const optionsKnob = new Knob('horizontalAlignmentDesktop', 'Content horizontal alignment', 'dropdown',['m-video-banner__content-h-left','m-video-banner__content-h-center', 'm-video-banner__content-h-right'], 'm-video-banner__content-h-left');

const optionsKnobVerticalAlignment = new Knob('verticalAlignment', 'Content Vertical alignment', 'dropdown',['m-video-banner__content-v-top','m-video-banner__content-v-center'], 'm-video-banner__content-v-center');
const optionsKnobMobileBg = new Knob('mobileTabBg', 'Mobile tab Background color', 'dropdown',['m-video-banner--mobile-tab--bg-primary'], '');


const contrastKnob = new Knob('contrast', 'Text Color', 'dropdown',['m-video-banner--light', 'm-video-banner--dark'], 'm-video-banner--dark');
const alignKnob = new Knob('align', 'Text Align', 'dropdown',['m-video-banner--alignment-left', 'm-video-banner--alignment-center', 'm-video-banner--alignment-right'], 'm-video-banner--alignment-left');
const playAlignment = new Knob('playbtnalignment', 'Play alignment', 'dropdown',['m-video-banner-ply-lower-left', 'm-video-banner-ply-lower-right'], 'm-video-banner-ply-lower-right');

const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['m-hero--gradient-start', 'm-hero--gradient-center', 'm-hero--gradient-end'], '');

const mediaXSKnob = new Knob('mobileMediaPosition', 'Media Position in mobile', 'dropdown',['m-video-banner-media-xs-top', 'm-video-banner-media-xs-right', 'm-video-banner-media-xs-bottom', 'm-video-banner-media-xs-left', 'm-video-banner-media-xs-center'], 'm-video-banner-media-xs-left');
const mediaSMKnob = new Knob('tabMediaPosition', 'Media Position for tab', 'dropdown',['m-video-banner-media-sm-top', 'm-video-banner-media-sm-right', 'm-video-banner-media-sm-bottom', 'm-video-banner-media-sm-left', 'm-video-banner-media-sm-center'], 'm-video-banner-media-sm-left');
const mediaLGKnob = new Knob('tabToMediaPosition', 'Media Position for till desktop', 'dropdown',['m-video-banner-media-lg-top', 'm-video-banner-media-lg-right', 'm-video-banner-media-lg-bottom', 'm-video-banner-media-lg-left', 'm-video-banner-media-lg-center'], 'm-video-banner-media-lg-center');
const mediaXLKnob = new Knob('largeMediaPosition', 'Media Position for large screen', 'dropdown',['m-video-banner-media-xl-top', 'm-video-banner-media-xl-right', 'm-video-banner-media-xl-bottom', 'm-video-banner-media-xl-left', 'm-video-banner-media-xl-center'], 'm-video-banner-media-xl-center');

const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcdn');



defaultVariant.addKnob(widthKnob);
defaultVariant.addKnob(optionsKnob);
defaultVariant.addKnob(optionsKnobVerticalAlignment);
defaultVariant.addKnob(optionsKnobMobileBg);

defaultVariant.addKnob(contrastKnob);

defaultVariant.addKnob(alignKnob);
defaultVariant.addKnob(playAlignment);
defaultVariant.addKnob(gradientKnob);


defaultVariant.addKnob(mediaXSKnob);
defaultVariant.addKnob(mediaSMKnob);
defaultVariant.addKnob(mediaLGKnob);
defaultVariant.addKnob(mediaXLKnob);

defaultVariant.addKnob(randomKnob);

// Add story to tree
treeConfig.addComponentToCategory(videoBannerStory, 'molecules');
