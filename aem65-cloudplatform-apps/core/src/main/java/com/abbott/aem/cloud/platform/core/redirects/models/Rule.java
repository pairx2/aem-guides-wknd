package com.abbott.aem.cloud.platform.core.redirects.models;

import static java.util.stream.Collectors.joining;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.cloud.platform.core.redirects.Types.MappingType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Model(adaptables = { Resource.class },
		adapters = { Rule.class },
		resourceType = Rule.RESOURCE_TYPE,
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class Rule {

	public static final String RESOURCE_TYPE = "abbott-platform/urlredirect/rule";
	
	@Self
	@Getter(AccessLevel.NONE)
	@Setter(AccessLevel.NONE)
	private Resource resource;

	@ValueMapValue(injectionStrategy = InjectionStrategy.REQUIRED)
	private String sourceUrl;

	@ValueMapValue
	@Default(values = "TEMPORARY")
	private String redirectionType;

	@ValueMapValue
	@Default(values = "DIRECT")
	private String mappingType;

	@ValueMapValue
	@Default(booleanValues = false)
	private Boolean forwardQueryString;

	@ValueMapValue
	private String headerName;

	@ValueMapValue
	private String targetUrl;

	@ChildResource
	private List<HeaderMatch> headerMatchers;

	@JsonIgnore
	@ChildResource(name="queryParameters")
	private List<QueryParams> queryParams;

	@JsonIgnore
	String queryParametersString = "";

	@JsonIgnore
	@Setter(AccessLevel.NONE)
	String path = "";

    @JsonProperty("queryParameters")
    @JsonInclude(Include.NON_EMPTY)
	Map<String, String> queryParameters;

	@PostConstruct
	protected void init() {

		if (mappingType.equals(MappingType.BYHEADER.name())) {
			this.targetUrl = null;

			// Set with empty list in case if no header rules are created
			if (headerMatchers == null) {
				headerMatchers = new ArrayList<>();
			}

			// Set the order for each item
			int index = 0;
			for (HeaderMatch match : headerMatchers) {
				match.setOrder(index++);
			}
		}

		updateQueryParameters();
		
		if (resource != null) {
			path = resource.getPath();
		}
	}
	
	public void updateQueryParameters() {
		queryParameters = new HashMap<>();
		if (queryParams == null) {
			queryParams = new ArrayList<>();
		} else {
			// Used for export
			queryParametersString = queryParams.stream()
					.collect(Collectors.toMap(QueryParams::getKey, QueryParams::getParameter, // convert to map
							(existing, replacement) -> existing, // if duplicate found, retain existing
							TreeMap::new)) // Sort
					.values().stream().collect(joining("&"));

			// Used for ESL API
			queryParams.forEach(params -> queryParameters.put(params.getKey(), params.getValue()));
		}
	}

	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}

		if (obj == this) {
			return true;
		}

		if (!(obj instanceof Rule)) {
			return false;
		}

		Rule temp = (Rule) obj;
		if (StringUtils.compare(this.sourceUrl, temp.sourceUrl) != 0) {
			return false;
		}

		if (StringUtils.compare(this.queryParametersString, temp.queryParametersString) != 0) {
			return false;
		}

		return !(StringUtils.equalsIgnoreCase(this.mappingType, temp.mappingType) && StringUtils.equalsIgnoreCase(MappingType.BYHEADER.name(), temp.mappingType) && StringUtils.compare(this.headerName, temp.headerName) != 0);
	}

	public int hashCode() {
		final int PRIME = 59;
		int result = 1;
		result = (result * PRIME) + (this.sourceUrl == null ? 3 : this.sourceUrl.hashCode());
		result = (result * PRIME) + (this.queryParametersString.isBlank() ? 5 : this.queryParametersString.hashCode());

		return result;
	}
}
