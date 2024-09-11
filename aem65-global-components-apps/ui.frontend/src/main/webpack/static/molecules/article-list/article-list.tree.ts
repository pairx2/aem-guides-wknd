import {
  treeConfig,
  UIComponent,
  ComponentVariant,
} from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import articleList from './article-list.html';

// Define a story
const articleListStory = new UIComponent('Article List');

// Define Variant
const defaultVariant = new ComponentVariant('Default', articleList);

// Add variants to story
articleListStory.addVariant(defaultVariant);

// Add story to tree
treeConfig.addComponentToCategory(articleListStory, 'organisms');
