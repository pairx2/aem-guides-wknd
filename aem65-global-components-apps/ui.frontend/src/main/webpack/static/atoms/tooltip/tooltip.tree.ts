import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import tooltipOverviewHTML from './tooltip-overview.html';
import tooltipLargeDarkwHTML from './tooltip-large-dark.html';
import tooltipLargeLigtHTML from './tooltip-large-light.html';
import tooltipSmallDarkHTML from './tooltip-small-dark.html';
import tooltipSmallLightHTML from './tooltip-small-light.html';

// Define a story
const tooltipStory = new UIComponent('Tooltip');

// Define Variant
const defaultVariant = new ComponentVariant('Default', tooltipOverviewHTML);
const largeDarkVariant = new ComponentVariant('largeDark', tooltipLargeDarkwHTML);
const largeLightVariant = new ComponentVariant('largeLight', tooltipLargeLigtHTML);
const smallDarkVariant = new ComponentVariant('smallDark', tooltipSmallDarkHTML);
const smallLightVariant = new ComponentVariant('smallLight', tooltipSmallLightHTML);

// Add variants to story
tooltipStory.addVariant(defaultVariant);
tooltipStory.addVariant(largeDarkVariant);
tooltipStory.addVariant(largeLightVariant);
tooltipStory.addVariant(smallDarkVariant);
tooltipStory.addVariant(smallLightVariant);

// const tooltipKnob = new Knob('tooltip-shades', 'Tooltip shades', 'dropdown', ['dark', 'light']);
// defaultVariant.addKnob(tooltipKnob);

// Add story to tree
treeConfig.addComponentToCategory(tooltipStory, 'atoms');
