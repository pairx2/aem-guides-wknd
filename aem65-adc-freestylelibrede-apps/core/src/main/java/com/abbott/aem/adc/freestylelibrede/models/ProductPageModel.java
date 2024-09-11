package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import lombok.Getter;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ChildResource;

import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

@Model(adaptables=Resource.class, defaultInjectionStrategy=DefaultInjectionStrategy.OPTIONAL)
public class ProductPageModel {
		
		@Inject
		private String productDescription;
	    @Getter
		@Inject
		private List<ProductList> productList;

		@Self
		private Resource self;

		@Inject
		private ResourceResolver resourceResolver;

		@Inject
		private ExternalizerService externalizerService;

		@Inject
		private String quantityOrder;
		
		@Inject
		private String commonImage;

		@Inject
		private String label;

		@Inject
		private String templateType;

		@Inject
		private String layoutType;

		@Inject
		private String productBadgev2;
	
		@Inject
		private String productHeadlinev2;
	
		@Inject
		private String productDescriptionv2;
	
		@Inject
		private String selectionSublinev2;

		/**
		 * @return the label
		 */
		public String getLabel() {
			return label;
		}
		
		/**
		 * @return the quantityOrder
		 */
		public String getQuantityOrder() {
			return quantityOrder;
		}

		/**
		 * @return the productDescription
		 */
		public String getProductDescription() {
			return productDescription;
		}


		/**
		 * @return the productUrl
		 */
		public String getProductUrl() {
			return externalizerService.externalizeIfNecessary(self.getParent().getPath(),resourceResolver);
		}
		/**
		 * @return the productUrl
		 */
		public String getCommonImage() {
			return commonImage;
		}

		public String getTemplateType(){
			return templateType;
		}

		public String getLayoutType(){
			return layoutType;
		}

		public String getProductBadgev2(){
			return productBadgev2;
		}
	
		public String getProductHeadlinev2(){
			return productHeadlinev2;
		}
	
		public String getProductDescriptionv2(){
			return productDescriptionv2;
		}
	
		public String getSelectionSublinev2(){
			return selectionSublinev2;
		}
	}
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/product-page")
interface VideoList {
	@Inject
	String getVideoId();

	@Inject
	String getThumbnailImage();
}

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
interface ProductList {
	@Inject
	String getSku();

	@Inject
	String getLabel();

	@Inject
	String[] getProductImage();

	@Inject
	@Via(type = ChildResource.class)
	List<VideoList> getVideoList();

	@Inject
	String getCommonImage();

	@Inject
	String getVariantHeading();
	
	@Inject
	String getVariantDescription();

	@Inject
	String getQuantityOrder();

	@Inject
	String getVariantHeadlinev2();

	@Inject
	String getVariantDescriptionv2();
	
	@Inject
	String getVariantBadgev2();

	@Inject
	String getVariantPriceSublinev2();

	@Inject
	String getVariantPriceDescriptionv2();

	@Inject
	String getVariantButtonLabelv2();

	@Inject
	String getVariantButtonUrlv2();

}

