import { treeConfig, UIComponent, ComponentVariant} from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import DynamicCardRelatedList from './dynamic-card-list.html';
import DynamicCardPickUpList from './dynamic-card-list-pick-up.html';

// Story
const cardsCarouselStory = new UIComponent('Dynamic Card List');

// Variants
const dynamicCardListRelatedVariant = new ComponentVariant('Realted products-resources',  DynamicCardRelatedList);
const dynamicCardListPickUpVariant = new ComponentVariant('Pick up where left',  DynamicCardPickUpList);

cardsCarouselStory.addVariant(dynamicCardListRelatedVariant);
cardsCarouselStory.addVariant(dynamicCardListPickUpVariant);

treeConfig.addComponentToCategory(cardsCarouselStory, 'organisms');
