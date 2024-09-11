package com.abbott.aem.an.abbottstore.models;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class SubscriptionDescriptionModelTest {

    @Test
    public void testGetSubscriptionInfo(AemContext context) {
        String Resource_type = "/content/abbott/en";
        context.load().json("/test-data.json",Resource_type);
        MockSlingHttpServletRequest request = context.request();

        Resource resource = context.resourceResolver().getResource(Resource_type);
        assert resource != null;
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        SubscriptionDescriptionModel subscriptionDescriptionModel = request.adaptTo(SubscriptionDescriptionModel.class);
        assert subscriptionDescriptionModel != null;
        assertEquals("subscription information", subscriptionDescriptionModel.getSubscriptionInfo());
    }

}
