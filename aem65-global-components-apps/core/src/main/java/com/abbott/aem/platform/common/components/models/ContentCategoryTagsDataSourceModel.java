package com.abbott.aem.platform.common.components.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.abbott.aem.platform.common.constants.CommonConstants;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class ContentCategoryTagsDataSourceModel.
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
public class ContentCategoryTagsDataSourceModel {

	/**
	 * The Constant LOG.
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ContentCategoryTagsDataSourceModel.class);

	/**
	 * The Constant ROOT_PATH.
	 */
	private static final String ROOT_PATH = "rootPath";

	/**
	 * The Constant DATASOURCE.
	 */
	private static final String DATASOURCE = "datasource";

	/**
	 * The request.
	 */
	@Inject
	private SlingHttpServletRequest request;

	/**
	 * Inits the.
	 */
	@PostConstruct
	protected void init() {
		LOG.debug("Entry into ContentCategoryTagsDataSourceModel");
		if (null != request) {
			Resource pathResource = request.getResource();
			Resource dataSourceRes = pathResource.getChild(DATASOURCE);
			if (null != dataSourceRes) {
				String rootPath = dataSourceRes.getValueMap().get(ROOT_PATH, String.class);
				populateDataSource(rootPath);
			}
		}
	}

	/**
	 * Populate data source.
	 *
	 * @param rootPath the root path of tag resource
	 */
	private void populateDataSource(String rootPath) {

		ResourceResolver resourceResolver = request.getResourceResolver();
		Resource resource = resourceResolver.getResource(rootPath);
		if (null != resource) {
			TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
			List<Resource> propMap = new ArrayList<>();
			ValueMap vm;
			if (null != tagManager) {
				Tag tagResource = tagManager.resolve(resource.getPath());
				Iterator<Tag> tagIterator = tagResource.listChildren();
				while (tagIterator.hasNext()) {
					Tag tag = tagIterator.next();
					vm = new ValueMapDecorator(new HashMap<>());
					String text = tag.getTitle();
					String value = tag.getName();
					if (StringUtils.isNotBlank(value) && StringUtils.isNotBlank(text)) {
						vm.put(CommonConstants.TEXT, text);
						vm.put(CommonConstants.VALUE, value);
						propMap.add(new ValueMapResource(resourceResolver, new ResourceMetadata(), JcrConstants.NT_UNSTRUCTURED, vm));
					}
				}
			}
			DataSource ds = new SimpleDataSource(propMap.iterator());
			request.setAttribute(DataSource.class.getName(), ds);
		}
	}
}