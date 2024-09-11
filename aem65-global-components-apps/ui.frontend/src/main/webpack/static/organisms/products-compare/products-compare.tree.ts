import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import productsCompare from './products-compare.html';
import productsCompareWithScoll from './products-compare-overview.html';

// Define a story
const productsCompareStory = new UIComponent('Products Compare');

// Define variant
const defaultVariant = new ComponentVariant('Default', productsCompare);
const productsCompareScrollVariant = new ComponentVariant('products compare scroll', productsCompareWithScoll);

// Add variants to story
productsCompareStory.addVariant(defaultVariant);
productsCompareStory.addVariant(productsCompareScrollVariant);

// ---------------------define knobs
//Plain text
const productsBadgePositionKnob = new Knob('badge-position', 'products badge position', 'text', null, 'o-products-compare__badge--top-end');

defaultVariant.addKnob(productsBadgePositionKnob);
productsCompareScrollVariant.addKnob(productsBadgePositionKnob);

// Add story to tree
treeConfig.addComponentToCategory(productsCompareStory, 'organisms');
const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgba(0,0,0,0.5)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');
const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgba(0,0,0,0)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['a-productcomparison--gradient-start', 'a-productcomparison--gradient-center', 'a-productcomparison--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');

defaultVariant.addKnob(gradientStart);
defaultVariant.addKnob(gradientStartPosition);
defaultVariant.addKnob(gradientEnd);
defaultVariant.addKnob(gradientEndPosition);
defaultVariant.addKnob(gradientKnob);
defaultVariant.addKnob(randomKnob);