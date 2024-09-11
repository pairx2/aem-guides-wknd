package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.ComponentProxy;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import javax.annotation.PostConstruct;

@Slf4j
@Data
@Model(adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ComponentProxyImpl implements ComponentProxy {

	@ScriptVariable
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@Setter(AccessLevel.NONE)
	private String titleProxyPath;

	@Setter(AccessLevel.NONE)
	private String tilelistProxyPath;

	@OSGiService
	private ProxyComponentService proxyComponentService;

	@PostConstruct
	private void initModel() {
		titleProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.titleProxy);
		tilelistProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.tilelistProxy);

	}
}