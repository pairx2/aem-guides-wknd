/**
 *
 */

package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.Product;

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
	   adapters = { Product.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductImpl implements Product {

	@ValueMapValue
	@Getter
	@Setter
	private String productTitle;

	@ValueMapValue
	@Getter
	@Setter
	private String productId;

	@ValueMapValue
	@Getter
	@Setter
	private String productImage;

	@ValueMapValue
	@Getter
	@Setter
	private String productAltText;

	@ValueMapValue
	@Getter
	@Setter
	private boolean badgeChecked;

	@ValueMapValue
	@Getter
	@Setter
	private String badgePosition;
}
