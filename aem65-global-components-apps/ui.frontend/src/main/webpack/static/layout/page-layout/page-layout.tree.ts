import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import pageLayoutHtml from './page-layout.html';

// ---- Define a story
let pageLayoutComponentStory = new UIComponent("Page Layout");

// ----------- Define Variant
let pageLayoutDefaultVariant = new ComponentVariant("Default", pageLayoutHtml);

// --------------------- Define Knobs for variants
pageLayoutComponentStory.addVariant(pageLayoutDefaultVariant);
treeConfig.addComponentToCategory(pageLayoutComponentStory,"layouts");
