package com.abbott.aem.platform.common.components.models;

import java.util.List;
import org.osgi.annotation.versioning.ConsumerType;
import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface IconCta extends Component {

    default String getTitle(){
        throw new UnsupportedOperationException();
    }
    default boolean isCardAlignment(){
        throw new UnsupportedOperationException();
    }
    default String getId(){
        throw new UnsupportedOperationException();
    }
    default String getRuleColor(){
        throw new UnsupportedOperationException();
    }
    default boolean isTopMargin(){
        throw new UnsupportedOperationException();
    }
    default boolean isBottomMargin(){
        throw new UnsupportedOperationException();
    }
    default List<IconCtaItem> getMultifield() {
		throw new UnsupportedOperationException();
    }
}