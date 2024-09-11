package com.abbott.aem.cloud.platform.core.errorpagehandler.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StringLengthComparatorTest {

    private StringLengthComparator comparator;

    @BeforeEach
    void setUp() {
        comparator = new StringLengthComparator();
    }

    @Test
    void testCompare() {
        // Test when the first string is longer than the second
        assertEquals(-1, comparator.compare("abc", "ab"));

        // Test when the second string is longer than the first
        assertEquals(1, comparator.compare("ab", "abc"));

        // Test when both strings have the same length and are equal
        assertEquals(0, comparator.compare("abc", "abc"));

        // Test when both strings have the same length but are different alphabetically
        assertEquals(-23, comparator.compare("abc", "xyz"));
        assertEquals(23, comparator.compare("xyz", "abc"));

        // Test when one of the strings is empty
        assertEquals(1, comparator.compare("", "abc"));
        assertEquals(-1, comparator.compare("abc", ""));

        // Test when both strings are empty
        assertEquals(0, comparator.compare("", ""));
    }

    @Test
    void testCompareWithNullStrings() {
        // Test when both strings are null
        assertEquals(0, comparator.compare(null, null));

        // Test when the first string is null
        assertEquals(1, comparator.compare(null, "abc"));

        // Test when the second string is null
        assertEquals(-1, comparator.compare("abc", null));
    }

    @Test
    void testSortList() {
        List<String> inputList = Arrays.asList("abc", "ab", "xyz", "test", "");
        List<String> expectedList = Arrays.asList("test", "abc", "xyz", "ab", "");

        inputList.sort(comparator);

        assertEquals(expectedList, inputList);
    }
}
