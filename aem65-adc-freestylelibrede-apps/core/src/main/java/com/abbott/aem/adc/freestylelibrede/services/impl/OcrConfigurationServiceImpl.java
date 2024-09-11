package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.services.OCRConfigurationService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@Component(
        service = OCRConfigurationService.class,
        immediate = true,
        configurationPolicy = ConfigurationPolicy.REQUIRE
)
@Designate(ocd = OcrConfigurationServiceImpl.Configuration.class)
public class OcrConfigurationServiceImpl implements OCRConfigurationService {
    private String endpoint;

    @Activate
    public void init(Configuration configuration) {
        endpoint = configuration.ocr_endpoint();
    }

    @Override
    public String getEndpoint() {
        return endpoint;
    }

    @SuppressWarnings("squid:S00100")
    @ObjectClassDefinition(name = "ADC Freestyle Libre DE - OCR Configuration Service")
    protected static @interface Configuration {
        @AttributeDefinition(
                name = "OCR Endpoint"
        )
        String ocr_endpoint() default "http://localhost:4502";
    }
}
