package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class MagentoProductCategoriesTest {

    ArrayList<String> value1 = new ArrayList<String>();
    MagentoProductCategories magentoProductCategories;

    @BeforeEach
    void setUp() {
        value1.add("test");
        value1.add("val2");

        MagentoProductCategories.CustomAttribute customAttribute = new MagentoProductCategories.CustomAttribute("category_ids", value1);
        MagentoProductCategories.CustomAttribute[] customAttributes = {customAttribute};
        magentoProductCategories = new MagentoProductCategories(1L, "12345", "name", customAttributes);
    }

    @Test
    void getCategoryIds() {
        assertNotNull(magentoProductCategories.getCategoryIds());
    }
}