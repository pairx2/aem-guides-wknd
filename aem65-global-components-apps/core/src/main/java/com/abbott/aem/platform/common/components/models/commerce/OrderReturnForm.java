package com.abbott.aem.platform.common.components.models.commerce;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface OrderReturnForm {

    default String getId() { throw new UnsupportedOperationException(); }

    default String getItemsLabel() { throw new UnsupportedOperationException(); }

    default String getItemsQtyLabel() { throw new UnsupportedOperationException(); }

    default String getCommentLabel() { throw new UnsupportedOperationException(); }

    default String getCommentPlaceholder() { throw new UnsupportedOperationException(); }

    default String getSuccessPagePath() { throw new UnsupportedOperationException(); }

}
