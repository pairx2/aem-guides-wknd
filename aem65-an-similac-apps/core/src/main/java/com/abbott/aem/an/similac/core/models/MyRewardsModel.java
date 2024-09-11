package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.MyRewardsBean;
import com.google.gson.GsonBuilder;

/**
 * MyRewardsModel is the SlingModel to hold the details of My Rewards component
 * 
 * 
 * @author Cognizant
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MyRewardsModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(MyRewardsModel.class);
	
    private static final String ACTION_PATH = "actionPath";

    private static final String CURRENT_POINTS = "currentPoints";

    private static final String NEXT_POINTS = "nextPoints";

    private static final String REWARDS_CHART = "rewardsChart";
    
    private static final String NEW_USER_MSG = "newUserMessage";

	private static final String HOW_TO_EARN_TEXT = "howToEarnText";

	private static final String HOW_TO_EARN_LINK = "howToEarnLink";

	private static final String HOW_TO_EARN_ICON = "howToEarnIcon";

	@Inject
	private Resource resource;

	private MyRewardsBean myRewardsBean;

	private String rewardsJson;

	private ValueMap componentProp;

	@PostConstruct
	public void activate() {
		if (resource != null) {
			generateRewardData();
		}
	}

	/**
	 * Populate my rewards Details
	 * 
	 * @throws Exception
	 */
	private void generateRewardData() {
		try {
			componentProp = resource.adaptTo(ValueMap.class);
			myRewardsBean = new MyRewardsBean();
			if (componentProp != null) {
				myRewardsBean.setActionPath(componentProp.get(ACTION_PATH, String.class));
				myRewardsBean.setCurrentPoints(componentProp.get(CURRENT_POINTS, String.class));
				myRewardsBean.setNextPoints(componentProp.get(NEXT_POINTS, String.class));
				myRewardsBean.setRewardsChart(componentProp.get(REWARDS_CHART, String.class));
				myRewardsBean.setNewUserMessage(componentProp.get(NEW_USER_MSG, String.class));
				myRewardsBean.setHowToEarnText(componentProp.get(HOW_TO_EARN_TEXT, String.class));
				myRewardsBean.setHowToEarnLink(componentProp.get(HOW_TO_EARN_LINK, String.class));
				myRewardsBean.setHowToEarnIcon(componentProp.get(HOW_TO_EARN_ICON, String.class));

			}
		} catch (RuntimeException e) {
			LOGGER.error("Exception in generateRewardData ::",e);
		}
	}

	/**
	 * This method will return the my rewards Component details as Json string
	 * 
	 * @return String
	 */
	public String getRewardsJson() {
		if (myRewardsBean != null) {
			rewardsJson = new GsonBuilder().create().toJson(myRewardsBean);
		}
		return rewardsJson;
	}

	public MyRewardsBean geMyRewardsBean() {
		return myRewardsBean;
	}

	public ValueMap getComponentProp() {
		return componentProp;
	}

}
