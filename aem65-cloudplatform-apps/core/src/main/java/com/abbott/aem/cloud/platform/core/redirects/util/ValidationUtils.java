package com.abbott.aem.cloud.platform.core.redirects.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.abbott.aem.cloud.platform.core.redirects.Types.MappingType;
import com.abbott.aem.cloud.platform.core.redirects.Types.RedirectionType;

public class ValidationUtils {
	
	private ValidationUtils() {}

	public static boolean validateRedirectionType(String redirectionType) {
		return	 (RedirectionType.PERMANENT.toString().equalsIgnoreCase(redirectionType)
				|| RedirectionType.TEMPORARY.toString().equalsIgnoreCase(redirectionType)) ;
	}

	public static boolean validateMappingType(String mappingType) {
		return (MappingType.DIRECT.toString().equalsIgnoreCase(mappingType)
				|| MappingType.BYHEADER.toString().equalsIgnoreCase(mappingType)) ;
	}

	public static boolean validateLink(String link) {
		final String regex = "^\\/+$|^\\/[^?]+$";
		final Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE | Pattern.CASE_INSENSITIVE | Pattern.DOTALL
				| Pattern.COMMENTS | Pattern.UNICODE_CASE | Pattern.UNICODE_CHARACTER_CLASS);
		final Matcher matcher = pattern.matcher(link);

		boolean validity = false;
		if (matcher.find()) {
			validity = true;
		}
		return validity;
	}
}
