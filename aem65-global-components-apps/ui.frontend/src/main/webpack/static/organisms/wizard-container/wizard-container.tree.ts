import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import wizardHtml from './wizard-container.html';

// ---- Define a story
const wizardComponentStory = new UIComponent('wizard container');

// ----------- Define Variant
const wizardVariant = new ComponentVariant('Default', wizardHtml);

wizardComponentStory.addVariant(wizardVariant);


treeConfig.addComponentToCategory(wizardComponentStory, 'organisms');

