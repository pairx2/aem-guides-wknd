package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.CustomConfig;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class CustomConfigImplTest {

    private final AemContext aemContext = new AemContext();

    @BeforeEach
    public void setup() throws Exception {
        aemContext.addModelsForClasses(CustomConfigImpl.class);
        aemContext.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CustomConfigImplTest.json", "/content");
    }

    @Test
    void getId() {
        aemContext.currentResource("/content/config");
        CustomConfig customConfig = aemContext.request().adaptTo(CustomConfig.class);
        String actual = customConfig.getId();
        assertEquals("compid", actual);
    }

    @Test
    void getClassName() {
        aemContext.currentResource("/content/config");
        CustomConfig customConfig = aemContext.request().adaptTo(CustomConfig.class);
        String actual = customConfig.getClassName();
        assertEquals("compclass", actual);
    }
}