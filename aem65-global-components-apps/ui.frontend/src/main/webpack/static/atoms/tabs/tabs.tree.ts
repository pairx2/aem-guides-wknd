import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import tabsHTML from './tabs.html';
import paymentTabsHTML from './paymenttabs.html';

// Define a story
const tabsStory = new UIComponent('Tabs');

// Define Variant
const defaultVariant = new ComponentVariant('Default', tabsHTML);
const paymentTabsVariant = new ComponentVariant('Payment Tabs', paymentTabsHTML);

// Add variants to story
tabsStory.addVariant(defaultVariant);
tabsStory.addVariant(paymentTabsVariant);

const iconColorKnob = new Knob('icon-color', 'Icon color', 'dropdown', ['', 'a-tabs--success', 'a-tabs--warning', 'a-tabs--danger', 'a-tabs--hide']);
defaultVariant.addKnob(iconColorKnob);

const tabStyleKnob = new Knob('tabs-width', 'Tabs width', 'dropdown', ['', 'a-tabs--equal-width', 'a-tabs--fixed-width']);
defaultVariant.addKnob(tabStyleKnob);

const tabMobileStyleKnob = new Knob('tabs-column', 'Tabs column', 'dropdown', ['','a-tabs--two-in-row', 'a-tabs--three-in-row', 'a-tabs--five-in-row']);
defaultVariant.addKnob(tabMobileStyleKnob);

// Add story to tree
treeConfig.addComponentToCategory(tabsStory, 'atoms');
