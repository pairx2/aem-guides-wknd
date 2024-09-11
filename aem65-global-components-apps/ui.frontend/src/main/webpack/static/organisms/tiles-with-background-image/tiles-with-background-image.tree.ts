import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import tilesWithBgHtml from './tiles-with-background-image.html';

// Story
const tilesWithBgStory = new UIComponent('Tiles with background image');

// Variants
let defaultVariant = new ComponentVariant('default',  tilesWithBgHtml);

tilesWithBgStory.addVariant(defaultVariant);

const bgImgKnob = new Knob('bg-img', 'Background Image', 'text', null, '../../../public/resources/images/bg.png');
defaultVariant.addKnob(bgImgKnob);

treeConfig.addComponentToCategory(tilesWithBgStory, 'organisms');
const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgba(0,0,0,0.5)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');
const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgba(0,0,0,0)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['a-tiles--background--gradient-start', 'a-tiles--background--gradient-center', 'a-tiles--background--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');

defaultVariant.addKnob(gradientStart);
defaultVariant.addKnob(gradientStartPosition);
defaultVariant.addKnob(gradientEnd);
defaultVariant.addKnob(gradientEndPosition);
defaultVariant.addKnob(gradientKnob);
defaultVariant.addKnob(randomKnob);
