import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import poiLocatorResultsHtml from './poi-locator-results.html';
import poiLocatorResultsVerticalHtml from './poi-locator-results-vertical.html';

const poiLocatorResultsStory = new UIComponent('POI Locator Results');

const defaultVariant = new ComponentVariant('Default', poiLocatorResultsHtml);
const verticalVariant = new ComponentVariant('Vertical View', poiLocatorResultsVerticalHtml);

poiLocatorResultsStory.addVariant(defaultVariant);
poiLocatorResultsStory.addVariant(verticalVariant);

treeConfig.addComponentToCategory(poiLocatorResultsStory, 'molecules');
