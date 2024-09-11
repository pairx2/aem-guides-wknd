import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import popUpHTML from './pop-up.html';
import popUpWithIconHTML from './pop-up-icon.html';
import popUpExternalLinkHTML from './pop-up-external-link.html';
import popUpSiteEnteringHTML from './pop-up-site-entering.html';
import popUpWithImageHTML from './pop-up-with-image.html';

// Define a story
const popUpStory = new UIComponent('Pop up');

// Define Variant
const defaultVariant = new ComponentVariant('Default', popUpHTML);
const popUpIconTitleVariant = new ComponentVariant('Pop up with icon', popUpWithIconHTML);
const popUpExternalLinkVariant = new ComponentVariant('External link pop up', popUpExternalLinkHTML);
const popUpSiteEnteringVariant = new ComponentVariant('Site Entering pop up', popUpSiteEnteringHTML);
const popUpWithImageVariant = new ComponentVariant('Pop up with image', popUpWithImageHTML);

// Add variants to story
popUpStory.addVariant(defaultVariant);
popUpStory.addVariant(popUpIconTitleVariant);
popUpStory.addVariant(popUpExternalLinkVariant);
popUpStory.addVariant(popUpSiteEnteringVariant);
popUpStory.addVariant(popUpWithImageVariant);


const imageSourcePathKnob = new Knob('image-source-path', 'Image Source Path', 'text', null, '../../../public/resources/images/image.png');
const imageAltKnob = new Knob('image-alt-text', 'Image Alternate Text', 'text', null, 'Banner');

popUpWithImageVariant.addKnob(imageSourcePathKnob);
popUpWithImageVariant.addKnob(imageAltKnob);

// Add story to tree
treeConfig.addComponentToCategory(popUpStory, 'molecules');
