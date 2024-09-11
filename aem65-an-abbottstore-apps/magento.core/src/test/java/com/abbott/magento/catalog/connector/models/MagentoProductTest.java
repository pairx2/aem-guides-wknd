package com.abbott.magento.catalog.connector.models;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({MockitoExtension.class, AemContextExtension.class})
class MagentoProductTest {

    ArrayList<String> value1 = new ArrayList<>();
    String[] type = {"type1", "type2"};
    String[] websiteIds = {"test", "test"};
    int[] configurableProductLinks = {1, 2};

    MagentoProduct magentoProduct;

    MagentoProduct.CustomAttribute attribute = new MagentoProduct.CustomAttribute("aw_sarp2_subscription_options", value1);
    MagentoProduct.CustomAttribute attribute1 = new MagentoProduct.CustomAttribute("image", value1);

    @BeforeEach
    void setUp() {
        value1.add("test");
        value1.add("val2");
        value1.add("image");
        MagentoProduct.MediaGalleryEntry[] mediaGalleryEntries = {new MagentoProduct.MediaGalleryEntry(1, "jpg",
                "file", "label", 100, true, type)};
        MagentoProduct.CustomAttribute[] customAttributes = {attribute, attribute1};
        MagentoProduct.Value[] values = {new MagentoProduct.Value(1)};
        MagentoProduct.CategoryLinks[] categoryLinks = {new MagentoProduct.CategoryLinks("position", "id")};
        MagentoProduct.ConfigurableProductOptions[] configurableProductOptions = {
                new MagentoProduct.ConfigurableProductOptions(1, 2, "label", "position", values)};
        MagentoProduct.ExtensionAttributes extensionAttributes =
                new MagentoProduct.ExtensionAttributes(websiteIds, categoryLinks, configurableProductOptions, configurableProductLinks);
        MagentoProduct.TierPrice[] tierPrices = {
                new MagentoProduct.TierPrice(1326589L, 2.00, 3.02, extensionAttributes)};
        MagentoProduct.ExtensionAttributes[] extensionAttributesArray = {extensionAttributes};
        MagentoProduct.ProductLink[] productLinks = {
                new MagentoProduct.ProductLink("12345", "linkType", "linkedProductSku",
                        "linkedProductType", extensionAttributesArray)};
        magentoProduct = new MagentoProduct(1L, "12345", "choco", 2L, "100", 3L,
                4l, "typeid", "createdAt", "updatedAt", productLinks, null,
                tierPrices, customAttributes, mediaGalleryEntries, extensionAttributes);
    }

    @Test
    void getBaseAttributes() {
        assertNotNull(magentoProduct.getBaseAttributes());
    }

    @Test
    void getCustomAttributes() {
        assertNotNull(magentoProduct.getCustomAttributes());
    }

    @Test
    void hasImage() {
        assertTrue(magentoProduct.hasImage());
    }

    @Test
    void getPrimaryImagePath() {
        assertNotNull(magentoProduct.getPrimaryImagePath());
    }

    @Test
    void getTierPrices() {
        assertNotNull(magentoProduct.getTierPrices());
    }

    @Test
    void getCategoryId() {
        assertEquals("id", magentoProduct.getCategoryId());
    }

    @Test
    void testToString() {
        assertNotNull(magentoProduct.toString());
    }
}