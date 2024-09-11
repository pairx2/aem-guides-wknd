import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import layoutContainerPlainHtml from './layout-container.html';
import layoutFullWidthContainer from './layout-container-full-width.html';
import layout2ContainerPlainHtml from './layout-container-2.html';
import layout3ContainerPlainHtml from './layout-container-3.html';
import layout4ContainerPlainHtml from './layout-container-4.html';

// Story
const layoutStory = new UIComponent('Layout Container');

// Variants
let layoutVariant = new ComponentVariant('default',  layoutContainerPlainHtml);
let layoutFullWidthVariant = new ComponentVariant('Full width',  layoutFullWidthContainer);
let layout2Variant = new ComponentVariant('Two Column Layout',  layout2ContainerPlainHtml);
let layout3Variant = new ComponentVariant('Three Column Layout',  layout3ContainerPlainHtml);
let layout4Variant = new ComponentVariant('Four Column Layout',  layout4ContainerPlainHtml);

layoutStory.addVariant(layoutVariant);
layoutStory.addVariant(layoutFullWidthVariant);
layoutStory.addVariant(layout2Variant);
layoutStory.addVariant(layout3Variant);
layoutStory.addVariant(layout4Variant);

treeConfig.addComponentToCategory(layoutStory, 'molecules');
