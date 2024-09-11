import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import paginationHtml from './pagination.html';

const paginationStory = new UIComponent('Pagination');

const defaultVariant = new ComponentVariant('Default', paginationHtml);

paginationStory.addVariant(defaultVariant);

treeConfig.addComponentToCategory(paginationStory, 'atoms');
