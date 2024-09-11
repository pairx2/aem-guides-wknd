import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import poiLocatorSearchBarHtml from './poi-locator-search-bar.html';

const poiLocatorSearchBarStory = new UIComponent('POI Locator Search Bar');

const defaultVariant = new ComponentVariant('Default', poiLocatorSearchBarHtml);

poiLocatorSearchBarStory.addVariant(defaultVariant);

treeConfig.addComponentToCategory(poiLocatorSearchBarStory, 'molecules');
