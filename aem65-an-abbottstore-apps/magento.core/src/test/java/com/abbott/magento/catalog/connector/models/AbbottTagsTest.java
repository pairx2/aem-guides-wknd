package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AbbottTagsTest {

    AbbottTags abbottTags;

    @BeforeEach
    @Test
    void setUp() {
        abbottTags = new AbbottTags(1L, 2L, 3L, "name", "desc", "title", "keyword", null, "url key");
    }
}