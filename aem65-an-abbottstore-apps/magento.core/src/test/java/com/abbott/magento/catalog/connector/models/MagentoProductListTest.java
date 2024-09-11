package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class MagentoProductListTest {

    MagentoProductList magentoProductList = new MagentoProductList();
    MagentoProductList.SearchCriteria.FilterGroup filterGroup = new MagentoProductList.SearchCriteria.FilterGroup();
    MagentoProductList.SearchCriteria.FilterGroup[] filterGroups = {filterGroup};
    MagentoProductList.SearchCriteria searchCriteria = new MagentoProductList.SearchCriteria(filterGroups, 1L, 2L);
    MagentoProduct magentoProduct = new MagentoProduct(1L, "12345", "choco", 2L, "100", 3L, 4l, "typeid", "createdAt", "updatedAt", null, null, null, null, null, null);
    MagentoProduct[] items = {magentoProduct};

    @BeforeEach
    void setUp() {
        magentoProductList = new MagentoProductList(items, searchCriteria, 1l);
    }

    @Test
    void getItems() {
        magentoProductList.setItems(items);
        assertNotNull(magentoProductList.getItems());
    }

    @Test
    void getSearchCriteria() {
        magentoProductList.setSearchCriteria(searchCriteria);
        assertNotNull(magentoProductList.getSearchCriteria());
    }

    @Test
    void getTotalCount() {
        magentoProductList.setTotalCount(2L);
        assertEquals(2L, magentoProductList.getTotalCount());
    }

    @Test
    void isLast() {
        assertEquals(true, magentoProductList.isLast());
    }

    @Test
    void maxPages() {
        assertEquals(1, magentoProductList.maxPages());
    }

    @Test
    void getNextPage() {
        assertEquals(3, magentoProductList.getNextPage());
    }

    @Test
    void getProducts() {
        assertNotNull(magentoProductList.getProducts());
    }

    @Test
    void getItemMap() {
        assertNotNull(magentoProductList.getItemMap());
    }
}