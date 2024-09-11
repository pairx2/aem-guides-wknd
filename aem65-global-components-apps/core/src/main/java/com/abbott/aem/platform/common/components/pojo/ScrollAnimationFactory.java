package com.abbott.aem.platform.common.components.pojo;

import com.abbott.aem.platform.common.components.models.ScrollInteractions;

import java.util.List;

public class ScrollAnimationFactory {

    public ScrollInteractionsAnimations createScrollInteractionsAnimations(String animation,  List<ScrollInteractions> scrollInteractions){
        if (animation.equals("default")) {
			return new ScrollInteractionsDefaultAnimations(scrollInteractions);
		} else {
			return null;
		}
    }
 }