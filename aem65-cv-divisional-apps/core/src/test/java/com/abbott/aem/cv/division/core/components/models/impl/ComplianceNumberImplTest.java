package com.abbott.aem.cv.division.core.components.models.impl;


import com.abbott.aem.cv.division.core.components.models.ComplianceNumber;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;



import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(AemContextExtension.class)
class ComplianceNumberImplTest {

    private final AemContext ctx = new AemContext();
    private static final String PATH = "/content/ComplianceNumber";

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(ComplianceNumber.class);
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/ComplianceNumberImplTest.json", "/content");
    }

    @Test
    void getComplianceValue() {
        final String expected = "MAT-2000475 v9.0";
        ctx.currentResource(PATH);
        ComplianceNumber compliancevalue = ctx.request().adaptTo(ComplianceNumber.class);
        String actual = compliancevalue.getComplianceValue();
        assertEquals(expected, actual);
    }

}
