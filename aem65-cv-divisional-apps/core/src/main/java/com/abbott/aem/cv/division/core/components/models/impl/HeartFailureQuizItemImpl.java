package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.HeartFailureQuizItem;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


/**
 * The type Heart failure quiz item.
 */
@Model(adaptables = Resource.class,
        adapters = {HeartFailureQuizItem.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeartFailureQuizItemImpl implements HeartFailureQuizItem {

   
    @ValueMapValue
    @Getter
    public String questionText;

    
    @ValueMapValue
    @Getter
    public String questionImagePath;


    @ValueMapValue
    @Getter
    public String imageAltText;

}
