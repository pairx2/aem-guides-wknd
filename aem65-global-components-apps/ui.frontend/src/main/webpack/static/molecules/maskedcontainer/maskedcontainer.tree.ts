import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import maskedContainerPlainTextHTML from './maskedcontainer.html';

// Define a story
const maskedContainerStory = new UIComponent('MaskedContainer');

// Define Variant
const defaultVariant = new ComponentVariant('Default', maskedContainerPlainTextHTML);

// Add variants to story
maskedContainerStory.addVariant(defaultVariant);

const containerWidthKnob = new Knob('container-width', 'Full Width', 'dropdown',['', 'container-full-width']);

defaultVariant.addKnob(containerWidthKnob);

// Add story to tree
treeConfig.addComponentToCategory(maskedContainerStory, 'atoms');
