import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import promoSectionHtml from './promo-section.html';

// ---- Define a story
const promoSectionComponentStory = new UIComponent('promo section');

// ----------- Define Variant
const defaultVariant = new ComponentVariant('Default', promoSectionHtml);

promoSectionComponentStory.addVariant(defaultVariant);

// ---------------------define knobs
//Plain text
const promoBadgePositionKnob = new Knob('promo-badge-position', 'promo badge position', 'text', null, 'o-promo__badge-top-end');

defaultVariant.addKnob(promoBadgePositionKnob);


treeConfig.addComponentToCategory(promoSectionComponentStory, 'organisms');
