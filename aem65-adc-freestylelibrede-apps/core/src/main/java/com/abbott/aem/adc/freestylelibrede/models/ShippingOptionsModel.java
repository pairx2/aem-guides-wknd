package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import javax.inject.Inject;
import java.util.List;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/shipping-options")
public interface ShippingOptionsModel extends BaseComponentProperties{

	/** The shipping options heading. */
	@Inject
	String getShippingOptionsHeading();

	/** The order shipping options info. */
	@Inject
	String getShippingOptionsInfo();

	/** The shipping list. */
	@Inject
	@Via(type = ChildResource.class)
	List<ShippingList> getShippingList();

	/**
	 * The Class ShippingList.
	 */
	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface ShippingList {

		/** The shipping type. */
		@Inject
		String getShippingType();

		/** The shipping icon. */
		@Inject
		String getShippingIcon();

		/** The shipping code. */
		@Inject
		String getShippingCode();
	}

}
