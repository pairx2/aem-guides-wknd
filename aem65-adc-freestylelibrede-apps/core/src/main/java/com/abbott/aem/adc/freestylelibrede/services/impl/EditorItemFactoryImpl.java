package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.models.EditorItem;
import com.abbott.aem.adc.freestylelibrede.services.EditorItemFactory;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.osgi.service.component.annotations.Component;

@Component(service = EditorItemFactory.class)
public class EditorItemFactoryImpl implements EditorItemFactory {
    @Override
    public EditorItem build(SlingHttpServletRequest request, Resource resource) {
        return new EditorItem(request, resource);
    }
}
