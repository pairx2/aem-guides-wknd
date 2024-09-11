package com.abbott.aem.adc.freestylelibrede.models;

import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.Resource;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ProgressBarRequestModelTest extends BaseModelTest {
    private final AemContext context = new AemContext();

    ProgressBarRequestModel model;

    @Mock
    Page currentPage;

    @BeforeEach
    void setUp() {
//    	context.currentPage(currentPage);
//        Resource resource = loadResource("/com.abbott.aem.adc.freestylelibrede.models.ProgressBarModel.json","/content/progress-bar");
//        
//        when(currentPage.getPath()).thenReturn("/content/step2");
//
//        context.currentResource(resource);
//        model = resource.adaptTo(ProgressBarRequestModel.class);
    }

    @Test
    void getCurrentStep() {
        //Assert.assertEquals(2,model.getCurrentStep());
    }
}