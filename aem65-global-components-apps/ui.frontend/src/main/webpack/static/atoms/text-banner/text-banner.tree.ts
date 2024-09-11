import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import textBannerPlainTextHTML from './text-banner.html';

// Define a story
const textBannerStory = new UIComponent('Text Banner');

// Define Variant
const defaultVariant = new ComponentVariant('Default', textBannerPlainTextHTML);

// Add variants to story
textBannerStory.addVariant(defaultVariant);

// Plain text
const textBannerTextKnob = new Knob('banner-text', 'Text Banner', 'text', null, 'of several different metering system I have used this is by far the best.');
const gradientStart = new Knob('gradient-start', 'Gradient Start Color', 'text', null, 'rgba(0,0,0,0.5)');
const gradientStartPosition = new Knob('gradient-start-position', 'Gradient Start Position', 'text', null, '0%');
const gradientEnd = new Knob('gradient-end', 'Gradient End Color', 'text', null, 'rgba(0,0,0,0)');
const gradientEndPosition = new Knob('gradient-end-position', 'Gradient End Position', 'text', null, '100%');
const gradientKnob = new Knob('gradient', 'Gradient', 'dropdown',['a-text--banner--gradient-start', 'a-text--banner--gradient-center', 'a-text--banner--gradient-end'], '');
const randomKnob = new Knob('random', 'Random (dev only)', 'text',null, 'abcd');

defaultVariant.addKnob(gradientStart);
defaultVariant.addKnob(gradientStartPosition);
defaultVariant.addKnob(gradientEnd);
defaultVariant.addKnob(gradientEndPosition);
defaultVariant.addKnob(gradientKnob);
defaultVariant.addKnob(randomKnob);
defaultVariant.addKnob(textBannerTextKnob);

// Add story to tree
treeConfig.addComponentToCategory(textBannerStory, 'atoms');
