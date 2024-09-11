import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import featuresCardHtml from './features-card.html';
import featuresCardFaqHtml from './features-card-faq.html';

// Story
const featuresCardStory = new UIComponent('Features Card');

// Variants
let featuresCardVariant = new ComponentVariant('default',  featuresCardHtml);
let featuresCardFaqVariant = new ComponentVariant('Features Card Faq',  featuresCardFaqHtml);

//Knob
const featuresCardKnob = new Knob('card-style', 'Card style', 'dropdown', ['number', 'image']);
const featuresCardBadgeKnob = new Knob('badge-alignment', 'Badge alignment', 'dropdown', ['', 'o-features-card--badge-top-left', 'o-features-card--badge-top-right']);
const activeKnob = new Knob('active', 'Active', 'dropdown', ['', 'o-features-card--active'], '');
// const titleKnob = new Knob('h-title', 'Title', 'text', null, 'Header');
// const imageKnob = new Knob('h-image', 'Image', 'text', null, '../../../public/resources/images/placeholder-image-125x125.png');

featuresCardVariant.addKnob(featuresCardKnob);
featuresCardVariant.addKnob(featuresCardBadgeKnob);
featuresCardFaqVariant.addKnob(activeKnob);
// featuresCardFaqVariant.addKnob(titleKnob);
// featuresCardFaqVariant.addKnob(imageKnob);


featuresCardStory.addVariant(featuresCardVariant);
featuresCardStory.addVariant(featuresCardFaqVariant);


treeConfig.addComponentToCategory(featuresCardStory, 'organisms');
