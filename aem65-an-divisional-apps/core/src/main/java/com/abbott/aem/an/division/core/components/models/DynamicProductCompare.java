package com.abbott.aem.an.division.core.components.models;

import java.io.IOException;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.an.division.core.models.dynamicproduct.Product;
import com.abbott.aem.an.division.core.services.PIMConfigurationService;
import com.abbott.aem.an.division.core.utils.Utils;


import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class, SlingHttpServletResponse.class }, adapters = {
		DynamicProductCompare.class }, resourceType = {
				DynamicProductCompare.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public class DynamicProductCompare {

	public static final String RESOURCE_TYPE = "an/division/components/content/dynamic-product-compare";

	@OSGiService
	private PIMConfigurationService pimConfigs;

	@SlingObject
	private SlingHttpServletResponse response;

	@SlingObject
	private SlingHttpServletRequest request;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String dataSource;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String sessionStorageLoc;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String resultsLayout;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String minComparision;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String maxComparision;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String buttonLabel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String imgRemoveIcon;

	@Inject
	private String productId;

	@Inject
	private String defaultFormulationCode;

	public List<Product> getMultiproduct() throws IOException {
		Utils objUtils = new Utils();
		List<Product> lstProduct = null;
		if (!checkQueryStringRedirect(objUtils)) {			
			if (objUtils.isAuthorMode(pimConfigs)) {
				RequestParameter productids = request.getRequestParameter("productids");
				if (productids == null) {
					// In Edit mode have default IDs if not provided to render comparison page
					this.productId = "4,175";
				}
				lstProduct = objUtils.getMultiProductFromPIM(this.productId,pimConfigs);
			} else {
				lstProduct = objUtils.getMultiProductFromPIM(this.productId, pimConfigs);
			}
			return lstProduct;
		} else {
			response.sendRedirect("/content/an/abbottnutrition/us/en/our-products.html");
			return lstProduct;
		}
	}

	private boolean checkQueryStringRedirect(Utils objUtils) {
		boolean isredirect = false;
		int minComparisionValue = 2; 
		int maxComparisionValue = 4;
		if (objUtils.isAuthorMode(pimConfigs)) {
			return isredirect;
		}
		RequestParameter productids = request.getRequestParameter("productids");
		if (productids == null) {
			isredirect = true;
			return isredirect;
		} else {
			if (this.productId.isBlank()) {
				isredirect = true;
				return isredirect;
			}
			if (!(this.minComparision == null || this.minComparision.isEmpty()))
				minComparisionValue = Integer.valueOf(this.minComparision);
			if (!(this.maxComparision == null || this.maxComparision.isEmpty()))
				maxComparisionValue = Integer.valueOf(this.maxComparision);
			String[] mproduct = this.productId.split(",");
			if (!(mproduct.length >= minComparisionValue && mproduct.length <= maxComparisionValue))
				isredirect = true;
		}
		return isredirect;

	}

	
}
