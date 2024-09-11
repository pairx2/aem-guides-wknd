package com.abbott.aem.cloud.platform.core.redirects.models;

import java.util.List;

import lombok.Data;

@Data
public class ImportRedirectRuleResponse {
	private Boolean status;
	private String message;
	private List<Integer> duplicateRows;
	private List<Integer> blankRows;
	private List<Integer> incorrectRows;
	private List<Integer> invalidUrls;
	private String state;
	private Integer errorCode;
	
}
