package com.abbott.aem.adc.freestylelibrede.services.impl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.adc.freestylelibrede.services.SickFundService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class SickFundServiceImplTest {

    public final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);

    SickFundService sickFundService = new SickFundServiceImpl();

    @Test
    void listSickFundDocuments() {

        Resource sickFundResource = context.load().json("/services/SickFundService/sickfund.json","/content/dam/sickfund");

        List<SickFundService.SickFundDocument> sickFunds = sickFundService.listSickFundDocuments(sickFundResource);

        Assert.assertNotNull(sickFunds);
        Assert.assertFalse(sickFunds.isEmpty());

        SickFundService.SickFundDocument germanDoc = sickFunds.get(0);
        Assert.assertEquals("de",germanDoc.getLanguage());
        Assert.assertEquals("/content/dam/sickfund/FSL2Reader1.png",germanDoc.getPath());

        SickFundService.SickFundDocument englishDoc = sickFunds.get(1);
        Assert.assertEquals("en",englishDoc.getLanguage());
        Assert.assertEquals("/content/dam/sickfund/FSL2Reader.png",englishDoc.getPath());

        SickFundService.SickFundDocument turkishDoc = sickFunds.get(2);
        Assert.assertEquals("tr",turkishDoc.getLanguage());
        Assert.assertEquals("/content/dam/sickfund/FSL2Reader2.png",turkishDoc.getPath());
    }
}