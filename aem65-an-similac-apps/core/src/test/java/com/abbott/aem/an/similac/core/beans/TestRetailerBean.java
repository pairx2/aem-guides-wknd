package com.abbott.aem.an.similac.core.beans;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.beans.RetailerBean.Retailer;

@ExtendWith(MockitoExtension.class)
class TestRetailerBean {
	
	RetailerBean retailerBean;
	
	@Test
	void testPOJO() {
		
		retailerBean = new RetailerBean();
		retailerBean.setDataGtmLabel("data GTM");
		Retailer retailer = retailerBean.new Retailer();
		retailer.setOfferType("offer type");
		retailer.setDataGtmLabel("data GTM");
		retailer.setDataGtmSelectLabel("data GTM select");
		Map<String, Retailer> retailerMap = new HashMap<String, RetailerBean.Retailer>();
		retailerMap.put("1", retailer);
		retailerBean.setRetailersList(retailerMap);
		
		
		assertEquals("data GTM", retailerBean.getDataGtmLabel());
		assertEquals("offer type", retailerBean.getRetailersList().get("1").getOfferType());
		assertEquals("data GTM", retailerBean.getRetailersList().get("1").getDataGtmLabel());
		assertEquals("data GTM select", retailerBean.getRetailersList().get("1").getDataGtmSelectLabel());
		
	}

}
