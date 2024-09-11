package com.abbott.aem.cloud.platform.core.redirects.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Model(adaptables = { Resource.class }, adapters = {
		QueryParams.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class QueryParams {

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@EqualsAndHashCode.Include
	private String key;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String value;

	@Setter(AccessLevel.NONE)
	private String parameter;

	public QueryParams(String key, String value) {
		this.key = key;
		this.value = value;
		setParameter();
	}

	@PostConstruct
	protected void init() {
		setParameter();
	}
	
	private void setParameter() {
		this.parameter = String.format("%s=%s", key.trim(), value.trim());
	}
	
}
