package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import java.util.List;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,resourceType = "adc/freestylelibrede/components/content/panel")
public interface PanelModel extends BaseComponentProperties{

    @Inject
    String getImage();
	
	@Inject
    String getDeepLinkText();
	
	@Inject
    String getDeepLinkTarget();
    
	@Externalize
    String getDeepLink();
	
	@Inject
    String getAltText();
    

    @ChildResource
    List<PanelItemModel> getItems();

}
