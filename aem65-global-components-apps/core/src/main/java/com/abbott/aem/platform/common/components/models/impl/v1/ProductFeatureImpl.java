/**
 *
 */

package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.ProductFeature;

import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * @author tadigital
 */
@Model(adaptables = Resource.class,
	   adapters = { ProductFeature.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductFeatureImpl implements ProductFeature {

	@ValueMapValue
	@Getter
	@Setter
	private String featureName;

	@ValueMapValue
	@Getter
	@Setter
	private String featureId;
}
