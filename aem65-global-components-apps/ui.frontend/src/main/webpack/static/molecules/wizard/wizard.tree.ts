import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import wizardPlainHtml from './wizard.html';
import wizardOverviewHtml from './wizard-overview.html';

// ---- Define a story
const wizardAtomComponentStory = new UIComponent('wizard');

// ----------- Define Variant
const wizardAtomVariant = new ComponentVariant('Default', wizardPlainHtml);
const wizardOverview = new ComponentVariant('Overview', wizardOverviewHtml);

wizardAtomComponentStory.addVariant(wizardOverview);
wizardAtomComponentStory.addVariant(wizardAtomVariant);

// ---------------------define knobs
//Plain text
const wizardLabelKnob = new Knob('wizard-label', 'wizard label', 'text', null, 'steps');

wizardAtomVariant.addKnob(wizardLabelKnob);
wizardOverview.addKnob(wizardLabelKnob);

treeConfig.addComponentToCategory(wizardAtomComponentStory, 'molecules');
