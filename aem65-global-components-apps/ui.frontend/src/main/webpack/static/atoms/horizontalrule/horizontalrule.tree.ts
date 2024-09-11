import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import horizontalRuleHtml from './horizontalrule.html';

// Story
const horizontalRuleStory = new UIComponent('Horizontal Rule');

// Variants
let defaultVariant = new ComponentVariant('default',  horizontalRuleHtml);


const ruleColorKnob = new Knob('rule-color', 'Rule Color', 'dropdown',['a-rule--black', 'a-rule--white']);

horizontalRuleStory.addVariant(defaultVariant);

defaultVariant.addKnob(ruleColorKnob);


treeConfig.addComponentToCategory(horizontalRuleStory, 'atoms');
