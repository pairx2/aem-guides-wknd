import {treeConfig, UIComponent, ComponentVariant} from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import spacingHtml from './spacing.html';

// ---- Define a story
const spacingComponentStory = new UIComponent("Spacing");
// ----------- Define Variant
const spacingDefaultVariant = new ComponentVariant("Default",  spacingHtml);

spacingComponentStory.addVariant(spacingDefaultVariant);

treeConfig.addComponentToCategory(spacingComponentStory,"utilities");
