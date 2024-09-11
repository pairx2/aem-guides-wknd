import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import customtableHtml from './customtable.html';
import customtableButtons from './customtable-with-buttons.html';
import customtableDropdownFilters from './customtable-with-dropdowns.html';
import customtableRangeFilters from './customtable-with-ranges.html';

// Story
const customtableStory = new UIComponent('Customtable');

// Variants
let customtableVariant = new ComponentVariant('default', customtableHtml);
let customtableButtonsVariant = new ComponentVariant('Customtable With Buttons', customtableButtons);
let customtableDropdownFiltersVariant = new ComponentVariant('Customtable With Dropdown Filters', customtableDropdownFilters);
let customtableRangeFiltersVariant = new ComponentVariant('Customtable With Range Filters', customtableRangeFilters);

// Add variants to story
customtableStory.addVariant(customtableVariant);
customtableStory.addVariant(customtableButtonsVariant);
customtableStory.addVariant(customtableDropdownFiltersVariant);
customtableStory.addVariant(customtableRangeFiltersVariant);

// knob definitions for Custom variant
const searchRequiredKnob = new Knob('search-required', 'Is Search required?', 'dropdown', ['', 'd-none'], '');
const searchPlaceholderKnob = new Knob('search-placeholder', 'Search Placeholder', 'text', null, 'Search or filter by keyword...');
const paginationRequiredKnob = new Knob('pagination-required', 'Is Pagination required?', 'dropdown', ['', 'd-none'], '');

// knob definitions for Buttons variant
const primaryButtonRequiredKnob = new Knob('primary-btn-required', 'Is Primary Button required?', 'dropdown', ['', 'd-none'], '');
const secondaryButtonRequiredKnob = new Knob('secondary-btn-required', 'Is Secondary Button required?', 'dropdown', ['', 'd-none'], '');
const linkRequiredKnob = new Knob('link-required', 'Is Link required?', 'dropdown', ['', 'd-none'], '');

// knob definitions for Dropdown Filters variant
const dropdownCol2RequiredKnob = new Knob('dropdown-col-2-required', 'Is filter dropdown required for User Group column?', 'dropdown', ['', 'd-none'], '');
const dropdownCol2TextKnob = new Knob('dropdown-col-2-text', 'User Group column All text', 'text', null, 'All User Groups');
const dropdownCol2ExpandKnob = new Knob('dropdown-col-2-expand', 'Expand User Group column dropdown?', 'dropdown', ['', 'active'], '');
const dropdownCol4RequiredKnob = new Knob('dropdown-col-4-required', 'Is filter dropdown required for Login Status column?', 'dropdown', ['', 'd-none'], '');
const dropdownCol4TextKnob = new Knob('dropdown-col-4-text', 'Login Status column All text', 'text', null, 'All Login Status');
const dropdownCol4ExpandKnob = new Knob('dropdown-col-4-expand', 'Expand Login Status column dropdown?', 'dropdown', ['', 'active'], '');
const resetRequiredKnob = new Knob('reset-required', 'Is Reset required for dropdown filters?', 'dropdown', ['', 'd-none'], '');
const dropdownCol2HiddenKnob = new Knob('dropdown-col-2-hidden', 'Hide User Group column?', 'dropdown', ['', 'd-none'], '');

// knob definitions for Range Filters variant
const rangeCol3RequiredKnob = new Knob('range-col-3-required', 'Is range dropdown required for Date Published column?', 'dropdown', ['', 'd-none'], '');
const rangeCol3TextKnob = new Knob('range-col-3-text', 'Date Published range label', 'text', null, 'Date Published');
const rangeCol3ModalKnob = new Knob('range-col-3-modal', 'Show Range modal for Date Published Range?', 'dropdown', ['d-none', ''], 'd-none');
const rangeCol3FromTextKnob = new Knob('range-col-3-from-text', 'Date Published range starts from label', 'text', null, 'From Date');
const rangeCol3ToTextKnob = new Knob('range-col-3-to-text', 'Date Published range ends to label', 'text', null, 'To Date');
const rangeCol3CloseTextKnob = new Knob('range-col-3-close-text', 'Date Published range modal close label', 'text', null, 'Close');
const rangeCol5RequiredKnob = new Knob('range-col-5-required', 'Is range dropdown required for Rating column?', 'dropdown', ['', 'd-none'], '');
const rangeCol5TextKnob = new Knob('range-col-5-text', 'Rating range label', 'text', null, 'Ratings');
const rangeCol5ModalKnob = new Knob('range-col-5-modal', 'Show Range modal for Ratings Range?', 'dropdown', ['d-none', ''], 'd-none');
const rangeCol5FromTextKnob = new Knob('range-col-5-from-text', 'Rating range starts from label', 'text', null, 'Start Number');
const rangeCol5ToTextKnob = new Knob('range-col-5-to-text', 'Rating range ends to label', 'text', null, 'End Number');
const rangeCol5CloseTextKnob = new Knob('range-col-5-close-text', 'Ratings range modal close label', 'text', null, 'Close');

// Adding knob to story for Custom variant
customtableVariant.addKnob(searchRequiredKnob);
customtableVariant.addKnob(paginationRequiredKnob);
customtableVariant.addKnob(searchPlaceholderKnob);

// Adding knob to story for Buttons variant
customtableButtonsVariant.addKnob(searchRequiredKnob);
customtableButtonsVariant.addKnob(paginationRequiredKnob);
customtableButtonsVariant.addKnob(searchPlaceholderKnob);
customtableButtonsVariant.addKnob(primaryButtonRequiredKnob);
customtableButtonsVariant.addKnob(secondaryButtonRequiredKnob);
customtableButtonsVariant.addKnob(linkRequiredKnob);

// Adding knob to story for Dropdown Filters variant
customtableDropdownFiltersVariant.addKnob(searchRequiredKnob);
customtableDropdownFiltersVariant.addKnob(paginationRequiredKnob);
customtableDropdownFiltersVariant.addKnob(searchPlaceholderKnob);
customtableDropdownFiltersVariant.addKnob(dropdownCol2RequiredKnob);
customtableDropdownFiltersVariant.addKnob(dropdownCol2TextKnob);
customtableDropdownFiltersVariant.addKnob(dropdownCol2ExpandKnob);
customtableDropdownFiltersVariant.addKnob(dropdownCol4RequiredKnob);
customtableDropdownFiltersVariant.addKnob(dropdownCol4TextKnob);
customtableDropdownFiltersVariant.addKnob(dropdownCol4ExpandKnob);
customtableDropdownFiltersVariant.addKnob(resetRequiredKnob);
customtableDropdownFiltersVariant.addKnob(dropdownCol2HiddenKnob);

// Adding knob to story for Range Filters variant
customtableRangeFiltersVariant.addKnob(searchRequiredKnob);
customtableRangeFiltersVariant.addKnob(paginationRequiredKnob);
customtableRangeFiltersVariant.addKnob(searchPlaceholderKnob);
customtableRangeFiltersVariant.addKnob(rangeCol3RequiredKnob);
customtableRangeFiltersVariant.addKnob(rangeCol3TextKnob);
customtableRangeFiltersVariant.addKnob(rangeCol3ModalKnob);
customtableRangeFiltersVariant.addKnob(rangeCol3FromTextKnob);
customtableRangeFiltersVariant.addKnob(rangeCol3ToTextKnob);
customtableRangeFiltersVariant.addKnob(rangeCol3CloseTextKnob);
customtableRangeFiltersVariant.addKnob(rangeCol5RequiredKnob);
customtableRangeFiltersVariant.addKnob(rangeCol5TextKnob);
customtableRangeFiltersVariant.addKnob(rangeCol5ModalKnob);
customtableRangeFiltersVariant.addKnob(rangeCol5FromTextKnob);
customtableRangeFiltersVariant.addKnob(rangeCol5ToTextKnob);
customtableRangeFiltersVariant.addKnob(rangeCol5CloseTextKnob);
customtableRangeFiltersVariant.addKnob(resetRequiredKnob);

treeConfig.addComponentToCategory(customtableStory, 'molecules');
