import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import cardsCarouselHTML from './cards-carousel.html';
import cardsCarouselFeatureCardHTML from './cards-carousel-feature-card.html';

// Story
const cardsCarouselStory = new UIComponent('Cards Carousel');

// Variants
const cardsCarouselVariant = new ComponentVariant('default',  cardsCarouselHTML);
const cardsCarouselFeatureCardVariant = new ComponentVariant('Feature Card',  cardsCarouselFeatureCardHTML);

cardsCarouselStory.addVariant(cardsCarouselVariant);
cardsCarouselStory.addVariant(cardsCarouselFeatureCardVariant);


treeConfig.addComponentToCategory(cardsCarouselStory, 'organisms');
