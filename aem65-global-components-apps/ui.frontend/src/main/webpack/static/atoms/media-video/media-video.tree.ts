import { treeConfig, UIComponent, ComponentVariant, Knob } from '../../../styleguide/framework/AEMPUnkTree/punk-tree';
import mediaVideoHTML from './media-video.html';
import mediaVideoHTML5PlayerHTML from './media-video-html5-player.html';
import mediaVideoBrightcoveHTML from './media-video-brightcove.html';
import mediaVideoLimelightHTML from './media-video-limelight.html';

// Define a story
const mediaVideoStory = new UIComponent('Media Video');

// Define Variant
const defaultVariant = new ComponentVariant('Default', mediaVideoHTML);
const mediaVideoHTML5PlayerVariant = new ComponentVariant('HTML5 Player', mediaVideoHTML5PlayerHTML);
const mediaVideoBrightcoveVariant = new ComponentVariant('Brightcove', mediaVideoBrightcoveHTML);
const mediaVideoLimelightVariant = new ComponentVariant('Limelight', mediaVideoLimelightHTML);

// Add variants to story
mediaVideoStory.addVariant(defaultVariant);
mediaVideoStory.addVariant(mediaVideoHTML5PlayerVariant);
mediaVideoStory.addVariant(mediaVideoBrightcoveVariant);
mediaVideoStory.addVariant(mediaVideoLimelightVariant);

// Knobs
// Iframe Name
const videoPlayerNameKnob = new Knob('video-player-name', 'Video Player Name', 'text', null, 'Video Frame');
// Video Internal Source Path
const videoInternalSourcePathKnob = new Knob('video-internal-source-path', 'Video Internal Source Path', 'text', null, 'https://www.youtube.com/embed/E0PmJgWNBpI');
// Video Internal Source Type
const videoInternalSourceTypeKnob = new Knob('video-internal-source-type', 'Video Internal Source Type', 'text', null, 'video/mp4');
// Video External Source Path
const videoExternalSourcePathKnob = new Knob('video-external-source-path', 'Video External Source Path', 'text', null, 'https://www.youtube.com/embed/ot41BR_1rf0');
// brightcove account id
const videoBrightcoveAccountIdKnob = new Knob('video-brightcove-account-id', 'Video Brightcove Account Id', 'text', null, '1336131408001');
// brightcove player id
const videoBrightcovePlayerIdKnob = new Knob('video-brightcove-player-id', 'Video Brightcove Player Id', 'text', null, '6109511061001');
// brightcove video id
const videoBrightcoveVideoIdKnob = new Knob('video-brightcove-video-id', 'Video Brightcove Video Id', 'text', null, 'TNkY27yeX');
// Limelight Organization id
const videoLimelightOrgIdKnob = new Knob('video-limelight-org-id', 'Video Limelight Organization Id', 'text', null, 'b0029788f6f3415db64a9cf5452f5200');
// Limelight player id
const videoLimelightPlayerIdKnob = new Knob('video-limelight-player-id', 'Video Limelight Player Id', 'text', null, '6d3d54e7af6d4271a84af1a27e91cde1');
// Limelight media id
const videoLimelightMediaIdKnob = new Knob('video-limelight-media-id', 'Video Limelight Media Id', 'text', null, '654805');
// Video Autoplay
const videoAutoplay = new Knob('video-autoplay', 'Video Autoplay', 'text', null, 'false');
// Video Alternate Text
const videoAltTextKnob = new Knob('video-alt-text', 'Video Alternate Text', 'text', null, 'alt text content');
// Video Caption Text
const videoCaptionTextKnob = new Knob('video-caption-text', 'Video Caption Text', 'text', null, 'Caption Text');

// Add the Knobs to variants
//Default Variant
defaultVariant.addKnob(videoPlayerNameKnob);
defaultVariant.addKnob(videoAutoplay);
defaultVariant.addKnob(videoExternalSourcePathKnob);
defaultVariant.addKnob(videoAltTextKnob);
defaultVariant.addKnob(videoCaptionTextKnob);
//Video With Custom HTM5 Player Variant
mediaVideoHTML5PlayerVariant.addKnob(videoPlayerNameKnob);
mediaVideoHTML5PlayerVariant.addKnob(videoAutoplay);
mediaVideoHTML5PlayerVariant.addKnob(videoInternalSourcePathKnob);
mediaVideoHTML5PlayerVariant.addKnob(videoInternalSourceTypeKnob);
mediaVideoHTML5PlayerVariant.addKnob(videoAltTextKnob);
mediaVideoHTML5PlayerVariant.addKnob(videoCaptionTextKnob);
// Video with Brightcove Variant
mediaVideoBrightcoveVariant.addKnob(videoAutoplay);
mediaVideoBrightcoveVariant.addKnob(videoBrightcoveAccountIdKnob);
mediaVideoBrightcoveVariant.addKnob(videoBrightcovePlayerIdKnob);
mediaVideoBrightcoveVariant.addKnob(videoBrightcoveVideoIdKnob);
mediaVideoBrightcoveVariant.addKnob(videoCaptionTextKnob);
// Video with Limelight Variant
mediaVideoLimelightVariant.addKnob(videoAutoplay);
mediaVideoLimelightVariant.addKnob(videoLimelightOrgIdKnob);
mediaVideoLimelightVariant.addKnob(videoLimelightPlayerIdKnob);
mediaVideoLimelightVariant.addKnob(videoLimelightMediaIdKnob);
mediaVideoLimelightVariant.addKnob(videoCaptionTextKnob);

// Add story to tree
treeConfig.addComponentToCategory(mediaVideoStory, 'atoms');
