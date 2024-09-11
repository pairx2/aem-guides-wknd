package com.abbott.aem.platform.common.components.services;

import lombok.Data;

@Data
public class ApiResponse {
	private int responseCode;
	private String responseString;

	public ApiResponse(int responseCode, String responseString) {
		this.responseCode = responseCode;
		this.responseString = responseString;
	}

	public int getResponseCode() {
		return responseCode;
	}

	public String getResponseString() {
		return responseString;
	}

}
