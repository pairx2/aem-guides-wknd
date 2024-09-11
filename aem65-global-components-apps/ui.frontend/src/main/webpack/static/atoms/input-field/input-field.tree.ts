import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import inputFieldOverviewHTML from './input-field-overview.html';
import inputFieldPlainHTML from './input-field.html';
import inputFieldDoubleIconPlainHTML from './input-field-variation1.html';
import inputFieldLeftIconPlainHTML from './input-field-variation2.html';
import inputFieldRightIconPlainHTML from './input-field-variation3.html';
import inputFieldTextAreaPlainHTML from './input-field-variation4.html';
import inputFieldPasswordStrengthPlainHTML from "./input-field-variation5.html";
import inputFieldConfirmPasswordPlainHTML from './input-field-variation6.html';
import inputFieldTooltipPlainHTML from './input-field-tooltip.html';
import inputFieldSearchHTML from './input-field-search-variation.html';

// Define a story
const inputFieldStory = new UIComponent('input field');

// Define Variants
const defaultVariant = new ComponentVariant('Default', inputFieldPlainHTML);
const inputFieldDoubleIconVariant = new ComponentVariant('input field with double icon', inputFieldDoubleIconPlainHTML);
const inputFieldLeftIconVariant = new ComponentVariant('input field with left icon', inputFieldLeftIconPlainHTML);
const inputFieldRightIconVariant = new ComponentVariant('input field with right icon', inputFieldRightIconPlainHTML);
const inputFieldTextAreaVariant = new ComponentVariant('input field with text area', inputFieldTextAreaPlainHTML);
const inputFieldOverviewVariant = new ComponentVariant('input field overview', inputFieldOverviewHTML);
const inputFieldPasswordStrengthVariant = new ComponentVariant('input field password strength', inputFieldPasswordStrengthPlainHTML);
const inputFieldConfirmPasswordVariant = new ComponentVariant('input field confirm password', inputFieldConfirmPasswordPlainHTML);
const inputFieldTooltipVariant = new ComponentVariant('input field with tooltip', inputFieldTooltipPlainHTML);
const inputFieldSearchVariant = new ComponentVariant('input field search', inputFieldSearchHTML);

// Add variants to story
inputFieldStory.addVariant(inputFieldOverviewVariant);
inputFieldStory.addVariant(defaultVariant);
inputFieldStory.addVariant(inputFieldDoubleIconVariant);
inputFieldStory.addVariant(inputFieldLeftIconVariant);
inputFieldStory.addVariant(inputFieldRightIconVariant);
inputFieldStory.addVariant(inputFieldTextAreaVariant);
inputFieldStory.addVariant(inputFieldPasswordStrengthVariant);
inputFieldStory.addVariant(inputFieldConfirmPasswordVariant);
inputFieldStory.addVariant(inputFieldTooltipVariant);
inputFieldStory.addVariant(inputFieldSearchVariant);

//define knobs

const inputFieldLabelKnob = new Knob('input-label', 'input field label', 'text', null, 'Username');
const inputFieldNameKnob = new Knob('input-name', 'input field name', 'text', null, 'input name');
const inputFieldPlaceholderKnob = new Knob('input-placeholder', 'input field placeholder', 'text', null, 'abc');
const inputFieldTypeKnob = new Knob('input-type', 'input type', 'dropdown', ['text', 'number', 'email', 'telephone', 'password', 'date', 'search'] );
const inputFieldHelpTextKnob = new Knob('input-message', 'input field help text', 'text', null, 'enter input');
const inputFieldErrorTextKnob = new Knob('error-message', 'input field error text', 'text', null, 'enter valid input');
const inputFieldRequireTextKnob = new Knob('require-message', 'input field require text', 'text', null, 'required field');
const inputFieldRegexTextKnob = new Knob('regex-message', 'input field regex text', 'text', null, 'regex field');

const inputFieldPasswordTypeKnob = new Knob('input-password-type', 'input password type', 'dropdown', ['complex', 'moderate'] );
const inputTooltipLabelTextKnob = new Knob('input-tooltip-label', 'input tooltip label', 'text', null, 'password policy');
const inputTooltipDescriptionTextKnob = new Knob('input-tooltip-description', 'input tooltip description', 'text', null, 'password tooltip description');
const inputTooltipMinCharLabelTextKnob = new Knob('input-tooltip-minChar-label', 'input tooltip description', 'text', null, '8');
const inputTooltipMinCharDescriptionTextKnob = new Knob('input-tooltip-minChar-description', 'input tooltip description', 'text', null, 'Atleast 8 Characters');
const inputTooltipAlphabetLabelTextKnob = new Knob('input-tooltip-alphabet-label', 'input tooltip description', 'text', null, 'A-z');
const inputTooltipAlphabetDescriptionTextKnob = new Knob('input-tooltip-alphabet-description', 'input tooltip description', 'text', null, 'Uppercase and Lowercase');
const inputTooltipNumericLabelTextKnob = new Knob('input-tooltip-numeric-label', 'input tooltip description', 'text', null, '123');
const inputTooltipNumericDescriptionTextKnob = new Knob('input-tooltip-numeric-description', 'input tooltip description', 'text', null, 'Digits');
const inputTooltipSpecialCharLabelTextKnob = new Knob('input-tooltip-specialChar-label', 'input tooltip description', 'text', null, '#$?');
const inputTooltipSpecialCharDescriptionTextKnob = new Knob('input-tooltip-specialChar-description', 'input tooltip description', 'text', null, 'special character');
const inputFieldLabelColorKnob= new Knob('input-label-color', 'Label color', 'dropdown',['', 'a-input-field-label--color-alternate']);


defaultVariant.addKnob(inputFieldLabelKnob);
inputFieldDoubleIconVariant.addKnob(inputFieldLabelKnob);
inputFieldLeftIconVariant.addKnob(inputFieldLabelKnob);
inputFieldRightIconVariant.addKnob(inputFieldLabelKnob);
inputFieldTextAreaVariant.addKnob(inputFieldLabelKnob);
inputFieldPasswordStrengthVariant.addKnob(inputFieldLabelKnob);
inputFieldConfirmPasswordVariant.addKnob(inputFieldLabelKnob);
inputFieldTooltipVariant.addKnob(inputFieldLabelKnob);
inputFieldSearchVariant.addKnob(inputFieldLabelKnob);

defaultVariant.addKnob(inputFieldNameKnob);
inputFieldDoubleIconVariant.addKnob(inputFieldNameKnob);
inputFieldLeftIconVariant.addKnob(inputFieldNameKnob);
inputFieldRightIconVariant.addKnob(inputFieldNameKnob);
inputFieldTextAreaVariant.addKnob(inputFieldNameKnob);
inputFieldPasswordStrengthVariant.addKnob(inputFieldNameKnob);
inputFieldConfirmPasswordVariant.addKnob(inputFieldNameKnob);
inputFieldTooltipVariant.addKnob(inputFieldNameKnob);
inputFieldSearchVariant.addKnob(inputFieldNameKnob);

defaultVariant.addKnob(inputFieldPlaceholderKnob);
inputFieldDoubleIconVariant.addKnob(inputFieldPlaceholderKnob);
inputFieldLeftIconVariant.addKnob(inputFieldPlaceholderKnob);
inputFieldRightIconVariant.addKnob(inputFieldPlaceholderKnob);
inputFieldTextAreaVariant.addKnob(inputFieldPlaceholderKnob);
inputFieldPasswordStrengthVariant.addKnob(inputFieldPlaceholderKnob);
inputFieldConfirmPasswordVariant.addKnob(inputFieldPlaceholderKnob);
inputFieldTooltipVariant.addKnob(inputFieldPlaceholderKnob);
inputFieldSearchVariant.addKnob(inputFieldPlaceholderKnob);

defaultVariant.addKnob(inputFieldTypeKnob);
inputFieldDoubleIconVariant.addKnob(inputFieldTypeKnob);
inputFieldLeftIconVariant.addKnob(inputFieldTypeKnob);
inputFieldRightIconVariant.addKnob(inputFieldTypeKnob);
inputFieldPasswordStrengthVariant.addKnob(inputFieldTypeKnob);
inputFieldConfirmPasswordVariant.addKnob(inputFieldTypeKnob);
inputFieldTooltipVariant.addKnob(inputFieldTypeKnob);
inputFieldSearchVariant.addKnob(inputFieldTypeKnob);

defaultVariant.addKnob(inputFieldHelpTextKnob);
inputFieldDoubleIconVariant.addKnob(inputFieldHelpTextKnob);
inputFieldLeftIconVariant.addKnob(inputFieldHelpTextKnob);
inputFieldRightIconVariant.addKnob(inputFieldHelpTextKnob);
inputFieldTextAreaVariant.addKnob(inputFieldHelpTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputFieldHelpTextKnob);
inputFieldTooltipVariant.addKnob(inputFieldHelpTextKnob);
inputFieldSearchVariant.addKnob(inputFieldHelpTextKnob);

defaultVariant.addKnob(inputFieldErrorTextKnob);
inputFieldDoubleIconVariant.addKnob(inputFieldErrorTextKnob);
inputFieldLeftIconVariant.addKnob(inputFieldErrorTextKnob);
inputFieldRightIconVariant.addKnob(inputFieldErrorTextKnob);
inputFieldTextAreaVariant.addKnob(inputFieldErrorTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputFieldErrorTextKnob);
inputFieldConfirmPasswordVariant.addKnob(inputFieldErrorTextKnob);
inputFieldTooltipVariant.addKnob(inputFieldErrorTextKnob);
inputFieldSearchVariant.addKnob(inputFieldErrorTextKnob);

defaultVariant.addKnob(inputFieldRequireTextKnob);
inputFieldDoubleIconVariant.addKnob(inputFieldRequireTextKnob);
inputFieldLeftIconVariant.addKnob(inputFieldRequireTextKnob);
inputFieldRightIconVariant.addKnob(inputFieldRequireTextKnob);
inputFieldTextAreaVariant.addKnob(inputFieldRequireTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputFieldRequireTextKnob);
inputFieldConfirmPasswordVariant.addKnob(inputFieldRequireTextKnob);
inputFieldTooltipVariant.addKnob(inputFieldRequireTextKnob);
inputFieldSearchVariant.addKnob(inputFieldRequireTextKnob);

defaultVariant.addKnob(inputFieldRegexTextKnob);
inputFieldDoubleIconVariant.addKnob(inputFieldRegexTextKnob);
inputFieldLeftIconVariant.addKnob(inputFieldRegexTextKnob);
inputFieldRightIconVariant.addKnob(inputFieldRegexTextKnob);
inputFieldTextAreaVariant.addKnob(inputFieldRegexTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputFieldRegexTextKnob);
inputFieldConfirmPasswordVariant.addKnob(inputFieldRegexTextKnob);
inputFieldTooltipVariant.addKnob(inputFieldRegexTextKnob);
inputFieldSearchVariant.addKnob(inputFieldRegexTextKnob);

inputFieldPasswordStrengthVariant.addKnob(inputFieldPasswordTypeKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipLabelTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipDescriptionTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipMinCharLabelTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipMinCharDescriptionTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipAlphabetLabelTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipAlphabetDescriptionTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipNumericLabelTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipNumericDescriptionTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipSpecialCharLabelTextKnob);
inputFieldPasswordStrengthVariant.addKnob(inputTooltipSpecialCharDescriptionTextKnob);
defaultVariant.addKnob(inputFieldLabelColorKnob);



// Add story to tree
treeConfig.addComponentToCategory(inputFieldStory, 'atoms');
