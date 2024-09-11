import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import cardsTabOverview from './cards-tab.html';
import cardsTabWithImages from './cards-tab-with-images.html';

// Define a story
const cardsTabStory = new UIComponent('Cards Tab');

// Define Variant
const defaultVariant = new ComponentVariant('Default', cardsTabOverview);
const cardsTabWithImagesVariant = new ComponentVariant('Cards Tab with Images', cardsTabWithImages);

// Add variants to story
cardsTabStory.addVariant(defaultVariant);
cardsTabStory.addVariant(cardsTabWithImagesVariant);

// Knobs
const cardsTabsSize = new Knob('tabs-size', 'Size', 'dropdown', ['m-cards-tab--small', 'm-cards-tab--large']);
const image2xKnob = new Knob('2ximage', '2x Image URL', 'text', null, 'https://fakeimg.pl/255x166/811fb4?retina=2&text=Media%20Image%202x&font=roboto');
const image1xKnob = new Knob('1ximage', '1x Image URL', 'text', null, 'https://fakeimg.pl/255x166/811fb4?retina=1&text=Media%20Image&font=roboto');

defaultVariant.addKnob(cardsTabsSize);

cardsTabWithImagesVariant.addKnob(image2xKnob);
cardsTabWithImagesVariant.addKnob(image1xKnob);
cardsTabWithImagesVariant.addKnob(cardsTabsSize);

// Add story to tree
treeConfig.addComponentToCategory(cardsTabStory, 'molecules'); 
