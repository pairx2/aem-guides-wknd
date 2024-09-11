package com.abbott.aem.an.abbottstore.models;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * @author saikrishna.s
 * 
 *         Brand Navigation
 * 
 *         Brand Navigation is the SlingModel to hold the details of individual
 *         Brand Navigation
 * 
 *         Version Number: 1.0
 *
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BrandNavigation {

	/** The max items. */
	@ValueMapValue
	private String maxItems;

	/** The count. */
	private int count = 0;

	/** The max items list. */
    @Getter
	private List<Integer> maxItemsList;

	/**
	 * Init method to get list of items.
	 */
	@PostConstruct
	public void init() {
		if (maxItems != null)
			count = Integer.parseInt(maxItems);
		maxItemsList = new ArrayList<>();
		for (int i = 1; i <= count; i++) {
			maxItemsList.add(i);
		}
	}

	/**
	 * Gets the max items.
	 *
	 * @return the max items
	 */
	public String getMaxItems() {
		return maxItems;
	}


}
