package com.abbott.aem.platform.common.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.export.json.ComponentExporter;

/**
 * The Interface Video.
 */
@ConsumerType
public interface Video extends ComponentExporter {

	default List<VideoSource> getSources() {
		throw new UnsupportedOperationException();
	}

	default String getVideoType() {
		throw new UnsupportedOperationException();
	}

	default String getAccountID() {

		throw new UnsupportedOperationException();
	}

	default String getVideoID() {
		throw new UnsupportedOperationException();
	}

	default String getPlayerID() {
		throw new UnsupportedOperationException();
	}

	default String getDamVideo() {
		throw new UnsupportedOperationException();
	}

	default String getVideoIframeTitle() {
		throw new UnsupportedOperationException();
	}

	default String getVideoURL() {
		throw new UnsupportedOperationException();
	}

	default String getVideoSize() {
		throw new UnsupportedOperationException();
	}

	default String getOrgID() {
		throw new UnsupportedOperationException();
	}

	default String getMediaID() {
		throw new UnsupportedOperationException();
	}

	default String getLimelightPlayerID() {
		throw new UnsupportedOperationException();
	}

	default Boolean getAutoPlay() {
		throw new UnsupportedOperationException();
	}

	default String getVideoCaption() {
		throw new UnsupportedOperationException();
	}

	default String getVideoTranScriptText() {
		throw new UnsupportedOperationException();
	}
	default String getVideoIframeLang() {
		throw new UnsupportedOperationException();
	}

	default String getId() {
		throw new UnsupportedOperationException();
	}
	
	default String getPlayerType() {
		throw new UnsupportedOperationException();
	}
	
	default String getVideoControlOn() {
		throw new UnsupportedOperationException();
	}
	
	default String getAudioControlOn() {
		throw new UnsupportedOperationException();
	}
	
	default Boolean getLoopOn() {
		throw new UnsupportedOperationException();
	}
	
	default Boolean getAutoplayMobileView() {
		throw new UnsupportedOperationException();
	}
	
	default String getFileReference() {
		throw new UnsupportedOperationException();
	}
	default String getAlt() {
		throw new UnsupportedOperationException();
	}
	default String getVideoAlignment() {
		throw new UnsupportedOperationException();
	}
	default String getCaptionPlacement() {
		throw new UnsupportedOperationException();
	}
	default String getUrlIndex() {
		throw new UnsupportedOperationException();
	}

	default String getWistiaVideoID() {
		throw new UnsupportedOperationException();
	}
	
	default String getVideoDocumentNumber() {
		throw new UnsupportedOperationException();
	}
	
	default String getImagePath() {
		throw new UnsupportedOperationException();
	}
	
	default String getImageAltText() {
		throw new UnsupportedOperationException();
	}
	
	default String getEmbedOption() {
		throw new UnsupportedOperationException();
	}

	default String getFallBackImage() {
		throw new UnsupportedOperationException();
	}

	default String getLimeLightFallBackImage() {
		throw new UnsupportedOperationException();
	}

	default String getDamFallBackImage() {
		throw new UnsupportedOperationException();
	}

	default String getWistiaFallBackImage() {
		throw new UnsupportedOperationException();
	}
}