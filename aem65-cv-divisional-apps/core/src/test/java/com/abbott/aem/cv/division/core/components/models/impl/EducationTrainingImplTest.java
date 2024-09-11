package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.EducationTraining;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(AemContextExtension.class)
class EducationTrainingImplTest {

    private final AemContext ctx = new AemContext();
    private static final String PATH = "/content/EducationTraining";

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(EducationTraining.class);
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/EducationTrainingImplTest.json", "/content");
    }

    @Test
    void getPathField() {
        final String expected = "text";
        ctx.currentResource(PATH);
        EducationTraining educationTraining = ctx.request().adaptTo(EducationTraining.class);
        String actual = educationTraining.getPathField();
        assertEquals(expected, actual);
    }

    @Test
    void getWidth() {
        final String expected = "1440";
        ctx.currentResource(PATH);
        EducationTraining educationTraining = ctx.request().adaptTo(EducationTraining.class);
        String actual = educationTraining.getWidth();
        assertEquals(expected, actual);
    }

    @Test
    void getHeight() {
        final String expected = "910";
        ctx.currentResource(PATH);
        EducationTraining educationTraining = ctx.request().adaptTo(EducationTraining.class);
        String actual = educationTraining.getHeight();
        assertEquals(expected, actual);
    }
}
