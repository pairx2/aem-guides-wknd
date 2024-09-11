package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.StringUtils;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.*;

@JsonIgnoreProperties(ignoreUnknown = true)
public final class MagentoProduct {
	
	private static final Logger log = LoggerFactory.getLogger(MagentoProduct.class);
	private static final String IMAGE="image";
	private static final String PLAN_ID="plan_id";
    public final long id;
    public final String sku;
    public final String name;
    public final long attributeSetId;
    public final BigDecimal price;
    public final long status;
    public final long visibility;
    public final String type_id;
    public final String createdAt;
    public final String updatedAt;
    public final ProductLink [] productLinks;
    public final Option [] options;
    public final TierPrice [] tierPrices;
    public final CustomAttribute [] customAttributes;
    public final MediaGalleryEntry [] mediaGalleryEntries;
    public final ExtensionAttributes extensionAttributes;


	public Map<String, String> getBaseAttributes() {
		HashMap<String,String> map = new HashMap<String,String>();

		map.put("sku", sku);
		map.put("status", String.valueOf(status));
		map.put("price", String.valueOf(price));
		map.put("visibility", String.valueOf(visibility));
		map.put("description", this.getAttribute("description"));
		map.put(IMAGE, this.getAttribute(IMAGE));
		return map;

	}

	public Map<String, String> getCustomAttributes() {
		HashMap<String, String> attributesMap = new HashMap<>();
		for (CustomAttribute custom_attribute : this.customAttributes) {
			if (custom_attribute.value instanceof String) {
				attributesMap.put(custom_attribute.attributeCode, (String) custom_attribute.value);
			} else if (custom_attribute.value instanceof ArrayList) {
				attributesMap.put(custom_attribute.attributeCode, custom_attribute.value.toString());
            }
        }
		return attributesMap;
	}

	public List<String> getCategoryIds(String name) {
		for (CustomAttribute attribute : customAttributes) {
			if (attribute.attributeCode.equalsIgnoreCase(name)) {
				List<String> categoryList = new ArrayList<>();
				if (attribute.value instanceof String) {
					categoryList.add((String) attribute.value);
				} else if (attribute.value instanceof ArrayList) {
					categoryList = categoryAddList(name, attribute, categoryList);
                }
				return categoryList;
            }
        }
		return Collections.emptyList();
	}

	public List<String> categoryAddList(String name, CustomAttribute attribute, List<String> categoryList) {
		if (StringUtils.equalsIgnoreCase(name, "aw_sarp2_subscription_options")) {
			List<LinkedHashMap<?,?>> attributeValue = (List<LinkedHashMap<?,?>>) attribute.value;
			if (null != attributeValue) {
				for (LinkedHashMap<?,?> optionMap : attributeValue) {
					categoryList.add(optionMap.get(PLAN_ID).toString());
                }
            }
		} else {
			categoryList = (List<String>) attribute.value;
        }
		return categoryList;
	}

	public String getAttribute(String name) {
		for (CustomAttribute attribute : customAttributes) {
			if (attribute.attributeCode.equalsIgnoreCase(name)) {
				if (attribute.value instanceof String) {
					return attribute.value.toString();
				} else if (attribute.value instanceof ArrayList) {
					if (StringUtils.equalsIgnoreCase(name, "aw_sarp2_subscription_options")) {
						attributeValue(attribute);
					} else {
						return (String) ((List) attribute.value).get(0);
                    }
                }
            }
        }
		return "";
	}


	public String attributeValue(CustomAttribute attribute) {
		List<LinkedHashMap<?,?>> attributeValue = (List<LinkedHashMap<?,?>>) attribute.value;
		StringBuilder sb = new StringBuilder();
		if (null != attributeValue) {
			for (LinkedHashMap<?,?> optionMap : attributeValue) {
				if (!sb.toString().isEmpty()) {
					sb.append(",");
				}
				if (optionMap.containsKey(PLAN_ID)) {
					sb.append(optionMap.get(PLAN_ID));
                }
            }
        }
		return sb.toString();
	}


	public boolean hasImage() {

		return this.getAttribute(IMAGE).length() > 0 || this.mediaGalleryEntries.length > 0;

	}

	public String getPrimaryImagePath() {
		if (this.mediaGalleryEntries.length > 0) {
			return this.mediaGalleryEntries[0].file;
		} else if (this.getAttribute(IMAGE).length() > 0) {
			return this.getAttribute(IMAGE);
        }
		else {
			return null;
        }
	}

    public TierPrice [] getTierPrices() {
        return tierPrices;
    }
    public String getCategoryId(){
    	String categoryId = null;
    	CategoryLinks [] categoryLinks = this.extensionAttributes.categoryLinks;
    	for(CategoryLinks category: categoryLinks){
    		String categoryId2 = category.categoryId;
    		log.info("Magento product id : {}",id);
    		if(!categoryId2.equals("1") && !categoryId2.equals("2")){
    			categoryId = categoryId2;
    		}
        }
    	log.info("Magento product category id :: {}",categoryId);
    	return categoryId;
    } 

    @JsonCreator
    @JsonIgnoreProperties
    public MagentoProduct(@JsonProperty("id") long id, @JsonProperty("sku") String sku, @JsonProperty("name") String name, @JsonProperty("attribute_set_id") long attributeSetId, @JsonProperty("price") String price, @JsonProperty("status") long status, @JsonProperty(Constants.VISIBILITY_DIRECTIVE) long visibility, @JsonProperty("type_id") String typeId, @JsonProperty("created_at") String createdAt, @JsonProperty("updated_at") String updatedAt, @JsonProperty("product_links") ProductLink[] productLinks, @JsonProperty("options") Option[] options, @JsonProperty("tier_prices") TierPrice[] tierPrices, @JsonProperty("custom_attributes") CustomAttribute[] customAttributes, @JsonProperty("media_gallery_entries") MediaGalleryEntry[] mediaGalleryEntries, @JsonProperty("extension_attributes") ExtensionAttributes extensionAttributes){
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.attributeSetId = attributeSetId;
        this.price = new BigDecimal(price);
        this.status = status;
        this.visibility = visibility;
        this.type_id = typeId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.productLinks = productLinks;
        this.options = options;
        this.tierPrices = tierPrices;
        this.customAttributes = customAttributes;
        this.mediaGalleryEntries = mediaGalleryEntries;
        this.extensionAttributes = extensionAttributes;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
        public static final class ProductLink {
            public final String sku;
            public final String linkType;
            public final String linkedProductSku;
            public final String linkedProductType;
            public final ExtensionAttributes [] extensionAttributes;

            @JsonCreator
            @JsonIgnoreProperties
            public ProductLink(@JsonProperty("sku") String sku, @JsonProperty("link_type") String linkType, @JsonProperty("linked_product_sku") String linkedProductSku, @JsonProperty("linked_product_type") String linkedProductType, @JsonProperty("extension_attributes") ExtensionAttributes[] extensionAttributes){
                this.sku = sku;
                this.linkType = linkType;
                this.linkedProductSku = linkedProductSku;
                this.linkedProductType = linkedProductType;
                this.extensionAttributes = extensionAttributes;
            }

        @JsonIgnoreProperties(ignoreUnknown = true)
            public static final class ExtensionAttribute {

                @JsonCreator
                @JsonIgnoreProperties
                public ExtensionAttribute(){
                    // default implementation ignored
                }
            }
        }

    @JsonIgnoreProperties(ignoreUnknown = true)
        public static final class Option {
            @JsonCreator
            public Option(){
            // default implementation ignored
            }
        }

    @JsonIgnoreProperties(ignoreUnknown = true)
        public static final class TierPrice {
        public final Long customerGroupId;
        public final Double qty;
        public final Double value;
        public final Object extensionAttributes;

            @JsonCreator
            @JsonIgnoreProperties
            public TierPrice(@JsonProperty("customer_group_id") Long customerGroupId, @JsonProperty("qty") Double qty,
                              @JsonProperty("value") Double value, @JsonProperty("extension_attributes") Object extensionAttributes){
                this.customerGroupId = customerGroupId;
                this.qty = qty;
                this.value = value;
                this.extensionAttributes = extensionAttributes;
            }
        }

	@JsonIgnoreProperties(ignoreUnknown = true)
	public static final class CustomAttribute {
		public final String attributeCode;
		public final Object value;

		@JsonCreator
		public CustomAttribute(@JsonProperty("attribute_code") String attributeCode,
				@JsonProperty("value") Object value) {
			this.attributeCode = attributeCode;
			this.value = value;
		}
	}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class MediaGalleryEntry {
        public final int id;
        public final String mediaType;
        public final String label;
        public final int position;
        public final boolean disabled;
        public final String [] types;
        public final String file;

        @JsonCreator
        @JsonIgnoreProperties
        public MediaGalleryEntry(@JsonProperty("id") int id,
                                    @JsonProperty("media_type") String mediaType,
                                    @JsonProperty("file") String file,
                                    @JsonProperty("label") String label,
                                    @JsonProperty("position") int position,
                                    @JsonProperty("disabled") boolean disabled,
                                    @JsonProperty("types") String[] types){
            this.id = id;
            this.mediaType = mediaType;
            this.label = label;
            this.position = position;
            this.file = file;
            this.disabled = disabled;
            this.types = types;

        }
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class ExtensionAttributes {
        public final String[] websiteIds;
        public final CategoryLinks [] categoryLinks;
        public final ConfigurableProductOptions [] configurableProductOptions;
        public final int[] configurableProductLinks;

        @JsonCreator
        @JsonIgnoreProperties
        public ExtensionAttributes(@JsonProperty("website_ids") String[] websiteIds, @JsonProperty("category_links") CategoryLinks[] categoryLinks, @JsonProperty("configurable_product_options") ConfigurableProductOptions[] configurableProductOptions, @JsonProperty("configurable_product_links") int[] configurableProductLinks){
            this.websiteIds = websiteIds;
            this.categoryLinks = categoryLinks;
            this.configurableProductOptions = configurableProductOptions;
            this.configurableProductLinks = configurableProductLinks;
        }
    }
    
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class CategoryLinks {
        public final String position;
        public final String categoryId;

        @JsonCreator
        @JsonIgnoreProperties
        public CategoryLinks(@JsonProperty("position") String position, @JsonProperty("category_id") String categoryId){
            this.position = position;
            this.categoryId = categoryId;
        }
    }


    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class ConfigurableProductOptions {
        public final int id;
        public final int attributeId;
        public final String label;
        public final String position;
        public final Value[] values;

        @JsonCreator
        @JsonIgnoreProperties
        public ConfigurableProductOptions(@JsonProperty("id") int id, @JsonProperty("attribute_id") int attributeId, @JsonProperty("label") String label,@JsonProperty("position") String position, @JsonProperty("values") Value[] values){
            this.id = id;
            this.attributeId = attributeId;
            this.label = label;
            this.position = position;
            this.values = values;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Value{
        public final int valueIndex;

        @JsonCreator
        @JsonIgnoreProperties
        public Value(@JsonProperty("value_index") int valueIndex){
            this.valueIndex = valueIndex;
        }
    }

	@Override
	public String toString() {
		return "MagentoProduct [sku=" + sku + ", name=" + name + "]";
	}
    
}
