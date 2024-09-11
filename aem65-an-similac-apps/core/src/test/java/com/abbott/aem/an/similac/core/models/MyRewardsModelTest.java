package com.abbott.aem.an.similac.core.models;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.beans.MyRewardsBean;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class MyRewardsModelTest {

	private static final String REWARDS_JSON = "/com/abbott/aem/an/similac/core/models/my-rewards.json";
	private static final String CONTENT_PATH = "/content";
	
	private MyRewardsModel myRewardsModel;
	private AemContext context;
	
	@BeforeEach
	void setUp()  {		
		context.load().json(REWARDS_JSON, CONTENT_PATH);
		context.addModelsForClasses(CartComponentModel.class);
	}

	@Test
	final void testMyRewardsJson() {
		context.currentResource(context.resourceResolver().getResource("/content/myRewards/jcr:content/my-rewards"));
		myRewardsModel = context.request().adaptTo(MyRewardsModel.class);
		MyRewardsBean myRewardsBean = myRewardsModel.geMyRewardsBean();
		validateRewardsDetails(myRewardsBean);
		Assertions.assertNotNull(myRewardsModel.getRewardsJson());
		Assertions.assertNotNull(myRewardsModel.getComponentProp());
		
	}

	private void validateRewardsDetails(MyRewardsBean rewardsBean) {
		Assertions.assertNotNull(rewardsBean);
		Assertions.assertNotNull(rewardsBean.getActionPath());
		Assertions.assertNotNull(rewardsBean.getCurrentPoints());
		Assertions.assertNotNull(rewardsBean.getNextPoints());
		Assertions.assertNotNull(rewardsBean.getRewardsChart());
		Assertions.assertNotNull(rewardsBean.getNewUserMessage());
		Assertions.assertNotNull(rewardsBean.getHowToEarnText());
		Assertions.assertNotNull(rewardsBean.getHowToEarnLink());
		Assertions.assertNotNull(rewardsBean.getHowToEarnIcon());

	}
		
	@Test
	final void testMyRewardsforEmptyResource() {
		context.currentResource(context.resourceResolver().getResource("/content/myRewards/jcr:content/emptyResource"));
		myRewardsModel = context.request().adaptTo(MyRewardsModel.class);
		MyRewardsBean myRewardsBean = myRewardsModel.geMyRewardsBean();
		Assertions.assertNull(myRewardsBean);
		Assertions.assertNull(myRewardsModel.getComponentProp());
		
	}
}
