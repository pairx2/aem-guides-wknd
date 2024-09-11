package com.abbott.aem.add.molecular.core.productlist.impl;

import java.util.Arrays;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;

@Getter
@Model(
        adaptables = Resource.class,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class ProductFilterData {

    @Inject
    @Self
    @JsonIgnore
    private Resource resource;

    @JsonIgnore
    private ContentFragment contentFragment;
    
    /**
	 * The Constant LOGGER.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductFilterData.class);

    private String title;
    private String image;
    private String detailLink;
    private String[] categories;
    private String prodDescription;

    @PostConstruct
    public void init() {
        contentFragment = resource.adaptTo(ContentFragment.class);
        title = obtainFragmentElement("prodtitle", String.class);
        image = obtainFragmentElement("prodImageRef", String.class);
        detailLink = mapPageUrl(obtainFragmentElement("prodpath", String.class));
        categories = obtainTagNames(obtainFragmentElement("tagvalue", String[].class));
        prodDescription = obtainFragmentElement("proddescription", String.class);
        LOGGER.debug("contentFragment::{}, title::{}, image::{},detailLink::{},categories::{}, prodDescription{}",contentFragment.getName(),title,image,detailLink,categories,prodDescription);
    }

    public String mapPageUrl(String pageUrl) {
    	LOGGER.debug("mapPageUrl::{}",resource.getResourceResolver().map(pageUrl + ".html"));
        return resource.getResourceResolver().map(pageUrl + ".html");
    }

    public String[] obtainTagNames(String[] tagvalues) {
        TagManager tagManager = resource.getResourceResolver().adaptTo(TagManager.class);
        return Arrays.stream(tagvalues)
                .map(tagManager::resolve)
                .filter(Objects::nonNull)
                .map(Tag::getName)
                .toArray(String[]::new);
    }

    public <T> T obtainFragmentElement(String elementName, Class<T> clazz) {
    	LOGGER.debug("obtainFragmentElement:: {}",contentFragment.getElement(elementName).getValue().getValue(clazz));
        return contentFragment.getElement(elementName).getValue().getValue(clazz);
    }

    
}
