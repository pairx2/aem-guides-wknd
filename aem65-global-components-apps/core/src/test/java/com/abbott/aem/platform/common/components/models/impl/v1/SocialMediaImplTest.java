package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.SocialMedia;

import org.mockito.MockitoAnnotations;

@ExtendWith(AemContextExtension.class)
public class SocialMediaImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(SocialMediaImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SocialMediaImplTest.json", "/content/abbott");
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void testGetSocialMediaTitle() {
		final String expected = "FOOTER LINKS";
		ctx.currentResource("/content/abbott/social-media");
		SocialMedia socialMedia = ctx.request().adaptTo(SocialMedia.class);
		String actual = socialMedia.getSocialMediaTitle();
		assertEquals(expected, actual);
		assert socialMedia.getSocialMediaIcons().size() > 0;
	}

	@Test
	public void testIsEmpty() {
		ctx.currentResource("/content/abbott/empty");
		SocialMedia socialMedia = ctx.request().adaptTo(SocialMedia.class);
		assertTrue(socialMedia.isEmpty());

		SocialMedia obj1 = new SocialMediaImpl();
		SocialMedia obj2 = new SocialMediaImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

}
