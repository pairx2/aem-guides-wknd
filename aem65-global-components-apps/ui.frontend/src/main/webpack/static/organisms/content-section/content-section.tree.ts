import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import contentSectionHtml from './content-section.html';

// Story
const contentSectionStory = new UIComponent('Content Section');

// Variants
let contentSectionVariant = new ComponentVariant('default',  contentSectionHtml);

contentSectionStory.addVariant(contentSectionVariant);

treeConfig.addComponentToCategory(contentSectionStory, 'organisms');
