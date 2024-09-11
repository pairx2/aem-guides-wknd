package com.abbott.aem.adc.freestylelibrede.services.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import com.day.cq.wcm.api.NameConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.adc.freestylelibrede.dto.ProductDto;
import com.abbott.aem.adc.freestylelibrede.dto.VideoList;
import com.abbott.aem.adc.freestylelibrede.models.ProductPageModel;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.services.ProductPageService;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

/**
 * Service for getting all the product properties.
 *
 * @author kiratsingh
 */
@Component(service = ProductPageService.class)
public class ProductPageServiceImpl implements ProductPageService {

    private static final String CQ_PAGE_CONTENT = "cq:PageContent";


    private static final Logger LOGGER = LoggerFactory.getLogger(ProductPageServiceImpl.class);
    @SuppressWarnings("squid:S1075")
    private static final String ADC_FSL_ROOT_PATH = "/content/adc/freestylelibrede/de/de/v3/produkte";
    private static final String PRODUCT_TEMPLATE = "/conf/adc/freestylelibrede/settings/wcm/templates/product";
    private static final String MULTI_PRODUCT_TEMPLATE = "/conf/adc/freestylelibrede/settings/wcm/templates/multiproduct";
    private static final String PRODUCT_QUERY_LIMIT = "-1";

    private static final String PATH = "path";
    private static final String TYPE = "type";
    private static final String PROPERTY = "group.1_property";
    private static final String GROUP_P_OR  = "group.p.or";
    private static final String TRUE  = "true";
    private static final String PROPERTY_VALUE = "group.1_property.1_value";
    private static final String PROPERTY_VALUE_2 = "group.1_property.2_value";
    private static final String PROPERTY2 = "2_property";
    private static final String PROPERTY_VALUE2 = "2_property.value";
    private static final String PRODUCT_SKU = "productSku";
    private static final String LIMIT = "p.limit";


    @Reference
    private QueryBuilder builder;
    
    @Reference
    private ExternalizerService externalizerService;


    @Override
    public List<ProductDto> findAll(SlingHttpServletRequest request) {
        return getProductPageModels(request, initBaseMap());
    }

    @Override
    public Map<String, Map<String, ProductDto>> mapAll(SlingHttpServletRequest request) {


        Map<String, ProductDto> productPageModelMap = new HashMap<>();

        for (ProductDto model : findAll(request)) {
            LOGGER.debug("model={}", model);
            if (model != null) {
                if (model.getProductSku() != null) {
                    for (String sku : model.getProductSku()) {
                        productPageModelMap.put(sku, model);
                    }
                } else {
                    LOGGER.warn("No SKU set on Product Page {}", model.getProductUrl());
                }
            } else {
                LOGGER.warn("ProductPageModel is  null");
            }

        }

        Map<String, Map<String, ProductDto>> products = new HashMap<>();
        products.put("products", productPageModelMap);
        return products;
    }

    @Override
    public ProductDto findBySku(SlingHttpServletRequest request, String sku) {

        final Map<String, String> map = initBaseMap();
        map.put(PROPERTY2, PRODUCT_SKU);
        map.put(PROPERTY_VALUE2, sku);

        final List<ProductDto> productPageModels = getProductPageModels(request, map);

        if (!productPageModels.isEmpty()) {
            return productPageModels.get(0);
        }
        return null;
    }

    @Override
    public Map<String, Map<String, ProductDto>> mapBySku(SlingHttpServletRequest request, String sku) {
        Map<String, Map<String, ProductDto>> products = new HashMap<>();

        ProductDto productPageModel = findBySku(request, sku);
        if (productPageModel != null) {
            Map<String, ProductDto> productPageModelMap = new HashMap<>();
            productPageModelMap.put(sku, productPageModel);
            products.put("products", productPageModelMap);
        }

        return products;
    }

    @Override
    public ProductPageModel getProductPageModel(Resource resource) {
        ResourceResolver resolver = resource.getResourceResolver();
        PageManager pm = resolver.adaptTo(PageManager.class);
        if (pm != null) {
            Page currentPage = pm.getContainingPage(resource);
            if (currentPage != null) {
                Resource jcrContent = currentPage.getContentResource();
                if (jcrContent != null) {
                    return jcrContent.adaptTo(ProductPageModel.class);
                }
            }
        }
        return null;
    }


	private List<ProductDto> getProductPageModels(SlingHttpServletRequest request, Map<String, String> map) {
		final List<ProductDto> productPageModelList = new ArrayList<>();
		Session session = request.getResourceResolver().adaptTo(Session.class);
		Query query = builder.createQuery(PredicateGroup.create(map), session);
		SearchResult result = query.getResult();
		for (Hit hit : result.getHits()) {
			try {
				final Resource resource = hit.getResource();
                
				ValueMap pagevm = resource.adaptTo(ValueMap.class);
                Resource productList = resource.getChild("productList");
                if( productList !=null ){
                    ValueMap produktvm = null;
                    for(Resource item : productList.getChildren()){
                        produktvm = item.adaptTo(ValueMap.class);
                        ProductDto productPageModel = updateProductDto(externalizerService.externalizeIfNecessary(resource.getParent().getPath(), request.getResourceResolver()), pagevm,produktvm);				
                        productPageModel = updateVideoList(resource.adaptTo(Node.class),productPageModel);	
                        productPageModelList.add(productPageModel);
                    }
                }
			} catch (RepositoryException e) {
				LOGGER.error("Failed to retrieve Resource from  SearchResult's Hit", e);
			}

		}

		return productPageModelList;

	}

 
	private ProductDto updateVideoList(Node nd, ProductDto productPageModel) throws PathNotFoundException, RepositoryException {
		if (nd.hasNode("videoList")) {
		List<VideoList> videoList = new ArrayList<VideoList>();
		Node videoNode = nd.getNode("videoList");
		NodeIterator ndItr = videoNode.getNodes();
		while (ndItr.hasNext()) {
			Node ndNex = (Node) ndItr.next();
			VideoList video = new VideoList();
			if (ndNex.hasProperty("thumbnailImage")) {
				video.setThumbnailImage(ndNex.getProperty("thumbnailImage").getValue().getString());
			}
			if (ndNex.hasProperty("videoId")) {
				video.setVideoId(ndNex.getProperty("videoId").getValue().getString());
			}
			videoList.add(video);
		}
		productPageModel.setVideoList(videoList);
		}
		return productPageModel;
	}

	private ProductDto updateProductDto(String productUrl, ValueMap vm, ValueMap productvm) {
		ProductDto productPageModel = new ProductDto();
        if(productvm != null ){
            productPageModel.setProductImage(productvm.get("productImage", String[].class));
		    productPageModel.setProductSku(productvm.get("sku", String[].class));
            productPageModel.setCommonImage(productvm.get("commonImage", String.class));
            productPageModel.setQuantityOrder(productvm.get("quantityOrder", String.class));
            productPageModel.setVariantDescription(productvm.get("variantDescription", String.class));
            productPageModel.setVariantHeading(productvm.get("variantHeading", String.class));

            productPageModel.setVariantHeadlinev2(productvm.get("variantHeadlinev2", String.class));
            productPageModel.setVariantDescriptionv2(productvm.get("variantDescriptionv2", String.class));
            productPageModel.setVariantBadgev2(productvm.get("variantBadgev2", String.class));
            productPageModel.setVariantPriceSublinev2(productvm.get("variantPriceSublinev2", String.class));
            productPageModel.setVariantPriceDescriptionv2(productvm.get("variantPriceDescriptionv2", String.class));
            productPageModel.setVariantButtonLabelv2(productvm.get("variantButtonLabelv2", String.class));
            productPageModel.setVariantButtonUrlv2(productvm.get("variantButtonUrlv2", String.class));

        }else{
            productPageModel.setProductImage(vm.get("productImage", String[].class));
		    productPageModel.setProductSku(vm.get(PRODUCT_SKU, String[].class));
            productPageModel.setCommonImage(vm.get("commonImage", String.class));
            productPageModel.setQuantityOrder(vm.get("quantityOrder", String.class));
            productPageModel.setVariantDescription(vm.get("variantDescription", String.class));
            productPageModel.setVariantHeading(vm.get("variantHeading", String.class));
        }
        if(vm!=null){
            productPageModel.setProductDescription(vm.get("productDescription", String.class));
            productPageModel.setLabel(vm.get("label", String.class));

            productPageModel.setProductBadgev2(vm.get("productBadgev2", String.class));
            productPageModel.setProductHeadlinev2(vm.get("productHeadlinev2", String.class));
            productPageModel.setProductDescriptionv2(vm.get("productDescriptionv2", String.class));
            productPageModel.setSelectionSublinev2(vm.get("selectionSublinev2", String.class));
        }

		productPageModel.setProductUrl(productUrl);
		return productPageModel;
		
	}

	private Map<String, String> initBaseMap() {
        final Map<String, String> map = new HashMap<>();
        map.put(PATH, ADC_FSL_ROOT_PATH);
        map.put(TYPE, CQ_PAGE_CONTENT);
        map.put(GROUP_P_OR, TRUE);
        map.put(PROPERTY, NameConstants.NN_TEMPLATE);
        map.put(PROPERTY_VALUE, PRODUCT_TEMPLATE);
        map.put(PROPERTY_VALUE_2, MULTI_PRODUCT_TEMPLATE);
        
        map.put(LIMIT, PRODUCT_QUERY_LIMIT);
        return map;
    }


}
