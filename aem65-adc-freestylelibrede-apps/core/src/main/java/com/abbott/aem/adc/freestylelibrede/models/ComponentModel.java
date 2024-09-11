package com.abbott.aem.adc.freestylelibrede.models;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.factory.ModelFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Model class for generating component's json based on resource type.
 * 
 * @author ankushdhingra
 */
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ComponentModel {

	private static final Logger LOG = LoggerFactory.getLogger(ComponentModel.class);
	/** The current resource. */
	@Inject
	private Resource resource;
	
	@Self
	private SlingHttpServletRequest request;

	/** The ModelFactory service instance. */
	@Inject
	private ModelFactory factory;

	private String modelJsonString;
	
	private Object model;

	@PostConstruct
	protected void init() throws IOException {
		
		if (factory.isModelAvailableForResource(resource)) {
			LOG.debug("Adapting from Resource. Resource path: {}", resource.getPath());
			model = factory.getModelFromResource(resource);
		} else if (factory.isModelAvailableForRequest(request)) {
			LOG.debug("Adapting from Request. Request path: {}", request.getContextPath());
			model = factory.getModelFromRequest(request);
		}

		// Adding the below fix to get the model based on request for the Pages
		// Adobe introduced SEO APIs and that adapts with the Resource type.
		if (request.getResource().getResourceType().contains("adc/freestylelibrede/components/structure/")
				&& factory.isModelAvailableForRequest(request)) {
			LOG.debug("Adapting from Request. Request path: {}", request.getContextPath());
			model = factory.getModelFromRequest(request);
		}

		if (model != null) {
			LOG.debug("Model not null. ({})", model.toString());
			ObjectMapper mapper = new ObjectMapper();
			modelJsonString = mapper.writeValueAsString(model);
		}
	}

	/**
	 * Gets the model json string.
	 *
	 * @return the model json string
	 */
	public String getModelJsonString() {
		return modelJsonString;
	}

	public Object getModel(){
		return model;
	}
}
