package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;


import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.ProductComponentBean;
import com.abbott.aem.an.similac.core.beans.ProductComponentBean.DropDownInfo;
import com.abbott.aem.an.similac.core.utils.ProductsConstants;
import com.google.gson.GsonBuilder;

/**
 * SearchModel is the SlingModel to hold the details of search landing page
 * 
 * 
 * @author Cognizant + IBM
 *
 */
@Model(adaptables = {
    Resource.class,
    SlingHttpServletRequest.class
}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SearchModel {

    private static final Logger LOGGER = LoggerFactory.getLogger(SearchModel.class);

    @SlingObject
    private ResourceResolver resourceResolver;

    @Inject
    private Resource resource;

    @ChildResource(name = "searchResultsCount")
    private Resource options;

    @ChildResource(name = "sortOptionVal")
    private Resource sortOptions;

    @ChildResource(name = "filterOptions")
    private Resource filters;

    private String searchJson;

    private ProductComponentBean bean;
    
    private ProductComponentModel productComponentModel = new ProductComponentModel();

    private ValueMap componentProp;

    private Node node;

    @PostConstruct
    public void activate() {
        if (resource != null) {
            generateSearchDeatils();

        }
    }

    /**
     * Populate product label details
     * 
     * @throws Exception
     */
    private void generateSearchDeatils() {
        try {
            componentProp = resource.adaptTo(ValueMap.class);

            bean = new ProductComponentBean();
            if (componentProp != null) {
                bean.setFiltersLabel(componentProp.get(ProductsConstants.FILTERS_LABEL, String.class));
                bean.setResultsLabel(componentProp.get(ProductsConstants.RESULTS_LABEL, String.class));
                bean.setClearAllLabel(componentProp.get(ProductsConstants.CLEAR_ALL_LABEL, String.class));
                bean.setShowMoreLabel(componentProp.get(ProductsConstants.SHOW_MORE_LABEL, String.class));
                bean.setShowLessLabel(componentProp.get(ProductsConstants.SHOW_LESS_LABEL, String.class));
                bean.setSearchLabel(componentProp.get(ProductsConstants.SEARCH_LABEL, String.class));
                bean.setSearchResultsLabel(componentProp.get(ProductsConstants.SEARCH_RESULTS_LABEL, String.class));
                bean.setResetLabel(componentProp.get(ProductsConstants.RESET_LABEL, String.class));
                bean.setNoResultLabel(componentProp.get(ProductsConstants.NO_RESULTS_LABEL, String.class));
                bean.setActionPath(componentProp.get(ProductsConstants.ACTION_PATH, String.class));
                
            }
                        
            bean.setPageSize(productComponentModel.getdropDownInfo((ProductsConstants.PAGE_SIZE_TYPE), options, sortOptions, resource, bean));
            bean.setSortBy(productComponentModel.getdropDownInfo((ProductsConstants.SORT_BY_TYPE), options, sortOptions, resource, bean));
            bean.setSearchFilters(getFilters(ProductsConstants.FILTER_BY_TYPE));
            
        } catch (RuntimeException e) {
        	LOGGER.error("Exception in generateSearchDeatils :: ",e);
        }
    }
    
    public DropDownInfo getFilters(String infoType) {
    	componentProp = resource.adaptTo(ValueMap.class);
        node = resource.adaptTo(Node.class);
        DropDownInfo pageSize = bean.new DropDownInfo();
        pageSize.setDefaultValue(((componentProp.get(ProductsConstants.DEFAULT_FILTER_LABEL)) != null) ? (componentProp.get(ProductsConstants.DEFAULT_FILTER_LABEL, String.class)) : "");
    	
       if ((filters != null) && (infoType.equals(ProductsConstants.FILTER_BY_TYPE)) && (node != null)) {
        	pageSize.setFilterOptions(getFilterInfo(ProductsConstants.FILTER_BY_TYPE));
            
        }
        return pageSize;
    }

    public List < DropDownInfo > getFilterInfo(String infoType) {
        componentProp = resource.adaptTo(ValueMap.class);
        node = resource.adaptTo(Node.class);

        List < DropDownInfo > nodeList = new ArrayList <> ();
        if ((filters != null) && (infoType.equals(ProductsConstants.FILTER_BY_TYPE)) && (node != null) && (componentProp != null)) {
                   try {
                	   NodeIterator nodeIterator = node.getNodes();
                        while (nodeIterator.hasNext()) {
                        	 Node childNode = nodeIterator.nextNode();
                            NodeIterator nodeItr = childNode.getNodes();
                            while (nodeItr.hasNext()) {
                            	 DropDownInfo pageSize = bean.new DropDownInfo();
                                Node nodeVal = nodeItr.nextNode();
                                pageSize.setDefaultLabel(componentProp.get(ProductsConstants.DEFAULT_FILTER_LABEL, String.class));
                                if (nodeVal.hasProperty(ProductsConstants.ATTRIBUTE_CODE) && nodeVal.hasProperty(ProductsConstants.FILTER_LABEL)) {
                                	pageSize.setAttribute_code(nodeVal.getProperty(ProductsConstants.ATTRIBUTE_CODE).getValue().getString());
                                    pageSize.setLabel(nodeVal.getProperty(ProductsConstants.FILTER_LABEL).getValue().getString());
                                    
                                	pageSize.setOptions(getResourceArray(nodeVal));
                                    nodeList.add(pageSize);
                                	}
                              }
                        }

                    } catch (RepositoryException e) {
                    	LOGGER.error("Exception in getFilterInfo :: ",e);
                    }
               }
        return nodeList;
    }

    public List < Map < String, String >> getResourceArray(Node nodeVal) {
    	List < Map < String, String >> valueList = new ArrayList < > ();
        if (nodeVal != null) {
        	try {
                NodeIterator nodeItr = nodeVal.getNodes();
                while (nodeItr.hasNext()) {
                    Node child = nodeItr.nextNode();
                    NodeIterator childNodeItr = child.getNodes();
                    while (childNodeItr.hasNext()) {
                    	Map < String, String > nodeValue = new HashMap < > ();
                        Node childNodeVal = childNodeItr.nextNode();
                        if (childNodeVal.hasProperty(ProductsConstants.OPTION_VALUE) && childNodeVal.hasProperty(ProductsConstants.FILTER_OPTION_LABEL)) {
                            nodeValue.put(ProductsConstants.LABEL, childNodeVal.getProperty(ProductsConstants.FILTER_OPTION_LABEL).getValue().getString());
                            nodeValue.put(ProductsConstants.VALUE, childNodeVal.getProperty(ProductsConstants.OPTION_VALUE).getValue().getString());
                            valueList.add(nodeValue);
                        }
                    }
                }

            } catch (RepositoryException e) {
            	LOGGER.error("Exception in getResourceArray :: ",e);
            }
        }
        return valueList;
    }

    /**
     * This method will return the search results details as Json string
     * 
     * @return String
     */
    public String getSearchJson() {
        if (bean != null) {
            searchJson = new GsonBuilder().create().toJson(bean);
            
        }
        return searchJson;
    }

    public ProductComponentBean getbean() {
        return bean;
    }

    public ValueMap getComponentProp() {
        return componentProp;
    }

    public Node getNode() {
        return node;
    }
}