import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import productTile from './product-tile.html';

// Define a story
const productTilesStory = new UIComponent('Product Tile');

// Define Variant
const defaultVariant = new ComponentVariant('Overview', productTile);

// Add variants to story
productTilesStory.addVariant(defaultVariant);

// Knobs

// Plain text
const badgeKnob = new Knob('badge', 'Badge Title', 'text', null, 'Offer');
const nameKnob = new Knob('name', 'Name', 'text', null, 'Trial Pack');
const descKnob = new Knob('description', 'Description', 'text', null, "People starting their Keto journey that want to know if they are in ketosis and speed of up their results");
const detailsTitleKnob = new Knob('detailsTitle', 'Details Title', 'text', null, 'Includes');
const detailDescriptionKnob = new Knob('detailDescription', 'Details Description', 'text', null, '1 biosensor (2 week duration)');
const detailIconKnob = new Knob('detailIcon', 'Detail Icon', 'text', null, 'lingo_app');
const descriptionTitleKnob = new Knob('descriptionTitle', 'Description Title', 'text', null, 'Great For');

defaultVariant.addKnob(badgeKnob);
defaultVariant.addKnob(nameKnob);
defaultVariant.addKnob(descKnob);
defaultVariant.addKnob(detailsTitleKnob);
defaultVariant.addKnob(detailDescriptionKnob);
defaultVariant.addKnob(detailIconKnob);
defaultVariant.addKnob(descriptionTitleKnob);

// Add story to tree
treeConfig.addComponentToCategory(productTilesStory, 'molecules');