import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import backtotopHTML from './backtotop.html';
import backtotopTextHTML from './backtotop-text.html';
import backtotopIconHTML from './backtotop-icon.html';
import backtotopTextWithIconHTML from './backtotop-text-with-icon.html';
 
// Define a story
const backToTopStory = new UIComponent('BackToTop');
 
// Define Variant
const defaultVariant = new ComponentVariant('Default', backtotopHTML);
const textVariant = new ComponentVariant('Text only', backtotopTextHTML);
const iconVariant = new ComponentVariant('Icon only', backtotopIconHTML);
const textWithIconVariant = new ComponentVariant('Text with Icon', backtotopTextWithIconHTML);
 
// Add variants to story
backToTopStory.addVariant(defaultVariant);
backToTopStory.addVariant(textVariant);
backToTopStory.addVariant(iconVariant);
backToTopStory.addVariant(textWithIconVariant);
 
// Plain text
const backToTopTextKnob = new Knob('backtotop-text', 'Back To Top Label', 'text', null, 'Back to Top');
const backToTopIconPositionKnob = new Knob('backtotop-position', 'Back To Top position', 'dropdown', ['Default', 'left', 'right'], 'Default');

defaultVariant.addKnob(backToTopTextKnob);
textVariant.addKnob(backToTopTextKnob);
textWithIconVariant.addKnob(backToTopTextKnob);


defaultVariant.addKnob(backToTopIconPositionKnob);
textVariant.addKnob(backToTopIconPositionKnob);
iconVariant.addKnob(backToTopIconPositionKnob);
textWithIconVariant.addKnob(backToTopIconPositionKnob);
 
// Add story to tree
treeConfig.addComponentToCategory(backToTopStory, 'atoms');