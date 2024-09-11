package com.abbott.aem.adc.division.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WizardStepperTest {

  private final AemContext aemContext = new AemContext();

  @Mock
  private List<Resource> mockSteps;

  @BeforeEach
  public void setup() {
    aemContext.addModelsForClasses(WizardStepper.class);
  }
  
  @Test
  void testgetSteps() {
    MockitoAnnotations.initMocks(this);
    WizardStepper wizardStepper = new WizardStepper();
    wizardStepper.steps = mockSteps;
    List<Resource> actualSteps = wizardStepper.getSteps();
    assertEquals(mockSteps, actualSteps);
  }

}

