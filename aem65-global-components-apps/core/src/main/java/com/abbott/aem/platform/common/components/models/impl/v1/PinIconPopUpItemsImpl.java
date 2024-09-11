package com.abbott.aem.platform.common.components.models.impl.v1;



import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;




import com.abbott.aem.platform.common.components.models.PinIconPopUpItems;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = Resource.class,
       adapters = { PinIconPopUpItems.class },
       defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PinIconPopUpItemsImpl  implements PinIconPopUpItems {


   @Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
    private String pinIconPopUpKey;

    @Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
    private String pinIconPopUpLabel;

    
    
}