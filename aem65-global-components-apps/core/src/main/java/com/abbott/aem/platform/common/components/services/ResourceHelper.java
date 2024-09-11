package com.abbott.aem.platform.common.components.services;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ResourceHelper {

	private final Resource resource;

	private static final Logger LOG = LoggerFactory.getLogger(ResourceHelper.class);

	private ResourceResolver resourceResolver;
	
	private static final String PERSISTENCE_EXCEPTION = "Persistence Exception **";

	private ResourceHelper(Resource resource) {
		this.resource = resource;
	}

	/**
	 * The type Resource helper builder.
	 */
	public static final class ResourceHelperBuilder {
		private final Resource resource;

		private ResourceHelperBuilder(Resource resource) {
			this.resource = resource;
		}

		/**
		 * A resource helper resource helper builder.
		 *
		 * @param resource the resource
		 * @return the resource helper builder
		 */
		public static ResourceHelperBuilder aResourceHelper(Resource resource) {
			return new ResourceHelperBuilder(resource);
		}

		/**
		 * Build resource helper.
		 *
		 * @return the resource helper
		 */
		public ResourceHelper build() {
			ResourceHelper resourceHelper = new ResourceHelper(resource);
			resourceHelper.resourceResolver = Optional.ofNullable(resource).map(Resource::getResourceResolver)
					.orElse(null);
			return resourceHelper;
		}
	}

	/**
	 * Add or change property of the resource.
	 *
	 * @param propertyName  the property name
	 * @param propertyValue the property value 
	 */
	public void addOrChangeProperty(String propertyName, String propertyValue) {
		Optional.ofNullable(resource).filter(resource1 -> StringUtils.isNotBlank(propertyName))
				.filter(resource1 -> StringUtils.isNotBlank(propertyValue)).ifPresent(resource1 -> {
					ModifiableValueMap modifiableValueMap = resource1.adaptTo(ModifiableValueMap.class);
					Optional.ofNullable(modifiableValueMap).ifPresent(modifiableValueMap1 -> {
						modifiableValueMap.put(propertyName, propertyValue);
						commitResolver();
					});
				});
	}

	public String renameResource(String newResourceName) {
		Map<String, Object> properties = Optional.ofNullable(resource).map(res -> res.adaptTo(ValueMap.class))
				.orElse(null);
		Resource parentResource = Optional.ofNullable(resource).map(Resource::getParent).orElse(null);
		return Optional.ofNullable(resource).filter(resource1 -> StringUtils.isNotBlank(newResourceName))
				.filter(resource1 -> Objects.nonNull(parentResource)).map(resource1 -> {
					try {
						Resource newResource = createResource(parentResource, newResourceName, properties);
						resource1.getChildren()
								.forEach(res -> moveResource(res, parentResource.getPath() + "/" + newResourceName));
						deleteResource();
						return Optional.ofNullable(newResource).map(Resource::getName).orElse(null);
					} finally {
						commitResolver();
					}

				}).orElse(null);
	}

	private Resource createResource(Resource parentResource, String newResourceName, Map<String, Object> properties) {
		try {
			return resourceResolver.create(parentResource, newResourceName, properties);
		} catch (PersistenceException e) {
			LOG.error(PERSISTENCE_EXCEPTION, e);
		}
		return null;
	}

	private void moveResource(Resource resourceToBeMoved, String destination) {
		try {
			resourceResolver.move(resourceToBeMoved.getPath(), destination);
		} catch (PersistenceException e) {
			LOG.error(PERSISTENCE_EXCEPTION, e);
		}
	}

	public void deleteResource() {
		try {
			resourceResolver.delete(resource);
		} catch (PersistenceException e) {
			LOG.error(PERSISTENCE_EXCEPTION, e);
		}
	}

	public void deleteResource(String commitFlag) {
		try {
			if (commitFlag.equalsIgnoreCase("true")) {
				resourceResolver.delete(resource);
				commitResolver();
			}
		} catch (PersistenceException e) {
			LOG.error(PERSISTENCE_EXCEPTION, e);
		}
	}

	public void removeProp(String propName) {
		ModifiableValueMap modValueMap = Optional.ofNullable(resource).map(res -> res.adaptTo(ModifiableValueMap.class))
				.orElse(null);
		Optional.ofNullable(modValueMap).filter(modValueMap1 -> modValueMap1.containsKey(propName))
				.ifPresent(modValueMap1 -> {
					modValueMap1.remove(propName);
					commitResolver();
				});
	}

	private void commitResolver() {
		try {
			resourceResolver.commit();
		} catch (PersistenceException e) {
			LOG.error(PERSISTENCE_EXCEPTION, e);
		}
	}
}
