package com.abbott.aem.adc.freestylelibrede.models.injector.annotation;

import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.spi.injectorspecific.InjectAnnotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@InjectAnnotation
@Source("component-path")
public @interface ComponentPath {
        boolean optional() default false;
}
