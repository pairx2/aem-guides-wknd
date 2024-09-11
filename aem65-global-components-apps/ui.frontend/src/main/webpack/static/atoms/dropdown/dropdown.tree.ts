import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import dropdown from './dropdown.html';
import dropdownWithIcon from './dropdown-icon.html';
import dropdownWithTooltip from './dropdown-tooltip.html';

// Define a story
const dropdownStory = new UIComponent('dropdown');

// Define Variant
const defaultVariant = new ComponentVariant('Default', dropdown);
const dropdownVariant = new ComponentVariant('Dropdown with icon', dropdownWithIcon);
const dropdownTooltipVariant = new ComponentVariant('Dropdown with tooltip', dropdownWithTooltip);

// Add variants to story
dropdownStory.addVariant(defaultVariant);
dropdownStory.addVariant(dropdownVariant);
dropdownStory.addVariant(dropdownTooltipVariant);

// Knobs
const dropdownListTitleKnob = new Knob('form-dropdown-title', 'title', 'text', null, 'Dropdown');
const dropdownPlaceholderKnob = new Knob('form-dropdown-placeholder', 'placeholder', 'text', null, 'Hint');
const dropdownIdKnob = new Knob('form-dropdown-id', 'dropdown id ', 'text', null, 'dropdown1');
const dropdownLabelColorKnob= new Knob('dropdown-label-color', 'Label color', 'dropdown',['', 'a-options-label--color-alternate']);


defaultVariant.addKnob(dropdownListTitleKnob);
defaultVariant.addKnob(dropdownPlaceholderKnob);
defaultVariant.addKnob(dropdownIdKnob);
defaultVariant.addKnob(dropdownLabelColorKnob);

dropdownVariant.addKnob(dropdownListTitleKnob);
dropdownVariant.addKnob(dropdownPlaceholderKnob);
dropdownVariant.addKnob(dropdownIdKnob);

dropdownTooltipVariant.addKnob(dropdownListTitleKnob);
dropdownTooltipVariant.addKnob(dropdownPlaceholderKnob);
dropdownTooltipVariant.addKnob(dropdownIdKnob);

// Add story to tree
treeConfig.addComponentToCategory(dropdownStory, 'atoms');