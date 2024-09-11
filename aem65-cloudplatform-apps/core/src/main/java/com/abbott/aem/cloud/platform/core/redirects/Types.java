package com.abbott.aem.cloud.platform.core.redirects;

public class Types {

	public enum MappingType {
		DIRECT, BYHEADER;
		
		public static final String DEFAULT = DIRECT.name();
	}

	public enum RedirectionType {
		TEMPORARY, PERMANENT;
		
		public static final String DEFAULT = TEMPORARY.name();
	}
	
	public enum States {
		NEW, EDITED, DRAFT, APPLIED, PROMOTED;
		
		public static final String DEFAULT = NEW.name();
	}
}
