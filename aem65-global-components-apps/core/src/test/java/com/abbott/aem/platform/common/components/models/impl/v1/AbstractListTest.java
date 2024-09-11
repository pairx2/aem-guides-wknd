package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import com.abbott.aem.platform.common.components.models.AbstractList;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class AbstractListTest {

    private final AemContext context = new AemContext();
    private final AemContext context2 = new AemContext();
    private AbstractList abstractListFilled;
    private AbstractList abstractListEmpty;
    private Page currentPage;
    private ProxyComponentService proxyComponentService;
    private Component component;

    @BeforeEach
    void setup() {
    	proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		context.registerService(ProxyComponentService.class, proxyComponentService);
        context.addModelsForClasses(AbstractListImpl.class);
        context.load().json(
                "/com/abbott/aem/platform/common/components/models/impl/v1/AbstractListImplTest.json",
                "/content"
        );
        context2.registerService(ProxyComponentService.class, proxyComponentService);
        context2.addModelsForClasses(AbstractListImpl.class);
        context2.load().json(
                "/com/abbott/aem/platform/common/components/models/impl/v1/AbstractListImplTest2.json",
                "/content"
        );
        abstractListFilled = context.currentResource("/content/abstractList").adaptTo(AbstractList.class);
        abstractListEmpty = context2.currentResource("/content/abstractListEmpty").adaptTo(AbstractList.class);
        currentPage = Mockito.mock(Page.class);
        context.currentPage(currentPage);
        context2.currentPage(currentPage);
    }

    @Test
    void isAdaptedFromResourceType() {
        Assertions.assertNotNull(abstractListFilled);
    }

    @Test
    void returnsManualDataAsJson() {
        String expected = "[{\"title\":\"first title\",\"value\":\"first\"},{\"title\":\"second title\",\"value\":\"sec value\"}]";
        Assertions.assertNotNull(abstractListFilled.getManualData());
        Assertions.assertEquals(expected, abstractListFilled.getManualData());
    }

    @Test
    void returnsManualDataAsJson_emptyArrayIfNoData() {
        String expected = "[]";
        Assertions.assertNotNull(abstractListEmpty.getManualData());
        Assertions.assertEquals(expected, abstractListEmpty.getManualData());
    }

    @Test
    void returnProperHeading() {
        Assertions.assertEquals("Our title:", abstractListFilled.getHeadingTitle());
    }

    @Test
    void returnProperHeading_defaultIfEmpty() {
        Assertions.assertEquals(StringUtils.EMPTY, abstractListEmpty.getHeadingTitle());
    }

	@Test
	void testGetFunctionToCall() {
		final String EXPECTED_GET_FUNCTION_TO_CALL = "check";
	
		context.currentResource("/content/abstractList");
		AbstractList abstractList = context.request().adaptTo(AbstractList.class);
		String actual = abstractList.getFunctionToCall();
		assertEquals(EXPECTED_GET_FUNCTION_TO_CALL, actual);
	
		final String EXPECTED_GET_FUNCTION_TO_CALL_WHEN_NULL_INPUT = "";
		context2.currentResource("/content/abstractListEmpty");
		AbstractList abstractList2 = context2.request().adaptTo(AbstractList.class);
		String actual2 = abstractList2.getFunctionToCall();
		assertEquals(EXPECTED_GET_FUNCTION_TO_CALL_WHEN_NULL_INPUT, actual2);
	
	}


}
