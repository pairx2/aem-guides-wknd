package com.abbott.aem.platform.common.components.models.impl.v1;



import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;



import com.abbott.aem.platform.common.components.models.POILocatorResultItems;


import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = Resource.class,
	   adapters = { POILocatorResultItems.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class POILocatorResultItemImpl  implements POILocatorResultItems {


	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String resultKey;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String resultLabel;

	
	
}
