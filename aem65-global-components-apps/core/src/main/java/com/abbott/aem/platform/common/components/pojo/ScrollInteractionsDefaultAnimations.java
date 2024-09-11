package com.abbott.aem.platform.common.components.pojo;

import com.abbott.aem.platform.common.components.models.ScrollInteractions;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ScrollInteractionsDefaultAnimations implements ScrollInteractionsAnimations{
    
    private final List<ScrollInteractionsDetails> scrollInteractionsDetails = new ArrayList<>();
    private final Map<String,String> backgroundStylesDataAttributes;
    
    public ScrollInteractionsDefaultAnimations(@NonNull List<ScrollInteractions> scrollInteractions) {
        backgroundStylesDataAttributes = new HashMap<>();
        boolean isRadialGradientPresent = scrollInteractions.stream().anyMatch(scrollInteraction -> scrollInteraction.getGradientType().equalsIgnoreCase("Radial"));
        for (int i = 0; i < scrollInteractions.size() ; i++) {
            final int id = i+1;
            final String panelId = "panel" + id;
            scrollInteractionsDetails.add(new ScrollInteractionsDetails(panelId,scrollInteractions.get(i)));
            backgroundStylesDataAttributes.put(
                    "data-panelbg"+id,
                    scrollInteractions.get(i).getBackgroundColorStyle(isRadialGradientPresent));
        }
    }
    
    @Override
    public List<ScrollInteractionsDetails> getPanels() {
        return Collections.unmodifiableList(scrollInteractionsDetails);
    }
    
    @Override
    public Map<String, String> getBackgroundStylesDataAttributes() {
        return Collections.unmodifiableMap(backgroundStylesDataAttributes);
    }
    
    @Override
    public List<ScrollInteractionsDetails> getScrollInteractionsDetails() {
        return Collections.unmodifiableList(scrollInteractionsDetails);
    }
}
