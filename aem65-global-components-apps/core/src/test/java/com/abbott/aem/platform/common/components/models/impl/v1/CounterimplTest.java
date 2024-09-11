package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Counter;
import com.day.cq.wcm.api.Page;

@ExtendWith(AemContextExtension.class)
class CounterimplTest {

	private final AemContext ctx = new AemContext();

	Page page;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(CounterImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CounterImplTest.json", "/content");

	}

	@Test
	void testGetCounter(){
		final int expected = 5;
		ctx.currentResource("/content/counter");
		Counter counter = ctx.request().adaptTo(Counter.class);
		int actual = counter.getCounterCount();
		assertEquals(expected, actual);
	}

}
