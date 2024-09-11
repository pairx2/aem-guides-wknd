import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import customListHtml from './custom-list-v1.html';
import customListHtmlV2 from './custom-list-v2.html';

// Story
const customListStory = new UIComponent('Custom list');

// Variants
const customListVariant = new ComponentVariant('default',  customListHtml);
const customListVariantV2 = new ComponentVariant('Custom List - V2',  customListHtmlV2);

customListStory.addVariant(customListVariant);
customListStory.addVariant(customListVariantV2);

//Knob
let customListKnob = new Knob('custom-list-style', 'Custom list style', 'dropdown',
['bullet', 'number', 'number-without-zero', 'alphabet', 'icon', 'non-indented']);
let customListIconColorKnob = new Knob('custom-list-color', 'Custom list icon/number color', 'dropdown', ['default', 'alternate', 'primary', 'secondary']);
let customListTitleColorKnob = new Knob('custom-list-title-color', 'Custom list title color', 'dropdown', ['', 'default', 'alternate', 'primary', 'secondary']);
let customListIconFontSizeSKnob = new Knob('custom-list-icon-font-size', 'Custom list Icon Font Size', 'dropdown', ['', 'extrasmall', 'small', 'medium', 'large']);
let customListHeaderTitleColorKnob = new Knob('custom-list-header-title-color', 'Header title color', 'dropdown', ['', 'default', 'reversed', 'primary', 'alternate']);
const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgba(0,0,0,0.5)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');
const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgba(0,0,0,0)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['m-custom-list__list-size--gradient-start', 'm-custom-list__list-size--gradient-center', 'm-custom-list__list-size--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');

customListVariant.addKnob(gradientStart);
customListVariant.addKnob(gradientStartPosition);
customListVariant.addKnob(gradientEnd);
customListVariant.addKnob(gradientEndPosition);
customListVariant.addKnob(gradientKnob);
customListVariant.addKnob(randomKnob);
customListVariant.addKnob(customListKnob);
customListVariant.addKnob(customListIconColorKnob);
customListVariant.addKnob(customListTitleColorKnob);
customListVariant.addKnob(customListHeaderTitleColorKnob);

customListVariantV2.addKnob(customListKnob);
customListVariantV2.addKnob(customListIconColorKnob);
customListVariantV2.addKnob(customListIconFontSizeSKnob);
customListVariantV2.addKnob(customListTitleColorKnob);
customListVariantV2.addKnob(customListHeaderTitleColorKnob);

treeConfig.addComponentToCategory(customListStory, 'molecules');
