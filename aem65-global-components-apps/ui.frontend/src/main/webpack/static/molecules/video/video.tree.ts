import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import video from './video.html';
import smallVideo from './video-variation-small.html';
import mediumVideo from './video-variation-medium.html';
import largeVideo from './video-variation-large.html';

// Define a story
const videoStory = new UIComponent('Video');

// Define Variant
const videoVariant = new ComponentVariant('Video Overview', video);
const smallVariant = new ComponentVariant('Small Video', smallVideo);
const mediumVariant = new ComponentVariant('Medium Video', mediumVideo);
const largeVariant = new ComponentVariant('Large Video', largeVideo);

const alignmentKnob = new Knob('alignment', 'Alignment', 'dropdown', ['m-video--center', 'm-video--start', 'm-video--end']);
const captionKnob = new Knob('caption-mode', 'Caption Mode', 'dropdown', ['m-video--caption-light', 'm-video--caption-dark']);

videoVariant.addKnob(alignmentKnob);
videoVariant.addKnob(captionKnob);
smallVariant.addKnob(alignmentKnob);
smallVariant.addKnob(captionKnob);
mediumVariant.addKnob(alignmentKnob);
mediumVariant.addKnob(captionKnob);
largeVariant.addKnob(alignmentKnob);
largeVariant.addKnob(captionKnob);

// Add variants to story
videoStory.addVariant(videoVariant);
videoStory.addVariant(smallVariant);
videoStory.addVariant(mediumVariant);
videoStory.addVariant(largeVariant);



// Add story to tree
treeConfig.addComponentToCategory(videoStory, 'molecules');
