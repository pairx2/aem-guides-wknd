package com.abbott.aem.adc.freestylelibrede.models.injector;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.ComponentPath;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.spi.DisposalCallbackRegistry;
import org.apache.sling.models.spi.Injector;
import org.apache.sling.models.spi.injectorspecific.AbstractInjectAnnotationProcessor2;
import org.apache.sling.models.spi.injectorspecific.InjectAnnotationProcessor2;
import org.apache.sling.models.spi.injectorspecific.StaticInjectAnnotationProcessorFactory;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Type;

@Component
public class ComponentPathInjector implements Injector, StaticInjectAnnotationProcessorFactory {

    private static final Logger LOG = LoggerFactory.getLogger(ComponentPathInjector.class);
    private static final String ANNOTATION_NOT_FOUND = "Annotation @ComponentPath not found";
    private static final String ANNOTATION_FOUND = "Annotation @ComponentPath found";

    @Override
    public String getName() {
        return "component-path";
    }

    @Override
    public Object getValue(final Object adaptable,
                           final String fieldName,
                           final Type type,
                           final AnnotatedElement annotatedElement,
                           final DisposalCallbackRegistry disposalCallbackRegistry) {

        if (adaptable instanceof Resource) {
            ComponentPath annotation = annotatedElement.getAnnotation(ComponentPath.class);
            if (annotation == null) {
                LOG.debug(ANNOTATION_NOT_FOUND);
                return null;
            }
            LOG.debug("Annotation found");
            return ((Resource) adaptable).getPath();
        }
        LOG.debug("Not a Resource");
        return null;
    }

    @Override
    public InjectAnnotationProcessor2 createAnnotationProcessor(final AnnotatedElement element) {

        ComponentPath annotation = element.getAnnotation(ComponentPath.class);
        if (annotation != null) {
            LOG.debug(ANNOTATION_FOUND);
            return new ComponentPathAnnotationProcessor(annotation);
        }
        LOG.debug(ANNOTATION_NOT_FOUND);
        return null;
    }

    private static class ComponentPathAnnotationProcessor extends AbstractInjectAnnotationProcessor2 {

        private final ComponentPath annotation;

        ComponentPathAnnotationProcessor(ComponentPath annotation) {
            this.annotation = annotation;
        }

        @Override
        public Boolean isOptional() {
            return annotation.optional();
        }
    }
}
