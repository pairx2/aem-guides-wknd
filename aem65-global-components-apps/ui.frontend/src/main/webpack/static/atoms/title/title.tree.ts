import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import titleOverview from './title-default.html';
import titleH1TextHTML from './title-h1.html';
import titleH2TextHTML from './title-h2.html';
import titleH3TextHTML from './title-h3.html';
import titleH4TextHTML from './title-h4.html';
import titleH5TextHTML from './title-h5.html';
import titleH6TextHTML from './title-h6.html';
import titleAlignmentHTML from './titlealignment.html';
import subtitleTextHTML from './title-with-subtitle.html';
import sectionTitleHTML from './title-section.html';
import subTitleh4HTML from './title-with-subtitle-h4.html';
import titleTooltip from './title-with-tooltip.html';


// Define a story
const titleStory = new UIComponent('Title');

// Define Variant
const defaultVariant = new ComponentVariant('Default', titleOverview );
// h2 variant
const h2Variant = new ComponentVariant('H2 Title', titleH2TextHTML );
// h3 variant
const h3Variant = new ComponentVariant('H3 Title', titleH3TextHTML );
// h4 variant
const h4Variant = new ComponentVariant('H4 Title', titleH4TextHTML );
// h5 variant
const h5Variant = new ComponentVariant('H5 Title', titleH5TextHTML );
// h6 variant
const h6Variant = new ComponentVariant('H6 Title', titleH6TextHTML );
//left full text varient
const titleAlignmentVarient = new ComponentVariant('Title Text Alignment', titleAlignmentHTML );

// Subtitle variant
const subtitleVariant = new ComponentVariant('Title with subtitle', subtitleTextHTML );

// Subtitle variant
const sectionTitleVariant = new ComponentVariant('Section title', sectionTitleHTML );
const subTitleH4Variant = new ComponentVariant('Title with subtitle h4', subTitleh4HTML );

// tooltip variant
const titleTooltipVariant = new ComponentVariant('Title with tooltip', titleTooltip);


// Add variants to story
titleStory.addVariant(defaultVariant);
titleStory.addVariant(h2Variant);
titleStory.addVariant(h3Variant);
titleStory.addVariant(h4Variant);
titleStory.addVariant(h5Variant);
titleStory.addVariant(h6Variant);
titleStory.addVariant(titleAlignmentVarient);
titleStory.addVariant(subtitleVariant);
titleStory.addVariant(subTitleH4Variant);
titleStory.addVariant(titleTooltipVariant);
titleStory.addVariant(sectionTitleVariant);

// Knobs

// Plain text
const titleTextKnob = new Knob('plain-title', 'Title Text', 'text', null, 'This is a sample title');
const subtitleTextKnob = new Knob('plain-subtitle', 'Title Text', 'text', null, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry');

let sectionTitleKnob = new Knob('section-title-class', 'Section title class', 'dropdown', ['dark', 'light', 'transparent', 'secondary']);
let textalignment = new Knob('title-alignment-class', 'Title Alignment class','dropdown', ['text-left', 'text-right','text-center']);
let sectionTitleRoundedKnob = new Knob('section-title-rounded-class', 'Section title rounded class', 'dropdown', ['','rounded']);
let titleContentFit = new Knob('title-content-fit-container-class', 'Within Container class','dropdown', ['','container']);

defaultVariant.addKnob(titleTextKnob);
defaultVariant.addKnob(textalignment);
h2Variant.addKnob(titleTextKnob);
h3Variant.addKnob(titleTextKnob);
h4Variant.addKnob(titleTextKnob);
h5Variant.addKnob(titleTextKnob);
h6Variant.addKnob(titleTextKnob);
titleAlignmentVarient.addKnob(titleTextKnob);
titleAlignmentVarient.addKnob(textalignment);
titleAlignmentVarient.addKnob(titleContentFit);
subtitleVariant.addKnob(subtitleTextKnob);
subtitleVariant.addKnob(titleTextKnob);
sectionTitleVariant.addKnob(sectionTitleKnob);
sectionTitleVariant.addKnob(titleContentFit);
sectionTitleVariant.addKnob(sectionTitleRoundedKnob);

subTitleH4Variant.addKnob(subtitleTextKnob);
subTitleH4Variant.addKnob(titleTextKnob);

titleTooltipVariant.addKnob(titleTextKnob);

// Add story to tree
treeConfig.addComponentToCategory(titleStory, 'atoms');