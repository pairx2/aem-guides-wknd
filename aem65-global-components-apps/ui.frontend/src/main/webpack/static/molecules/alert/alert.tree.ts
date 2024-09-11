import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import alertNonTimeBoundHTML from './alert.html';
import alertTimeBoundHTML from './alert-timebound.html';

// Story
const alertStory = new UIComponent('Alert');

// Variants
let alertNonTimeBoundVariant = new ComponentVariant('Non Timebound',  alertNonTimeBoundHTML);
let alertTimeBoundVariant = new ComponentVariant('Timebound',  alertTimeBoundHTML);

alertStory.addVariant(alertNonTimeBoundVariant);
alertStory.addVariant(alertTimeBoundVariant);

const alertStyleKnob = new Knob('alert-style', 'Alert style', 'dropdown',['m-alert--success','m-alert--warning', 'm-alert--danger', 'm-alert--info']);
const alertExpiryTimeKnob = new Knob('alert-expiry-time', 'Alert expiry time', 'text', null, '5');
const alertExpiryDateKnob = new Knob('alert-expiry-date', 'Alert expiry date', 'text', null, '2021-12-31T23:27:00.000+05:30');
const alertWidthKnob = new Knob('alert-width', 'Alert width', 'dropdown',['','m-alert--containerwidth']);

// Non Timebound Variant
alertNonTimeBoundVariant.addKnob(alertStyleKnob);
alertNonTimeBoundVariant.addKnob(alertWidthKnob);

// Timebound Variant
alertTimeBoundVariant.addKnob(alertStyleKnob);
alertTimeBoundVariant.addKnob(alertExpiryTimeKnob);
alertTimeBoundVariant.addKnob(alertExpiryDateKnob);
alertTimeBoundVariant.addKnob(alertWidthKnob);

treeConfig.addComponentToCategory(alertStory, 'molecules');
