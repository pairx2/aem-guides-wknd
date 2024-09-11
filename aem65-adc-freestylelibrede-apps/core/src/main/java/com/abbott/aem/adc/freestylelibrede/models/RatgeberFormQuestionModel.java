package com.abbott.aem.adc.freestylelibrede.models;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class RatgeberFormQuestionModel {

	@Inject
	private String question;

	@Inject
	private String yesAnswerText;

	@Inject
	private String yesAnswerValue;

	@Inject
	private String noAnswerText;

	@Inject
	private String noAnswerValue;

	@Inject
	private List<Resource> answers = new ArrayList<>();
	@Getter
	@Setter
	private List<RatgeberFormAnswerModel> ansList = new ArrayList<>();

	public String getQuestion() {
		return question;
	}

	public String getYesAnswerText() {
		return yesAnswerText;
	}

	public String getYesAnswerValue() {
		return yesAnswerValue;
	}

	public String getNoAnswerText() {
		return noAnswerText;
	}

	public String getNoAnswerValue() {
		return noAnswerValue;
	}

	@PostConstruct
	protected void init() {
		if (null != answers && !answers.isEmpty()) {
			for (Resource resource : answers) {
				RatgeberFormAnswerModel ans = resource.adaptTo(RatgeberFormAnswerModel.class);
				ansList.add(ans);
			}
		}
	}

}