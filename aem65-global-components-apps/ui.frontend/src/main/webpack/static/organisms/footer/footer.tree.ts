import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import footerHTML from './footer.html';

//Define story
const footerStory = new UIComponent('footer');

//define variants
const defaultVariant = new ComponentVariant('Default', footerHTML);

//add variant to the story

footerStory.addVariant(defaultVariant);

//knobs

//copyright plain text for footer
const copyrightTextKnob = new Knob('copyright-text', 'Copyright Text', 'text', null, '&#169; 2020 Abbott. All Rights Reserved.');
defaultVariant.addKnob(copyrightTextKnob);

//add story to the tree
treeConfig.addComponentToCategory(footerStory, 'organisms');