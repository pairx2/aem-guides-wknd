import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import linkPlainTextHTML from './link.html';
import linkAPlainTextHTML from './link-a.html';
import linkBPlainTextHTML from './link-b.html';
import linkCPlainTextHTML from './link-c.html';


// Define a story
const linkStory = new UIComponent('Link');

// Define Variant
const defaultVariant = new ComponentVariant('Default', linkPlainTextHTML);
const linkAVariant = new ComponentVariant('Link icon right', linkAPlainTextHTML);
const linkBVariant = new ComponentVariant('Link icon left', linkBPlainTextHTML);
const linkCVariant = new ComponentVariant('Only icon', linkCPlainTextHTML);

// Add variants to story
linkStory.addVariant(defaultVariant);
linkStory.addVariant(linkBVariant);
linkStory.addVariant(linkAVariant);
linkStory.addVariant(linkCVariant);
// Knobs

// Plain text
const linkTextKnob = new Knob('link-text', 'Link Text', 'text', null, 'Bluebird');
const linkTextTargetKnob = new Knob('link-text-target', 'Link target', 'text', null, '_blank');
const linkTextUrlKnob = new Knob('link-text-url', 'Link url', 'text', null, '#');
const linkId = new Knob('link-id', 'Link url', 'text', null, '');
const linkIconNameKnob = new Knob('link-text-icon', 'Link icon', 'text', null, "abt-icon-right-arrow");
const linkIconNameRightKnob = new Knob('link-text-icon', 'Link icon', 'text', null, "abt-icon-left-arrow");

defaultVariant.addKnob(linkTextKnob);
defaultVariant.addKnob(linkTextTargetKnob);
defaultVariant.addKnob(linkTextUrlKnob);
defaultVariant.addKnob(linkId);


linkAVariant.addKnob(linkTextKnob);
linkAVariant.addKnob(linkTextTargetKnob);
linkAVariant.addKnob(linkTextUrlKnob);
linkAVariant.addKnob(linkIconNameKnob);

linkBVariant.addKnob(linkTextKnob);
linkBVariant.addKnob(linkTextTargetKnob);
linkBVariant.addKnob(linkTextUrlKnob);
linkBVariant.addKnob(linkIconNameRightKnob);

linkCVariant.addKnob(linkTextTargetKnob);
linkCVariant.addKnob(linkTextUrlKnob);
linkCVariant.addKnob(linkIconNameKnob);

// Add story to tree
treeConfig.addComponentToCategory(linkStory, 'atoms');
