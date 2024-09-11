import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import containerPlainTextHTML from './container.html';
import containerGrayBgPlainTextHTML from './container-gray-bg.html';
import columnOneContainerPlainTextHTML from './container-column-1.html';
import columnTwoContainerPlainTextHTML from './container-column-2.html';
import columnThreeContainerPlainTextHTML from './container-column-3.html';
import columnFourContainerPlainTextHTML from './container-column-4.html';

// Define a story
const containerStory = new UIComponent('Container');

// Define Variant
const defaultVariant = new ComponentVariant('Default', containerGrayBgPlainTextHTML);
const gradientVariant = new ComponentVariant('Gradient', containerPlainTextHTML);
const columnOneVariant = new ComponentVariant('Column One', columnOneContainerPlainTextHTML);
const columnTwoVariant = new ComponentVariant('Column Two', columnTwoContainerPlainTextHTML);
const columnThreeVariant = new ComponentVariant('Column Three', columnThreeContainerPlainTextHTML);
const columnFourVariant = new ComponentVariant('Column Four', columnFourContainerPlainTextHTML);

// Add variants to story
containerStory.addVariant(defaultVariant);
containerStory.addVariant(gradientVariant);
containerStory.addVariant(columnOneVariant);
containerStory.addVariant(columnTwoVariant);
containerStory.addVariant(columnThreeVariant);
containerStory.addVariant(columnFourVariant);

const containerWidthKnob = new Knob('container-width', 'Full Width', 'dropdown',['', 'container-full-width']);
const containerBGKnob = new Knob('container-background', 'Background', 'dropdown',['a-container--light', 'a-container--dark', 'a-container--secondary']);
const containerBoxStyleKnob = new Knob('container-boxstyle', 'Box Style', 'dropdown',['', 'a-container--shadow-box']);
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['a-container--gradient-start', 'a-container--gradient-center', 'a-container--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');
const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgb(55,127,127)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');
const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgb(255,127,127)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const mediaImg = new Knob('media-image', 'Media Image', 'text', null, 'https://images.unsplash.com/photo-1509624776920-0fac24a9dfda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');

gradientVariant.addKnob(containerWidthKnob);
gradientVariant.addKnob(gradientKnob);
// gradientVariant.addKnob(randomKnob);
// gradientVariant.addKnob(gradientStart);
// gradientVariant.addKnob(gradientStartPosition);
// gradientVariant.addKnob(gradientEnd);
// gradientVariant.addKnob(gradientEndPosition);
gradientVariant.addKnob(mediaImg);

defaultVariant.addKnob(containerWidthKnob);
defaultVariant.addKnob(containerBGKnob);
defaultVariant.addKnob(containerBoxStyleKnob);

columnOneVariant.addKnob(containerWidthKnob);
columnTwoVariant.addKnob(containerWidthKnob);
columnThreeVariant.addKnob(containerWidthKnob);
columnFourVariant.addKnob(containerWidthKnob);

// Add story to tree
treeConfig.addComponentToCategory(containerStory, 'atoms');
