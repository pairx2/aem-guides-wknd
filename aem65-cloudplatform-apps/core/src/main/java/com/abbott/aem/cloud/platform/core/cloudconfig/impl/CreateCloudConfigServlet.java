package com.abbott.aem.cloud.platform.core.cloudconfig.impl;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.Servlet;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.apache.sling.servlets.post.HtmlResponse;
import org.osgi.service.component.annotations.Component;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = Servlet.class,
		property = { ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST,
				ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES
						+ "=abbott-cloudplatform/components/utilities/cloudconfig/cloudconfiglist" })
public class CreateCloudConfigServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = -397622433323474345L;

	@Override
	protected void doPost(@NonNull SlingHttpServletRequest request, @NonNull SlingHttpServletResponse response)
			throws IOException {
		ResourceResolver resolver = request.getResourceResolver();
		PageManager pageManager = resolver.adaptTo(PageManager.class);

		HtmlResponse resp = new HtmlResponse();

		if (pageManager == null) {
			resp.setError(new IOException("Unable to get page manager"));
		} else {
			String configPath = getParam(request, "configPath");
			String bucket = getOptionalParam(request, "bucket", "sling:configs");
			String state = getOptionalParam(request, "state", null);

			Resource cloudConfigFolder = ResourceUtil.getOrCreateResource(resolver, configPath + "/" + bucket,
					Collections.singletonMap(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED),
					JcrResourceConstants.NT_SLING_FOLDER, false);
			log.debug("Creating Cloud Config in: {}", cloudConfigFolder);

			resp.setParentLocation(cloudConfigFolder.getPath());

			// create a new page
			Page page;
			try {
				// check if the config already exists
				page = pageManager.getPage(cloudConfigFolder.getPath() + "/" + getParam(request, "name"));

				if (page == null) {
					page = pageManager.create(cloudConfigFolder.getPath(), getParam(request, "name"),
							getParam(request, "template"), getParam(request, "title"));
					
					if (state != null) {
						ModifiableValueMap properties = page.getContentResource().adaptTo(ModifiableValueMap.class);
						properties.put("state", state);
					}
					
					resp.setStatus(201, "Created Cloud Configuration");
					log.debug("Created configuration: {}", page.getPath());
					resolver.commit();
				} else {
					resp.setStatus(406, "Config already exists!");	
				}
				
				resp.setPath(page.getPath());
				resp.setLocation(page.getPath());
			} catch (WCMException e) {
				resp.setError(e);
			}
		}
		response.setContentType("text/plain");
		resp.send(response, true);
	}

	private String getParam(SlingHttpServletRequest request, String param) throws IOException {
		String value = request.getParameter(param);
		if (StringUtils.isBlank(value)) {
			throw new IOException("Parameter " + param + " must not be blank");
		} else {
			log.debug("Loaded {} for parameter {}", value, param);
		}
		return value;
	}

	private String getOptionalParam(SlingHttpServletRequest request, String param, String defaultValue) {
		String value = request.getParameter(param);
		if (StringUtils.isBlank(value)) {
			value = defaultValue;
		} else {
			log.debug("Loaded {} for parameter {}", value, param);
		}
		return value;
	}

}
