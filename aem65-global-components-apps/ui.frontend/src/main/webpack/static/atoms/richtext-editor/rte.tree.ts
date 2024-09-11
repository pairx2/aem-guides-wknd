import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import rtePlainTextHTML from './rte.html';

// Define a story
const richTextEditorStory = new UIComponent('RichTextEditor');

// Define Variant
const defaultVariant = new ComponentVariant('Default', rtePlainTextHTML);


// Add variants to story
richTextEditorStory.addVariant(defaultVariant);


// Knobs

// Plain text
const richTextEditorKnob = new Knob('rte-text', 'Text Label', 'text', null, 'Title');
defaultVariant.addKnob(richTextEditorKnob);


// Add story to tree
treeConfig.addComponentToCategory(richTextEditorStory, 'atoms');
