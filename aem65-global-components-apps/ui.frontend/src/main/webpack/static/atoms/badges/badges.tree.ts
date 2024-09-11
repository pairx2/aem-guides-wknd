import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import badgesPlainTextHTML from './badges.html';
import badgesAlarmHTML from './badges-alarm.html';

// Define a story
const badgesStory = new UIComponent('Badges');

// Define Variant
const defaultVariant = new ComponentVariant('Default', badgesPlainTextHTML);
const alarmVariant = new ComponentVariant('Alarm', badgesAlarmHTML);

// Add variants to story
badgesStory.addVariant(defaultVariant);
badgesStory.addVariant(alarmVariant);

// Knobs

// Plain text
const badgesTextKnob = new Knob('badges-text', 'Badges Label', 'text', null, 'NEW');
defaultVariant.addKnob(badgesTextKnob);

// Circle Alttext
const alarmImgKnob = new Knob('alarm-img', 'Background Image', 'text', null, '../../../public/resources/images/alarm.svg');
const alarmAltTextKnob = new Knob('alarm-alttext', 'Alert TextLabel', 'text', null, 'NEW');
alarmVariant.addKnob(alarmAltTextKnob);
alarmVariant.addKnob(alarmImgKnob);

// Add story to tree
treeConfig.addComponentToCategory(badgesStory, 'atoms');
