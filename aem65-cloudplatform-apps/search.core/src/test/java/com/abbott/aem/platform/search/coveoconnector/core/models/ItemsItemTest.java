package com.abbott.aem.platform.search.coveoconnector.core.models;

import org.junit.jupiter.api.Test;

import com.abbott.aem.platform.search.core.PojoTestUtils;

class ItemsItemTest {

	@Test
	void test() {
		PojoTestUtils.validateAccessors(ItemsItem.class);
		
		ItemsItem obj = new ItemsItem();
				obj.setDescription("sample description");
				assert(obj.toString().contains("sample description"));
	}

}
