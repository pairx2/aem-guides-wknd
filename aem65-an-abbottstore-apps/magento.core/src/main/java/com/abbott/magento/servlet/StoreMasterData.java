package com.abbott.magento.servlet;

import com.abbott.magento.services.ProductRootCatConfigService;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;
import com.day.crx.JcrConstants;
import org.apache.commons.collections4.iterators.TransformIterator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

@Component(service = Servlet.class, property = {
        SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
        SLING_SERVLET_PATHS + "=/bin/abbott/magento/storemasterdata"
})
/**
 * Servlet used to get the Master Data of Magento Store Configured and construct a datasource for Import 
 * Product Wizard.  
 */
public class StoreMasterData extends SlingAllMethodsServlet {

    private transient List<ProductRootCatConfigService> configurationList;
    private transient List<KeyValue> dropDownList;
    private static final Logger LOGGER = LoggerFactory.getLogger(StoreMasterData.class);
    @Override
    protected void doGet(final SlingHttpServletRequest req,
                         final SlingHttpServletResponse resp) throws ServletException, IOException {

        try {
            ResourceResolver resolver = req.getResourceResolver();
            populateCategoryMap();
            @SuppressWarnings("unchecked")
            DataSource ds =
                    new SimpleDataSource(new TransformIterator(
                            dropDownList.iterator(),
                            input -> {
                                KeyValue keyValue = (KeyValue) input;
                                ValueMap vm = new ValueMapDecorator(new HashMap<String, Object>());
                                vm.put("value", keyValue.key);
                                vm.put("text", keyValue.value);
                                return new ValueMapResource(
                                        resolver, new ResourceMetadata(),
                                        JcrConstants.NT_UNSTRUCTURED, vm);
                            }));
            req.setAttribute(DataSource.class.getName(), ds);

        } catch (Exception e) {
            LOGGER.error("Error in Get Drop Down Values- Get Store Master Data:{}", e.getMessage());
        }
    }
    @Reference(name = "configurationFactory", cardinality = ReferenceCardinality.MULTIPLE, policy = ReferencePolicy.DYNAMIC)
    public void bindConfigurationFactory(final ProductRootCatConfigService config) {
        if (configurationList == null) {
            configurationList = new ArrayList<>();
        }
        configurationList.add(config);
    }

    private void populateCategoryMap() {
        dropDownList = new ArrayList<>();
        for (ProductRootCatConfigService categoryConfig : configurationList) {
            dropDownList.add(new KeyValue(categoryConfig.getStoreName(), categoryConfig.getStoreName()));
        }
    }
    public void unbindConfigurationFactory(final ProductRootCatConfigService config) {
        if(configurationList!=null) {
            configurationList.remove(config);
        }
        if(dropDownList!=null) {
            dropDownList.clear();
        }
    }

    private class KeyValue {

        /**
         * key property.
         */
        private final String key;
        /**
         * value property.
         */
        private final String value;

        /**
         * constructor instance
         *
         * @param newKey   -
         * @param newValue -
         */
        private KeyValue(final String newKey, final String newValue) {
            this.key = newKey;
            this.value = newValue;
        }
    }
}