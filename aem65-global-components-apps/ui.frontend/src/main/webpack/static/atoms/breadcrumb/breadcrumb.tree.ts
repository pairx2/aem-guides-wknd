import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import breadcrumbHTML from './breadcrumb.html';

// Define a story
const breadcrumbStory = new UIComponent('Breadcrumb');

// Define Variant
const defaultVariant = new ComponentVariant('Default', breadcrumbHTML);


// Add variants to story
breadcrumbStory.addVariant(defaultVariant);


// Knobs

// List-item-text knob
const breadcrumbItemTextKnob = new Knob('item-text', 'Text Label', 'text', null, 'Text');
//List-item-link knob
const breadcrumbItemLinkKnob = new Knob('item-link', 'Text Label', 'text', null, 'Link');

defaultVariant.addKnob(breadcrumbItemTextKnob);
defaultVariant.addKnob(breadcrumbItemLinkKnob);


// Add story to tree
treeConfig.addComponentToCategory(breadcrumbStory, 'atoms');
