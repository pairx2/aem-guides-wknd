package com.abbott.aem.platform.search.core.jobs;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.servlet.ServletException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants;
import com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService;
import com.abbott.aem.platform.search.coveoconnector.core.utils.CoveoPushUtilities;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.replication.Agent;
import com.day.cq.replication.AgentFilter;
import com.day.cq.replication.AgentManager;
import com.day.cq.wcm.api.NameConstants;

/**
 * A JobConsumer Service implementation.
 */
@Component(service = JobConsumer.class, immediate = true, configurationPolicy = ConfigurationPolicy.REQUIRE, property = {
        Constants.SERVICE_DESCRIPTION + "=Demo to listen on changes in the resource tree",
        JobConsumer.PROPERTY_TOPICS + "=" + CommonConstants.ABBOTT_SEARCH_COVEO_PUSHAPI })
/***
 * Sample OSGi component which works only in specific run mode. When we make
 * component 'policy' to 'REQUIRE', OSGi container expects corresponding
 * configuration object (osgi:Config node) to become satisfied. If we define the
 * sling:OsgiConfig node under 'config.author' folder, we could get this
 * component active in 'author' only run mode and 'unsatisfied' in all other run
 * modes.
 */

public class CoveoPushAPIJobConsumer implements JobConsumer {

    /** The Constant ACTION_PATH. */
    protected static final String ACTION_PATH = "actionPath";

    /** The Constant ACTION_TYPE. */
    protected static final String ACTION_TYPE = "actionType";

    /** The Constant READ_SERVICE. */
    protected static final String READ_SERVICE = "readService";

    /** The Constant TRUE. */
    protected static final String TRUE = "true";

    /** The Constant DO_NOT_INDEX. */
    protected static final String DO_NOT_INDEX = "hideInSitemap";

    /** The Constant DO_NOT_INDEX_CHILDREN. */
    protected static final String DO_NOT_INDEX_CHILD_PAGES = "excludeChildPagesCoveoPush";

    /** The Constant INDEX PAGE. */
    protected static final String COVEO_PUSH = "coveoPush";

    /** The Constant OK. */
    protected static final String OK = "ok";

    /** The Constant ACTIVATE. */
    protected static final String ACTIVATE = "Activate";

    /** The Constant DEACTIVATE. */
    protected static final String DEACTIVATE = "Deactivate";

    /** The Constant DELETE. */
    protected static final String DELETE = "Delete";

    /** The Constant HTML. */
    protected static final String HTML = ".html";

    /** The Constant JCR_CONTENT. */
    protected static final String JCR_CONTENT = "/jcr:content";

    /** The Constant JCR_CONTENT_METADATA2. */
    private static final String JCR_CONTENT_METADATA2 = "/jcr:content/metadata";

    /** The Constant CONTENT_FRAGMENT. */
    private static final String CONTENT_FRAGMENT = "contentFragment";

    /** The log. */
    protected final Logger log = LoggerFactory.getLogger(CoveoPushAPIJobConsumer.class);

    /** The resolver factory. */
    @Reference
    protected ResourceResolverFactory resolverFactory;

    /** The config fetch. */
    @Reference
    FormConfigurationService configFetch;

    /** The organization id. */
    protected String organizationId = "";

    /** The source id. */
    protected String sourceId = "";

    /** The access token. */
    protected String accessToken = "";

    /** The server path. */
    protected String serverPath = "";

    /** The coveo push url. */
    protected String coveoPushUrl = "";

    /** The coveo platform url. */
    protected String coveoPlatformUrl = "";

    /** The inheritance logic properties. */
    protected String[] inheritanceLogicProperties;

    /** The dam allowed extension types. */
    protected String[] damAllowedExtensionTypes;

    /** The coveo push utilities. */
    protected CoveoPushUtilities coveoPushUtilities = null;

    /** The Constant apiStatus . */
    protected String apiStatus = "";

    /**
     * The Agent Manager
     */
    protected AgentManager agentManager;

    /**
     * {@inheritDoc}
     *
     * @see org.apache.sling.event.jobs.consumer.JobConsumer#process(org.apache.sling.event.jobs.Job)
     */
    @Override
    public JobResult process(Job job) {
        log.debug("Processing the JOB *******");
        String type = (String) job.getProperty(ACTION_TYPE);
        String path = (String) job.getProperty(ACTION_PATH);
       
        log.debug("Coveo Push job details for ({}) and action type: {} and isPublishAgent : {}", path, type); 
        try {
            
                processJob(type, path);
           
            /**
             * Return the proper JobResult based on the work done...
             *
             * > OK : Processed successfully > FAILED: Processed unsuccessfully and
             * reschedule --> This will keep the JOB up for next retry > CANCEL: Processed
             * unsuccessfully and do NOT reschedule > ASYNC: Process through the
             * JobConsumer.AsyncHandler interface
             */
            return JobConsumer.JobResult.OK;
        } catch (LoginException | RepositoryException | IOException | ServletException e) {
            log.error("Coveo Push job failed for ({}) and action type: {}", path, type);
            log.error("Exception is ", e);
            return JobResult.FAILED;
        }
    }

    /**
     * Process job.
     *
     * @param action     the action
     * @param actionPath the action path
     * @throws LoginException
     * @throws ServletException
     * @throws IOException
     * @throws RepositoryException
     * @throws Exception           the exception
     */
    private void processJob(String action, String actionPath)
            throws LoginException, RepositoryException, IOException, ServletException, NullPointerException {
        organizationId = configFetch.getCoveoOrganizationId();
        sourceId = configFetch.getCoveoSourceId();
        accessToken = configFetch.getCoveoApiKey();
        coveoPushUrl = configFetch.getCoveoPushUrl();
        coveoPlatformUrl = configFetch.getCoveoPlatformUrl();
        inheritanceLogicProperties = configFetch.getInheritanceLogicProperties();
        damAllowedExtensionTypes = configFetch.getDamAllowedExtensionTypes();

        try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(getResolverParams())) {

            Resource resource = resolver.getResource(actionPath);
            if (resource != null) {
                Resource contentResource = null;
                String contentType = resource.adaptTo(ValueMap.class).get(JcrConstants.JCR_PRIMARYTYPE).toString();
                if (contentType.equals(NameConstants.NT_PAGE) || contentType.equals(DamConstants.NT_DAM_ASSET)) {
                    contentResource = resolver.getResource(resource.getPath() + JCR_CONTENT);
                }

                if (contentResource != null) {
                    ValueMap itemValueMap = contentResource.adaptTo(ValueMap.class);
                    boolean isContentFragment = itemValueMap.containsKey(CONTENT_FRAGMENT)
                            && itemValueMap.get(CONTENT_FRAGMENT, Boolean.class);

                    if (coveoPushUtilities == null) {
                        coveoPushUtilities = new CoveoPushUtilities(organizationId, sourceId, accessToken, serverPath,
                                coveoPushUrl, coveoPlatformUrl, inheritanceLogicProperties);
                    }

                    // handle page donot want to index
                    String doNotIndexProperty = "";
                    if (itemValueMap.containsKey(DO_NOT_INDEX)) {
                        doNotIndexProperty = itemValueMap.get(DO_NOT_INDEX, Boolean.class).toString();
                    }
                    if (!(StringUtils.equalsIgnoreCase(doNotIndexProperty, TRUE))) {
                        pushOrRemoveItemFromCoveo(coveoPushUtilities, actionPath, action, resource,
                                contentType, isContentFragment);
                    }
                }
            }

        }
    }

    /**
     * Push or remove item from coveo.
     *
     * @param coveoPushUtilities the coveo push utilities
     * @param actionPath         the action path
     * @param action             the action
     * @param resource           the resource
     * @param itemValueMap       the item value map
     * @param contentType        the content type
     * @param isContentFragment  the is content fragment
     * @throws ServletException
     * @throws Exception        the exception
     */
    private void pushOrRemoveItemFromCoveo(CoveoPushUtilities coveoPushUtilities, String actionPath, String action,
            Resource resource, String contentType, boolean isContentFragment)
            throws LoginException, RepositoryException, IOException, ServletException {

        try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(getResolverParams())) {
            String docId = "";

            String externalizerDomainName = coveoPushUtilities.getExternalizeDomainName(resource, resolver,
                    isContentFragment);

            log.info("executing::pushOrRemoveItemFromCoveo, actionPath={}, action={}", actionPath, action);

            Externalizer externalizer = resolver.adaptTo(Externalizer.class);
            if (contentType.equals(NameConstants.NT_PAGE)) {
                docId = externalizer.externalLink(resolver, externalizerDomainName, resolver.map(actionPath)) + HTML;
            } else if (contentType.equals(DamConstants.NT_DAM_ASSET) && !isContentFragment) {
                String extension = coveoPushUtilities.getContentExtension(actionPath);

                if (Arrays.asList(damAllowedExtensionTypes).contains(StringUtils.upperCase(extension))
                        || Arrays.asList(damAllowedExtensionTypes).contains(StringUtils.lowerCase(extension))) {

                    docId = externalizer.externalLink(resolver, externalizerDomainName, resolver.map(actionPath));

                } else {
                    // do nothing
                    return;
                }
            } else {
                docId = externalizer.externalLink(resolver, externalizerDomainName, resolver.map(actionPath));
            }

            if (action.equalsIgnoreCase(ACTIVATE)) {
                // check from the index paths list whether the path contains any parent of the
                // current path if so we can push & activate
                Resource res = resolver.getResource(actionPath);
                log.info("Resource details :: res {}, actionPath :: {}", res, actionPath);
                boolean isPushToCoveo = false;
                Node coveoConfig = res.adaptTo(Node.class);
                if (contentType.equals(DamConstants.NT_DAM_ASSET)) {
                    isPushToCoveo = isCoveoPush(resolver, actionPath);
                } else {
                    InheritanceValueMap ivm = new HierarchyNodeInheritanceValueMap(res);
                    log.info("Inheritance Value map  :: ivm {}", ivm);
                    log.info("***COVEO PUSH UPDATED CODE {} {} {}", res.getName(), ivm.getInherited(COVEO_PUSH, false),
                            coveoConfig.getPath());
                    if (ivm.getInherited(COVEO_PUSH, false).booleanValue()) {
                        isPushToCoveo = ivm.getInherited(COVEO_PUSH, false);
                    } else if (res.hasChildren()) {
                        Node jcrContentNode = res.getChild(JcrConstants.JCR_CONTENT).adaptTo(Node.class);
                        if (jcrContentNode.hasProperty(COVEO_PUSH)) {
                            String coveoPush = jcrContentNode.getProperty(COVEO_PUSH).getValue().getString();
                            isPushToCoveo = TRUE.equalsIgnoreCase(coveoPush);
                        }
                    }
                }

                if (isPushToCoveo) {
                    pushTheRequiredItem(coveoConfig, isContentFragment, resolver, resource, actionPath, docId,
                            contentType);
                    log.info("PUSHED ITEM TO COVEO {}", coveoConfig.getName());
                }

            } else if (action.equalsIgnoreCase(DEACTIVATE) || DELETE.equalsIgnoreCase(action)) {
                apiStatus = coveoPushUtilities.deleteDocumentOnCoveo(docId, actionPath, resolver, resource, contentType,
                        isContentFragment);
                if (apiStatus.equalsIgnoreCase(OK)) {
                    log.info("Document deleted successfully for document id {}", docId);
                }
            }
        }
    }

    private boolean isCoveoPush(ResourceResolver resolver, String actionPath) {
        boolean isCoveoPushEnabled = false;
        if (!StringUtils.equalsIgnoreCase(actionPath, "/content/dam")) {
            if (null != resolver.getResource(actionPath)) {
                log.info("actionPath is :: {}", actionPath);
                Resource assetResource = resolver.getResource(actionPath);
                Resource assetMetadataResource = resolver.getResource(actionPath + JCR_CONTENT_METADATA2);
                if (null != assetMetadataResource) {
                    log.info("inside assetMetadataResource");
                    try {
                        Node assetMetadataNode = assetMetadataResource.adaptTo(Node.class);
                        if (assetMetadataNode.hasProperty(COVEO_PUSH)) {
                            String coveoPush = assetMetadataNode.getProperty(COVEO_PUSH).getValue().getString();
                            log.info("Coveo Push value :: {}, True/false {}", coveoPush,
                                    TRUE.equalsIgnoreCase(coveoPush));
                            isCoveoPushEnabled = TRUE.equalsIgnoreCase(coveoPush);
                            return isCoveoPushEnabled;
                        } else {
                            log.info("Coveo Push absent");
                            isCoveoPushEnabled = isCoveoPush(resolver, assetResource.getParent().getPath());
                        }
                    } catch (IllegalStateException | RepositoryException exception) {
                        log.error("Exception is ", exception);
                    }
                } else {
                    log.info("No Metadata node");
                    isCoveoPushEnabled = isCoveoPush(resolver, assetResource.getParent().getPath());
                }
            }
        } else {
            return isCoveoPushEnabled;
        }
        return isCoveoPushEnabled;
    }

    /**
     * Check if the path eligible for Indexing.
     *
     * @param coveoConfig       the Node having "pushCoveo" property true
     * @param isContentFragment the is content fragment
     * @param resolver          the ResourceResolver
     * @param resource          the resource
     * @param actionPath        the actionPath going for coveo Indexing
     * @param docId             the Publish URL of the page
     * @param contentType       the content type
     *
     * @throws Exception the exception
     */
    private void pushTheRequiredItem(Node coveoConfig, boolean isContentFragment, ResourceResolver resolver,
            Resource resource, String actionPath, String docId, String contentType)
            throws RepositoryException, IOException, ServletException {
        if (null != coveoConfig.getPath()) {
            String pathURL = coveoConfig.getPath().indexOf(JCR_CONTENT_METADATA2) > -1
                    ? coveoConfig.getPath().replace(JCR_CONTENT_METADATA2, "")
                    : coveoConfig.getPath().replace(JCR_CONTENT, "");
            log.debug("pathURL ::{}", pathURL);
            if (actionPath.indexOf(pathURL) != -1) {
                // Check if Current resource's parent resource has property
                // "doNotIncludeChildren" Property Checked.
                Resource currentContentResource = resolver.getResource(resource.getPath() + JCR_CONTENT);
                if (currentContentResource != null) {
                    Resource parentContentResource = resolver.getResource(resource.getParent().getPath() + JCR_CONTENT);
                    if (parentContentResource != null) {
                        // Check the Child & Corresponding Parent Node JCR properties
                        apiStatus = checkChildParentJCRProperties(currentContentResource, docId,
                                actionPath, resolver, resource, contentType, isContentFragment);

                    } else {
                        log.debug("Parent Node has no JCR properties. Current Node ::{} is eligible for indexing !!",
                                actionPath);
                        apiStatus = coveoPushUtilities.pushSingleItemDataToSource(docId, actionPath, resolver, resource,
                                contentType, isContentFragment);
                    }
                    log.debug("apiStatus {}, {}", apiStatus, resource.getPath());
                }
            }
        }
    }

    /**
     * Check if Child & corresponding Parent Node has required Push to coveo JCR
     * properties.
     *
     * @param currentContentResource current resource
     * @param docId                  the Publish URL of the page
     * @param actionPath             the actionPath going for coveo Indexing
     * @param resolver               the ResourceResolver
     * @param resource               the resource
     * @param contentType            the content type
     * @param coveoConfig            the Node having "pushCoveo" property true
     * @param isContentFragment      the is content fragment
     *
     * @throws Exception the exception
     */
    private String checkChildParentJCRProperties(Resource currentContentResource,
            String docId, String actionPath, ResourceResolver resolver, Resource resource, String contentType,
            boolean isContentFragment) throws IOException, RepositoryException, ServletException {
    	
    	Resource parentContentResource = resolver.getResource(resource.getParent().getPath() + JCR_CONTENT);
        String doNotIncludeChildren = parentContentResource.getValueMap().get(DO_NOT_INDEX_CHILD_PAGES) != null
                ? parentContentResource.getValueMap().get(DO_NOT_INDEX_CHILD_PAGES).toString()
                : null;
        log.debug("doNotIncludeChildren value:::{} for the parentContentResource::{}", doNotIncludeChildren,
                parentContentResource);
        if (doNotIncludeChildren != null && doNotIncludeChildren.equalsIgnoreCase(TRUE)) {
            // check if current resource has the coveoPush property checked
            String currentNodecoveoPush = currentContentResource.getValueMap().get(COVEO_PUSH) != null
                    ? currentContentResource.getValueMap().get(COVEO_PUSH).toString()
                    : null;
            log.debug("currentNodecoveoPush value:::{}", currentNodecoveoPush);
            if (currentNodecoveoPush != null && currentNodecoveoPush.equalsIgnoreCase(TRUE)) {
                log.debug("actionPath going for CoveoPush:::{}, currentresource::{}", actionPath, resource.getPath());
                apiStatus = coveoPushUtilities.pushSingleItemDataToSource(docId, actionPath, resolver, resource,
                        contentType, isContentFragment);
            } else {
                log.debug("currentNodecoveoPush property is not set. Current Node ::{} won't get indexed !!",
                        actionPath);
                return apiStatus;
            }
        } else {
            log.debug("doNotIncludeChildren property is not set. Current Node ::{} is eligible for indexing !!",
                    actionPath);
            apiStatus = coveoPushUtilities.pushSingleItemDataToSource(docId, actionPath, resolver, resource,
                    contentType, isContentFragment);
        }
        return apiStatus;
    }

    private static Map<String, Object> getResolverParams() {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(ResourceResolverFactory.SUBSERVICE, READ_SERVICE);
        return parameters;
    }
}