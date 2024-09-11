import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import tilesListHtml from './tiles-list.html';
import tilesList3ColumnHtml from './tiles-lis-3-column.html';
import tilesList4ColumnHtml from './tiles-lis-4-column.html';

// ---- Define a story
const tilesListStory = new UIComponent('Tiles list');

// ----------- Define Variant
const tilesListVariant = new ComponentVariant('Default', tilesListHtml);
const tilesList3ColumnVariant = new ComponentVariant('Tile list 3 column', tilesList3ColumnHtml);
const tilesList4ColumnVariant = new ComponentVariant('Tile list 4 column', tilesList4ColumnHtml);

tilesListStory.addVariant(tilesListVariant);
tilesListStory.addVariant(tilesList3ColumnVariant);
tilesListStory.addVariant(tilesList4ColumnVariant);

const colAlignmentKnob = new Knob('column-align', 'Column Alignment', 'dropdown', ['m-tile-list--start', 'm-tile-list--end', 'm-tile-list--center']);

tilesList3ColumnVariant.addKnob(colAlignmentKnob);
tilesList4ColumnVariant.addKnob(colAlignmentKnob);

treeConfig.addComponentToCategory(tilesListStory, 'molecules');
