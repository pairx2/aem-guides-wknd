package com.abbott.aem.platform.common.util;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.xml.bind.ValidationException;

import org.apache.commons.collections4.iterators.TransformIterator;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;
import com.day.crx.JcrConstants;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class ConvertToDropdownImpl implements ConvertToDropdown {
    private static final Logger LOGGER = LoggerFactory.getLogger(ConvertToDropdownImpl.class);
    private static final String DROPDOWN_KEY = "key";
    private static final String DROPDOWN_VALUE = "value";
    private static final String DROPDOWN_TEXT = "text";

    private static final String CODE_VALIE_LIST = "codeValueList";
    private static final String RESPONSE_ARRAY = "response";
    private static final String HOST_DOMAIN_SEPARATOR = "://";

    @Override
    public Map<String, String> getDropDownList(String endpoint, String responseValue) {
        Map<String, String> dropDownMap = new LinkedHashMap<>();
        try {
            if (StringUtils.contains(responseValue, RESPONSE_ARRAY)) {
                JsonObject resObject = new JsonParser().parse(responseValue).getAsJsonObject();
                int errorCode = resObject.get("errorCode").getAsInt();

                if (errorCode != 0) {
                    String errorReason = resObject.get("statusReason").getAsString();
                    throw new ValidationException(errorReason);
                } else {
                    generateMap(endpoint, responseValue, dropDownMap, resObject);
                }
            } else {
                LOGGER.error("LookUp API response string do not contains response object");
            }
        } catch (ValidationException e) {
            LOGGER.error("ValidationException from ConvertToDropdownImpl", e);
        } catch (MalformedURLException e) {
            LOGGER.error("MalformedURLException from ConvertToDropdownImpl", e);
        }
        return dropDownMap;
    }

    public void generateMap(String endpoint, String responseValue, Map<String, String> dropDownMap,
            JsonObject responseObject) throws MalformedURLException {

        // If response is not a JsonArray then display a message
        if (responseObject.has(RESPONSE_ARRAY) && !responseObject.get(RESPONSE_ARRAY).isJsonArray()) {
            dropDownMap.put(StringUtils.EMPTY, "Values not configured for the application!");
            return;
        }

        JsonArray arr;
        JsonArray responseArray = responseObject.getAsJsonArray(RESPONSE_ARRAY);
        if (StringUtils.contains(responseValue, CODE_VALIE_LIST)) {
            JsonObject dataItem = responseArray.get(0).getAsJsonObject();
            arr = dataItem.getAsJsonArray(CODE_VALIE_LIST);
        } else {
            arr = responseArray; // for state and city lookup response
        }
        String key = null;
        String value = null;
        String domain = getDomain(endpoint);
        for (int i = 0; i < arr.size(); i++) {
            if (arr.get(i).getAsJsonObject().get(DROPDOWN_KEY) != null) {
                String keyItem = arr.get(i).getAsJsonObject().get(DROPDOWN_KEY).getAsString();
                key = domain + keyItem;
            }
            if (arr.get(i).getAsJsonObject().get(DROPDOWN_VALUE) != null) {
                value = arr.get(i).getAsJsonObject().get(DROPDOWN_VALUE).getAsString();
            }
            dropDownMap.put(key, value);
        }
    }

    private String getDomain(String endPoint) throws MalformedURLException {
        if (StringUtils.isNotBlank(endPoint)) {
            URL url = new URL(endPoint);
            return url.getProtocol() + HOST_DOMAIN_SEPARATOR + url.getHost();
        } else {
            return StringUtils.EMPTY;
        }
    }

    @Override
    public void constructDataSource(SlingHttpServletRequest request, ResourceResolver resolver,
            Map<String, String> dropDownMap) {

        DataSource ds = new SimpleDataSource(new TransformIterator<>(dropDownMap.keySet().iterator(), dropValue -> {
            ValueMap vm = new ValueMapDecorator(new HashMap<>());
            vm.put(DROPDOWN_VALUE, dropValue);
            vm.put(DROPDOWN_TEXT, dropDownMap.get(dropValue));
            return new ValueMapResource(resolver, new ResourceMetadata(), JcrConstants.NT_UNSTRUCTURED, vm);

        }));
        request.setAttribute(DataSource.class.getName(), ds);
    }
}
