package com.abbott.aem.cloud.platform.core.redirects.models;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ApplyPromoteRedirectRequest {
	private String action;
	private String pipelineId;
	private String modifiedBy;
}
