import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import formDataHtml from './form-data.html';
import formDataBottom from './form-data-bottom.html';
import formDataList from './form-data-list.html';
import formDataTopRight from './form-data-top-right.html';

// Story
const formDataStory = new UIComponent('Form Data');

// Variants
let formDataDefaultVariant = new ComponentVariant('default', formDataHtml);
let formDataBottomVariant = new ComponentVariant('Bottom Link', formDataBottom);
let formDataListVariant = new ComponentVariant('List', formDataList);
let formDataTopRightVariant = new ComponentVariant('Top Right Link', formDataTopRight);

formDataStory.addVariant(formDataDefaultVariant);
formDataStory.addVariant(formDataBottomVariant);
formDataStory.addVariant(formDataListVariant);
formDataStory.addVariant(formDataTopRightVariant);

treeConfig.addComponentToCategory(formDataStory, 'molecules');
