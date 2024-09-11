package com.abbott.aem.an.similac.core.models;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

/**
 * This model class is used to get multifield value from component as resource.
 * @author  Cognizant
 * @version 1.0
 */
@Model(adaptables = Resource.class)
public class ItemsMultiFieldReader {

    @Inject
    @Optional
    public Resource items;

}