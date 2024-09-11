package com.abbott.aem.bts.cybersecurity.services.impl;

import com.abbott.aem.bts.cybersecurity.constants.SchedulerConstants;
import com.abbott.aem.bts.cybersecurity.core.ArcherAPIJobConsumerConfiguration;
import com.abbott.aem.bts.cybersecurity.services.AEMFieldsMappingService;
import com.abbott.aem.bts.cybersecurity.services.ArcherAPIJobService;
import com.abbott.aem.bts.cybersecurity.services.JsonFetchService;
import com.adobe.cq.dam.cfm.*;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationOptions;
import com.day.cq.replication.Replicator;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.http.HttpException;
import org.apache.sling.api.resource.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.osgi.service.component.annotations.Reference;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@ExtendWith(AemContextExtension.class)
@RunWith(MockitoJUnitRunner.class)
class ArcherAPIJobServiceImplTest {
    private AemContext ctx = new AemContext();

    @Reference
    AEMFieldsMappingService aemFieldMapping = new AEMFieldsMappingServiceImpl();

    @Spy
    @InjectMocks
    ArcherAPIJobServiceImpl archerAPIJobService;

    @Mock
    JsonFetchService jsonFetchService;

    @Mock
    ArcherAPIJobConsumerConfiguration config;

    @Mock
    private Session jcrSession;

    @Mock
    TagManager tagMgr;

    @Reference
    ResourceResolverFactory resourceResolverFactory;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    ContentFragment contentFragment;

    @Mock
    private Replicator replicator;

    @Mock
    private FragmentTemplate fragmentTemplate;

    @Mock
    Resource parentResource;

    @Mock
    Resource templateResource;

    public static final String SUBSERVICE_NAME = "writeService";
    private String fragmentTemplatePath = "/conf/bts/cybersecurity/settings/dam/cfm/models/cybersecurity-fragment-model/jcr:content";
    private String fragmentCreationPath = "/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1055475";
    private String tagsPath = "/bts/cybersecurity/product/";
    private String pageTemplate = "/conf/bts/cybersecurity/settings/wcm/templates/cybersecurity-postlogin-page-template";
    private String forProdTypesPath = "/content/dam/bts/cybersecurity/us/en/";
    private String productUrl = "/content/bts/cybersecurity/us/en/secure/products/productUrl";
    private String jsonResponse = "";

    @BeforeEach
    public void setUp() throws HttpException, LoginException {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("fragmentTagsProps", "fragmentTagsProps");
        parameters.put("fragmentTemplate", "/conf/bts/cybersecurity/settings/dam/cfm/models/cybersecurity-fragment-model/jcr:content");
        parameters.put("fragmentCreationPath", "/content/dam/bts/cybersecurity/us/en/content-fragments/");
        parameters.put("tagsPath", "/bts/cybersecurity/product/");
        parameters.put("productUrl", "/content/bts/cybersecurity/us/en/secure/products/productUrl");
        parameters.put("pageTemplate", "/conf/bts/cybersecurity/settings/wcm/templates/cybersecurity-postlogin-page-template");
        parameters.put("forProdTypesPath", "/content/dam/bts/cybersecurity/us/en/");
        parameters.put("tagsOnCF", new String[]{"category"});
        parameters.put("taxonomyPath", "/content/cq:tags/bts/cybersecurity/product");
        parameters.put("categoryMappingPath", "/content/dam/bts/cybersecurity/us/en/cybersecurity-product-category-mapping");
        aemFieldMapping = Mockito.mock(AEMFieldsMappingService.class);
        ctx.registerService(AEMFieldsMappingService.class, aemFieldMapping);

        archerAPIJobService = new ArcherAPIJobServiceImpl();
        initMocks(this);

        when(config.fragmentCreationPath()).thenReturn("/content/dam/bts/cybersecurity/us/en/content-fragments/");
        when(config.productTypesCreationPath()).thenReturn("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1055475");

        when(config.fragmentTemplatePath()).thenReturn("/conf/bts/cybersecurity/settings/dam/cfm/models/cybersecurity-fragment-model/jcr:content");
        when(config.tagsOnCF()).thenReturn(new String[]{"category"});
        when(config.taxonomyPath()).thenReturn("/content/cq:tags/bts/cybersecurity/product");
        when(config.categoryMappingPath()).thenReturn("/content/dam/bts/cybersecurity/us/en/cybersecurity-product-category-mapping");
        archerAPIJobService.configure(config);

        resourceResolverFactory = mock(ResourceResolverFactory.class);
        archerAPIJobService.setResourceResolverFactory(resourceResolverFactory);
        Map<String, Object> params = new HashMap<>();
        params.put(ResourceResolverFactory.SUBSERVICE, SUBSERVICE_NAME);
        resourceResolver = mock(ResourceResolver.class);
        when(resourceResolverFactory.getServiceResourceResolver(params)).thenReturn(resourceResolver);

        tagMgr = mock(TagManager.class);
        jcrSession = mock(Session.class);
        replicator = mock(Replicator.class);
        parentResource = mock(Resource.class);
        templateResource = mock(Resource.class);
        fragmentTemplate = mock(FragmentTemplate.class);

        ctx.registerService(Replicator.class, replicator);

        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagMgr);
        when(resourceResolver.adaptTo(Session.class)).thenReturn(jcrSession);
        when(resourceResolver.getResource(fragmentCreationPath)).thenReturn(parentResource);
        when(resourceResolver.getResource(fragmentTemplatePath)).thenReturn(templateResource);
        when(templateResource.adaptTo(FragmentTemplate.class)).thenReturn(fragmentTemplate);
        jsonResponse = "{\"status\":true,\"requestId\":\"648ba896-42fe-48a4-856a-3ca5da224509\",\"response\":{\"productTypes\":[\"ConnectedEquipment\",\"HomeUseDevice\",\"HostedSolution\",\"ImplantableDevice\",\"Non-ConnectedEquipment\",\"SoftwareOnly\"],\"products\":[{\"vsiUrl\":\"escreen-intranet-1008029-vsi.html\",\"infoUrl\":\"escreen-intranet-1008029-info.html\",\"versions\":[{\"enrolledInCybersecurity\":\"No\",\"vsiUrl\":\"escreen-intranet-1008029-vsi.html\",\"active\":\"false\",\"updatedOn\":\"2023-01-10T15:48:49.227\",\"versionName\":\"eScreenIntranetv1\",\"version\":null,\"productName\":\"eScreenIntranet\",\"publishToPortal\":\"No\",\"sbomXmlAttachmentId\":null,\"versionId\":\"PRV-1260649\",\"infoUrl\":\"escreen-intranet-1008029-info.html\",\"mds2PdfAttachmentId\":null,\"category\":\"Toxicology\",\"sbomPdfAttachmentId\":null,\"productType\":\"HostedSolution\",\"othersUrl\":\"escreen-intranet-1008029-others.html\",\"fieldId\":\"1008029\"}],\"enrolledInCyberSecurity\":\"No\",\"lastUpdatedVersion\":{\"productType\":\"HostedSolution\"},\"category\":\"Toxicology\",\"productName\":\"eScreenIntranet\",\"productType\":\"HostedSolution\",\"othersUrl\":\"escreen-intranet-1008029-others.html\",\"fieldId\":\"1008029\",\"publishToPortal\":null},{\"vsiUrl\":\"ach-healthcheck-pro-1055461-vsi.html\",\"infoUrl\":\"ach-healthcheck-pro-1055461-info.html\",\"versions\":[{\"enrolledInCybersecurity\":\"No\",\"vsiUrl\":\"ach-healthcheck-pro-1055461-vsi.html\",\"active\":\"true\",\"updatedOn\":\"2022-12-13T17:01:06.78\",\"versionName\":\"ACHHealthCheckProv1\",\"version\":\"v1\",\"productName\":\"ACHHealthCheckPro\",\"publishToPortal\":\"Yes\",\"sbomXmlAttachmentId\":null,\"versionId\":\"PRV-1055475\",\"infoUrl\":\"ach-healthcheck-pro-1055461-info.html\",\"mds2PdfAttachmentId\":\"5655\",\"category\":\"Acelis\",\"sbomPdfAttachmentId\":null,\"productType\":\"HostedSolution\",\"othersUrl\":\"ach-healthcheck-pro-1055461-others.html\",\"fieldId\":\"1055461\"}],\"enrolledInCyberSecurity\":\"No\",\"lastUpdatedVersion\":{\"productType\":\"HostedSolution\"},\"category\":\"Acelis\",\"productName\":\"ACHHealthCheckPro\",\"productType\":\"HostedSolution\",\"othersUrl\":\"ach-healthcheck-pro-1055461-others.html\",\"fieldId\":\"1055461\",\"publishToPortal\":null},{\"vsiUrl\":\"aliniq-sdi-1088616-vsi.html\",\"infoUrl\":\"aliniq-sdi-1088616-info.html\",\"versions\":[{\"enrolledInCybersecurity\":\"No\",\"vsiUrl\":\"aliniq-sdi-1088616-vsi.html\",\"active\":\"true\",\"updatedOn\":\"2023-01-26T23:10:59.073\",\"versionName\":\"AlinIQSDiv1.0.0\",\"version\":\"v1.0.0\",\"productName\":\"AlinIQSDi\",\"publishToPortal\":\"No\",\"sbomXmlAttachmentId\":null,\"versionId\":\"PRV-1088621\",\"infoUrl\":\"aliniq-sdi-1088616-info.html\",\"mds2PdfAttachmentId\":null,\"category\":\"PointofCare\",\"sbomPdfAttachmentId\":\"5138\",\"productType\":\"HostedSolution\",\"othersUrl\":\"aliniq-sdi-1088616-others.html\",\"fieldId\":\"1088616\"}],\"enrolledInCyberSecurity\":\"No\",\"lastUpdatedVersion\":{\"productType\":\"HostedSolution\"},\"category\":\"PointofCare\",\"productName\":\"AlinIQSDi\",\"productType\":\"HostedSolution\",\"othersUrl\":\"aliniq-sdi-1088616-others.html\",\"fieldId\":\"1088616\",\"publishToPortal\":null}]},\"errorCode\":0}";
        when(jsonFetchService.getJson()).thenReturn(jsonResponse);

        ctx.registerService(ArcherAPIJobService.class, archerAPIJobService, parameters);

        ctx.registerService(ArcherAPIJobService.class, archerAPIJobService, parameters);

    }

    @Test
    void testGetProductDetailsLoginException() throws LoginException {
        Map<String, Object> params = new HashMap<>();
        params.put(ResourceResolverFactory.SUBSERVICE, SUBSERVICE_NAME);
        when(resourceResolverFactory.getServiceResourceResolver(params)).thenThrow(new LoginException());
        archerAPIJobService.getProductDetails();
    }

    @Test
    void testGetProductDetailsHttpException() throws HttpException {
        when(jsonFetchService.getJson()).thenThrow(new HttpException());
        archerAPIJobService.getProductDetails();
    }

    @Test
    void testProcessProductsData() {
        Map<String, Object> properties = new HashMap<>();
        properties.put("jcr:primaryType", "nt:unstructured");
        properties.put("jcr:lastModified", "2023-09-13T18:54:54.269+05:30");
        properties.put("cq:lastReplicationAction", "Activate");
        Resource resourceValue = ctx.create().resource("/content/dam/bts/cybersecurity/us/en/content-fragments", properties);
        Resource fragmentResourceValue = ctx.create().resource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1055475", properties);
        Resource cfJcrContentValue = ctx.create().resource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1055475/jcr:content", properties);
        Resource fragmentResourceValue1 = ctx.create().resource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1260649", properties);
        Resource cfJcrContentValue1 = ctx.create().resource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1260649/jcr:content", properties);
        when(resourceResolver.getResource("/content/dam/bts/cybersecurity/us/en/content-fragments")).thenReturn(resourceValue);
        when(resourceResolver.getResource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1055475")).thenReturn(fragmentResourceValue);
        when(resourceResolver.getResource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1055475/jcr:content")).thenReturn(cfJcrContentValue);
        when(resourceResolver.getResource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1260649")).thenReturn(fragmentResourceValue1);
        when(resourceResolver.getResource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1260649/jcr:content")).thenReturn(cfJcrContentValue1);
        assertTrue(archerAPIJobService.getProductDetails());
    }

    @Test
    void testProcessProductsDataCFNotExist() throws ContentFragmentException, InvalidTagFormatException {
        Map<String, Object> properties = new HashMap<>();
        properties.put("jcr:primaryType", "nt:unstructured");
        properties.put("jcr:lastModified", "2023-09-13T18:54:54.269+05:30");
        properties.put("cq:lastReplicationAction", "Activate");
        Resource resourceValue = ctx.create().resource("/content/dam/bts/cybersecurity/us/en/content-fragments", properties);
        Resource fragmentResourceValue = ctx.create().resource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1260649", properties);
        Resource cfJcrContentValue = ctx.create().resource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1260649/jcr:content", properties);
        when(resourceResolver.getResource("/content/dam/bts/cybersecurity/us/en/content-fragments/")).thenReturn(resourceValue);
        when(resourceResolver.getResource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1260649")).thenReturn(fragmentResourceValue);
        when(resourceResolver.getResource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1260649/jcr:content")).thenReturn(cfJcrContentValue);
        when(resourceResolver.getResource("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1055475")).thenReturn(null);

        when(fragmentTemplate.createFragment(resourceValue, "PRV-1055475", "PRV-1055475")).thenReturn(contentFragment);
        Resource resource = mock(Resource.class);

        when(resourceResolver.getResource(config.categoryMappingPath())).thenReturn(resource);
        when(resource.adaptTo(ContentFragment.class)).thenReturn(contentFragment);
        ContentElement contentElement = mock(ContentElement.class);
        when(contentFragment.getElement(any())).thenReturn(contentElement);
        List<ContentVariation> contentVariationList = new ArrayList<>();
        ContentVariation contentVariation = mock(ContentVariation.class);
        FragmentData fragmentData = mock(FragmentData.class);
        contentVariationList.add(contentVariation);
        Iterator<ContentVariation> iterator = contentVariationList.iterator();
        ArrayList<ContentElement> elementsList = new ArrayList<>();
        elementsList.add(contentElement);
        Iterator<ContentElement> iterator1 = elementsList.iterator();
        when(contentFragment.getElements()).thenReturn(iterator1);
        when(contentElement.getVariations()).thenReturn(iterator);
        when(contentVariation.getValue()).thenReturn(fragmentData);
        when(fragmentData.getValue()).thenReturn(new String[]{"Legacy DRG Systems", "Acelis"});
        when(contentVariation.getTitle()).thenReturn("Neuromodulation");
        Tag tagValue = mock(Tag.class);

        when(tagMgr.createTag("/content/cq:tags/bts/cybersecurity/productcategory/acelis", "Acelis", "Acelis", true)).thenReturn(tagValue);
        when(tagValue.getNamespace()).thenReturn(tagValue);
        when(tagValue.getName()).thenReturn("Acelis");
        when(tagValue.getLocalTagID()).thenReturn("Acelis");
        when(contentFragment.adaptTo(Resource.class)).thenReturn(resource);
        when(resource.getPath()).thenReturn("/content/dam/bts/cybersecurity/us/en/content-fragments/PRV-1260649");
        assertTrue(archerAPIJobService.getProductDetails());
    }

    @Test
    void testCreateAndReplicateProdType() throws IOException, ReplicationException {
        ctx.create().resource(SchedulerConstants.PRODUCTS_RESOURCE);
        archerAPIJobService.createAndReplicateProdType("productType", resourceResolver, jcrSession);
    }

    @Test
    void testGetCfDate() throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        Date date = simpleDateFormat.parse("2013-09-29T18:46:19Z");
        String cfDate = archerAPIJobService.getCfDate(date);
        assertEquals("2013-09-29T18:46:19.000Z", cfDate);
    }

    @Test
    void testCreateTagsForCF() {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("productType", "Stethoscope");
        jsonObject.addProperty("category", (String) null);
        jsonObject.addProperty("productName", "Company");
        jsonObject.addProperty("versionId", "VID");
        List<Tag> tagsOnProduct = new ArrayList<>();
        archerAPIJobService.createTagsForCF(jsonObject, tagsOnProduct, resourceResolver, tagMgr);
    }

    @Test
    void testGetFieldValue() {
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson("{'key':'value'}", JsonObject.class);
        JsonElement jsonElement = jsonObject.get("key");
        String fieldValue = archerAPIJobService.getFieldValue(jsonElement);
        assertEquals("value", fieldValue);
    }

    @Test
    void testCreateTag() throws InvalidTagFormatException {
        String tentativeTagPath = "/content/cq:tags/bts";
        String leafTagValue = "leafTagValue";
        Map<String, Object> tagProperties = new HashMap<>();
        List<Tag> tagsOnProduct = new ArrayList<>();
        archerAPIJobService.createTag(tagsOnProduct, tagProperties, leafTagValue, tentativeTagPath, resourceResolver, tagMgr);
        //covering catch
        when(tagMgr.createTag(tentativeTagPath, leafTagValue, leafTagValue, true)).thenThrow(InvalidTagFormatException.class);
        archerAPIJobService.createTag(tagsOnProduct, tagProperties, leafTagValue, tentativeTagPath, resourceResolver, tagMgr);
        //covering else
        Resource tagPathResource = ctx.create().resource(tentativeTagPath, "jcr:primaryType", "cq:Tag");
        when(resourceResolver.getResource(tentativeTagPath)).thenReturn(tagPathResource);
        archerAPIJobService.createTag(tagsOnProduct, tagProperties, leafTagValue, tentativeTagPath, resourceResolver, tagMgr);
        verify(archerAPIJobService, times(3)).createTag(tagsOnProduct, tagProperties, leafTagValue, tentativeTagPath, resourceResolver, tagMgr);
    }

    @Test
    void testIsValidContentFragment() {
        String publishToPortal = "Yes";
        boolean isValid = archerAPIJobService.isValidContentFragment(publishToPortal);
        assertTrue(isValid);
    }

    @Test
    void testSetResourceResolverFactoryTest() {
        ResourceResolverFactory mockFactory = Mockito.mock(ResourceResolverFactory.class);
        archerAPIJobService.setResourceResolverFactory(mockFactory);
    }

    @Test
    void testSetCfMetadata() throws ContentFragmentException {
        ContentFragment cf = mock(ContentFragment.class);
        List<Tag> tagsOnProduct = new ArrayList<>();
        String foundCategory = "foundCategory";
        JsonObject tempObj = new JsonObject();
        tempObj.addProperty("productName", "productName");
        archerAPIJobService.setCfMetadata(cf, tempObj, tagsOnProduct, foundCategory);
        tempObj.addProperty("description", "description");
        archerAPIJobService.setCfMetadata(cf, tempObj, tagsOnProduct, foundCategory);
        verify(archerAPIJobService, times(2)).setCfMetadata(cf, tempObj, tagsOnProduct, foundCategory);
    }

    @Test
    void testDoReplicate() throws ContentFragmentException, PersistenceException, RepositoryException, ReplicationException {
        Map<String, String> replicateHelperMap = new HashMap<>();
        Resource cfJcrContent = mock(Resource.class);
        Resource existingFragResource = mock(Resource.class);
        JsonObject tempObj = new JsonObject();
        List<Tag> tagsOnProduct = new ArrayList<>();
        archerAPIJobService.doReplicate(replicateHelperMap, tagsOnProduct, tempObj, existingFragResource, jcrSession, resourceResolver, tagMgr);
        verify(archerAPIJobService, times(1)).doReplicate(replicateHelperMap, tagsOnProduct, tempObj, existingFragResource, jcrSession, resourceResolver, tagMgr);
    }

    @Test
    void testSettingJcrDate() {
        Resource fragResource = ctx.create().resource("/content/dam/bts/cf/testFragment", "primaryType", "dam:Asset");
        archerAPIJobService.settingJcrDate(fragResource, jcrSession);
        verify(archerAPIJobService, times(1)).settingJcrDate(fragResource, jcrSession);
    }

    @Test
    void testReadCFCategories() {
        Resource resource = mock(Resource.class);
        when(resourceResolver.getResource(config.categoryMappingPath())).thenReturn(resource);
        when(resource.adaptTo(ContentFragment.class)).thenReturn(contentFragment);
        ContentElement contentElement = mock(ContentElement.class);
        when(contentFragment.getElement(any())).thenReturn(contentElement);
        List<ContentVariation> contentVariationList = new ArrayList<>();
        ContentVariation contentVariation = mock(ContentVariation.class);
        FragmentData fragmentData = mock(FragmentData.class);
        contentVariationList.add(contentVariation);
        Iterator<ContentVariation> iterator = contentVariationList.iterator();
        when(contentElement.getVariations()).thenReturn(iterator);
        when(contentVariation.getValue()).thenReturn(fragmentData);
        when(fragmentData.getValue()).thenReturn(new String[]{"Legacy DRG Systems", "Legacy DBS Systems"});
        when(contentVariation.getTitle()).thenReturn("Neuromodulation");
        String actual = archerAPIJobService.readCFCategories(resourceResolver, "Legacy DRG Systems");
        assertEquals("Neuromodulation", actual);
    }

}


