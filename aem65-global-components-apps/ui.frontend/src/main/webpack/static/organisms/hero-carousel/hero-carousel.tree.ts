import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import defaultView from './hero-carousel.html';
import mediaStartView from './hero-carousel-media-start.html';
import mediaEndView from './hero-carousel-media-end.html';
// Define a story
const heroCarouselStory = new UIComponent('Hero Carousel');

// Define Variant
const heroCarouselDefault = new ComponentVariant('Default', defaultView);
const heroCarouselMediaStart = new ComponentVariant('Media Start', mediaStartView);
const heroCarouselMediaEnd = new ComponentVariant('Media End', mediaEndView);



// const sizeKnob = new Knob('size', 'Size', 'dropdown',['o-hero-carousel--tall', 'o-hero-carousel--medium',
// 'o-hero-carousel--short'], 'o-hero-carousel--tall');
// const optionsKnob = new Knob('option', 'Options/Variations', 'dropdown',['','o-hero-carousel--media-start', 'o-hero-carousel--media-end'
// ], '');

// heroCarouselDefault.addKnob(optionsKnob);
// heroCarouselDefault.addKnob(sizeKnob);

// Add variants to story
heroCarouselStory.addVariant(heroCarouselDefault);
heroCarouselStory.addVariant(heroCarouselMediaStart);
heroCarouselStory.addVariant(heroCarouselMediaEnd);

// Add story to tree
treeConfig.addComponentToCategory(heroCarouselStory, 'organisms');
