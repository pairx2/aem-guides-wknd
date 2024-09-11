import { treeConfig, UIComponent, ComponentVariant } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import formContainerHtml from './form-container.html';
import formContainerInlineHtml from './form-container-inline.html';

//Define story
const formContainerStory = new UIComponent('form container');

//define variants
const defaultVariant = new ComponentVariant('Default', formContainerHtml);
const inlineVariant = new ComponentVariant('Inline', formContainerInlineHtml);

//add variant to the story

formContainerStory.addVariant(defaultVariant);
formContainerStory.addVariant(inlineVariant);

//add story to the tree
treeConfig.addComponentToCategory(formContainerStory, 'organisms');
