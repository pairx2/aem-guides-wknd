package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

public interface ImageWithAnimation extends Component {
    
    default String getMainImageFileReference() {
        throw new UnsupportedOperationException();
    }
    default String getAnimatedImageFileReference() {
        throw new UnsupportedOperationException();
    }
    default String getStaticImageFileReference() {
        throw new UnsupportedOperationException();
    }
}
