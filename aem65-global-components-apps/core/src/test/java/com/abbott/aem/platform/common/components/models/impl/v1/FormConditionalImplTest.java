package com.abbott.aem.platform.common.components.models.impl.v1;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.slf4j.Logger;
import com.abbott.aem.platform.common.components.models.CustomConditionalItem;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import java.util.List;

class FormConditionalImplTest {

    @Mock
    private List<Resource> itemResources;

    @Mock
    private Logger log;


    private FormConditionalImpl formConditional;

    @BeforeEach
    public void setup() {
        formConditional = new FormConditionalImpl();
    }

    @Test
    void testPopulateConditionalMappingWithNullResources() throws Exception {
        Field itemResourcesField = FormConditionalImpl.class.getDeclaredField("itemResources");
        itemResourcesField.setAccessible(true);
        itemResourcesField.set(formConditional, null);

        Method method = FormConditionalImpl.class.getDeclaredMethod("populateConditionalMapping");
        method.setAccessible(true);
        method.invoke(formConditional);

        Field conditionalItemsField = FormConditionalImpl.class.getDeclaredField("conditionalItems");
        conditionalItemsField.setAccessible(true);
        List<CustomConditionalItem> conditionalItems = (List<CustomConditionalItem>) conditionalItemsField.get(formConditional);

        assertNotNull(conditionalItems);
    }

    @Test
    void testIsDynamicWhenConditionalTypeIsVariableType() throws Exception {

        setPrivateField(formConditional, "conditionalType", "variable");

        boolean result = formConditional.isDynamic();

        assertTrue(result);
    }

    @Test
    void testIsDynamicWhenConditionalTypeIsNotVariableType() throws Exception {

        setPrivateField(formConditional, "conditionalType", "otherType");

        boolean result = formConditional.isDynamic();

        assertFalse(result);
    }

    private void setPrivateField(Object target, String fieldName, Object value) throws Exception {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
    }

    @Test
    void testGetConditionalItemsReturnsUnmodifiableList() {
        List<CustomConditionalItem> result = formConditional.getConditionalItems();
        assertThrows(UnsupportedOperationException.class, () -> {
            result.add(null);
        });
    }

    @Test
    void testGetConditionalJson() {
        String conditionalJson = formConditional.getConditionalJson();
        assertNotNull(conditionalJson);

        assertFalse(conditionalJson.equals("{}"));
    }

    @Test
    void testGetUniqueId() {
        String uniqueId = formConditional.getUniqueId();
        assertNotNull(uniqueId);
        assertTrue(uniqueId.startsWith("conditional-container_"));
    }

    @Test
    void testGetUniqueCheckboxId() {
        String uniqueCheckboxId = formConditional.getUniqueCheckboxId();
        assertNotNull(uniqueCheckboxId);
        assertTrue(uniqueCheckboxId.startsWith("checkbox_"));
    }

}