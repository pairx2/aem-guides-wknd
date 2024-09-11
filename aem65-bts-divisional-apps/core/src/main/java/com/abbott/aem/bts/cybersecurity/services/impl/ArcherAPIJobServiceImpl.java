package com.abbott.aem.bts.cybersecurity.services.impl;

import com.abbott.aem.bts.cybersecurity.constants.SchedulerConstants;
import com.abbott.aem.bts.cybersecurity.core.ArcherAPIJobConsumerConfiguration;
import com.abbott.aem.bts.cybersecurity.services.ArcherAPIJobService;
import com.abbott.aem.bts.cybersecurity.services.JsonFetchService;
import com.adobe.cq.dam.cfm.*;
import com.day.cq.commons.date.DateUtil;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationStatus;
import com.day.cq.replication.Replicator;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagConstants;
import com.day.cq.tagging.TagManager;
import com.google.common.collect.ImmutableMap;
import com.google.gson.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpException;
import org.apache.sling.api.resource.*;
import org.osgi.service.component.annotations.*;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.util.converter.Converter;
import org.osgi.util.converter.Converters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Component(service = ArcherAPIJobService.class, immediate = true)
@Designate(ocd = ArcherAPIJobConsumerConfiguration.class)
public class ArcherAPIJobServiceImpl implements ArcherAPIJobService {

    @Reference(cardinality = ReferenceCardinality.MANDATORY)
    JsonFetchService jsonService;

    @Reference
    Replicator replicator;

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    private static final Logger log = LoggerFactory.getLogger(ArcherAPIJobServiceImpl.class);

    private static final String CF_DATE = "cfDate";

    private static final String REPLICATE_PATH = "replicationPath";

    private static final String JSON_DATE = "jsonDate";

    private String[] fragmentTagsProps = null;

    private String fragmentTemplate = null;

    private String fragmentCreationPath = null;

    private String tagsPath = null;

    private String forProdTypesPath = null;

    private String categoryMappingPath = null;

    private boolean flag = false;

    Converter converter = Converters.standardConverter();

    @Override
    public boolean getProductDetails() {
        log.info("ArcherAPIJobService started...");
        log.info("template path is {}", fragmentTemplate);

        ResourceResolver resolver = null;
        Session jcrSession;
        Map<String, Object> params = new HashMap<>();
        params.put(ResourceResolverFactory.SUBSERVICE, SchedulerConstants.SUBSERVICE_NAME);

        try {
            resolver = resourceResolverFactory.getServiceResourceResolver(params);
            jcrSession = resolver.adaptTo(Session.class);
            String jsonResponse = jsonService.getJson();
            if (null != jsonResponse) {
                JsonParser parser = new JsonParser();
                JsonElement jElement = parser.parse(jsonResponse);
                // get array of products
                JsonObject jObj = jElement.getAsJsonObject();
                if (jObj.has("response")) {
                    JsonObject response = jObj.getAsJsonObject("response");
                    addProductTypesNode(response, resolver, jcrSession);
                    processProductsData(response, resolver, jcrSession);
                    flag = true;
                }
            }
        } catch (LoginException le) {
            log.error("Login exception in Archer Service.", le);
        } catch (JsonSyntaxException | HttpException e) {
            log.error("ArcherAPIJobService ran into an exception!", e);
        } finally {
            if (resolver != null) {
                resolver.close();
            }
        }
        log.info("ArcherAPIJobService successfully ended...");
        return flag;
    }

    protected void processProductsData(JsonObject response, ResourceResolver resolver, Session jcrSession) {
        JsonArray productsArray;
        if (null != response && response.has(SchedulerConstants.PRODUCTS)) {
            productsArray = response.get(SchedulerConstants.PRODUCTS).getAsJsonArray();

            // end - get array of products
            try {
                Resource parentResource = resolver.getResource(fragmentCreationPath);
                Resource templateResource = resolver.getResource(fragmentTemplate);
                if (null != templateResource) {
                    FragmentTemplate template = templateResource.adaptTo(FragmentTemplate.class);
                    for (JsonElement jsonElement : productsArray) {
                        String cfDate = null;
                        List<Tag> tagsOnProduct = new ArrayList<>();
                        // String tagNamespace
                        JsonObject tempJobj = jsonElement.getAsJsonObject();

                        JsonArray versionArray = tempJobj.getAsJsonArray("versions");

                        createContentFragment(parentResource, template, cfDate, tagsOnProduct, versionArray,
                                resolver, jcrSession);
                        if (jcrSession.hasPendingChanges()) {
                            resolver.commit();
                        }
                    }
                }
            } catch (ContentFragmentException | RepositoryException | PersistenceException | ReplicationException ex) {
                log.error("Exception occurred while creating fragment.", ex);
            }
        }
    }

    protected void addProductTypesNode(JsonObject response, ResourceResolver resolver, Session jcrSession) {
        JsonArray productsTypesArray;
        try {
            if (null != response && response.has(SchedulerConstants.PRODUCT_TYPES)) {
                productsTypesArray = response.get(SchedulerConstants.PRODUCT_TYPES).getAsJsonArray();

                List<String> list = new ArrayList<>();
                if (null != productsTypesArray) {
                    for (int i = 0; i < productsTypesArray.size(); i++) {
                        list.add(productsTypesArray.get(i).getAsString());
                    }
                    String productTypes = list.stream().map(Object::toString).collect(Collectors.joining(","));
                    createAndReplicateProdType(productTypes, resolver, jcrSession);
                    resolver.commit();
                }
            }
        } catch (PersistenceException | ReplicationException ex) {
            log.error("Exception occurred.", ex);
        }
    }

    protected void createAndReplicateProdType(String productTypes, ResourceResolver resolver, Session jcrSession)
            throws PersistenceException, ReplicationException {
        Resource prodResource = resolver.getResource(forProdTypesPath);
        Resource prodTypeResource = resolver.getResource(SchedulerConstants.PRODUCTS_RESOURCE);
        if (null != prodTypeResource)
            resolver.delete(prodTypeResource);
        if (null != prodResource) {
            resolver.create(prodResource, SchedulerConstants.PRODUCT_TYPES,
                    new ImmutableMap.Builder<String, Object>()
                            .put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED)
                            .put(SchedulerConstants.PRODUCT_TYPES, productTypes)
                            .put(JcrConstants.JCR_LASTMODIFIED, Calendar.getInstance()).build());

            if (null != replicator && null != SchedulerConstants.PRODUCTS_RESOURCE) {
                replicator.replicate(jcrSession, ReplicationActionType.ACTIVATE,
                        SchedulerConstants.PRODUCTS_RESOURCE);
            }
        }
    }
protected void createContentFragment(Resource parentResource, FragmentTemplate template, String cfDate,
                                         List<Tag> tagsOnProduct, JsonArray versionArray, ResourceResolver resolver,
                                         Session jcrSession)
            throws ContentFragmentException, RepositoryException, PersistenceException, ReplicationException {
        int totalVersionArrays = versionArray.size();

        for (int i = 0; i < totalVersionArrays; i++) {
            JsonObject tempJson = versionArray.get(i).getAsJsonObject();
            processVersion(parentResource, template,cfDate,tagsOnProduct, resolver,jcrSession,tempJson);
        }
    }

 protected void processVersion(Resource parentResource, FragmentTemplate template, String cfDate,
                                         List<Tag> tagsOnProduct, ResourceResolver resolver,
                                         Session jcrSession,JsonObject tempJson)
            throws ContentFragmentException, RepositoryException, PersistenceException, ReplicationException {
            TagManager tagMgr = resolver.adaptTo(TagManager.class);
            String jsonDate = tempJson.get(SchedulerConstants.JSON_FIELD_LASTUPDATED).getAsString();
            String cfTitle = tempJson.get(SchedulerConstants.JSON_FIELD_VERSION_ID).getAsString();
            String cfCategory = tempJson.get(SchedulerConstants.CATEGORY).getAsString();
            String  publishToPortal = getFieldValue(tempJson.get(SchedulerConstants.PUBLISH_TO_PORTAL));
            log.debug("publishToPortal::::" + publishToPortal);
            Resource res = resolver.getResource(fragmentCreationPath + cfTitle); 
            String replicationPath = null;
           
            try{
                if( res == null){
                  if(isValidContentFragment(publishToPortal)){
                   ContentFragment cf = template.createFragment(parentResource, cfTitle, cfTitle);
                   setContentFragmentData(cf, tempJson, tagsOnProduct, jcrSession, cfCategory, resolver, tagMgr);
                   existingResource(cf,jcrSession,resolver);
                }
                }  
                else if (isValidContentFragment(publishToPortal)){
                    replicationPath = res.getPath();
                    Resource cfJcrContent = resolver
                            .getResource(replicationPath + SchedulerConstants.FORWARD_SLASH + JcrConstants.JCR_CONTENT);
                    boolean isCFdateIsPresent = cfJcrContent.getValueMap().containsKey(JcrConstants.JCR_LASTMODIFIED);
                    if (isCFdateIsPresent) {
                        cfDate = getCfDate(cfJcrContent.getValueMap().get(JcrConstants.JCR_LASTMODIFIED, Date.class));

                    }
                    Map<String, String> replicateHelperMap = new HashMap<>();
                    replicateHelperMap.put(CF_DATE, cfDate);
                    replicateHelperMap.put(REPLICATE_PATH, replicationPath);
                    replicateHelperMap.put(JSON_DATE, jsonDate);
                    replicateHelperMap.put(SchedulerConstants.CATEGORY, cfCategory);               
                    setJcrValue(replicateHelperMap, cfJcrContent, jcrSession);
                    doReplicate(replicateHelperMap, tagsOnProduct, tempJson, res, jcrSession,
                            resolver, tagMgr);
                }
                else{
                   Resource deactivePath = resolver.getResource(replicationPath + SchedulerConstants.FORWARD_SLASH + JcrConstants.JCR_CONTENT);
                    ValueMap properties = deactivePath.adaptTo(ValueMap.class);
                    String repStatus = properties.get(ReplicationStatus.NODE_PROPERTY_LAST_REPLICATION_ACTION, String.class);
                    if (!StringUtils.equalsIgnoreCase(repStatus, "Deactivate")) {
                        replicator.replicate(jcrSession, ReplicationActionType.DEACTIVATE,
                                replicationPath);
                }
            }
        }catch(Exception e){
                log.error("Null pointer exception",e);
            }
        }
protected void existingResource(ContentFragment cf, Session jcrSession, ResourceResolver resolver) throws ReplicationException {
        String replicationPath;
        Resource cfJcrContent;
        replicationPath = cf.adaptTo(Resource.class).getPath();
        cfJcrContent = resolver
                            .getResource(replicationPath + SchedulerConstants.FORWARD_SLASH + JcrConstants.JCR_CONTENT);
                    settingJcrDate(cfJcrContent, jcrSession);
                    replicator.replicate(jcrSession, ReplicationActionType.ACTIVATE, replicationPath);
    }  
protected void setJcrValue(Map<String, String> replicateHelperMap,Resource cfJcrContent, Session jcrSession )
   {
   String cfDate = replicateHelperMap.get(CF_DATE);
        String replicationPath = replicateHelperMap.get(REPLICATE_PATH);
        String jsonDate = replicateHelperMap.get(JSON_DATE);
        String category = replicateHelperMap.get(SchedulerConstants.CATEGORY); 
        log.info("Replication Path: {}; cfDate: {}; jsonDate: {}; category: {}", replicationPath, cfDate, jsonDate, category);
        if ((null != cfDate && !StringUtils.isEmpty(jsonDate))) {
            LocalDateTime cfLocalDateTime = ZonedDateTime.parse(cfDate).toLocalDateTime();
            LocalDateTime jsonLocalDateTime = LocalDateTime.parse(jsonDate, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            OffsetDateTime jsonUTCDate = OffsetDateTime.of(jsonLocalDateTime, ZoneOffset.UTC);
            OffsetDateTime cfUTCDate = OffsetDateTime.of(cfLocalDateTime, ZoneOffset.UTC); 
            if (jsonUTCDate.isAfter(cfUTCDate)) {
                settingJcrDate(cfJcrContent, jcrSession);}
}
}
protected String getCfDate(Date tempCfDate) {
        String cfDateVal = null;
        if (tempCfDate != null) {
            cfDateVal = DateUtil.getISO8601Date(tempCfDate);
        }
        return cfDateVal;
    }

    protected String getFieldValue(JsonElement propertyName) {
        String propertyValue = null;
        if (propertyName != JsonNull.INSTANCE) {
            propertyValue = propertyName.getAsString();
        }
        return propertyValue;
    }

    protected void doReplicate(Map<String, String> replicateHelperMap, List<Tag> tagsOnProduct,
                               JsonObject tempJson, Resource existingFragResource, Session jcrSession, ResourceResolver resolver,
                               TagManager tagMgr)
            throws ContentFragmentException, RepositoryException, PersistenceException, ReplicationException {
        String cfDate = replicateHelperMap.get(CF_DATE);
        String replicationPath = replicateHelperMap.get(REPLICATE_PATH);
        String jsonDate = replicateHelperMap.get(JSON_DATE);
        String category = replicateHelperMap.get(SchedulerConstants.CATEGORY);

        log.info("Replication Path: {}; cfDate: {}; jsonDate: {}; category: {}", replicationPath, cfDate, jsonDate, category);
        if ((null != cfDate && !StringUtils.isEmpty(jsonDate))) {
            LocalDateTime cfLocalDateTime = ZonedDateTime.parse(cfDate).toLocalDateTime();
            LocalDateTime jsonLocalDateTime = LocalDateTime.parse(jsonDate, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            OffsetDateTime jsonUTCDate = OffsetDateTime.of(jsonLocalDateTime, ZoneOffset.UTC);
            OffsetDateTime cfUTCDate = OffsetDateTime.of(cfLocalDateTime, ZoneOffset.UTC);

            if (jsonUTCDate.isAfter(cfUTCDate)) {
                setContentFragmentData(existingFragResource.adaptTo(ContentFragment.class), tempJson, tagsOnProduct,
                        jcrSession, category, resolver, tagMgr);
                if (null != replicator && null != replicationPath) {
                    replicator.replicate(jcrSession, ReplicationActionType.ACTIVATE, replicationPath);
                    log.debug("{} sent for replication", replicationPath);
                } else {
                    log.debug("replicator is null and hence activation failed");
                }
            }
        }
    }

    protected void settingJcrDate(Resource fragResource, Session jcrSession) {
        Calendar calender = Calendar.getInstance();
        ModifiableValueMap modMap = fragResource.adaptTo(ModifiableValueMap.class);
        modMap.put(JcrConstants.JCR_LASTMODIFIED, calender);
        modMap.put(JcrConstants.JCR_LAST_MODIFIED_BY, jcrSession.getUserID());
    }

    protected void setContentFragmentData(ContentFragment cf, JsonObject tempJobj, List<Tag> tagsOnProduct,
                                          Session jcrSession, String category, ResourceResolver resolver, TagManager tagMgr)
            throws ContentFragmentException, RepositoryException, PersistenceException {

        // Segregate Category from Default Category List to add to Tags
        String foundCategory = findCategoryFromDefaultList(category, resolver, tagMgr);

        Iterator<ContentElement> iterator = cf.getElements();
        while (iterator.hasNext()) {
            ContentElement tempElement = iterator.next();
            String tempElementValueKey = tempElement.getName();
            if (tempJobj.has(tempElementValueKey)) {
                String valueToBeSet = (tempJobj.get(tempElementValueKey) != JsonNull.INSTANCE)
                        ? tempJobj.get(tempElementValueKey).getAsString()
                        : null;
                if (tempElementValueKey.equalsIgnoreCase(SchedulerConstants.CATEGORY)) {
                    tempElement.setContent(foundCategory, "text/plain");
                } else {
                    tempElement.setContent(valueToBeSet, "text/plain");
                }
            }
        }
        createTagsForCF(tempJobj, tagsOnProduct, resolver, tagMgr);
        setCfMetadata(cf, tempJobj, tagsOnProduct, foundCategory);
        if (jcrSession.hasPendingChanges() && null != resolver) {
            resolver.commit();
        }
    }

    protected void setCfMetadata(ContentFragment cf, JsonObject tempJobj, List<Tag> tagsOnProduct, String foundCategory)
            throws ContentFragmentException {
        cf.setMetaData(TagConstants.PN_TAGS,
                tagsOnProduct.stream().map(tag -> tag.getNamespace().getName() + ":" + tag.getLocalTagID()).toArray());

        if (tempJobj.has(SchedulerConstants.JSON_FIELD_NAME)) {
            String title = StringUtils.isNotEmpty(tempJobj.get(SchedulerConstants.JSON_FIELD_NAME).getAsString())
                    ? tempJobj.get(SchedulerConstants.JSON_FIELD_NAME).getAsString()
                    : "";
            cf.setMetaData(DamConstants.DC_TITLE, title);
        }
        if (tempJobj.has(SchedulerConstants.JSON_FIELD_DESCRIPTION)) {
            String description = "";
            description = tempJobj.get(SchedulerConstants.JSON_FIELD_DESCRIPTION).getAsString();
            cf.setMetaData(DamConstants.DC_DESCRIPTION, description);
        }
        if (StringUtils.isNotBlank(foundCategory)) {
            cf.setMetaData(SchedulerConstants.CATEGORY, foundCategory);
        }
    }

    protected String findCategoryFromDefaultList(String subCategory, ResourceResolver resolver, TagManager tagMgr) {
        String foundCategory = null;
        if (StringUtils.isNotBlank(subCategory)) {
            foundCategory = readCFCategories(resolver, subCategory);
            String categoryPath = String.format("%1$s%2$s", tagsPath, SchedulerConstants.CATEGORY);
            try {
                if (null == resolver.getResource(tagsPath)) {
                    tagMgr.createTag(categoryPath, SchedulerConstants.CATEGORY, SchedulerConstants.CATEGORY, true);
                }
                String foundCategoryTagPath = String.format(SchedulerConstants.STRING_FORMAT, categoryPath, "/",
                        foundCategory);
                tagMgr.createTag(foundCategoryTagPath, foundCategory, foundCategory, true);
            } catch (InvalidTagFormatException e) {
                log.error("InvalidTagFormatException occurred.", e);
            }
        }
        return foundCategory;
    }

    protected void createTagsForCF(JsonObject tempJobj, List<Tag> tagsOnProduct, ResourceResolver resolver,
                                   TagManager tagMgr) {
        Arrays.stream(fragmentTagsProps).forEach(typeofTag -> {
            Map<String, Object> tagProperties = new HashMap<>();
            String tagValueString = null;
            if (tempJobj.has(typeofTag)) {
                JsonElement tagValue = tempJobj.get(typeofTag);

                if (!tagValue.isJsonNull()) {
                    tagValueString = tagValue.getAsString().replaceAll("\\s", "");
                } else {
                    tagValueString = "";
                }
            }
            // appending 'category' or 'productType' to taxonomypath
            String tentativeTagPath = String.format("%1$s%2$s%3$s%4$s", tagsPath, typeofTag.toLowerCase(), "/",
                    tagValueString.toLowerCase());
            createTag(tagsOnProduct, tagProperties, tagValueString, tentativeTagPath, resolver, tagMgr);
        });
    }

    protected void createTag(List<Tag> tagsOnProduct, Map<String, Object> tagProperties, String leafTagValue,
                             String tentativeTagPath, ResourceResolver resolver, TagManager tagMgr) {
        if (null == resolver.getResource(tentativeTagPath)) {
            try {
                if (StringUtils.isNotEmpty(leafTagValue)) {
                    tagProperties.put(JcrConstants.JCR_TITLE, leafTagValue);
                    Tag createdTag = tagMgr.createTag(tentativeTagPath, leafTagValue, leafTagValue, true);
                    tagsOnProduct.add(createdTag);
                }
            } catch (InvalidTagFormatException e) {
                log.error("persistence exception while creating a new tag.", e);
            }
            // end of creating new tag if not available
        } else {
            tagsOnProduct.add(tagMgr.resolve("/content/cq:tags/" + tentativeTagPath));
        }
    }

    protected boolean isValidContentFragment(String publishToPortal) {
        boolean isValidContentFragmentFlag = false;
        if ((StringUtils.isNotBlank(publishToPortal)) && (StringUtils.equalsIgnoreCase("Yes", publishToPortal))) {
            isValidContentFragmentFlag = true;
        }
        return isValidContentFragmentFlag;
    }

    @Activate
    @Modified
    public void configure(ArcherAPIJobConsumerConfiguration config) {
        log.debug("Archer API Job Consumer Configuration changed");
        fragmentTagsProps = converter.convert(config.tagsOnCF()).to(String[].class);
        fragmentTemplate = config.fragmentTemplatePath();
        fragmentCreationPath = config.fragmentCreationPath();
        tagsPath = config.taxonomyPath();
        forProdTypesPath = config.productTypesCreationPath();
        categoryMappingPath = config.categoryMappingPath();
    }

    public String readCFCategories(ResourceResolver resolver, String subCategory) {
        ContentFragment cf = Optional.ofNullable(resolver.getResource(categoryMappingPath))
                .map(e -> e.adaptTo(ContentFragment.class)).orElse(null);
        String foundCategory = null;
        if (cf!=null) {
            ContentElement categoryValueElement = cf.getElement("categoryValue");
            if (categoryValueElement!=null) {
                Iterator<ContentVariation> variations = categoryValueElement.getVariations();
                while (variations.hasNext()) {
                    ContentVariation next = variations.next();
                    String[] contentValue = (String[]) next.getValue().getValue();
                    if (Arrays.asList(contentValue).contains(subCategory)) {
                        foundCategory = next.getTitle();
                    }
                }
            }
        }
        return foundCategory;
    }

    public void setResourceResolverFactory(ResourceResolverFactory resourceResolverFactory) {
        this.resourceResolverFactory = resourceResolverFactory;
    }

}