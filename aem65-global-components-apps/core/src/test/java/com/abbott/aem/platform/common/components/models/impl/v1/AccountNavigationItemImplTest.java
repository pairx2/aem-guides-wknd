package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.AccountNavigationItem;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(AemContextExtension.class)
class AccountNavigationItemImplTest {

    private final AemContext ctx = new AemContext();
    private AccountNavigationItem accountNavigationItem;
    private Page page;


    @BeforeEach
    public void setUp() throws Exception {
        page = ctx.create().page("/content/abbott");
        Map<String, Object> properties = new HashMap<>();
        properties.put("jcr:primaryType", "nt:unstructured");
        properties.put("icon", "icon");
        properties.put("linkText", "linkText");
        properties.put("linkPath", "/content/abbott");
        properties.put("actionFunction", "actionFunction");
        properties.put("customerAttr", "customerAttr");
        Resource resource = ctx.create().resource(page, "/content/item", properties);
        accountNavigationItem = resource.adaptTo(AccountNavigationItem.class);

    }
    @Test
    void testGetAccountNavigationItem() {
        assertEquals("icon", accountNavigationItem.getIcon() );
        assertEquals("linkText", accountNavigationItem.getLinkText() );
        assertEquals("/content/abbott", accountNavigationItem.getLinkPath());
        assertEquals("actionFunction", accountNavigationItem.getActionFunction());
        assertEquals("customerAttr", accountNavigationItem.getCustomerAttr());
    }

    @ParameterizedTest
    @CsvSource({
            "/content/abbott, m-account-navigation__item--active",
            "/content/abbott/some/subpath, m-account-navigation__item--active",
            "/content, m-account-navigation__item--active"
    })
    void testSetActiveCss(String pagePath, String expectedCssClass) {
        accountNavigationItem.setActiveCss(pagePath);
        assertEquals(expectedCssClass, accountNavigationItem.getActiveCss());
        if ("null".equals(expectedCssClass)) {
            assertNull(accountNavigationItem.getActiveCss());
        } else {
            assertEquals(expectedCssClass, accountNavigationItem.getActiveCss());
        }
    }
}
