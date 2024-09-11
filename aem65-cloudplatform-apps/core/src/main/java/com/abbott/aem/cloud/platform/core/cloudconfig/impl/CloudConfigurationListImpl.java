
package com.abbott.aem.cloud.platform.core.cloudconfig.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;
import javax.jcr.query.Query;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.abbott.aem.cloud.platform.core.cloudconfig.CloudConfiguration;
import com.abbott.aem.cloud.platform.core.cloudconfig.CloudConfigurationList;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Model(adaptables = SlingHttpServletRequest.class, adapters = { CloudConfigurationList.class })
public class CloudConfigurationListImpl implements CloudConfigurationList {

	@Self
	SlingHttpServletRequest slingRequest;

	private List<CloudConfiguration> cloudConfigurations = new ArrayList<>();

	@PostConstruct
	protected void init() {
		String template = Optional.ofNullable(slingRequest.getRequestPathInfo().getSuffix()).orElse("");

		if (StringUtils.isNotBlank(template)) {
			String query = "SELECT * FROM [cq:Page] WHERE ISDESCENDANTNODE([/conf]) AND [jcr:content/cq:template]='"
					+ template.replace("'", "''") + "'";
			log.debug("Finding cloud configurations with: {}", query);

			slingRequest.getResourceResolver().findResources(query, Query.JCR_SQL2).forEachRemaining(ccr -> cloudConfigurations.add(ccr.adaptTo(CloudConfiguration.class))
			);
			
			cloudConfigurations.sort(Comparator.comparing(CloudConfiguration::getTitle));
		} else {
			log.debug("Suffix not specified");
		}
	}
}
