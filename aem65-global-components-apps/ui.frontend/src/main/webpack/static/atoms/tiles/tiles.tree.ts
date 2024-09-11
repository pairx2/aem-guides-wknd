import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import tilesHTML from './tiles.html';
import tilesWithParaHTML from './tiles-large-with-para.html';
import tilesWithIconHTML from './tiles-with-icon.html';

// Define a story
const tilesStory = new UIComponent('Tiles');

// Define Variant
const defaultVariant = new ComponentVariant('Default', tilesHTML);

// Add variants to story
tilesStory.addVariant(defaultVariant);


const tilesKnob = new Knob('tiles-size', 'Size', 'dropdown', ['a-tile--xsmall', 'a-tile--small', 'a-tile--medium', 'a-tile--large']);
const tilesVariationaKnob = new Knob('tiles-color', 'Tiles color', 'dropdown', ['a-tile--light', 'a-tile--dark']);

defaultVariant.addKnob(tilesKnob);

defaultVariant.addKnob(tilesVariationaKnob);


const richTextEditorKnob = new Knob('rte-text', 'Tile Subtitle', 'text', null, 'This is the sample paragraph text which is very long');
const iconKnob = new Knob('icon', 'Tile Icon', 'dropdown', ['abt-icon-alert', 'abt-icon-bell', 'abt-icon-search', 'abt-icon-cancel']);
const iconColorKnob = new Knob('icon-color', 'Tile Icon Color', 'text', null, '#')
defaultVariant.addKnob(richTextEditorKnob);
defaultVariant.addKnob(iconKnob);
defaultVariant.addKnob(iconColorKnob);


// Add story to tree
treeConfig.addComponentToCategory(tilesStory, 'atoms');
