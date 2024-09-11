package com.abbott.aem.platform.common.components.services;

import com.day.cq.wcm.api.components.Component;

public interface ProxyComponentService {

	String getProxyPath(Component component, ProxyPaths componentProxy);
}