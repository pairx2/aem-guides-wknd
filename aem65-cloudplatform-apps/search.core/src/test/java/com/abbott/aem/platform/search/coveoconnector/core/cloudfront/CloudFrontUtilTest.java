package com.abbott.aem.platform.search.coveoconnector.core.cloudfront;

import com.day.cq.commons.Externalizer;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CloudFrontUtilTest {
    private ResourceResolver resolver;

    @BeforeEach
    void setUp() {
        resolver = mock(ResourceResolver.class);
    }

    @Test
    void testGetEndPointURL() {
        String distributionId = "E3VN7ZWISKBD7Z";
        String url = "http://example.com";
        String expectedEndpointURL = "http://example.com/E3VN7ZWISKBD7Z/invalidation";
        String actualEndpointURL = CloudFrontUtil.getEndPointURL(distributionId, url);
        assertEquals(expectedEndpointURL, actualEndpointURL);
    }

    @Test
    void testResolveNonAsciiPath() {
        String path = "This is a non-ascii path";
        String resolvedPath = CloudFrontUtil.resolveNonAsciiPath(path);
        assertEquals("*", resolvedPath);
    }

    @Test
    void testGetShortURL_domainWithoutSlash() {
        // Mock the necessary objects and methods
        Map<String, Object> valueMapConfig = new HashMap<>();
        valueMapConfig.put("pathstoreplace", "{\"abbott.com\": \"abbott.com\"}");
        valueMapConfig.put("extentionlessDomainsWithoutSlash", "abbott.com");
        valueMapConfig.put("extentionlessDomainsWithSlash", "");

        Resource resource = mock(Resource.class);
        ValueMap valueMap = new ValueMapDecorator(valueMapConfig);

        // Mock for getMapping
        when(resolver.getResource("/var/shorturlconfig/urlmappings")).thenReturn(resource);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);

        // Mock for checkExtention
        when(resolver.getResource("/var/extensionlessMapping/urlmappings")).thenReturn(resource);

        // Test the method
        String shortURL = CloudFrontUtil.getShortURL("abbott.com/content/shortUrl-test.html", "staging.cloud.abbott.aem.com", resolver);
        assertEquals("/content/shortUrl-test", shortURL);
    }

    @Test
    void testGetShortURL_domainWithSlash() {
        // Mock the necessary objects and methods
        Map<String, Object> valueMapConfig = new HashMap<>();
        valueMapConfig.put("pathstoreplace", "{\"abbott.com\": \"abbott.com\"}");
        valueMapConfig.put("extentionlessDomainsWithoutSlash", "");
        valueMapConfig.put("extentionlessDomainsWithSlash", "abbott.com");

        Resource resource = mock(Resource.class);
        ValueMap valueMap = new ValueMapDecorator(valueMapConfig);

        // Mock for getMapping
        when(resolver.getResource("/var/shorturlconfig/urlmappings")).thenReturn(resource);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);

        // Mock for checkExtention
        when(resolver.getResource("/var/extensionlessMapping/urlmappings")).thenReturn(resource);

        // Test the method
        String shortURL = CloudFrontUtil.getShortURL("/content/shortUrl-test.html", "staging.cloud.abbott.aem.com", resolver);
        assertEquals("/content/shortUrl-test/", shortURL);
    }

    @Test
    void testGetResolverParams() {
        Map<String, Object> params = CloudFrontUtil.getResolverParams();
        assertEquals("readService", params.get(ResourceResolverFactory.SUBSERVICE));
    }

    @Test
    void testGetDomain_forNonCF_damAsset() {
        String externalUrl = "https://www.abbott.com/content/domain-test-inheritedvalue-dam-asset.html";

        // Stub data
        String contentPath = "/content/example";
        Map<String, Object> resourcePropmap = new HashMap<>();
        resourcePropmap.put(JcrConstants.JCR_PRIMARYTYPE, DamConstants.NT_DAM_ASSET);
        resourcePropmap.put("contentFragment", false);
        resourcePropmap.put("externalizerDomain", "author");
        ValueMap valueMap = new ValueMapDecorator(resourcePropmap);

        // Mock the necessary objects and methods
        Resource resource = mock(Resource.class);
        Externalizer externalizer = mock(Externalizer.class);

        // Mock for getDomain
        when(resolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
        when(resolver.getResource(contentPath)).thenReturn(resource);
        when(resolver.map("/content")).thenReturn(contentPath);
        when(externalizer.externalLink(resolver, "author", contentPath)).thenReturn(externalUrl);

        // Mock for getInherited - damAsset type
        when(resource.getPath()).thenReturn(contentPath);
        when(resolver.getResource(contentPath+"/jcr:content/metadata")).thenReturn(resource);
        when(resource.getValueMap()).thenReturn(valueMap);

        // Test the method
        String domain = CloudFrontUtil.getDomain(contentPath, resolver);
        assertEquals("www.abbott.com/domain-test-inheritedvalue-dam-asset.html", domain);
    }

    @Test
    void testGetDomain_forNonCF_expFragment() {
        // Stub data
        String contentPath = "/content/example";
        Map<String, Object> resourcePropmap = new HashMap<>();
        resourcePropmap.put(JcrConstants.JCR_PRIMARYTYPE, DamConstants.RELATION_ASSET_PAGES);
        resourcePropmap.put("contentFragment", false);
        resourcePropmap.put("externalizerDomain", "");
        ValueMap valueMap = new ValueMapDecorator(resourcePropmap);

        // Mock the necessary objects and methods
        Resource resource = mock(Resource.class);
        Externalizer externalizer = mock(Externalizer.class);

        // Mock for getDomain
        when(resolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
        when(resolver.getResource(contentPath)).thenReturn(resource);

        // Mock for getInheritedValue - "experience-fragment"
        when(resource.getPath()).thenReturn(contentPath+"/experience-fragment");
        when(resolver.getResource(contentPath+"/experience-fragment/jcr:content")).thenReturn(resource);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);

        // Test the method
        String domain = CloudFrontUtil.getDomain(contentPath, resolver);
        assertEquals("", domain);
    }

    @Test
    void testGetDomain_forNonCF() {
        String externalUrl = "https://www.abbott.com/content/domain-test-inheritedvalue.html";

        // Stub data
        String contentPath = "/content/example";
        Map<String, Object> resourcePropmap = new HashMap<>();
        resourcePropmap.put(JcrConstants.JCR_PRIMARYTYPE, DamConstants.RELATION_ASSET_PAGES);
        resourcePropmap.put("contentFragment", false);
        resourcePropmap.put("externalizerDomain", "author");
        ValueMap valueMap = new ValueMapDecorator(resourcePropmap);

        // Mock the necessary objects and methods
        Resource resource = mock(Resource.class);
        Externalizer externalizer = mock(Externalizer.class);

        // Mock for getDomain
        when(resolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
        when(resolver.getResource(contentPath)).thenReturn(resource);
        when(resolver.map("/content")).thenReturn(contentPath);
        when(externalizer.externalLink(resolver, "author", contentPath)).thenReturn(externalUrl);

        // Mock for getInheritedValue
        when(resource.getPath()).thenReturn(contentPath);
        when(resource.getValueMap()).thenReturn(valueMap);

        // Test the method
        String domain = CloudFrontUtil.getDomain(contentPath, resolver);
        assertEquals("www.abbott.com/domain-test-inheritedvalue.html", domain);
    }

    @Test
    void testGetDomain_forCF_contentType() throws RepositoryException {
        String externalUrl = "https://www.abbott.com/content/domain-test-inheritedfragment-content.html";
        // Stub data
        String contentPath = "/content/example";
        Map<String, Object> resourcePropmap = new HashMap<>();
        resourcePropmap.put(JcrConstants.JCR_PRIMARYTYPE, DamConstants.RELATION_ASSET_PAGES);
        resourcePropmap.put("contentFragment", true);

        // Mock the necessary objects and methods
        ValueMap valueMap = new ValueMapDecorator(resourcePropmap);
        Resource resource = mock(Resource.class);
        Node node = mock(Node.class);
        Externalizer externalizer = mock(Externalizer.class);
        TagManager tagManager = mock(TagManager.class);
        Tag tag = mock(Tag.class);
        Property property = mock(Property.class);

        //mock for getDomain
        when(resolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
        when(resolver.getResource(contentPath)).thenReturn(resource);

        when(resolver.map("/content")).thenReturn(contentPath);
        when(externalizer.externalLink(resolver, "author", contentPath)).thenReturn(externalUrl);

        //mock for getExternalizeDomainName
        when(resource.adaptTo(Node.class)).thenReturn(node);

        // Mock for getInheritedFragmentValue
        when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(node.getPath()).thenReturn(contentPath);
        when(resolver.getResource(contentPath+"/jcr:content/metadata")).thenReturn(resource);
        when(node.hasProperty("externalizerDomain")).thenReturn(true);
        when(node.getProperty("externalizerDomain")).thenReturn(property);
        when(property.getName()).thenReturn("contentType");
        when(property.getString()).thenReturn("domain");
        when(tagManager.resolve("domain")).thenReturn(tag);
        when(tag.getTitle()).thenReturn("author");

        // Test the method
        String domain = CloudFrontUtil.getDomain(contentPath, resolver);
        assertEquals("www.abbott.com/domain-test-inheritedfragment-content.html", domain);
    }

    @Test
    void testGetDomain_forCF_nonContentType() throws RepositoryException {
        String externalUrl = "https://www.abbott.com/content/domain-test-inheritedfragment-non-content.html";

        // Stub data
        String contentPath = "/content/example";
        Map<String, Object> resourcePropmap = new HashMap<>();
        resourcePropmap.put(JcrConstants.JCR_PRIMARYTYPE, DamConstants.RELATION_ASSET_PAGES);
        resourcePropmap.put("contentFragment", true);

        // Mock the necessary objects and methods
        ValueMap valueMap = new ValueMapDecorator(resourcePropmap);
        Resource resource = mock(Resource.class);
        Node node = mock(Node.class);
        Externalizer externalizer = mock(Externalizer.class);
        Property property = mock(Property.class);

        //mock for getDomain
        when(resolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
        when(resolver.getResource(contentPath)).thenReturn(resource);

        when(resolver.map("/content")).thenReturn(contentPath);
        when(externalizer.externalLink(resolver, "author", contentPath)).thenReturn(externalUrl);

        //mock for getExternalizeDomainName
        when(resource.adaptTo(Node.class)).thenReturn(node);

        //mock for getInheritedFragmentValue
        when(node.getPath()).thenReturn(contentPath);
        when(resolver.getResource(contentPath+"/jcr:content/metadata")).thenReturn(resource);
        when(node.hasProperty("externalizerDomain")).thenReturn(false, true);
        when(node.getParent()).thenReturn(node);
        when(node.getProperty("externalizerDomain")).thenReturn(property);
        when(property.getName()).thenReturn("page");
        when(property.getString()).thenReturn("author");

        // Test the method
        String domain = CloudFrontUtil.getDomain(contentPath, resolver);
        assertEquals("www.abbott.com/domain-test-inheritedfragment-non-content.html", domain);
    }

    @Test
    void testGetDomain_forCF_repositoryException() throws RepositoryException {
        //stub data
        String contentPath = "/content/example";
        Map<String, Object> resourcePropmap = new HashMap<>();
        resourcePropmap.put(JcrConstants.JCR_PRIMARYTYPE, DamConstants.RELATION_ASSET_PAGES);
        resourcePropmap.put("contentFragment", true);
        resourcePropmap.put("externalizerDomain", "author");

        // Mock the necessary objects and methods
        ValueMap valueMap = new ValueMapDecorator(resourcePropmap);
        Resource resource = mock(Resource.class);
        Node node = mock(Node.class);
        Externalizer externalizer = mock(Externalizer.class);

        //mock for getDomain
        when(resolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
        when(resolver.getResource(contentPath)).thenReturn(resource);

        //mock for getExternalizeDomainName
        when(resource.adaptTo(Node.class)).thenReturn(node);

        //mock for getInheritedFragmentValue
        when(node.getPath()).thenThrow(new RepositoryException("RE"));

        // Test the method
        String domain = CloudFrontUtil.getDomain(contentPath, resolver);
        assertEquals(contentPath, domain);
    }

    @Test
    void testGetPreviewDomain_whenNonProdPreviewEnv(){
        String actual = CloudFrontUtil.getPreviewDomain("dev2.aem.abbott.com", "dev2", "preview");
        assertEquals("dev2preview.abbott.com", actual);
    }

    @Test
    void testGetPreviewDomain_whenProdPreviewEnv(){
        String actual = CloudFrontUtil.getPreviewDomain("www.abbott.com", "www", "preview");
        assertEquals("preview.abbott.com", actual);
    }

    @Test
    void testGetPreviewDomain_whenNonPreviewEnv(){
        String actual = CloudFrontUtil.getPreviewDomain("dev2.aem.abbott.com", "dev2", "publish");
        assertEquals("dev2.aem.abbott.com", actual);
    }

    @Test
    void testGetEnvironment_whenNonProdEnv(){
        String actual = CloudFrontUtil.getEnvironment("dev2.aem.abbott.com/content");
        assertEquals("dev2", actual);
    }

    @Test
    void testGetEnvironment_whenProdenv(){
        String actual = CloudFrontUtil.getEnvironment("https://www.abbott.com/content");
        assertEquals("www", actual);
    }
}
