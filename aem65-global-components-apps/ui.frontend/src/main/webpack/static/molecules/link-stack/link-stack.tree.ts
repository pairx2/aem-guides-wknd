import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import linkStackHTML from './link-stack.html';
import linkStackVariationHTML from './link-stack-variation.html';
import countrySitesHTML from './country-sites.html';
import linkStackFaqVariationHTML from './link-stack-faq-variation.html';

// Define a story
const linkStackStory = new UIComponent('Link Stack');

// Define Variant
const defaultVariant = new ComponentVariant('Default', linkStackHTML);
const linkStackV1Variation = new ComponentVariant('Link Stack Variation 1', linkStackVariationHTML);
const countrySites = new ComponentVariant('Country Sites', countrySitesHTML);
const linkStackFaqVariation = new ComponentVariant('Link Stack FAQ Variation', linkStackFaqVariationHTML);

// Add variants to story
linkStackStory.addVariant(defaultVariant);
linkStackStory.addVariant(linkStackV1Variation);
linkStackStory.addVariant(countrySites);
linkStackStory.addVariant(linkStackFaqVariation);

// Knobs

// Plain text
const linkTitleKnob = new Knob('link-stack-title', 'Link Stack Title', 'text', null, 'Products');
defaultVariant.addKnob(linkTitleKnob);
const faqLinkTitleKnob = new Knob('faq-link-stack-title', 'Faq Link Stack Title', 'text', null, 'Categories');
linkStackFaqVariation.addKnob(faqLinkTitleKnob);

// Add story to tree
treeConfig.addComponentToCategory(linkStackStory, 'molecules');
