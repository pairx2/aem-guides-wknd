package com.abbott.aem.adc.freestylelibrede.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.utils.ResourceTypes;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.factory.ModelFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/carousel")
public class CarouselModel extends BaseComponentPropertiesImpl {
    private static final Logger LOG = LoggerFactory.getLogger(CarouselModel.class);

    @Self
    private Resource self;

    @Inject
    private ModelFactory factory;
    @Getter
    private List<Object> children = new ArrayList<>();
    private String carouselType;
    @Inject
    private String ctaText;
    @Inject
    private String ctaStyling;
    @Externalize
    private String ctaURL;
    @Inject
    private String ctaAction;
    @Inject
    private String sectionHeading;
    @Inject
    private String heading;

    @PostConstruct
    private void init() {
        carouselType = ResourceTypes.getResourceTypeName(self);       

        for (Resource child : self.getChildren()) {
            try {
                Object model = factory.getModelFromResource(child);
                children.add(model);
            }catch (RuntimeException ex) {
                LOG.error("Something went wrong while determining which model to use for resource {}", child.getPath(), ex);
            }
        }
    }


    public String getCarouselType() {
        return carouselType;
    }

	public String getCtaText() {
		return ctaText;
	}

	public String getCtaStyling() {
		return ctaStyling;
	}

	public String getCtaURL() {
		return ctaURL;
	}

	public String getCtaAction() {
		return ctaAction;
	}

	public String getSectionHeading() {
		return sectionHeading;
	}

	public String getHeading() {
		return heading;
	}
    
    
}
