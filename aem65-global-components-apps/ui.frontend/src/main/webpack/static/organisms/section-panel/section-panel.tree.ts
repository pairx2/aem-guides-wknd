import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import sectionPanelHtml from './section-panel.html';
import sectionPanelBGHtml from './section-panel-bg.html';

// Story
const sectionPanelStory = new UIComponent('Section panel');

// Variants
let defaultVariant = new ComponentVariant('default',  sectionPanelHtml);
let bgVariant = new ComponentVariant('Background Image',  sectionPanelBGHtml);

sectionPanelStory.addVariant(defaultVariant);
sectionPanelStory.addVariant(bgVariant);

const textAlignKnob = new Knob('text-align', 'Content align', 'dropdown',['o-section-panel--start', 'o-section-panel--center'], '');
const bgColorKnob = new Knob('bg-color', 'Background Color', 'dropdown',['o-section-panel--light', 'o-section-panel--dark'], '');

defaultVariant.addKnob(textAlignKnob);
defaultVariant.addKnob(bgColorKnob);
bgVariant.addKnob(textAlignKnob);
bgVariant.addKnob(bgColorKnob);

treeConfig.addComponentToCategory(sectionPanelStory, 'organisms');
