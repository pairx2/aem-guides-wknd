package com.abbott.aem.an.division.core.components.models;

import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
class TabInformationTest {
	
	TabInformation tabInfo = new TabInformation();
	
	@Test
	void TestgetTabName() {
		assertNull(tabInfo.getTabName());
	}
}
