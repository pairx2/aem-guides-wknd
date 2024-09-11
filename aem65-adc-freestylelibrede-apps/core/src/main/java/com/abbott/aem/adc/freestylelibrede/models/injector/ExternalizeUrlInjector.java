package com.abbott.aem.adc.freestylelibrede.models.injector;

import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Type;
import java.net.URISyntaxException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.spi.DisposalCallbackRegistry;
import org.apache.sling.models.spi.Injector;
import org.apache.sling.models.spi.injectorspecific.AbstractInjectAnnotationProcessor2;
import org.apache.sling.models.spi.injectorspecific.InjectAnnotationProcessor2;
import org.apache.sling.models.spi.injectorspecific.StaticInjectAnnotationProcessorFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.ExternalizeRelativeUrl;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

@Component
public class ExternalizeUrlInjector implements Injector, StaticInjectAnnotationProcessorFactory {


    private static final Logger LOGGER = LoggerFactory.getLogger(ExternalizeUrlInjector.class);

    @Reference
    ExternalizerService externalizerService;

    @Override
    public String getName() {
        return "externalizerelativeurl";
    }

    @Override
    public Object getValue(final Object adaptable,
                           final String fieldName,
                           final Type type,
                           final AnnotatedElement annotatedElement,
                           final DisposalCallbackRegistry disposalCallbackRegistry) {

        if (adaptable instanceof Resource) {
            LOGGER.debug("adapting from Resource");
            final Resource resource = (Resource) adaptable;

            final ExternalizeRelativeUrl annotation = annotatedElement.getAnnotation(ExternalizeRelativeUrl.class);

            if(annotation == null){
                LOGGER.debug("annotation not found}");
                return null;
            }



            final String parameterName =  (StringUtils.isNotBlank(annotation.name()))? annotation.name() : fieldName;

            return getValue(resource,StringUtils.defaultString(parameterName, fieldName));
        }
        LOGGER.debug("adaptable not supported: {}",adaptable.getClass());
        return null;
    }


    private Object getValue(final Resource resource, final String fieldName){
        String parameterValue = resource.getValueMap().get(fieldName,"");
        if (StringUtils.isBlank(parameterValue)) {
            LOGGER.debug("parameterValue not found for field {}",fieldName);
            return null;
        }

        return externalizerService.externalizeIfNecessaryRelativeUrl(parameterValue,resource.getResourceResolver());
    }

    @Override
    public InjectAnnotationProcessor2 createAnnotationProcessor(final AnnotatedElement element) {

        // check if the element has the expected annotation
    	ExternalizeRelativeUrl annotation = element.getAnnotation(ExternalizeRelativeUrl.class);
        if (annotation != null) {
            return new ExternalizeAnnotationProcessor(annotation);
        }

        LOGGER.debug("annotation not found on element");
        return null;
    }

    private static class ExternalizeAnnotationProcessor extends AbstractInjectAnnotationProcessor2 {

        private final ExternalizeRelativeUrl annotation;

        ExternalizeAnnotationProcessor(ExternalizeRelativeUrl annotation) {
            this.annotation = annotation;
        }

        @Override
        public Boolean isOptional() {
            return annotation.optional();
        }
    }
}
