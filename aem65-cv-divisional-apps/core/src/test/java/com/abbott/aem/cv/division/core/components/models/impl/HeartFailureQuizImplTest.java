package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.cv.division.core.components.models.HeartFailureQuiz;
import org.mockito.Mockito;

@ExtendWith(AemContextExtension.class)
class HeartFailureQuizImplTest {

	private final AemContext ctx = new AemContext();
	private static final String PATH = "/content/hfQuizTextList";
    private ProxyComponentService proxyComponentService;
    private com.day.cq.wcm.api.components.Component component;

	@BeforeEach
	public void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(com.day.cq.wcm.api.components.Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("TestCase");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);

		ctx.addModelsForClasses(HeartFailureQuiz.class );
		ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/HeartFailureQuizImplTest.json", "/content");
	}

    @Test
    void getTypeOfPage() {
        final String expected = "question";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getTypeOfPage();
        assertEquals(expected, actual);
    }

    @Test
    void getResults1() {
        final String expected = "https://www.abbott.co.in/";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getResults1();
        assertEquals(expected, actual);
    }

    @Test
    void getResults2() {
        final String expected = "https://www.abbott.co.in/";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getResults2();
        assertEquals(expected, actual);
    }

    @Test
    void getComponentId() {
        final String expected = "id-123";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getComponentId();
        assertEquals(expected, actual);
    }

    @Test
    void getTopmargin() {
        final String expected = "true";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getTopmargin();
        assertEquals(expected, actual);
    }

    @Test
    void getBottommargin() {
        final String expected = "true";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getBottommargin();
        assertEquals(expected, actual);
    }

    @Test
    void getButton1Label() {
        final String expected = "label1";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getButton1Label();
        assertEquals(expected, actual);
    }

    @Test
    void getButton2Label() {
        final String expected = "label2";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getButton2Label();
        assertEquals(expected, actual);
    }

    @Test
    void getButton3Label() {
        final String expected = "label3";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getButton3Label();
        assertEquals(expected, actual);
    }

    @Test
    void getPreviousLabel() {
        final String expected = "previous";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getPreviousLabel();
        assertEquals(expected, actual);
    }

    @Test
    void getNextLabel() {
        final String expected = "next";
        ctx.currentResource(PATH);
        HeartFailureQuiz heartFailureQuiz = ctx.request().adaptTo(HeartFailureQuiz.class);
        String actual = heartFailureQuiz.getNextLabel();
        assertEquals(expected, actual);
    }
}