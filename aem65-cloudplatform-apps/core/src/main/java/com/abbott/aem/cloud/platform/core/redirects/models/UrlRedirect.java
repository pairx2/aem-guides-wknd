package com.abbott.aem.cloud.platform.core.redirects.models;

import com.abbott.aem.cloud.platform.core.redirects.Types.MappingType;
import com.day.cq.commons.jcr.JcrConstants;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidOperationException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.NonExistingResource;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Data
@Model(adaptables = { Resource.class },
		adapters = { UrlRedirect.class },
		resourceType = { UrlRedirect.COMPONENT_RESOURCE_TYPE },
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class UrlRedirect {

	public static final String RESOURCE_TYPE = "abbott-cloudplatform/components/utilities/urlredirects/manageurlredirect";
	public static final String COMPONENT_RESOURCE_TYPE = "abbott-cloudplatform/components/utilities/urlredirects/adminconfig";

	@Self
	@Getter(AccessLevel.NONE)
	@Setter(AccessLevel.NONE)
	Resource resource;

	@ValueMapValue(name = "jcr:content/version")
	@JsonIgnore
	private String rulesetVersion;

	@ValueMapValue(name = "jcr:content/state")
	@JsonIgnore
	private String status;

	@ValueMapValue(name = "jcr:content/jcr:title")
	@JsonIgnore
	private String title;

	@ChildResource(name = "jcr:content/mappings")
	private List<Rule> mappings;

	@ValueMapValue(name = "jcr:content/createdOn")
	@JsonIgnore
	private Double createdOn;

	@ValueMapValue(name = "jcr:content/lastUpdatedOn")
	@JsonIgnore
	private Double lastUpdatedOn;

	@ValueMapValue(name = "jcr:content/lastAppliedOn")
	@JsonIgnore
	private Double lastAppliedOn;

	@ValueMapValue(name = "jcr:content/lastPromotedOn")
	@JsonIgnore
	private Double lastPromotedOn;

	@Setter(AccessLevel.NONE)
	private String configPath;

	@Setter(AccessLevel.NONE)
	private String path;

	@PostConstruct
	protected void init() {
		log.debug("Entering URLRedirect Post construct");
		path = resource.getPath();
		configPath = Optional.ofNullable(resource.getParent()).map(Resource::getParent).map(Resource::getPath)
				.orElse("");

		log.debug("Path:{};ConfigPath:{}", path, configPath);
	}

	/**
	 *
	 * @param resolver
	 * @param rootPath - This should be existing root resource path where the
	 *                 mappings needs to be created
	 * @throws InvalidOperationException - If there are no mapping rules to be
	 *                                   created
	 */
	public void updateNode(ResourceResolver resolver, @NonNull String rootPath) {
		if (mappings == null || mappings.isEmpty()) {
			log.warn("Mapping rules are not present. There's nothing to update!");
			throw new InvalidOperationException("Mapping rules are not present. There's nothing to update!");
		}

		Resource parent = resolver.resolve(rootPath);

		if (parent instanceof NonExistingResource) {
			log.error("Invalid Redirect Configuration for the node {}", rootPath);
			return;
		}

		Resource mappingsResource = parent.getChild("mappings");

		// Delete the node if exists before recreation - commit & save
		deleteMappings(resolver, mappingsResource);

		createMappings(resolver, parent);
	}

	public void deleteMappings(ResourceResolver resolver, Resource mappingsResource) {
		if (mappingsResource != null) {
			String resourcePath = mappingsResource.getPath();

			try {
				resolver.delete(mappingsResource);
				resolver.commit();
				log.debug("Successfully deleted mappings from {}", resourcePath);
			} catch (PersistenceException e) {
				log.error("ERROR while deleting the old mappings @ {}", resourcePath);
			}
		}
	}

	private Resource createMappings(ResourceResolver resolver, Resource parent) {
		Resource mappingsResource = null;
		try {
			Map<String, Object> props = new HashMap<>();
			props.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);

			mappingsResource = resolver.create(parent, "mappings", props);
			log.debug("Successfully created mappings @ {}", mappingsResource.getPath());

			createRules(resolver, mappingsResource);
			resolver.commit();

		} catch (PersistenceException e) {
			log.error("Error in create mapping: {}", e.getMessage());
			log.error("Error while creating the mappings node @ {}", parent.getPath());
		}

		return mappingsResource;
	}

	private void createRules(ResourceResolver resolver, Resource parent) throws PersistenceException {
		int index = 1;
		for (Rule rule : mappings) {

			Map<String, Object> props = new HashMap<>();
			props.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY, Rule.RESOURCE_TYPE);
			props.put("sourceUrl", rule.getSourceUrl());
			props.put("redirectionType", rule.getRedirectionType());
			props.put("forwardQueryString", rule.getForwardQueryString());

			String mappingType = rule.getMappingType();
			props.put("mappingType", mappingType);

			Resource ruleResource = resolver.create(parent, "rule_" + index++, props);

			ModifiableValueMap properties = ruleResource.adaptTo(ModifiableValueMap.class);

			if (MappingType.BYHEADER.name().equals(mappingType)) {
				properties.put("headerName", rule.getHeaderName());
				// create header matchers
				if (rule.getHeaderMatchers() != null) {
					createHeaderMatchers(resolver, ruleResource, rule.getHeaderMatchers());
				}
			} else {
				properties.put("targetUrl", rule.getTargetUrl());
			}
			if (null != rule.getQueryParams() && !rule.getQueryParams().isEmpty()) {
				log.debug("getQueryParams called");
				createQueryParameters(resolver, ruleResource, rule.getQueryParams());
			}
			else if(null != rule.getQueryParameters() && !rule.getQueryParameters().isEmpty()) {
				log.debug("getQueryParameters called");
				createQueryParameters(resolver, ruleResource, rule.getQueryParameters());
				
			}
		}
		log.debug("Successfully created rules for {}", parent.getPath());
	}

	private void createHeaderMatchers(ResourceResolver resolver, Resource parent, @NonNull List<HeaderMatch> matchers)
			throws PersistenceException {
		// Create the main node - /mappings/rule_<n>/headerMatchers
		Resource matchersResource = resolver.create(parent, "headerMatchers", null);
		matchers.sort((HeaderMatch headerMatch1, HeaderMatch headerMatch2) -> Integer
				.compare(headerMatch1.getOrder(), headerMatch2.getOrder()));
		int index = 1;
		for (HeaderMatch match : matchers) {
			Map<String, Object> props = new HashMap<>();
			props.put(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY, HeaderMatch.RESOURCE_TYPE);
			props.put("headerValue", match.getHeaderValue() != null ? match.getHeaderValue() : StringUtils.EMPTY);
			props.put("targetUrl", match.getTargetUrl());
			props.put("matchType", match.getMatchType());
			props.put("order", match.getOrder());

			resolver.create(matchersResource, "item" + index++, props);
		}
	}

	private void createQueryParameters(ResourceResolver resolver, Resource parent,
			@NonNull List<QueryParams> queryParameters) throws PersistenceException {

		Resource parameterResource = resolver.create(parent, "queryParameters", null);

		int index = 0;
		
		  for (QueryParams match : queryParameters) {
			  Map<String, Object> props = new
		  HashMap<>();
			  props.put("key", match.getKey()); 
			  props.put("value",
		  match.getValue());
			  resolver.create(parameterResource, "item" + index++,
		  props); }
		 
		
    } 
	
	private void createQueryParameters(ResourceResolver resolver, Resource parent,
			@NonNull Map<String,String> queryParameters) throws PersistenceException {

		Resource parameterResource = resolver.create(parent, "queryParameters", null);

		int index = 0;
		
		for (Map.Entry<String,String> entry : queryParameters.entrySet())  {
			Map<String, Object> props = new HashMap<>();
			props.put("key", entry.getKey());
			props.put("value", entry.getValue());
			resolver.create(parameterResource, "item" + index++, props);
			}
		 
		
    }
	}

