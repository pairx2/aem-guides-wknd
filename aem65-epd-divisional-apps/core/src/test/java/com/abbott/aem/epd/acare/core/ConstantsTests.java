package com.abbott.aem.epd.acare.core;

import com.abbott.aem.epd.acare.core.constants.Constants;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

public class ConstantsTests {

    @Mock
    Constants constants;

    @Test
    public void testEmptyString(){
        assertEquals("", Constants.EMPTY_STRING);
    }

    @Test
    public void testHttp(){
        assertEquals("http://",constants.HTTP);
    }

    @Test
    public void testPrivateConstructor() throws NoSuchMethodException {
        // Use reflection to access the private constructor
        Constructor<Constants> constructor = Constants.class.getDeclaredConstructor();
        constructor.setAccessible(true);

        try {
            // Attempt to create an instance using the private constructor
            constructor.newInstance();
            // If the above line passes without throwing an exception, fail the test
            fail("Expected exception not thrown");
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
            // Catch the expected exception (IllegalStateException) thrown by the private constructor
            // If you want to do more specific checks, you can inspect the exception message or type
            assertEquals("Constants", e.getCause().getMessage());
        }
    }


}
