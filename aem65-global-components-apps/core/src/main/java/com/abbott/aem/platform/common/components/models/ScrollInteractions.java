package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

import java.util.List;

@ConsumerType
public interface ScrollInteractions extends Component {
    
    default String getLayout() {
        throw new UnsupportedOperationException();
    }
    
    default boolean isUseContainer() {
        throw new UnsupportedOperationException();
    }
    
    default List<Layer> getLayers() {
        throw new UnsupportedOperationException();
    }
    
    default String getBackgroundColorStyle(boolean isRadialGradientPresent) {
        throw new UnsupportedOperationException();
    }

    default String getGradientType() {
        throw new UnsupportedOperationException();
    }

    String getRadialGradient();

    String convertSolidColorToGradient(String s);

    String getBackgroundColor();

    String getRadialGradientAlignment();

    String getRadialGradientSize();

    String getAdvancedGradientAlignment();

    String getStartColor();

    String getEndColor();

    String getStartColorPosition();
    String getEndColorPosition();
}