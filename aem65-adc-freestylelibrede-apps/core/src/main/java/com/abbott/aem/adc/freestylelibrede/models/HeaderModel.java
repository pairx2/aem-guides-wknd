package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import org.apache.sling.models.annotations.Default;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/structure/header")
public class HeaderModel  extends BaseComponentPropertiesImpl {

    @Inject
    @Default(values = "v1-rendition")
    private String rendition;
    
    @ChildResource
    List<LinksHeaderModel> linksHeader;

    public String getRendition(){
        return this.rendition;
    }

    public List<LinksHeaderModel> getLinksHeader(){
        return Collections.unmodifiableList(new ArrayList<>(this.linksHeader));
    }
}