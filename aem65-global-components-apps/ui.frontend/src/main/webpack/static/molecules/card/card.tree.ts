import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import cardsOverview from './card.html';
import cardsWithLink from './card-with-link.html';
import cardsWithLinks from './card-with-links.html';

// Define a story
const cardStory = new UIComponent('Card');

// Define Variant
const defaultVariant = new ComponentVariant('Overview', cardsOverview);
const linkVariant = new ComponentVariant('Card With Link', cardsWithLink);
const linksVariant = new ComponentVariant('Card With Links', cardsWithLinks);

// Add variants to story
cardStory.addVariant(defaultVariant);
cardStory.addVariant(linkVariant);
cardStory.addVariant(linksVariant);

// Knobs

// Plain text
const image2xKnob = new Knob('2ximage', '2x Image URL', 'text', null, 'https://fakeimg.pl/255x166/?retina=2&text=Media%20Image%202x&font=roboto');
const image1xKnob = new Knob('1ximage', '1x Image URL', 'text', null, 'https://fakeimg.pl/255x166/?retina=1&text=Media%20Image&font=roboto');
const titleKnob = new Knob('title', 'Title', 'text', null, 'Title');
const descKnob = new Knob('description', 'Description', 'text', null, "Here is a message that's going to be two lines, so we see the text as it wraps.");
const largeKnob = new Knob('large', 'Large', 'dropdown',['','m-card--large'], '');
const orientationKnob = new Knob('orientation', 'Orientation', 'dropdown',['','m-card--horizontal'], '');
const mediaBgKnob = new Knob('media-background', 'Media Background', 'dropdown',['','m-card__media--bg-dark', 'm-card__media--bg-white'], '');
const bodyBgKnob = new Knob('body-background', 'Body Background', 'dropdown',['','m-card__body--bg-white'], '');
const fillWidthKnob = new Knob('fill-width', 'Fill Width', 'dropdown',['','m-card--fill-width'], '');
const mediaEndKnob = new Knob('media-end', 'Media End', 'dropdown',['','m-card--media-end'], '');
const paddingKnob = new Knob('padding', 'Padding', 'dropdown',['','m-card--padding'], '');
const fitKnob = new Knob('fit', 'Fit', 'dropdown',['','m-card--fit'], '');
const alignmentKnob = new Knob('alignment', 'Alignment', 'dropdown',['','m-card--align-left','m-card--align-right'], '');
const titleColorKnob = new Knob('titleColor', 'Title Color', 'dropdown',['', 'm-card__title-light','m-card__title-dark'], '');
const descriptionColorKnob = new Knob('descriptionColor', 'Description Color', 'dropdown',['', 'm-card__description-light','m-card__description-dark'], '');
const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgba(0,0,0,0.5)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');
const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgba(0,0,0,0)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['m-card--gradient-start', 'm-card--gradient-center', 'm-card--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');

defaultVariant.addKnob(gradientStart);
defaultVariant.addKnob(gradientStartPosition);
defaultVariant.addKnob(gradientEnd);
defaultVariant.addKnob(gradientEndPosition);
defaultVariant.addKnob(gradientKnob);
defaultVariant.addKnob(randomKnob);
defaultVariant.addKnob(image2xKnob);
defaultVariant.addKnob(image1xKnob);
defaultVariant.addKnob(titleKnob);
defaultVariant.addKnob(descKnob);
defaultVariant.addKnob(largeKnob);
defaultVariant.addKnob(orientationKnob);
defaultVariant.addKnob(mediaBgKnob);
defaultVariant.addKnob(bodyBgKnob);
defaultVariant.addKnob(fillWidthKnob);
defaultVariant.addKnob(mediaEndKnob);
defaultVariant.addKnob(paddingKnob);
defaultVariant.addKnob(fitKnob);
defaultVariant.addKnob(alignmentKnob);
defaultVariant.addKnob(titleColorKnob);
defaultVariant.addKnob(descriptionColorKnob);


linkVariant.addKnob(image2xKnob);
linkVariant.addKnob(image1xKnob);
linkVariant.addKnob(titleKnob);
linkVariant.addKnob(descKnob);
linkVariant.addKnob(largeKnob);
linkVariant.addKnob(orientationKnob);
linkVariant.addKnob(mediaBgKnob);
linkVariant.addKnob(bodyBgKnob);
linkVariant.addKnob(fillWidthKnob);
linkVariant.addKnob(mediaEndKnob);
linkVariant.addKnob(paddingKnob);
linkVariant.addKnob(fitKnob);
linkVariant.addKnob(alignmentKnob);
linkVariant.addKnob(titleColorKnob);
linkVariant.addKnob(descriptionColorKnob);


linksVariant.addKnob(image2xKnob);
linksVariant.addKnob(image1xKnob);
linksVariant.addKnob(titleKnob);
linksVariant.addKnob(descKnob);
linksVariant.addKnob(largeKnob);
linksVariant.addKnob(orientationKnob);
linksVariant.addKnob(mediaBgKnob);
linksVariant.addKnob(bodyBgKnob);
linksVariant.addKnob(fillWidthKnob);
linksVariant.addKnob(mediaEndKnob);
linksVariant.addKnob(paddingKnob);
linksVariant.addKnob(fitKnob);
linksVariant.addKnob(alignmentKnob);
linksVariant.addKnob(titleColorKnob);
linksVariant.addKnob(descriptionColorKnob);

// Add story to tree
treeConfig.addComponentToCategory(cardStory, 'molecules');
