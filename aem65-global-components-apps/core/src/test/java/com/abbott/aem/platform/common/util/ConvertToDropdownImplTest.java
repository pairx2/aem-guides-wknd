package com.abbott.aem.platform.common.util;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
public class ConvertToDropdownImplTest {

    AemContext ctx = new AemContext();
    SlingHttpServletRequest request;
    ResourceResolver resolver;
    ConvertToDropdown ctdd = new ConvertToDropdownImpl();
    Map<String, String> testMap = new TreeMap<>();
    String responseValue = "{\"response\": [ {\"codeValueList\": [ {\"key\":\"key1\",\"value\":\"value1\"},{\"key\":\"key2\",\"value\":\"value2\"},{\"key\":\"key3\",\"value\":\"value3\"} ]} ],\"errorCode\":\"0\"}";

    String responseValue2 = "{\"response\": [ {\"codeValueList\": [ {\"key\":\"key1\",\"value\":\"value1\"},{\"key\":\"key2\",\"value\":\"value2\"},{\"key\":\"key3\",\"value\":\"value3\"} ]} ],\"errorCode\":\"1\",\"statusReason\":\"reason\"}";

    String endpoint = "https://www.googl.com";
    Map<String, String> dropDownMap;

    @BeforeEach
    void setup() {
        resolver = ctx.resourceResolver();
        request = ctx.request();
        testMap = new TreeMap<>();

        testMap.put(endpoint + "key1", "value1");
        testMap.put(endpoint + "key2", "value2");
        testMap.put(endpoint + "key3", "value3");

    }

    @Test
    void testGetDropDownList() {

        dropDownMap = ctdd.getDropDownList(endpoint, responseValue);
        assertNotNull(dropDownMap);
        assertTrue(dropDownMap.equals(testMap));

        Map<String,String> dropDownMap2 = ctdd.getDropDownList(endpoint, responseValue2);

        ctdd.constructDataSource(request, resolver, dropDownMap);

    }

}
