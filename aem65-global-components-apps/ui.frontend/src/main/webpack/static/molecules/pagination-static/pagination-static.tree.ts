import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import paginationStaticHtml from './pagination-static.html';

const paginationStaticStory = new UIComponent('Pagination Static');

const defaultVariant = new ComponentVariant('Default', paginationStaticHtml);

paginationStaticStory.addVariant(defaultVariant);

treeConfig.addComponentToCategory(paginationStaticStory, 'molecules');
