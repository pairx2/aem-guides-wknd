package com.abbott.aem.ardx.division.core.components.pojo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class ArticleTagsItemImplTest {

    ArticleTagItem tagItem;

    @BeforeEach
    public void setUp() {

        tagItem = new ArticleTagItem();

    }

    @Test
    void testGetName() {

        tagItem.setName("hair-drug-testing");
        final String expected = "hair-drug-testing";
        String actual = tagItem.getName();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTitle() {

        tagItem.setTitle("hair-drug-testing");
        final String expected = "hair-drug-testing";
        String actual = tagItem.getTitle();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPath() {

        tagItem.setPath("ardx:toxicology/viewpoints/hair-drug-testing");
        final String expected = "ardx:toxicology/viewpoints/hair-drug-testing";
        String actual = tagItem.getPath();
        assertEquals(expected, actual);
    }

}
