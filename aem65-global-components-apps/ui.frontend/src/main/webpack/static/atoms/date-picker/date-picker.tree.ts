import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import datePickerSingleHTML from './date-picker-single.html'
import datePickerRangeHTML from './date-picker-range.html'
import datePickerSingleDisableWeekendsHTML from './date-picker-single-with-disable-weekends.html'
import datePickerSingleDisablePastandFutureHTML from './date-picker-single-with-disable-past-and-future.html';
import datePickerSingleDisablePastandFutureAfterBeforeHTML from './date-picker-disable-date-with-before-after.html';

// Define a story
const datePickerStory = new UIComponent('Date Picker');

// Define Variant
const defaultVariant = new ComponentVariant('Default', datePickerSingleHTML);
const datePickerRangeVariant = new ComponentVariant('Date picker with range', datePickerRangeHTML);
const datePickerSingleDisableWeekendsVariant= new ComponentVariant('Date picker with disable weekends', datePickerSingleDisableWeekendsHTML);
const datePickerSingleDisablePastandFutureVariant= new ComponentVariant('Date picker with disable past and future', datePickerSingleDisablePastandFutureHTML);
const datePickerSingleDisablePastandFutureAfterBeforeVariant= new ComponentVariant('Date picker with disable past and future with After and Before', datePickerSingleDisablePastandFutureAfterBeforeHTML);


// Add variants to story
datePickerStory.addVariant(defaultVariant);
datePickerStory.addVariant(datePickerRangeVariant);
datePickerStory.addVariant(datePickerSingleDisableWeekendsVariant);
datePickerStory.addVariant(datePickerSingleDisablePastandFutureVariant);
datePickerStory.addVariant(datePickerSingleDisablePastandFutureAfterBeforeVariant);

// Knobs added for datepicker fullwidht or halfwidth and future or past hide dates
const datePickerWidth = new Knob('datepicker-width', 'Select Datepicker Width', 'dropdown',['', 'datepicker-fullwidth', 'datepicker-halfwidth']);
const datePickerFuturePastHide = new Knob('datepicker-hide-dates', 'Select Disable Dates', 'dropdown', ['past', 'future','']);
const datePickerDisableWeekend = new Knob('datepicker-disable-weekends', 'Select Disable weekends', 'text', null, 'false');
const datePickerDisablePastandFuture = new Knob('data-disabled-pastmonths', 'Select Disable Past and Future', 'text', null, 'false');
const datePickerDisablePastandFutureAfterandBefore = new Knob('datepicker-after-days', 'Disable Days Future After Before', 'text', null, 'false');
const datepickerLabelColorKnob= new Knob('datepicker-label-color', 'Label color', 'dropdown',['', 'a-input-field-label--color-alternate']);


//adding knobs to varient
defaultVariant.addKnob(datePickerWidth);
datePickerRangeVariant.addKnob(datePickerWidth);
defaultVariant.addKnob(datePickerFuturePastHide);
datePickerRangeVariant.addKnob(datePickerFuturePastHide);
datePickerSingleDisableWeekendsVariant.addKnob(datePickerDisableWeekend);
datePickerSingleDisableWeekendsVariant.addKnob(datePickerWidth);
datePickerSingleDisableWeekendsVariant.addKnob(datePickerFuturePastHide);
datePickerSingleDisablePastandFutureVariant.addKnob(datePickerDisablePastandFuture);
datePickerSingleDisablePastandFutureVariant.addKnob(datePickerWidth);
datePickerSingleDisablePastandFutureVariant.addKnob(datePickerFuturePastHide);

datePickerSingleDisablePastandFutureAfterBeforeVariant.addKnob(datePickerDisablePastandFuture);
datePickerSingleDisablePastandFutureAfterBeforeVariant.addKnob(datePickerWidth);
datePickerSingleDisablePastandFutureAfterBeforeVariant.addKnob(datePickerFuturePastHide);
datePickerSingleDisablePastandFutureAfterBeforeVariant.addKnob(datePickerDisablePastandFutureAfterandBefore);
defaultVariant.addKnob(datepickerLabelColorKnob);


// Add story to tree
treeConfig.addComponentToCategory(datePickerStory, 'atoms');
