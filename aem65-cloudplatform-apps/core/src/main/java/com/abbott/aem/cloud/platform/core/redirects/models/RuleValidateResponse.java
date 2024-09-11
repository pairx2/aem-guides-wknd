package com.abbott.aem.cloud.platform.core.redirects.models;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RuleValidateResponse {
	private int errorCode;
	private String message;
}
