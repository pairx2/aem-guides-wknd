package com.abbott.aem.cloud.platform.core.util;

import com.google.gson.JsonObject;
import org.junit.jupiter.api.Test;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TypeUtilTest {

    @Test
    void testArrayToMap() {
        String[] array = {"key1", "value1", "key2", "value2"};
        Map<String, String> result = TypeUtil.arrayToMap(array);

        assertEquals("value1", result.get("key1"));
        assertEquals("value2", result.get("key2"));

        assertEquals(0, TypeUtil.arrayToMap(null).size());
    }

    @Test
    void testArrayToMapWithEmptyArray() {
        String[] array = {};
        Map<String, String> result = TypeUtil.arrayToMap(array);
        assertTrue(result.isEmpty());
    }

    @Test
    void testArrayToMapWithOddLengthArray() {
        String[] array = {"key1", "value1", "key2"};
        assertThrows(IllegalArgumentException.class, () -> TypeUtil.arrayToMap(array));
    }

    @Test
    void testToMap() {
        Map<String, Object> expectedMap = Map.of("key1", "value1", "key2", "value2");
        JsonObject jsonObject = mapToJsonObject(expectedMap);

        Map<String, Object> result = TypeUtil.toMap(jsonObject);

        assertEquals(expectedMap, result);
    }

    @Test
    void testGetType() {
        assertEquals(String.class, TypeUtil.getType("test"));

        assertEquals(Double.class, TypeUtil.getType(3.14));

        assertEquals(Long.class, TypeUtil.getType(42L));

        assertEquals(Boolean.class, TypeUtil.getType(true));

        assertEquals(Date.class, TypeUtil.getType("2023-09-19T10:15:30.123+02:00"));

        assertEquals(Calendar.class, TypeUtil.getType(Calendar.getInstance()));

        assertEquals(Date.class, TypeUtil.getType(Calendar.getInstance().getTime()));
    }

    @Test
    void testToObjectType() {
        assertEquals("test", TypeUtil.toObjectType("test", String.class));

        assertEquals(3.14, TypeUtil.toObjectType("3.14", Double.class));

        assertEquals(42L, TypeUtil.toObjectType("42", Long.class));

        assertEquals(true, TypeUtil.toObjectType("true", Boolean.class));

        assertEquals(false, TypeUtil.toObjectType("false", Boolean.class));

        Date date = TypeUtil.toObjectType("2023-09-19T10:15:30.123+02:00", Date.class);
        assertNotNull(date);
        assertEquals(Date.class, date.getClass());
    }

    @Test
    void testToObjectTypeWhenException() {
        assertEquals(null, TypeUtil.toObjectType("double", Double.class));

        assertEquals(null, TypeUtil.toObjectType("long", Long.class));

        assertEquals(null, TypeUtil.toObjectType("integer", Integer.class));
    }

    @Test
    void testToStringOverloaded() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String stringValue = "test";
        assertEquals(stringValue, TypeUtil.toString(stringValue, String.class));

        double doubleValue = 3.14;
        assertEquals("3.14", TypeUtil.toString(doubleValue, Double.class));

        long longValue = 42L;
        assertEquals("42", TypeUtil.toString(longValue, Long.class));

        boolean booleanValue = true;
        assertEquals("true", TypeUtil.toString(booleanValue, Boolean.class));

        Date dateValue = new Date(0);
        assertEquals(dateValue.toString(), TypeUtil.toString(dateValue, Date.class));

        Calendar calendarValue = Calendar.getInstance();
        assertEquals(calendarValue.getTime().toString(), TypeUtil.toString(calendarValue, Calendar.class));
    }

    @Test
    void testToStringOverloadedForObjectArray() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String stringValue = "test";
        assertEquals("[test]", TypeUtil.toString(new String[]{stringValue}, String[].class));

        assertEquals("[true]", TypeUtil.toString(new boolean[]{true}, boolean[].class));

        assertEquals("[98, 121, 116, 101]", TypeUtil.toString("byte".getBytes(), byte[].class));

        assertEquals("[10]", TypeUtil.toString(new short[]{10}, short[].class));

        assertEquals("[c, h, a, r]", TypeUtil.toString(new char[]{'c','h', 'a', 'r'}, char[].class));

        assertEquals("[100]", TypeUtil.toString(new int[]{100}, int[].class));

        assertEquals("[1000]", TypeUtil.toString(new long[]{1000}, long[].class));

        assertEquals("[1000.1]", TypeUtil.toString(new float[]{1000.1f}, float[].class));

        assertEquals("[10000.0]", TypeUtil.toString(new double[]{10000}, double[].class));

        assertEquals("[]", TypeUtil.toString(new Serializable[]{}));
    }

    @Test
    void testToString() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {

        assertEquals("null", TypeUtil.toString(null));

        String stringValue = "test";
        assertEquals(stringValue, TypeUtil.toString(stringValue));

        Date dateValue = new Date(0);
        assertEquals(dateValue.toString(), TypeUtil.toString(dateValue));

        Calendar calendarValue = Calendar.getInstance();
        assertEquals(calendarValue.getTime().toString(), TypeUtil.toString(calendarValue));

        double doubleValue = 3.14;
        assertEquals("3.14", TypeUtil.toString(doubleValue));

        long longValue = 42L;
        assertEquals("42", TypeUtil.toString(longValue));

        boolean booleanValue = true;
        assertEquals("true", TypeUtil.toString(booleanValue));
    }

    @Test
    void testToValueMap() {
        Map<String, String> map = new HashMap<>();
        map.put("key", "value");

        assertEquals(1, TypeUtil.toValueMap(map).size());
    }

    private JsonObject mapToJsonObject(Map<String, Object> map) {
        JsonObject jsonObject = new JsonObject();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            jsonObject.addProperty(entry.getKey(), entry.getValue().toString());
        }
        return jsonObject;
    }
}

