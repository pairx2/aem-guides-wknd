package com.abbott.aem.an.abbottstore.models;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

/**
 *
 * @author saikrishna.s
 * 
 *         Information Banner
 * 
 *         Information Banner is the SlingModel to get the details of
 *         Information Banner List.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class InformationBannerModel {

	/** The bg image ref. */
	@ValueMapValue
	private String bgImageRef;

	/** The promotional info items. */
	@Getter
	@ChildResource(name = "infoItems")
	private List<InformationBanner> infoBannerItems;

	/**
	 * Gets the bg image ref.
	 *
	 * @return the bg image ref
	 */
	public String getBgImageRef() {
		return bgImageRef;
	}

}
