package com.abbott.aem.platform.search.coveoconnector.core.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.query.Query;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;

/**
 * The Class CoveoConfigUtils.
 */
public class CoveoConfigUtils {

	/**
	 * Instantiates a new coveo config utils.
	 */
	private CoveoConfigUtils() {
	}

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(CoveoConfigUtils.class);

	/**
	 * Gets the coveo config nodes.
	 *
	 * @param resorceResolver the resorce resolver
	 * @return the coveo config nodes
	 */
	public static List<Node> getCoveoConfigNodes(ResourceResolver resorceResolver) {
		List<Node> configNodes = new ArrayList<>();

		// Executing query in One Line....!!!!
		Iterator<Resource> nodeIter = resorceResolver.findResources(
				"SELECT * FROM [nt:base] AS s WHERE ISCHILDNODE([" + CommonConstants.COVEO_CONFIG_BASE_PATH
						+ "]) AND [jcr:primaryType] = '" + CommonConstants.NODE_PRIMARY_TYPE_SLING_OSGICONFIG + "'",
				Query.JCR_SQL2);

		// Converting the Resource object to Node and then storing as arraylist
		while (nodeIter.hasNext()) {
			configNodes.add(nodeIter.next().adaptTo(Node.class));
		}
		return configNodes;
	}

	/**
	 * Gets the indexed paths.
	 *
	 * @param resorceResolver the resorce resolver
	 * @return the indexed paths
	 * @throws RepositoryException the repository exception
	 */
	/*
	 * Recreated the method to fetch the bulk pushed data from repository to improve
	 * the performance gaurav.t
	 */
	public static List<Node> getIndexedPaths(ResourceResolver resorceResolver) throws RepositoryException {
		QueryBuilder queryBuilder = resorceResolver.adaptTo(QueryBuilder.class);
		List<Node> pushedNodes = null;
		if (null != queryBuilder) {
			pushedNodes = getIndexedData(resorceResolver, queryBuilder);
		}
		return pushedNodes;
	}

	/**
	 * Gets the indexed data.
	 *
	 * @param resourceResolver the resource resolver
	 * @param queryBuilder     the query builder
	 * @return the indexed data
	 * @throws RepositoryException the repository exception
	 */
	/*
	 * Recreated the method to fetch the bulk pushed data from repository to improve
	 * the performance gaurav.t
	 */
	public static List<Node> getIndexedData(ResourceResolver resourceResolver, QueryBuilder queryBuilder)
			throws RepositoryException {
		List<Node> pushedNodes = new ArrayList<>();
		Session session = resourceResolver.adaptTo(Session.class);
		SearchResult pushedContentResult = findPushedItems(session, queryBuilder);
		if (null != pushedContentResult) {
			if (pushedContentResult.getHits().isEmpty()) {
				LOGGER.info("No pushed items found!!");
			} else {
				LOGGER.info("Number of pushed items found >>>>>>>>>>>>" + pushedContentResult.getHits().size() + "");
				for (Hit hit : pushedContentResult.getHits()) {
					if (null != hit.getPath()) {
						Node pushedItemNode = resourceResolver.getResource(hit.getPath()).adaptTo(Node.class);
						pushedNodes.add(pushedItemNode);

					}
				}
				LOGGER.info("Total number of pushed items to be displayed {}", pushedNodes.size() + "");


			}

		}
		return pushedNodes;
	}

	/**
	 * Find pushed items.
	 *
	 * @param session      the session
	 * @param queryBuilder the query builder
	 * @return the search result
	 */
	public static SearchResult findPushedItems(Session session, QueryBuilder queryBuilder) {
		SearchResult result = null;
		Map<String, String> map = new HashMap<>();
		map.put("path", "/content");
		map.put("1_property", "coveoPush");
		map.put("1_property.value", "true");
		map.put("p.limit", "-1");
		com.day.cq.search.Query query = queryBuilder.createQuery(PredicateGroup.create(map), session);
		result = query.getResult();
		return result;
	}

}
