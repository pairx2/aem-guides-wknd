package com.abbott.aem.cloud.platform.core.redirects.models;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateRedirectRequest {
	
	private String action;
	private String pipelineId;
	private List<Rule> mappings;
	private String modifiedBy;
	
}
