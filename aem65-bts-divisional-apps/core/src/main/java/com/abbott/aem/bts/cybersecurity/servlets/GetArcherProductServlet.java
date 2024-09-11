package com.abbott.aem.bts.cybersecurity.servlets;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import com.abbott.aem.bts.cybersecurity.services.ArcherAPIJobService;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.NonNull;
import java.io.IOException;

/*
This Servlet is created to read products from archer as a temporary fix till sling job schduler issue
 */
@Component(service = Servlet.class,
		   property = { SLING_SERVLET_PATHS+ "=" + GetArcherProductServlet.API_RESOURCE, SLING_SERVLET_METHODS + "=" + METHOD_GET })
public class GetArcherProductServlet extends SlingSafeMethodsServlet {

	public static final String API_RESOURCE = "/bin/bts/cybersecurity/getProducts";
	private static final long serialVersionUID = 2222720152081520255L;


	private static final Logger LOGGER = LoggerFactory.getLogger(GetArcherProductServlet.class);

	@Reference
	private transient ArcherAPIJobService archerAPIJobService;

	/**
	 * Do get.
	 *
	 * @param request  the request
	 * @param response the response
	 */
	@Override
	protected void doGet(@NonNull SlingHttpServletRequest request, @NonNull SlingHttpServletResponse response) throws ServletException, IOException {

			boolean productFlag = false;
			String respString = "Something wrong with Archer Servlet";
			LOGGER.debug("Entered into Get Archer Product Servlet");
			String queryValue = request.getParameter("q");
			if(StringUtils.isNotBlank(queryValue) && StringUtils.equalsIgnoreCase(queryValue,"archer")){
				LOGGER.debug("Entered into valid method with param values as {}",queryValue);
				productFlag = archerAPIJobService.getProductDetails();
			}else{
				LOGGER.debug("Required valid input parameter to read products from archer");
			}
			if(productFlag){
				respString = "Successfully Retrieved Products from Archer";
			}
			else{
				LOGGER.debug("productFlag is false.");
			}
			response.getWriter().write(respString);
	}

}
