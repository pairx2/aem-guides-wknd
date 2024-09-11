package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.Product;
import com.abbott.aem.platform.common.components.models.ProductComparison;
import com.abbott.aem.platform.common.components.models.ProductFeature;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { ProductComparison.class, ComponentExporter.class },
	   resourceType = { ProductComparisonImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ProductComparisonImpl extends ComponentProxyImpl implements ProductComparison {
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/productcomparison/v1/productcomparison";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<ProductFeature> features;

	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<Product> products;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean tableLinkRequired;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String ariaDescription;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String startColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String startColorPosition;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String endColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String endColorPosition;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String borderStyle;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String borderColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String borderWidth;

	@Override
	public boolean isTableHeadingRequired() {
		if (products != null && !products.isEmpty()) {
			// Check if any of the product has either title or image.
			for (Product product : products) {
				if (StringUtils.isNotBlank(product.getProductTitle()) || StringUtils.isNotBlank(product.getProductImage())) {
					return true;
				}
			}
		}

		return false;
	}
}
