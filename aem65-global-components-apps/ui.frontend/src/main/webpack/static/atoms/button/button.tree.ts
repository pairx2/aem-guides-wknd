import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import buttonHTML from './button.html';
import buttonLinkHTML from './button-link.html';


import buttonOverview from './button-overview.html';
import buttonImage from './button-image.html';
import buttonIconHTML from './button-icon.html';

import spinnerButton from './button-submit-spinner.html';

// Define a story
const buttonStory = new UIComponent('Button');

// button overview with class names
const buttonOverviewvariant = new ComponentVariant('Buttons Overview', buttonOverview );
const defaultVariant = new ComponentVariant('Default', buttonHTML );
const buttonLinkVariant = new ComponentVariant('Button link', buttonLinkHTML );
const buttonIconVariant= new ComponentVariant('Button Icon', buttonIconHTML);


// button image
const buttonImageVariant = new ComponentVariant('Buttons with Image', buttonImage);

//  submit button
const spinnerButtonVariant = new ComponentVariant('spinner', spinnerButton);


// Add variants to story
buttonStory.addVariant(buttonOverviewvariant);
buttonStory.addVariant(defaultVariant);
buttonStory.addVariant(buttonLinkVariant);
buttonStory.addVariant(buttonIconVariant);
buttonStory.addVariant(buttonImageVariant);
buttonStory.addVariant(spinnerButtonVariant);


const buttonTextKnob = new Knob('btn-text', 'Button Text', 'text', null, 'Button');
const buttonSizeKnob = new Knob('button-size', 'Button size', 'dropdown',['a-button--lg', 'a-button--md', 'a-button--sm']);
const buttonVariationKnob = new Knob('button-variations', 'Button variations', 'dropdown',['a-button--primary', 'a-button--primary-v1', 'a-button--primary-v2', 'a-button--secondary', 'a-button--secondary-v1', 'a-button--tertiary', 'a-button--danger']);
const buttonDisabledKnob = new Knob('button-disable', 'Button disable', 'dropdown',['', 'disabled']);
const buttonTypeKnob = new Knob('button-type', 'Button type', 'dropdown',['button', 'submit', 'reset', '']);
const buttonIconPositionKnob = new Knob('button-icon-position', 'Button icon position', 'dropdown',['', 'a-button--icon-left', 'a-button--icon-right']);

const buttonWidthKnob = new Knob('button-width', 'Button width', 'dropdown',['', 'a-button--full-width']);

const buttonOutlineKnob = new Knob('button-outline', 'Button outline', 'dropdown',['', 'a-button--outline']);
const buttonMobileKnob = new Knob('button-mob', 'Button mobile icon', 'dropdown',['', 'a-button--mobile-icon']);



defaultVariant.addKnob(buttonTextKnob);
defaultVariant.addKnob(buttonSizeKnob);
defaultVariant.addKnob(buttonVariationKnob);
defaultVariant.addKnob(buttonDisabledKnob);
defaultVariant.addKnob(buttonTypeKnob);
defaultVariant.addKnob(buttonIconPositionKnob);
defaultVariant.addKnob(buttonWidthKnob);
defaultVariant.addKnob(buttonOutlineKnob);
defaultVariant.addKnob(buttonMobileKnob);

buttonLinkVariant.addKnob(buttonTextKnob);
buttonLinkVariant.addKnob(buttonSizeKnob);
buttonLinkVariant.addKnob(buttonVariationKnob);
buttonLinkVariant.addKnob(buttonDisabledKnob);
buttonLinkVariant.addKnob(buttonIconPositionKnob);
buttonLinkVariant.addKnob(buttonWidthKnob);
buttonLinkVariant.addKnob(buttonOutlineKnob);
buttonLinkVariant.addKnob(buttonMobileKnob);




// Knobs
const buttonImagePathKnob = new Knob('image-source-path', 'Img Path', 'text', null, '/public/resources/images/app-store.png');

buttonImageVariant.addKnob(buttonImagePathKnob);

// Add story to tree
treeConfig.addComponentToCategory(buttonStory, 'atoms');
