package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;
@ConsumerType
public interface VideoBanner extends Component {

    default Integer getNumberOfButtons() {
        throw new UnsupportedOperationException();
    }

    default String getStartColor() {
        throw new UnsupportedOperationException();
    }

    default String getEndColor() {
        throw new UnsupportedOperationException();
    }

    default Integer getStartColorPosition() {
        throw new UnsupportedOperationException();
    }

    default Integer getEndColorPosition() {
        throw new UnsupportedOperationException();
    }

    default String getFileReference() {
        throw new UnsupportedOperationException();
    }

    default String getDescription() {
        throw new UnsupportedOperationException();
    }
    default String getPlayIcon() {
        throw new UnsupportedOperationException();
    }
    default String getPlayIconLabel() {
        throw new UnsupportedOperationException();
    }
    default String getPlayPauseIconColor() {
        throw new UnsupportedOperationException();
    }
    default String getPauseIcon() {
        throw new UnsupportedOperationException();
    }
    default String getPauseIconLabel() {
        throw new UnsupportedOperationException();
    }
    default String getPauseIconColor() {
        throw new UnsupportedOperationException();
    }
    default String getTextAlignment() { throw new UnsupportedOperationException();}

    default String getTitle() {
        throw new UnsupportedOperationException();
    }
    default String getPretitle() {
        throw new UnsupportedOperationException();
    }

    public List<String> getListOfButtons();

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

    default String getPlayerType() {
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

    default String getId() {
        throw new UnsupportedOperationException();
    }

    default Boolean getPlayVideoInLoop() {
        throw new UnsupportedOperationException();
    }
    default String getMediaPositionforLargerScreen() {
        throw new UnsupportedOperationException();
    }
    default String getMediaPositionforDesktop() {
        throw new UnsupportedOperationException();
    }
    default String getMediaPositionforTablet() {
        throw new UnsupportedOperationException();
    }
    default String getMediaPositionforMobile() {
        throw new UnsupportedOperationException();
    }

    default String getDimorbrightenVideo() {
        throw new UnsupportedOperationException();
    }

    default String getContentHorizontalAlignment() {
        throw new UnsupportedOperationException();
    }
    default String getContentVerticalAlignment() {
        throw new UnsupportedOperationException();
    }
    default String getTextColor() {
        throw new UnsupportedOperationException();
    }
    default String getResponsiveTextLayout() {
        throw new UnsupportedOperationException();
    }
    default String getBackgroundMobileAndTablet() {
        throw new UnsupportedOperationException();
    }

    default String getUrlIndex() {
        throw new UnsupportedOperationException();
    }

    default String getVideoDocumentNumber() {
        throw new UnsupportedOperationException();
    }

}
