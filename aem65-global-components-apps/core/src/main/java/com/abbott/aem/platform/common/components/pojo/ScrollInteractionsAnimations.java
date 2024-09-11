package com.abbott.aem.platform.common.components.pojo;

import java.util.List;
import java.util.Map;

public interface ScrollInteractionsAnimations {
    
    List<ScrollInteractionsDetails> getPanels();
    
    Map<String, String> getBackgroundStylesDataAttributes();
    
    List<ScrollInteractionsDetails> getScrollInteractionsDetails();
}
