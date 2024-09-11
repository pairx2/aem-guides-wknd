package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.AbstractListItem;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class AbstractListItemImplTest {
    private final AemContext ctx = new AemContext();
    private Page page;
    private AbstractListItem AbstractListItem;
    @BeforeEach
    public void setUp() throws Exception {
        page = ctx.create().page("/content/abbott");
        Map<String, Object> properties = new HashMap<>();
        properties.put("jcr:primaryType", "nt:unstructured");
        properties.put("title", "first title");
        properties.put("value", "first");
        Resource resource = ctx.create().resource(page, "item", properties);

        AbstractListItem = resource.adaptTo(AbstractListItem.class);
    }

    @Test
    void testGetLink() {

        assertEquals("first title", AbstractListItem.getTitle());
        assertEquals("first", AbstractListItem.getValue());

    }

}