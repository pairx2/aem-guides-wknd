package com.abbott.aem.platform.common.components.services;

import java.io.IOException;

import org.apache.http.HttpException;

import com.day.cq.wcm.api.Page;

public interface APILookupService {
	String getAPIEndpointForKey(String apiEndpointKey);
	
	String getRelativeAPIEndpointForKey(String apiEndpointKey);

	String processRequest(Page page, String relEndPoint, HttpMethod httpMethod, String requestBody) throws IOException, HttpException;

	String getRequestEndpoint(String relUrl);
	
	String getSecretKey();
}
