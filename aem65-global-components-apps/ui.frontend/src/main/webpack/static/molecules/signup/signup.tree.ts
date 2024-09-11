import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import signupPlainTextHTML from './signup.html';
import signupAPlainTextHTML from './signup-a.html';
import signupBPlainTextHTML from './signup-b.html';
import signupIconPlainTextHTML from './signup-icon.html';

// Define a story
const signUpStory = new UIComponent('Sign up');

// Define Variant
const defaultVariant = new ComponentVariant('Default', signupPlainTextHTML);
const signupAVariant = new ComponentVariant('Icon left', signupAPlainTextHTML);
const signupBVariant = new ComponentVariant('Icon Right', signupBPlainTextHTML);
const signupIconVariant = new ComponentVariant('Only icon', signupIconPlainTextHTML);

// Add variants to story
signUpStory.addVariant(defaultVariant);
signUpStory.addVariant(signupAVariant);
signUpStory.addVariant(signupBVariant);
signUpStory.addVariant(signupIconVariant);

// Add story to tree
treeConfig.addComponentToCategory(signUpStory, 'molecules');
