package com.abbott.aem.an.similac.core.models;

import java.util.Iterator;

import javax.annotation.PostConstruct;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.LABEL;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.TOPIC_LABEL;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.TOPIC_LIST;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import com.google.gson.JsonObject;

/**
 * Sling Model to expose the titles of authored topics as JSON in an FAQ page
 * 
 * @author Cognizant
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FaqContainerModel {

	/** The authored topics */
	@ChildResource(name = TOPIC_LIST)
	private Resource topicList;

	/** The JSON to be exposed */
	private String topicLabelJson;

	/**
	 * Activation method to be called after instance creation. Creates the JSON to
	 * be exposed
	 */
	@PostConstruct
	public void activate() {
		JsonObject topicsJsonObject = new JsonObject();
		if (topicList == null) {
			return;
		}
		Iterator<Resource> topics = topicList.listChildren();

		for (int i = 1; topics.hasNext(); ++i) {
			Resource topic = topics.next();
			topicsJsonObject.addProperty(LABEL + i, topic.getValueMap().get(TOPIC_LABEL, String.class));
		}
		topicLabelJson = topicsJsonObject.toString();
	}

	/**
	 * Get the topic labels of the FAQ container
	 * 
	 * @return A JSON object representing the topics of the container
	 */
	public String getTopicLabelJson() {
		return topicLabelJson;
	}
}
