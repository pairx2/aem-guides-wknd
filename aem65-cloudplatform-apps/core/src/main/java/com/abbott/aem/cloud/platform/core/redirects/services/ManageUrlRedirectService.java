package com.abbott.aem.cloud.platform.core.redirects.services;

import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;

import com.abbott.aem.cloud.platform.core.redirects.models.CreateApplyPromoteResponse;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirect;

public interface ManageUrlRedirectService {
	
	public CreateApplyPromoteResponse applyRedirectRule(Resource resource);
	
	public CreateApplyPromoteResponse promoteRedirectRule(Resource resource);

	void updateState(Resource resource, String newProperty, String userName) throws PersistenceException;

	CreateApplyPromoteResponse createRedirectRule(Resource resource, UrlRedirect redirectResource);

	CreateApplyPromoteResponse checkRedirectRuleConsistency(Resource resource, String path);

	CreateApplyPromoteResponse overwriteUrlRedirects(Resource resource, String path);

}