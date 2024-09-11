package com.abbott.aem.cloud.platform.core.redirects.models;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreateApplyPromoteResponse {
	private Boolean status;
	private String message;
	private String state;
	private Integer errorCode;
	
}
