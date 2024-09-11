package com.abbott.aem.platform.search.core.utils;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.Calendar;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.platform.search.coveoconnector.core.utils.CoveoUtils;
import com.day.cq.dam.api.Asset;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

@ExtendWith(MockitoExtension.class)
class CoveoUtilsTest {

	@Mock
	Resource pageContent;

	@Mock
	Resource parent;

	@Mock
	Page page;

	@Mock
	Resource assetContent;

	Tag[] tags = new Tag[1];

	@Mock
	Tag tag;

	@Mock
	Asset asset;

	@Mock
	ResourceResolver resolver;

	@Mock
	TagManager tagManager;

	CoveoUtils utils;
	@BeforeEach
	void setup() {
		tags[0] = tag;
		utils = new CoveoUtils();
	}

	@Test
	void testgetPageTags() {
		when(pageContent.getParent()).thenReturn(parent);
		when(parent.adaptTo(Page.class)).thenReturn(page);
		when(page.getName()).thenReturn("page name");
		when(page.getTags()).thenReturn(tags);
		when(tag.getPath()).thenReturn("my tag");
		when(tag.getTitle()).thenReturn("Tag Title");
		CoveoUtils utils = new CoveoUtils();

		List<String> list = utils.getPageTags(pageContent, "my");
		assert (!list.isEmpty());
		assert (list.contains("Tag Title"));
	}

	@Test
	void testgetAssetTags() {
		when(assetContent.adaptTo(Asset.class)).thenReturn(asset);
		when(asset.getMetadata("cq:tags")).thenReturn(tags);
		when(assetContent.getResourceResolver()).thenReturn(resolver);
		when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(tag.toString()).thenReturn("my tag");
		when(tag.getPath()).thenReturn("my tag");
		when(tagManager.resolve(tag.toString())).thenReturn(tag);
		when(tag.getName()).thenReturn("TagName");
		

		List<String> list = utils.getAssetTags(assetContent, "my");
		assert (!list.isEmpty());
		assert (list.contains("TagName"));
	}
	
	@Test
	void testcoveoDate() {
		String dateStr = utils.coveoDate(Calendar.getInstance());
		assert(!dateStr.isEmpty());
	}
	
	@Test
	void testCurrentTimeStamp() {
		String dateStr= utils.getCurrentTimeStamp();
		assert (!dateStr.isEmpty());
	}
	
	@Test
	void testgetHttpConnection() throws IOException {
		HttpURLConnection conn = utils.getHttpConnection("http://localhost:4502");
		assert(conn !=null);
	}
	
	@Test
	void testisNotEmpty() {
		assert(utils.isNotEmpty("asfasf"));
	}
}
