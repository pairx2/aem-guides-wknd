package com.abbott.aem.epd.medicine.core.productlist.impl;

import java.util.Arrays;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

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
public class MedicineProductData {

    @Inject
    @Self
    @JsonIgnore
    public Resource resource;

    @JsonIgnore
    private ContentFragment contentFragment;
    

    private String title;
	private String image;
    private String detailLink;
    private String[] categories;
    private String description;

    public String getTitle() {
		return title;
	}
	public String getImage() {
		return image;
	}
	public String getDetailLink() {
		return detailLink;
	}

	public String[] getCategories() {
        return categories.clone();
    }

    public String getDescription() {
		return description;
	}

	@PostConstruct
    public void init() {
        contentFragment = resource.adaptTo(ContentFragment.class);
        title = obtainFragmentElement("prodtitle", String.class);
        image = obtainFragmentElement("prodImageRef", String.class);
        description = obtainFragmentElement("proddescription", String.class);
        detailLink = mapPageUrl(obtainFragmentElement("prodpath", String.class));
        categories = obtainTagNames(obtainFragmentElement("tagvalue", String[].class));
    }
    public String mapPageUrl(String pageUrl) {
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
    public  <T> T obtainFragmentElement(String elementName, Class<T> clazz) {
        return contentFragment.getElement(elementName).getValue().getValue(clazz);
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }
    public void setContentFragment(ContentFragment contentFragment){
        this.contentFragment=contentFragment;
    }

}
