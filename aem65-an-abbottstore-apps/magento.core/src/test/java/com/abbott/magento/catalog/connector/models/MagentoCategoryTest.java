package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class MagentoCategoryTest {

    private final int one = 1;
    MagentoCategory[] childCategories;
    String[] value = {"val1", "val2"};

    MagentoCategory.CustomAttribute[] customAttributes = new MagentoCategory.CustomAttribute[0];
    MagentoCategory magentoCategory = new MagentoCategory(one, one, "choco", true, one, one, one, customAttributes, childCategories);

    @Test
    void getAttribute() {
        assertEquals("", magentoCategory.getAttribute("code"));
    }

    @Test
    void getAttributeValue() {
        MagentoCategory.CustomAttribute attribute = new MagentoCategory.CustomAttribute("code", value);
        assertNotNull(magentoCategory.getAttributeValue(attribute).isEmpty());
    }

    @Test
    void getPath() {
        magentoCategory.setPath("path");
        assertEquals("path", magentoCategory.getPath());
    }
}