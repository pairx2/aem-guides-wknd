package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.Layer;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class LayerImplTest {

    private final AemContext context = new AemContext();

    private Layer layer;

    @BeforeEach
    public void setUp() {
        context.create().resource("/content/layer",
                "fileReference", "fileReference");
        Resource resource = context.resourceResolver().getResource("/content/layer");
        layer = resource.adaptTo(Layer.class);
    }

    @Test
    void testSearchKeyword() {
        assertEquals("fileReference", layer.getFileReference());
    }
}
