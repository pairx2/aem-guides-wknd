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
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
public class SubscriptionCalcultorMonthTest {
    Map<String, Object> properties;
    private SubscriptionCalcultorMonth subscriptionCalcultorMonth;

    String monthNum = "monthNum";
    String savings = "savings";
    Boolean conditionApply = true;

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page("/content/abbott/en");
        properties = new HashMap<>();
        properties.put("monthNum", monthNum);
        properties.put("savings", savings);
        properties.put("conditionApply",conditionApply);

        Resource resource = context.create().resource(page, "test", properties);
        subscriptionCalcultorMonth = resource.adaptTo(SubscriptionCalcultorMonth.class);
    }

    @Test
    public void testGetMonth() {
        assertEquals(monthNum, subscriptionCalcultorMonth.getMonthNum());
    }

    @Test
    public void testGetSavings() {
        assertEquals(savings, subscriptionCalcultorMonth.getSavings());
    }

    @Test
    public void testGetConditionsApply() {
        assertTrue(subscriptionCalcultorMonth.getConditionApply());
    }


}
