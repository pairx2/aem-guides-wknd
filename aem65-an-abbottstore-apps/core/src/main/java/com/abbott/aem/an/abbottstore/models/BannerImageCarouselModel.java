package com.abbott.aem.an.abbottstore.models;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * The Class BannerImageCarouselModel.
 * 
 * @author FATIMKX3
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BannerImageCarouselModel {

	/**
	 * The product page path res.
	 */
	@ChildResource(name = "bannerImageList")
	private Resource bannerImageCarouselRes;

	/**
	 * The nav items list.
	 */
	@Getter
	private List <ValueMap> bannerImageList;

	/**
	 * Post construct.
	 */
	@PostConstruct
	protected void postConstruct() {
		bannerImageList = new ArrayList <>();
		if (null != bannerImageCarouselRes && bannerImageCarouselRes.hasChildren()) {
			Iterator <Resource> childResourceList = bannerImageCarouselRes.listChildren();
			while (childResourceList.hasNext()) {
				Resource resource = childResourceList.next();
				if (resource != null) {
					ValueMap valueMap = resource.adaptTo( ValueMap.class );
					bannerImageList.add( valueMap );
				}
			}
		}

	}

}


