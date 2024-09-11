import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import socialMediaHtml from './social-media.html';
import socialMediaDarkHTML from './social-media-dark-theme.html';

// ---- Define a story
const socialComponentStory = new UIComponent('social-media');

// ----------- Define Variant
const socialMediaVariant = new ComponentVariant('Default', socialMediaHtml);
const socialMediaDarkVariant = new ComponentVariant('Social Media Dark', socialMediaDarkHTML);

socialComponentStory.addVariant(socialMediaVariant);
socialComponentStory.addVariant(socialMediaDarkVariant);

// ---------------------define knobs
//Plain text
const socialMediaTitleKnob = new Knob('social-media-title', 'socila media title', 'text', null, 'follow us');

socialMediaVariant.addKnob(socialMediaTitleKnob);
socialMediaDarkVariant.addKnob(socialMediaTitleKnob);

treeConfig.addComponentToCategory(socialComponentStory, 'molecules');
