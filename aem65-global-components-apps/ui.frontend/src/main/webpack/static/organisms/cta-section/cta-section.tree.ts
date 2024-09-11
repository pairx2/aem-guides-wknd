import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import ctaSectionHtml from './cta-section.html';

// Story
const ctaSectionStory = new UIComponent('CTA Section');

// Variants
let ctaSectionVariant = new ComponentVariant('default',  ctaSectionHtml);

ctaSectionStory.addVariant(ctaSectionVariant);

const buttonPositionKnob = new Knob('button-position', 'Button Position', 'dropdown',['end', 'bottom'], '');
const titleColorKnob = new Knob('title-color', 'Title Color', 'dropdown',['o-cta-section--titlecolor-default', 'o-cta-section--titlecolor-reversed', 'o-cta-section--titlecolor-primary', 'o-cta-section--titlecolor-alternate'], '');
const subTitleColorKnob = new Knob('sub-title-color', 'SubTitle Color', 'dropdown',['o-cta-section--subtitle-default', 'o-cta-section--subtitle-reversed', 'o-cta-section--subtitle-primary', 'o-cta-section--subtitle-alternate'], '');
const descriptionColorKnob = new Knob('description-color', 'Description Color', 'dropdown',['o-cta-section--description-default', 'o-cta-section--description-reversed', 'o-cta-section--description-primary', 'o-cta-section--description-alternate'], '');

ctaSectionVariant.addKnob(buttonPositionKnob);
ctaSectionVariant.addKnob(titleColorKnob);
ctaSectionVariant.addKnob(subTitleColorKnob);
ctaSectionVariant.addKnob(descriptionColorKnob);

treeConfig.addComponentToCategory(ctaSectionStory, 'organisms');
