package com.abbott.aem.an.abbottstore.models;

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

@ExtendWith(AemContextExtension.class)
public class SubscriptionCalcultorTest {
    Map<String, Object> properties;
    private SubscriptionCalcultor subscriptionCalcultor;

    String title = "title";
    String subTitle = "sub title";

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page("/content/abbott/en");
        properties = new HashMap<>();
        properties.put("title", title);
        properties.put("subTitle", subTitle);
        properties.put("monthlySavings","monthlySavings");

        Resource resource = context.create().resource(page, "test", properties);
        subscriptionCalcultor = resource.adaptTo(SubscriptionCalcultor.class);
    }

    @Test
    public void testGetTitle() {
        assertEquals(title, subscriptionCalcultor.getTitle());
    }

    @Test
    public void testGetSubTitle() {
        assertEquals(subTitle, subscriptionCalcultor.getSubTitle());
    }

    @Test
    public void testGetMonthlySavings(){
        assertEquals(0,subscriptionCalcultor.getMonthlySavings().size());
    }
}
