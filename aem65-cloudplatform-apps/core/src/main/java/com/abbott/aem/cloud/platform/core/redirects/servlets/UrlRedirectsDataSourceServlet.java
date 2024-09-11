package com.abbott.aem.cloud.platform.core.redirects.servlets;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.adobe.granite.ui.components.Config;
import com.adobe.granite.ui.components.ExpressionHelper;
import com.adobe.granite.ui.components.ExpressionResolver;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.EmptyDataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SuppressWarnings("CQRules:CQBP-71")
@Component(service = Servlet.class,
		immediate = true,
		property = { Constants.SERVICE_DESCRIPTION + "=Abbott Platform - URL Redirect Datasource Servlet",
				ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
				ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES
						+ "=abbott-platform/urlredirect/datasources/urlredirects" })
public class UrlRedirectsDataSourceServlet extends SlingSafeMethodsServlet {

	private static final long serialVersionUID = 3848437934651223006L;
	private static final String PN_TEMPLATE = "/apps/abbott-cloudplatform/templates/utilities/urlredirectconfig";
	private static final int SIZE = 10;

	@Reference
	private transient ExpressionResolver expressionResolver;

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {

		ResourceResolver resolver = request.getResourceResolver();
		DataSource dataSource = EmptyDataSource.instance();

		QueryBuilder queryBuilder = resolver.adaptTo(QueryBuilder.class);

		if (queryBuilder != null) {
			final Config cfg = getConfig(request);
			final ExpressionHelper ex = new ExpressionHelper(expressionResolver, request);

			Integer offset = getParameter(cfg, "offset", ex, Integer.class);
			Integer limit = getParameter(cfg, "limit", ex, Integer.class);

			offset = (offset == null) ? 0 : offset;
			limit = (limit == null) ? (SIZE + 1) : (limit + 1);

			Map<String, String> parameterMap = new HashMap<>();
			parameterMap.put("path", "/conf");
			parameterMap.put("type", NameConstants.NT_PAGE);
			parameterMap.put("1_property", JcrConstants.JCR_CONTENT + "/" + NameConstants.NN_TEMPLATE);
			parameterMap.put("1_property.value", PN_TEMPLATE);
			parameterMap.put("orderby", "path");
			parameterMap.put("p.limit", limit.toString());
			parameterMap.put("p.offset", offset.toString());
			parameterMap.put("hasPermission", "rep:alterProperties");

			log.debug("Query Params: {}", parameterMap.toString());
			PredicateGroup predicateGroup = PredicateGroup.create(parameterMap);
			Session session = resolver.adaptTo(Session.class);
			Query query = queryBuilder.createQuery(predicateGroup, session);

			SearchResult result = query.getResult();
			dataSource = new SimpleDataSource(result.getResources());
		}

		request.setAttribute(DataSource.class.getName(), dataSource);
	}

	private Config getConfig(SlingHttpServletRequest request) {
		// get datasource configuration
		Resource datasource = request.getResource().getChild(Config.DATASOURCE);

		if (datasource == null) {
			return null;
		}
		
		return new Config(datasource);
	}

	private <T> T getParameter(Config config, @NonNull String name, @NonNull ExpressionHelper ex,
			Class<T> expectedType) {
		if (config == null) {
			return null;
		}

		String value = config.get(name, String.class);
		if (value.isEmpty()) {
			return null;
		}

		return ex.get(value, expectedType);
	}
}
