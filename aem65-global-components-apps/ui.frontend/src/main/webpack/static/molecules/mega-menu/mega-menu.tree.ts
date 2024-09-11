import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import variation1 from './mega-menu-variation-1.html';
import variation2 from './mega-menu-variation-2.html';
import variation3 from './mega-menu-variation-3.html';
import mobileVariation from './mega-menu-mobile.html';
import megamenuAEM from './mega-menu-aem-structure.html';
//import integratedHtml from './mega-menu-integration.html';

// Define a story
const megaMenuStory = new UIComponent('Mega Menu');

// Define Variant
const megaMenuV1 = new ComponentVariant('Variation 1', variation1);
const megaMenuV2 = new ComponentVariant('Variation 2', variation2);
const megaMenuV3 = new ComponentVariant('Variation 3', variation3);
const megaMenuMobile = new ComponentVariant('Integrated + Mobile', mobileVariation);
const megamenuAEMVariant = new ComponentVariant('AEM Structure', megamenuAEM);
//const integrated = new ComponentVariant('Integrated', integratedHtml);

// Add variants to story
megaMenuStory.addVariant(megaMenuV1);
megaMenuStory.addVariant(megaMenuV2);
megaMenuStory.addVariant(megaMenuV3);
megaMenuStory.addVariant(megaMenuMobile);
megaMenuStory.addVariant(megamenuAEMVariant);
//megaMenuStory.addVariant(integrated);

// Knobs
const subMenuText = new Knob('submenu-text', 'Sub Menu Text Style', 'dropdown',['','m-mega-menu__text-none', 'm-mega-menu__text-uppercase'], '');


megaMenuV1.addKnob(subMenuText);
megaMenuV2.addKnob(subMenuText);
megaMenuV3.addKnob(subMenuText);

// Add story to tree
treeConfig.addComponentToCategory(megaMenuStory, 'molecules');
