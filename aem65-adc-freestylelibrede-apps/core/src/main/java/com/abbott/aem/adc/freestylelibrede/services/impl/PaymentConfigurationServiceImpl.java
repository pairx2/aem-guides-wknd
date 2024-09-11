package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.services.PaymentConfigurationService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@Component(
        service = PaymentConfigurationService.class,
        immediate = true,
        configurationPolicy = ConfigurationPolicy.REQUIRE
)
@Designate(ocd = PaymentConfigurationServiceImpl.Configuration.class)
public class PaymentConfigurationServiceImpl implements PaymentConfigurationService {
    private String payonEndpoint;

    @Activate
    public void init(Configuration config){
        payonEndpoint = config.payon_endpoint();
    }

    @Override
    public String getPayonEndpoint() {
        return payonEndpoint;
    }

    @SuppressWarnings("squid:S00100")
    @ObjectClassDefinition(name = "ADC Freestyle Libre DE - Payment Configuration Service")
    protected static @interface Configuration {
        @AttributeDefinition(
                name = "Payon Endpoint"
        )
        String payon_endpoint() default "https://test.oppwa.com";
    }
}
