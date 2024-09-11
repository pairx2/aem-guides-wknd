package com.abbott.aem.an.division.core.components.models;

import com.abbott.aem.an.division.core.models.product.Flavor;
import com.day.cq.commons.jcr.JcrConstants;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class CalculatorSelectTest {

    private static final String RESOURCE_1 = "/content/an/ensure/language-master/esparami/quiero-ser-mas-saludabl";
    private final AemContext ctx = new AemContext();

    private CalculatorSelect calculatorSelect1;

    @BeforeEach
    public void setUp() throws Exception {
        ctx.addModelsForClasses(CalculatorSelect.class);
        ctx.load().json("/com/abbott/aem/an/division/core/components/models/calculatorSelect.json", RESOURCE_1);
        ctx.currentResource(RESOURCE_1);

        calculatorSelect1 = ctx.request().adaptTo(CalculatorSelect.class);

        assertTrue(calculatorSelect1 instanceof CalculatorSelect);
    }

    @Test
    void testGetCalculatorSelect() {
		String expected = "caloriecalculator";
        String actual = calculatorSelect1.getCalculatorTypeSelect();
        assertEquals(expected, actual);
    }

}