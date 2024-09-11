package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface CQResponsiveModel {

    @ChildResource
    Breakpoint getDefault();

    @ChildResource
    Breakpoint getPhone();

    @ChildResource
    Breakpoint getTablet();

}