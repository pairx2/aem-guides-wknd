package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.commons.Externalizer;

import io.wcm.testing.mock.aem.junit5.AemContext;
import junitx.util.PrivateAccessor;

@ExtendWith(MockitoExtension.class)
class OrderHistoryImplTest {
	
	  @InjectMocks
	  private OrderHistoryImpl orderHistory;
	  
	  @BeforeEach
	    void setUp() throws Exception {
	        PrivateAccessor.setField(orderHistory, "maxNumber", 3);
	        PrivateAccessor.setField(orderHistory, "orderDetailPage", "/content/my-account/my-order/path");
			PrivateAccessor.setField(orderHistory, "showSpaceInPrice", "true");
	   }
	  
	  @Test
	  void testGetMaxNumber() {
		  final int expected = 3;
		  int actual = orderHistory.getMaxNumber();
		  assertEquals(expected, actual);
	  }
	  
	  @Test
	  void testetOrderDetailPage() {
		  final String expected = "/content/my-account/my-order/path";
		  String actual = orderHistory.getOrderDetailPage();
		  assertEquals(expected, actual);
	  }

	  @Test
	  void testShowSpaceInPrice() {
		  final String expected = "true";
		  String actual = orderHistory.getShowSpaceInPrice();
		  assertEquals(expected, actual);
	  }
}
