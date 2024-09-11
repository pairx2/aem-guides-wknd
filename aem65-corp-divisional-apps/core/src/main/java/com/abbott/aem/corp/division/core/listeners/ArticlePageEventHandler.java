package com.abbott.aem.corp.division.core.listeners;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.Replicator;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.*;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component(service = EventHandler.class, immediate = true, property = {EventConstants.EVENT_TOPIC + "=" + ReplicationAction.EVENT_TOPIC,})
public class ArticlePageEventHandler implements EventHandler {
    private static final String JCRCONTENT = "/jcr:content";
    private static final String TEMPLATE_PATH = "/conf/corp/corporate/settings/wcm/templates/corp-article-page";
    private static final String PROFILE_TEMPLATE_PATH = "/conf/corp/corporate/settings/wcm/templates/corp-profile-page";
    private static final String ROOT = "/root";
    private static final String TEXT = "text";
    private static final String ARTICLECONTAINER = "/rarticle_container";
    private static final String ARTICLESERVICEUSER = "gm-system-user";
    private static final String TEXT_TITLE = "/text_title";
    private static final String TEXT_DESCRIPTION = "/text_description";
    private static final String IMAGE = "/image";
    private static final String EXECUTIVE_TEAM = "/us/en/corpnewsroom/utilities/executive-team";
    private static final String EXECUTIVE_TITLE_TEXT = "/container/title";
    private static final String EXECUTIVE_DESC_TEXT = "/container/columncontrol/tab_item_no_1/text";
    private static final String EXECUTIVE_IMAGE = "/container/columncontrol/tab_item_no_0/image";
    private static final String OUR_EXPERTS = "/us/en/corpnewsroom/utilities/our-experts";
    private static final String OUR_EXPERT_TITLE = "/container/title";
    private static final String OUR_EXPERT_DESC = "/container/columncontrol/tab_item_no_1/text";
    private static final String OUR_EXPERT_IMAGE = "/container/columncontrol/tab_item_no_0/image";
    private static final String TEXT_RESOURCETYPE = "corp/globals/components/content/text";
    private static final String TITLE_RESOURCETYPE = "corp/division/component/content/title";
    private static final String VIDEOPATH = "/video";
    private static final String IMAGE_RESOURCETYPE = "corp/globals/components/content/image";
    private static final String ARTICLESUBTITLE = "articlesubtitle";
    private static final String ARTICLEDESCRIPTION = "articledescription";
    private static final String ARTICALIMAGE = "articleimage";
    private static final String FILEREFERENCE = "fileReference";
    private static final String ARTICLEDATE = "articledate";
    private static final String AUTHOREDDATE = "authoredDate";
    private static final String ARTICLECOLOR = "articlecolor";
    private static final String PROFILESUBTITLE = "profileSubTitle";
    private static final String PROFILEDESCRIPTION = "profileDescription";
    private static final String PROFILEIMAGE = "profileImage";
    private static final Logger LOG = LoggerFactory.getLogger(ArticlePageEventHandler.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;
    
    @SlingObject
    Resource pageResource;
    
    String categoryTitle;
    
    String headingColor;
    
    @Reference
	private Replicator replicator;


    public void handleEvent(final Event event) {
        Map<String, Object> param= new HashMap<>();
        param.put(ResourceResolverFactory.SUBSERVICE, ARTICLESERVICEUSER);
        ResourceResolver resourceResolver = null;
        try {
        	resourceResolver = getResourceResolverFactory().getServiceResourceResolver(param);
            if (ReplicationAction.fromEvent(event).getType().equals(ReplicationActionType.ACTIVATE)) {
                String pagePath = ReplicationAction.fromEvent(event).getPath();
                PageManager pm = resourceResolver.adaptTo(PageManager.class);
                Page page = pm.getContainingPage(pagePath);
                if (page != null) {                    	
                    String jcrPath = StringUtils.join(page.getPath(), JCRCONTENT);
                    pageResource = resourceResolver.getResource(jcrPath);
                    categoryTitle = page.getParent().getTitle();
                    headingColor =getHeadingColor(page);
                    if (pageResource != null) {
                        ValueMap cfValueMap = pageResource.getValueMap();
                        String pageTemplatePath = cfValueMap.get(NameConstants.NN_TEMPLATE, StringUtils.EMPTY);
                        if (pageTemplatePath.equalsIgnoreCase(TEMPLATE_PATH)) {
                            getArticleContainer(jcrPath, pageResource, resourceResolver);
                        } else if(pageTemplatePath.equalsIgnoreCase(PROFILE_TEMPLATE_PATH)){
                            getExpertPageInformation(pageResource, resourceResolver, jcrPath);
                            getExecutivePageInformation(pageResource, resourceResolver, jcrPath);
                        }
                        resourceResolver.commit();
                        LOG.debug("Commit Successful");
                    }
                }
            }
        } catch (LoginException | PersistenceException  e) {
            LOG.error("Error in handleEvent"+e);
        } finally {
            if (resourceResolver != null && resourceResolver.isLive()) {
                resourceResolver.close();
                LOG.debug("resolver closed");
            }
        }
    }

    public void getArticleContainer(String jcrPath, Resource pageResource, ResourceResolver resourceResolver) {
        String pageRootPath = StringUtils.join(jcrPath, ROOT);

        Resource pageRoot = resourceResolver.getResource(pageRootPath);
        if (pageRoot != null) {
            Resource titleResource = resourceResolver.getResource(StringUtils.join(pageRootPath, ARTICLECONTAINER, TEXT_TITLE));
            Resource descriptionRes = resourceResolver.getResource(StringUtils.join(pageRootPath, ARTICLECONTAINER, TEXT_DESCRIPTION));
            Resource imageResource = resourceResolver.getResource(StringUtils.join(pageRootPath, ARTICLECONTAINER, IMAGE));
            Resource videoResource = resourceResolver.getResource(StringUtils.join(pageRootPath, ARTICLECONTAINER, VIDEOPATH));
            getArticleImage(pageResource,resourceResolver,imageResource,videoResource);
            getArticleDescription(jcrPath,pageResource,resourceResolver,descriptionRes);
            getArticleTitle(jcrPath,pageResource,resourceResolver,titleResource);
            setParentPageProperties(pageResource,resourceResolver);
            setArticleDate(resourceResolver, pageResource, jcrPath, ARTICLEDATE, AUTHOREDDATE);
           
            
        }
    }

    public void getArticleDescription(String jcrPath,Resource pageResource, ResourceResolver resourceResolver,Resource descriptionRes){  	
    	if (descriptionRes != null && descriptionRes.getResourceType().equalsIgnoreCase(TEXT_RESOURCETYPE)) {    		
            setArticleInfo(resourceResolver, pageResource, descriptionRes, ARTICLEDESCRIPTION, TEXT);
        } else {
            if (descriptionRes != null && descriptionRes.getResourceType().equalsIgnoreCase(TITLE_RESOURCETYPE)&& !descriptionRes.getValueMap().containsKey("articleType")) {
            	 setArticleInfo(resourceResolver, pageResource, descriptionRes, ARTICLEDESCRIPTION, JcrConstants.JCR_TITLE);
            } else {                            
                setExpertInfo(resourceResolver, pageResource, jcrPath, ARTICLEDESCRIPTION, JcrConstants.JCR_DESCRIPTION);
            }
        }
    }

    public void getArticleTitle(String jcrPath,Resource pageResource, ResourceResolver resourceResolver,Resource titleResource){
    	
        if (titleResource != null && titleResource.getResourceType().equalsIgnoreCase(TEXT_RESOURCETYPE)) {
            setArticleInfo(resourceResolver, pageResource, titleResource, ARTICLESUBTITLE, TEXT);
        } else {
        	if(titleResource != null &&titleResource.getResourceType().equalsIgnoreCase(TITLE_RESOURCETYPE) &&  !titleResource.getValueMap().containsKey("articleType")) {
        			setArticleInfo(resourceResolver, pageResource, titleResource, ARTICLESUBTITLE, JcrConstants.JCR_TITLE); 
        	}else {      			
        			setExpertInfo(resourceResolver, pageResource, jcrPath, ARTICLESUBTITLE, JcrConstants.JCR_TITLE);
        		}
        }
    }

    public void getArticleImage(Resource pageResource, ResourceResolver resourceResolver,Resource imageResource,Resource videoResource) {	
        if (imageResource != null && imageResource.getResourceType().equalsIgnoreCase(IMAGE_RESOURCETYPE)) {
            setArticleInfo(resourceResolver, pageResource, imageResource, ARTICALIMAGE, FILEREFERENCE);
        } else {
            setArticleInfo(resourceResolver, pageResource, videoResource, ARTICALIMAGE, FILEREFERENCE);
        }
    }

    public void setArticleInfo(ResourceResolver resourceResolver, Resource pageResource, Resource articleResource, String setArticleData, String getArtileData) {
        if (resourceResolver != null && pageResource != null && articleResource != null) {
                ValueMap articleMap = articleResource.getValueMap();               
                if (articleMap.get(getArtileData) != null) {
                    ModifiableValueMap setTitle = pageResource.adaptTo(ModifiableValueMap.class);                   
                    if (setTitle != null) {
                    	String value =articleMap.get(getArtileData).toString().replaceAll("<[^>]++>", "");
                        setTitle.put(setArticleData, value);
                    }
                }
            }
       }
    

    public void setExpertInfo(ResourceResolver resourceResolver, Resource pageResource, String nodePath, String setExpertData, String getExpertData) {
        if (resourceResolver != null && pageResource != null) {
            Resource expertResource = resourceResolver.getResource(nodePath);
            if (expertResource != null) {
                ValueMap articleMap = expertResource.getValueMap();
                if (articleMap.get(getExpertData) != null) {
                    ModifiableValueMap setTitle = pageResource.adaptTo(ModifiableValueMap.class);
                    if (setTitle != null) {
                    	String value =articleMap.get(getExpertData).toString().replaceAll("<[^>]++>", "");
                        setTitle.put(setExpertData, value);
                    }
                }
            }
        }
    }

    public void getExpertPageInformation(Resource pageResource, ResourceResolver resourceResolver, String jcrPath) {
        if (jcrPath != null && jcrPath.contains(OUR_EXPERTS)) {
            String expertPageTitle = StringUtils.join(jcrPath, ROOT, OUR_EXPERT_TITLE);
            String expertPageDescription = StringUtils.join(jcrPath, ROOT, OUR_EXPERT_DESC);
            String expertPageImage = StringUtils.join(jcrPath, ROOT, OUR_EXPERT_IMAGE);
            setExpertInfo(resourceResolver, pageResource, expertPageTitle, PROFILESUBTITLE, JcrConstants.JCR_TITLE);
            setExpertInfo(resourceResolver, pageResource, expertPageDescription, PROFILEDESCRIPTION, TEXT);
            setExpertInfo(resourceResolver, pageResource, expertPageImage, PROFILEIMAGE, FILEREFERENCE);
            setExpertInfo(resourceResolver, pageResource, jcrPath, ARTICLEDATE, AUTHOREDDATE);
        }
    }

    public void getExecutivePageInformation(Resource pageResource, ResourceResolver resourceResolver, String jcrPath) {
        if (jcrPath != null && jcrPath.contains(EXECUTIVE_TEAM)) {
            String executivePageTitle = StringUtils.join(jcrPath, ROOT, EXECUTIVE_TITLE_TEXT);
            String executivePageImage = StringUtils.join(jcrPath, ROOT, EXECUTIVE_IMAGE);
            String executivePageDescription = StringUtils.join(jcrPath, ROOT, EXECUTIVE_DESC_TEXT);
            setExpertInfo(resourceResolver, pageResource, executivePageTitle, PROFILESUBTITLE, JcrConstants.JCR_TITLE);
            setExpertInfo(resourceResolver, pageResource, executivePageDescription, PROFILEDESCRIPTION, TEXT);
            setExpertInfo(resourceResolver, pageResource, executivePageImage, PROFILEIMAGE, FILEREFERENCE);
            setExpertInfo(resourceResolver, pageResource, jcrPath, ARTICLEDATE, AUTHOREDDATE);
        }
    }
    
    public void setParentPageProperties(Resource pageResource, ResourceResolver resourceResolver) {  	
    		 if (resourceResolver != null && pageResource != null) {   	                
    	                    ModifiableValueMap valueMap = pageResource.adaptTo(ModifiableValueMap.class);
    	                    if(null != categoryTitle && null != valueMap) {
    	                    	valueMap.put("categoryTitle", categoryTitle); 	                    	
    	                    }
    	                    if (null != headingColor && null != valueMap) {
    	                    	valueMap.put("headingColor", headingColor);
    	                    }
    	                }
    	            }  	
    
    public void setArticleDate(ResourceResolver resourceResolver, Resource pageResource, String jcrPath, String articleDate, String authoredDate) {
    	
    	if (null !=resourceResolver && null !=pageResource ) {
            Resource resource = resourceResolver.getResource(jcrPath);
            if (null != resource) {
                ValueMap articleMap = resource.getValueMap();
                if (articleMap.get(authoredDate) != null) {
                    ModifiableValueMap setTitle = pageResource.adaptTo(ModifiableValueMap.class);
                    if (setTitle != null) {
                    	String date = null;
						date = getFormattedDate(articleMap.get(authoredDate,StringUtils.EMPTY));
                        setTitle.put(articleDate,date);
                    }
                }
            }
        }
    }
    	
    	
    
    public String getFormattedDate(String date)  {
        String formattedDate = StringUtils.EMPTY;
        if (StringUtils.isNotBlank(date)) {        	
            SimpleDateFormat dateParsed = new SimpleDateFormat("yyyy-MM-dd");
            Date dateformat = null;
			try {
				dateformat = dateParsed.parse(date);
			} catch (ParseException e) {
				LOG.error("Error in dateformat"+e.getMessage());
			}        
            SimpleDateFormat dateFormatted = new SimpleDateFormat("MMM. dd, yyyy");
            formattedDate = dateFormatted.format(dateformat);
            if(null !=formattedDate) {
            	formattedDate = formattedDate.contains("Jun") ?formattedDate.replace("Jun.", "June"):formattedDate;
            	formattedDate = formattedDate.contains("Jul") ?formattedDate.replace("Jul.", "July"):formattedDate;
            	formattedDate = formattedDate.contains("May") ?formattedDate.replace("May.", "May"):formattedDate;
            }
        }
        return formattedDate;
    }
    
    public String getHeadingColor(Page page) {
    	 ValueMap pageProperties =page.getParent().getProperties();
    	 return pageProperties.containsKey(ARTICLECOLOR) ? pageProperties.get(ARTICLECOLOR,"color-light-blue") : null; 	
    }

    public void setResourceResolverFactory(ResourceResolverFactory resourceResolverFactory) {
        this.resourceResolverFactory = resourceResolverFactory;
    }

    public ResourceResolverFactory getResourceResolverFactory() {
        return resourceResolverFactory;
    }
    
}
