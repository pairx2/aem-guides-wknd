package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.PPCConfig;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import java.util.ArrayList;
import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = PPCConfig.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = PPCConfigImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PPCConfigImpl implements PPCConfig {

    static final String RESOURCE_TYPE = "ardx/division/components/content/ppcconfig";

    private static final String CLASS_NAME_PROP = "cssClassName";
    private static final String ID_NAME_PROP = "elementIdName";

    @ChildResource
    @Setter(AccessLevel.NONE)
    private List<Resource> idLists;

    @ChildResource
    @Setter(AccessLevel.NONE)
    private List<Resource> classLists;

    @Override
    public List<String> getElementIdNames() {
        List<String> idNames = new ArrayList<>();
        for (Resource res : idLists) {
            ValueMap properties = res.adaptTo(ValueMap.class);
            idNames.add(PlatformUtil.getPropertyValue(properties, ID_NAME_PROP));
        }
        return idNames;
    }

    @Override
    public List<String> getCssClassNames() {
        List<String> classNames = new ArrayList<>();
        for (Resource res : classLists) {
            ValueMap properties = res.adaptTo(ValueMap.class);
            classNames.add(PlatformUtil.getPropertyValue(properties, CLASS_NAME_PROP));
        }
        return classNames;
    }
}