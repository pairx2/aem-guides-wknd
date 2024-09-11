package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.abbott.aem.platform.common.components.models.SearchKeyword;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.TopSearchList;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

@ExtendWith(AemContextExtension.class)
class TopSearchListImplTest {

	private static final String PATH = "/content/topsearchlist";
	private final AemContext ctx = new AemContext();

	@Mock
	private List<SearchKeyword> mocksearchKeywords;

	@BeforeEach
	void setUp() throws Exception {
		ctx.addModelsForClasses(TopSearchListImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TopSearchListImplTest.json", "/content");
	}

	@Test
	void testGetHeadline() {
		ctx.currentResource(TopSearchListImplTest.PATH);
		TopSearchList topSearchList = ctx.request().adaptTo(TopSearchList.class);
		assertNotNull(topSearchList.getHeadline());
		assertEquals("Top Search Results", topSearchList.getHeadline());
	}

	@Test
	void testgetSearchKeywords() {
		MockitoAnnotations.initMocks(this);
		TopSearchListImpl topSearchListImpl = new TopSearchListImpl();
		topSearchListImpl.searchKeywords = mocksearchKeywords;
		List<SearchKeyword> actualGatewayBannerPanel = topSearchListImpl.getSearchKeywords();
		assertEquals(mocksearchKeywords, actualGatewayBannerPanel);
	}


}