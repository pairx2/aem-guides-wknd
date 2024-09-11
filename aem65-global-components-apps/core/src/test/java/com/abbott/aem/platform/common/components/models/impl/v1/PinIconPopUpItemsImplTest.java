package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.PinIconPopUpItems;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class})
class PinIconPopUpItemsImplTest {

    private final AemContext ctx = new AemContext();
    private Page page;
    private Resource resource;
    public PinIconPopUpItems pinIconPopUpItems;

    @BeforeEach
    public void setUp() throws Exception {
        page = ctx.create().page("/content/abbott");
        Map<String, Object> properties = new HashMap<>();
        properties.put("sling:resourceType", "nt:unstructured");
        properties.put("pinIconPopUpKey", "key");
        properties.put("pinIconPopUpLabel", "label");
        Resource resource = ctx.create().resource(page, "item", properties);
        pinIconPopUpItems = resource.adaptTo(PinIconPopUpItems.class);
    }

    @Test
    void testGetPinIconPopUpItems() {
        assertEquals("key",pinIconPopUpItems.getPinIconPopUpKey() );
        assertEquals("label", pinIconPopUpItems.getPinIconPopUpLabel());
    }


}
