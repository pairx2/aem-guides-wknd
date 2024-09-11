package com.abbott.aem.cloud.platform.core.redirects.models;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.abbott.aem.cloud.platform.core.redirects.Types.MappingType;
import com.abbott.aem.cloud.platform.core.redirects.Types.RedirectionType;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Builder;
import lombok.NonNull;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Jacksonized
@Builder
@JsonPropertyOrder({ "sourceUrl", "queryParameters", "redirectionType", "forwardQueryString", "mappingType",
		"targetUrl", "headerName", "headerValue", "matchType", "order" })
public class CsvUrlRedirectRule {

	@JsonProperty(required = true)
	private String sourceUrl;

	@JsonProperty(required = true)
	private String targetUrl;

	private String redirectionType;
	private String forwardQueryString;
	private String mappingType;
	private String headerName;
	private String headerValue;
	private String matchType;
	private Integer order;
	private String queryParameters;

	// Below methods are created to return default values if its empty
	public String getRedirectionType() {
		if (StringUtils.isEmpty(this.redirectionType)) {
			return RedirectionType.DEFAULT;
		}
		return this.redirectionType;
	}

	public String getMappingType() {
		if (StringUtils.isEmpty(this.mappingType)) {
			return MappingType.DEFAULT;
		}
		return this.mappingType;
	}

	public static List<CsvUrlRedirectRule> from(@NonNull Rule rule) {
		List<CsvUrlRedirectRule> ruleList = new ArrayList<>();

		String sourceUrl = rule.getSourceUrl();
		String queryParams = rule.getQueryParametersString();
		String redirectionType = rule.getRedirectionType();
		String forwardQueryString = rule.getForwardQueryString().toString();
		String mappingType = rule.getMappingType();

		List<HeaderMatch> headerMatchers = rule.getHeaderMatchers();

		if (mappingType.equals(MappingType.BYHEADER.name())) {
			String headerName = rule.getHeaderName();

			for (HeaderMatch headerMatch : headerMatchers) {
				String headerValue = headerMatch.getHeaderValue();
				String matchType = headerMatch.getMatchType();
				String targetUrl = headerMatch.getTargetUrl();
				int order = headerMatch.getOrder();

				CsvUrlRedirectRule csvRule = CsvUrlRedirectRule.builder().sourceUrl(sourceUrl)
						.queryParameters(queryParams).redirectionType(redirectionType)
						.forwardQueryString(forwardQueryString).mappingType(mappingType).targetUrl(targetUrl)
						.headerName(headerName).headerValue(headerValue).matchType(matchType).order(order).build();

				ruleList.add(csvRule);
			}
		} else {
			String targetUrl = rule.getTargetUrl();
			CsvUrlRedirectRule csvRule = CsvUrlRedirectRule.builder().sourceUrl(sourceUrl).queryParameters(queryParams)
					.redirectionType(redirectionType).forwardQueryString(forwardQueryString).mappingType(mappingType)
					.targetUrl(targetUrl).build();

			ruleList.add(csvRule);
		}
		return ruleList;
	}

}