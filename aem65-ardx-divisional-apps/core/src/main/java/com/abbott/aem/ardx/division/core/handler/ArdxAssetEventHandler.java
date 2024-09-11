package com.abbott.aem.ardx.division.core.handler;

import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;

/**
 * @author Ravindranath
 * 
 *         Event Handler that listens to the Sling events
 * 
 */

@Component(immediate = true, service = EventHandler.class, property = {
		Constants.SERVICE_DESCRIPTION + "= This event handler listens the events on related/metadata node update for asset",
		EventConstants.EVENT_TOPIC + "=org/apache/sling/api/resource/Resource/ADDED",
		EventConstants.EVENT_TOPIC + "=org/apache/sling/api/resource/Resource/CHANGED",
		EventConstants.EVENT_FILTER + "=(path=/content/dam/ardx/eifu/*)" })
public class ArdxAssetEventHandler implements EventHandler,JcrConstants,NameConstants,DamConstants {

	private static final String RELATED = "related";
	private static final String OTHERS = "others";
	private static final String DERIVED = "derived";
	private static final String SOURCE = "sources";
	private static final String SLING_MEMBERS = "sling:members";
	private static final String GENERIC_CONTACT = "generic-contact";
	private static final String SLING_RESTYPE = "sling:resource";
	private static final String CONTENT_FRAGMENT = "contentFragment";
	private static final String FALSE = "false";
	private static final String TRUE = "true";
	private static final String RELATEDFRAGMENT = "relatedfragment";
	private static final String DEFAULT = "default";
	private static final String KEYWORD  ="keywords";
	private static final String KEYWORDTITLE  ="keywordTitle";
	

	@Reference
	private ResourceResolverFactory resolverFactory;

	@Reference
	QueryBuilder querybuilder;

	/**
	 * logger
	 */
	private static final Logger log = LoggerFactory.getLogger(ArdxAssetEventHandler.class);

	@Override
	public void handleEvent(Event event) {
		log.debug("Event is: {}", event.getTopic());
		log.debug("path is: {}", event.getProperty(SlingConstants.PROPERTY_PATH));
		String eventPath = (String) event.getProperty(SlingConstants.PROPERTY_PATH);
			if (eventPath.contains("/content/dam/ardx/eifu")) {
				Map<String, Object> param = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, (Object) "eifu-system-user");
				try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(param)) {
				String assetNode = eventPath.substring(0, eventPath.indexOf(JcrConstants.JCR_CONTENT )).concat(JcrConstants.JCR_CONTENT);
				String relatedFragmentPath = "";
				if (eventPath.contains(".pdf/jcr:content/metadata") && null != resolver) {
					updateMetadata(resolver, eventPath, assetNode, "/content/dam/ardx/eifu/contact-us-fragments");
					resolver.commit();
				} else if (eventPath.contains(".pdf/jcr:content/related") && null != resolver) {
					Session session = resolver.adaptTo(Session.class);
					Resource assetResource = resolver.getResource(assetNode);
					String path = eventPath.substring(0, eventPath.indexOf("/jcr:content")) + "/jcr:content/metadata";
					relatedFragmentPath = getRelatedFragmentDetails(assetResource, resolver);
					log.debug("Asset Level relatedfragment2: " + relatedFragmentPath);
					Resource res = resolver.getResource(path);
					ModifiableValueMap mvp =res.adaptTo(ModifiableValueMap.class);
					checkRelatedFragment(relatedFragmentPath,mvp,session);
					resolver.commit();
				}

			}
			
			catch (LoginException e) {
				log.error("ArdxAssetEventHandler :: LoginException ", e);
			} catch (PersistenceException e) {
				log.error("ArdxAssetEventHandler :: PersistenceException ", e);
			} catch (RepositoryException e) {
				log.error("ArdxAssetEventHandler :: RepositoryException ", e);
			}
			}

	}

	private void checkRelatedFragment(String relatedFragmentPath, ModifiableValueMap mvp, Session session) throws RepositoryException {
		if (!relatedFragmentPath.isBlank()) {
			mvp.put(RELATEDFRAGMENT, relatedFragmentPath);
		} else {
			relatedFragmentPath = getGenericFragmentDetails("/content/dam/ardx/eifu/contact-us-fragments", session, GENERIC_CONTACT);
			log.debug("Generic relatedfragment2: " + relatedFragmentPath);
			mvp.put(RELATEDFRAGMENT, relatedFragmentPath);
		}
		
	}

	private void updateMetadata(ResourceResolver resolver, String eventPath, String assetNode,
			String contentfragmentpath) {
		TagManager tagManager = resolver.adaptTo(TagManager.class);
		Session session = resolver.adaptTo(Session.class);
		Resource resource = resolver.getResource(eventPath);
		Resource assetResource = resolver.getResource(assetNode);
		Node metaNode = resource.adaptTo(Node.class);
		ModifiableValueMap mvp = resource.adaptTo(ModifiableValueMap.class) ;
		try {
			if (metaNode.hasProperty(NameConstants.PN_TAGS)) {
				Property prop = metaNode.getProperty(NameConstants.PN_TAGS);
				if (prop != null && prop.isMultiple()) {
					javax.jcr.Value[] tags = prop.getValues();
					putData(mvp, tags, tagManager);

				}

			}
			if (metaNode.hasProperty(KEYWORD)) {
				Property prop = metaNode.getProperty(KEYWORD);
				if (prop != null && prop.isMultiple()) {
					javax.jcr.Value[] tags = prop.getValues();
					putKeywordData(mvp, tags, tagManager);

				}

			}
			else {
				mvp.remove(KEYWORDTITLE);
			}
			String relatedFragmentPath = getRelatedFragmentDetails(assetResource, resolver);
			log.debug("Asset Level relatedfragment: " + relatedFragmentPath);
			if (!relatedFragmentPath.isBlank()) {
				mvp.put(RELATEDFRAGMENT, relatedFragmentPath);
			} else {
				relatedFragmentPath = getGenericFragmentDetails(contentfragmentpath, session, GENERIC_CONTACT);
				log.debug("Generic relatedfragment: " + relatedFragmentPath);
				mvp.put(RELATEDFRAGMENT, relatedFragmentPath);
			}
		} catch (PathNotFoundException e) {
			log.error("ARdxAssetEventHandler :: updateMetadata : PathNotFoundException " + e.getMessage());
		} catch (ValueFormatException e) {
			log.error("ARdxAssetEventHandler :: updateMetadata : ValueFormatException " + e.getMessage());
		} catch (RepositoryException e) {
			log.error("ARdxAssetEventHandler :: updateMetadata : RepositoryException " + e.getMessage());
		}
		

	}

	private void putKeywordData(ModifiableValueMap mvp, Value[] tags, TagManager tagManager) {
		String keywordTitle = "";
		try {
			for (int j = 0; j < tags.length; j++) {
				String tagString = tags[j].getString();
				String strTagPath = "ardx:eifu";
				if (tagString.startsWith(strTagPath + "/keywords/")) {
					Tag keyTag = tagManager.resolve(tagString);
					if (!keyTag.getLocalizedTitles().isEmpty()) {
					Map<Locale, String> titles = keyTag.getLocalizedTitles();
					titles.put(new Locale(DEFAULT), keyTag.getTitle());
					keywordTitle = keywordTitle.concat(titles.toString());
					}
				

			}
			}
			if(!StringUtils.isEmpty(keywordTitle)) {
				mvp.put(KEYWORDTITLE, keywordTitle);
			}
			
		} catch (IllegalStateException | RepositoryException e) {
			log.error("ARdxAssetEventHandler :: putKeywordData : RepositoryException " + e.getMessage());
		}
		
	}

	private void putData(ModifiableValueMap mvp, Value[] tags, TagManager tagManager) {
		String ctagTitle = null;
		String stagTitle = null;
		String ptagTitle = null;
		String rtagTitle = null;
		try {
			for (int j = 0; j < tags.length; j++) {
				String tagString = tags[j].getString();
				String strTagPath = "ardx:eifu";
				if (tagString.startsWith(strTagPath + "/products/")) {
					ptagTitle = tagManager.resolve(tagString).getTitle();
				} else if (tagString.startsWith(strTagPath + "/categories/")) {
					ctagTitle = getCategory(tagString, tagManager);
					stagTitle = getSubcategory(tagString, tagManager);
				} else if (tagString.startsWith(strTagPath.concat("/user-role/"))) {
					rtagTitle = tagManager.resolve(tagString).getTitle();
				}

			}
			putDataInValueMap(ptagTitle, ctagTitle, rtagTitle, stagTitle, mvp);
		} catch (IllegalStateException | RepositoryException e) {
			log.error("ARdxAssetEventHandler :: putData : RepositoryException " + e.getMessage());
		}

	}

	private void putDataInValueMap(String ptagTitle, String ctagTitle, String rtagTitle, String stagTitle,
			ModifiableValueMap mvp) {
		if (null != ptagTitle) {
			mvp.put("productTitle", ptagTitle);
		} else {
			mvp.remove("productTitle");
		}
		if (null != ctagTitle) {
			mvp.put("categoryTitle", ctagTitle);
		} else {
			log.debug("categoryTitle is null , please check category tag in tags");
			mvp.remove("categoryTitle");
		}
		if (null != rtagTitle) {
			mvp.put("roleTitle", rtagTitle);
		} else {
			mvp.remove("roleTitle");
		}
		if (null != stagTitle) {
			mvp.put("subcategoryTitle", stagTitle);
		} else {
			log.debug("subcategoryTitle is null , please check subcategory tag in tags");
			mvp.remove("subcategoryTitle");
		}
	}

	private String getCategory(String tagString, TagManager tagManager) {
		String ctagTitle = null;

		if (tagString.split("/").length == 4) {
			Tag subTag = tagManager.resolve(tagString.substring(0, tagString.lastIndexOf("/")));
			if (null != subTag) {
				if (!subTag.getLocalizedTitles().isEmpty()) {
					Map<Locale, String> titles = subTag.getLocalizedTitles();
					titles.put(new Locale(DEFAULT), subTag.getTitle());
					ctagTitle = titles.toString();
				} else {
					log.debug("lacalized category is empty  ");
					ctagTitle = subTag.getTitle();
				}
			}

		} else {
			Tag tag = tagManager.resolve(tagString);
			if (null != tag) {
				if (!tag.getLocalizedTitles().isEmpty()) {
					Map<Locale, String> titles = tag.getLocalizedTitles();
					titles.put(new Locale(DEFAULT), tag.getTitle());
					ctagTitle = titles.toString();
				} else {
					log.debug("lacalized Subcategory is empty");
					ctagTitle = tag.getTitle();
				}

			}

		}

		return ctagTitle;

	}

	private String getSubcategory(String tagString, TagManager tagManager) {
		String stagTitle = null;
		if (tagString.split("/").length == 4) {
			Tag tag = tagManager.resolve(tagString);
			if (null != tag) {
				if (!tag.getLocalizedTitles().isEmpty()) {
					Map<Locale, String> titles = tag.getLocalizedTitles();
					titles.put(new Locale(DEFAULT), tag.getTitle());
					stagTitle = titles.toString();
				} else {
					log.debug("lacalized subcategory is empty");
					stagTitle = tag.getTitle();
				}

			}

		}
		return stagTitle;
	}

	/**
	 * This method helps to iterate over the related resources of an asset
	 */
	private String getRelatedFragmentDetails(Resource assetRes, ResourceResolver resolver) {
		String addressListString = "";
		try {
			Node assetNode = assetRes.adaptTo(Node.class);
			Node relatedNode = assetNode.hasNode(RELATED) ? assetNode.getNode(RELATED)
					: null;
			Node othersNode = (null != relatedNode && relatedNode.hasNode(OTHERS)) ? relatedNode.getNode(OTHERS) : null;
			Node derivedNode = (null != relatedNode && relatedNode.hasNode(DERIVED)) ? relatedNode.getNode(DERIVED)
					: null;
			Node slingmembersNode = null;
			Node sourceNode = (null != relatedNode && relatedNode.hasNode(SOURCE)) ? relatedNode.getNode(SOURCE) : null;
			if (null != othersNode && othersNode.hasNode(SLING_MEMBERS)) {
				slingmembersNode = othersNode.getNode(SLING_MEMBERS);
				addressListString = getCFPATHfromSlingMemberNode(slingmembersNode, resolver);
			}
			if (addressListString.isEmpty() && null != derivedNode && derivedNode.hasNode(SLING_MEMBERS)) {
				slingmembersNode = derivedNode.getNode(SLING_MEMBERS);
				addressListString = getCFPATHfromSlingMemberNode(slingmembersNode, resolver);
			}
			if (addressListString.isEmpty() && null != sourceNode && sourceNode.hasNode(SLING_MEMBERS)) {
				slingmembersNode = sourceNode.getNode(SLING_MEMBERS);
				addressListString = getCFPATHfromSlingMemberNode(slingmembersNode, resolver);
			}
		} catch (PathNotFoundException e) {
			log.error("ARdxAssetEventHandler :: getRelatedFragmentDetails : PathNotFoundException " + e.getMessage());
		} catch (RepositoryException e) {
			log.error("ARdxAssetEventHandler :: getRelatedFragmentDetails : RepositoryException " + e.getMessage());
		}
		return addressListString;

	}

	private String getContentFragment(Node jcrNode) throws RepositoryException {
		return (null != jcrNode && jcrNode.hasProperty(CONTENT_FRAGMENT))
				? jcrNode.getProperty(CONTENT_FRAGMENT).getString()
				: FALSE;
	}

	/**
	 * This method returns the contact details from related content fragments
	 * @throws RepositoryException 
	 */
	private String getGenericFragmentDetails(String queryPath, Session session,
			String tagName) throws RepositoryException {
		String contentFragmentPath = "";
		SearchResult result = getQueryResults(queryPath, tagName, session);
		log.debug("getGenericFragmentDetails :: search count : " + result.getTotalMatches());
		if (result.getHits().size() > 0) {
			contentFragmentPath = getCFPath(result);

		}

		return contentFragmentPath;
	}

	/**
	 * This method returns the site level/generic contact details from content
	 * fragments
	 * @throws RepositoryException 
	 */
	private String getCFPath(SearchResult result) throws RepositoryException {
		String cfPath = "";
		
			for (Hit hit : result.getHits()) {
				Resource fragmentResource = hit.getResource();

				Node resNode = fragmentResource.adaptTo(Node.class);
				Node jcrNode = resNode.hasNode(JcrConstants.JCR_CONTENT) ? resNode.getNode(JcrConstants.JCR_CONTENT) : null;
				if (null != jcrNode) {
					String contentFragment = getContentFragment(jcrNode);
					if (contentFragment.equals("true")) {
						cfPath = fragmentResource.getPath();
						break;
					}
				}
			}
		
		return cfPath;
	}

	private String getCFPATHfromSlingMemberNode(Node slingmembersNode, ResourceResolver resolver)
			throws ValueFormatException, PathNotFoundException, RepositoryException {
		String path = "";
		if (null != slingmembersNode && slingmembersNode.hasNodes()) {
				NodeIterator nodeIter = slingmembersNode.getNodes();
				while (nodeIter.hasNext()) {
					Node relNode = nodeIter.nextNode();
					String relatedFragPath = relNode.getProperty(SLING_RESTYPE).getValue().toString();
					Resource resource = resolver.getResource(relatedFragPath);
					Node resNode = resource.adaptTo(Node.class);
					Node jcrNode1 = resNode.hasNode(JcrConstants.JCR_CONTENT) ? resNode.getNode(JcrConstants.JCR_CONTENT) : null;
					if (jcrNode1 != null) {
						String contentFragment = getContentFragment(jcrNode1);
						if (contentFragment.equals(TRUE)) {
							path = relatedFragPath;
							break;
						}

					}
				}
		}
		return path;
	}

	private SearchResult getQueryResults(String queryPath, String tagName, Session session) {
		Map<String, String> map = new HashMap<>();
		map.put("path", queryPath);
		map.put("type", DamConstants.NT_DAM_ASSET);
		map.put("property", "@jcr:content/metadata/cq:tags");
		map.put("property.value", "%" + "/" + tagName);
		map.put("property.operation", "like");
		map.put("p.limit", "-1");
		log.debug("Query :: " + PredicateGroup.create(map).toString());

		Query query = querybuilder.createQuery(PredicateGroup.create(map), session);
		return query.getResult();
	}

	public void setResourceResolverFactory(ResourceResolverFactory resolverFactory) {
        this.resolverFactory = resolverFactory;
    }

}