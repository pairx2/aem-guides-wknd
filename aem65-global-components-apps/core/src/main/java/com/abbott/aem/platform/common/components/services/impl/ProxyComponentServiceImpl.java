package com.abbott.aem.platform.common.components.services.impl;

import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;

import lombok.extern.slf4j.Slf4j;

/**
 * The Class ProxyComponentServiceImpl.
 */
@Slf4j
@Component(service = ProxyComponentService.class)
public class ProxyComponentServiceImpl implements ProxyComponentService {

	@Reference
	ResourceResolverFactory resolverFactory;
	private static final Logger logger = LoggerFactory.getLogger(ProxyComponentServiceImpl.class);

	/**
	 * Gets the component path value.
	 *
	 * @param component the component
	 * @param name      the property name for component
	 * @return the componentPath
	 * 
	 */
	@Override
	public String getProxyPath(com.day.cq.wcm.api.components.Component component, ProxyPaths componentProxy) {
		String componentProxyProperty = componentProxy.toString();
		String proxyPath = component.getProperties().get(componentProxyProperty, String.class);
		// If the proxy is not assigned to the component, take it from its super type
		// component.
		if (proxyPath == null && component.getSuperComponent() != null) {
			proxyPath = component.getSuperComponent().getProperties().get(componentProxyProperty, String.class);
		}
		if (proxyPath == null) {
			for (int i = 0; i < ProxyPaths.values().length; i++) {
				if (ProxyPaths.values()[i].toString().equalsIgnoreCase(componentProxyProperty)) {
					proxyPath = ProxyPaths.values()[i].getPath();
				}
			}
		}
		logger.debug("proxyPath is : " + proxyPath);
		return proxyPath;
	}

}