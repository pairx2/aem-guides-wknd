import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import alertBannerHtml from './alertbanner.html';

// Story
const alertBannerStory = new UIComponent('alertbanner');

//Default Variants
const defaultVariant = new ComponentVariant('Default', alertBannerHtml);

// Add variants to story
alertBannerStory.addVariant(defaultVariant);


treeConfig.addComponentToCategory(alertBannerStory, 'molecules');
