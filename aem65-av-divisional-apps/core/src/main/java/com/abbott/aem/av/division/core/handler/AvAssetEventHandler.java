package com.abbott.aem.av.division.core.handler;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.observation.ResourceChange;
import org.apache.sling.api.resource.observation.ResourceChangeListener;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;

/**
 * @author Kanagasabapathy
 * 
 *         Event Handler that listens to the Sling events
 * 
 */
@Component(service = ResourceChangeListener.class, immediate = true, property = {
		ResourceChangeListener.PATHS + "=/content/dam/av/eifu",
		ResourceChangeListener.PATHS + "=/content/dam/av/manuals-eifu", ResourceChangeListener.CHANGES + "=CHANGED",
		ResourceChangeListener.CHANGES + "=ADDED", ResourceChangeListener.PROPERTY_NAMES_HINT + "=jcr:lastModified" })
public class AvAssetEventHandler implements ResourceChangeListener, NameConstants {

	@Reference
	protected ResourceResolverFactory resolverFactory;

	@Reference
	private Replicator replicator;

	private static final Logger log = LoggerFactory.getLogger(AvAssetEventHandler.class);
	private static final String JCR_METADATA = "/jcr:content/metadata";
	private static final String EIFU_PATH = "/content/dam/av/eifu";
	private static final String MANUALS_PATH = "/content/dam/av/manuals-eifu";
	private static final String GLOBAL_PATH = "/content/dam/av/manuals-eifu/global";
	private static final String PDF_NODE = ".pdf/jcr:content/metadata";
	protected static final String EIFU_SERVICE = "eifu-system-user";
	private static final String VASCULAR = "/content/dam/av/manuals-eifu/vascular";

	private static final String CATEGORY_UNIT = "categoryTitle";
	private String strTagPath = "av:eifu";
	private String ctagTitle = null;
	private String businessTitle = null;
	private String roleTitle = null;
	private String stagTitle = null;
	private String ptagTitle = null;
	private String eventPath = null;

	@Override
	public void onChange(List<ResourceChange> changes) {
		for (final ResourceChange change : changes) {
			log.info("path is: {}", change.getPath());
			eventPath = change.getPath();
			if (eventPath.contains(MANUALS_PATH)) {
				strTagPath = "av:manualseifu";
			}
			setEventPath(eventPath);
			if ((eventPath.contains(EIFU_PATH) || eventPath.contains(MANUALS_PATH))
					&& eventPath.toLowerCase().endsWith(PDF_NODE)) {				
					checkMetaData();
			}
		}

	}
	
	private void checkMetaData() {
		Map<String, Object> param = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE,
				(Object) EIFU_SERVICE);
		try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(param)) {
			Resource resource = resolver.getResource(eventPath);
			Node metaNode = resource.adaptTo(Node.class);
			if (!metaNode.hasProperty(CATEGORY_UNIT) || eventPath.contains(VASCULAR)) {
				ModifiableValueMap mvp = resource.adaptTo(ModifiableValueMap.class);
				updateMetaData(metaNode, resolver, mvp);
				resolver.commit();
				if (eventPath.contains(GLOBAL_PATH) && metaNode.hasProperty(CATEGORY_UNIT)) {
					log.info("EventPath is: {}", eventPath);
					Session session = resolver.adaptTo(Session.class);
					replicator.replicate(session, ReplicationActionType.ACTIVATE,
							eventPath.replace(JCR_METADATA, ""));
				}
			}
		} catch (LoginException | PersistenceException | RepositoryException | ReplicationException e) {
			log.error("Exception occured during AV asset resource listener", e);
		}
		
	}

	private void updateMetaData(Node metaNode, ResourceResolver resolver, ModifiableValueMap mvp) {
		try {
			TagManager tagManager = resolver.adaptTo(TagManager.class);

			if (metaNode.hasProperty(NameConstants.PN_TAGS)) {
				Property prop = metaNode.getProperty(NameConstants.PN_TAGS);
				if (prop != null && prop.isMultiple()) {
					javax.jcr.Value[] tags = prop.getValues();
					if (null != tags && tags.length > 0) {
						putData(tags, tagManager, mvp);
					}
				}
			}
		} catch (PathNotFoundException e) {
			log.error("AvAssetEventHandler :: handleEvent : PathNotFoundException {} ", e.getMessage());
		} catch (ValueFormatException e) {
			log.error("AvAssetEventHandler :: handleEvent : ValueFormatException {}", e.getMessage());
		} catch (RepositoryException e) {
			log.error("AvAssetEventHandler :: handleEvent : RepositoryException {}", e.getMessage());
		}

	}

	private void putData(Value[] tags, TagManager tagManager, ModifiableValueMap mvp) throws RepositoryException {
		String[] finalTag = null;
		ctagTitle = null;
		businessTitle = null;
		roleTitle = null;
		stagTitle = null;
		ptagTitle = null;
		for (int j = 0; j < tags.length; j++) {
			finalTag = getFinalTag(tags[j]);
			String strTag = strTagPath;
			for (int i = 0; i < finalTag.length; i++) {
				String data = finalTag[i];
				strTag = strTag.concat("/").concat(data);
				Tag tag = tagManager.resolve(strTag);
				setTags(tag, i, finalTag, strTag);
			}
		}
		putDataInValueMap(ptagTitle, businessTitle, ctagTitle, roleTitle, stagTitle, mvp);
	}

	private void setTags(Tag tag, int i, String[] finalTag, String strTag) {
		if (null != tag && finalTag.length == 6) {
			if (i == 2) {
				roleTitle = getRoleTitle(roleTitle, tag);
			} else if (i == 3) {
				ctagTitle = getCategoryTitle(ctagTitle, tag, strTag);
			} else if (i == 4) {
				stagTitle = getSubCategoryTitle(stagTitle, tag, strTag);
			} else if (i == 5) {
				ptagTitle = getProductTitle(ptagTitle, tag, strTag);
			}
		} else if (null != tag && finalTag.length == 7) {
			if (i == 2) {
				roleTitle = getRoleTitle(roleTitle, tag);
			} else if (i == 3) {
				businessTitle = getBusinessTitle(businessTitle, tag, strTag);
			} else if (i == 4) {
				ctagTitle = getCategoryTitle(ctagTitle, tag, strTag);
			} else if (i == 5) {
				stagTitle = getSubCategoryTitle(stagTitle, tag, strTag);
			} else if (i == 6) {
				ptagTitle = getProductTitle(ptagTitle, tag, strTag);
			}
		}

	}

	private String getRoleTitle(String roleTitle, Tag tag) {
		roleTitle = null != roleTitle ? roleTitle.concat(",").concat(tag.getTitle()) : tag.getTitle();
		return roleTitle;
	}

	private String getBusinessTitle(String businessTitle, Tag tag, String strTag) {
		businessTitle = null != businessTitle
				? businessTitle.concat(",").concat(tag.getTitle()).concat("::").concat(strTag)
				: tag.getTitle().concat("::").concat(strTag);
		return businessTitle;
	}

	private String getCategoryTitle(String ctagTitle, Tag tag, String strTag) {
		ctagTitle = null != ctagTitle ? ctagTitle.concat(",").concat(tag.getTitle()).concat("::").concat(strTag)
				: tag.getTitle().concat("::").concat(strTag);
		return ctagTitle;
	}

	private String getSubCategoryTitle(String stagTitle, Tag tag, String strTag) {
		stagTitle = null != stagTitle ? stagTitle.concat(",").concat(tag.getTitle()).concat("::").concat(strTag)
				: tag.getTitle().concat("::").concat(strTag);
		return stagTitle;
	}

	private String getProductTitle(String ptagTitle, Tag tag, String strTag) {
		ptagTitle = null != ptagTitle ? ptagTitle.concat(",").concat(tag.getTitle()).concat("::").concat(strTag)
				: tag.getTitle().concat("::").concat(strTag);
		return ptagTitle;
	}

	private String[] getFinalTag(Value value) throws RepositoryException {
		String tagVariable = value.getString().replace(strTagPath, "");
		if (tagVariable.startsWith("/")) {
			tagVariable = tagVariable.replaceFirst("/", "");
		}
		return tagVariable.split("/");
	}

	private void putDataInValueMap(String ptagTitle, String businessTitle, String ctagTitle, String rtagTitle,
			String stagTitle, ModifiableValueMap mvp) {
		if (null != ptagTitle) {
			mvp.put("productTitle", ptagTitle);
		} else {
			mvp.remove("productTitle");
		}
		if (null != businessTitle) {
			mvp.put("businessunitTitle", businessTitle);
		} else {
			log.debug("businessunitTitle is null , please check business tag in tags");
			mvp.remove("businessunitTitle");
		}
		if (null != ctagTitle) {
			mvp.put(CATEGORY_UNIT, ctagTitle);
		} else {
			log.debug("categoryTitle is null , please check category tag in tags");
			mvp.remove(CATEGORY_UNIT);
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
	
	private void setEventPath(String resourcePath) {
		
		if (resourcePath.contains(JcrConstants.JCR_CONTENT)) {
			String[] path = resourcePath.split("/".concat(JcrConstants.JCR_CONTENT), 2);
			eventPath = path[0].concat(JCR_METADATA);
		} else if(resourcePath.endsWith(".pdf") || resourcePath.endsWith(".PDF")){
			eventPath = resourcePath.concat(JCR_METADATA);
		}
				
	}
}