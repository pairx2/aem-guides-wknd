import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import mediaPaginationHTML from './media-pagination.html';
import mediaPaginationImagesHTML from './media-pagination-images.html';

// Story
const mediaPaginationStory = new UIComponent('Media Pagination');

// Variants
const mediaPaginationVariant = new ComponentVariant('Videos',  mediaPaginationHTML);
const mediaPaginationImageVariant = new ComponentVariant('Images',  mediaPaginationImagesHTML);

mediaPaginationStory.addVariant(mediaPaginationVariant);
mediaPaginationStory.addVariant(mediaPaginationImageVariant);


treeConfig.addComponentToCategory(mediaPaginationStory, 'organisms');
