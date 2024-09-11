package com.abbott.aem.adc.division.models.injector.annotation;

import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.spi.injectorspecific.InjectAnnotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@InjectAnnotation
@Source("externalize")
public @interface Externalize {
        boolean optional() default false;
        String name() default "";
}
