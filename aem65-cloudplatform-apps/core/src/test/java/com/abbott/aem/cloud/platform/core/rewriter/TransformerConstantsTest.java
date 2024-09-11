package com.abbott.aem.cloud.platform.core.rewriter;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import static org.junit.jupiter.api.Assertions.assertThrows;

class TransformerConstantsTest {

    @Test
    void testConstructor() {
        assertThrows(InvocationTargetException.class, () -> {
            Constructor<TransformerConstants> constructor = TransformerConstants.class.getDeclaredConstructor();
            constructor.setAccessible(true);
            constructor.newInstance();
        });
    }
}
