package com.abbott.aem.bts.cybersecurity.servlets;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.abbott.aem.bts.cybersecurity.services.ArcherAPIJobService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junitx.util.PrivateAccessor;
import lombok.NonNull;

@ExtendWith(AemContextExtension.class)
@RunWith(MockitoJUnitRunner.class)
class GetArcherProductServletTest {
	
	private final AemContext aemContext = new AemContext();

	@InjectMocks
	GetArcherProductServlet archerProduct;
    
    @NonNull
    @Mock
    MockSlingHttpServletRequest mockSlingHttpServletRequest;

    @NonNull
    @Mock
    MockSlingHttpServletResponse mockSlingHttpServletResponse;
    
    @Mock
    ArcherAPIJobService archerAPIJobService;
	
    @BeforeEach
    public void setUp() throws Exception {
    	archerProduct= new GetArcherProductServlet();
    	mockSlingHttpServletRequest = aemContext.request();
        mockSlingHttpServletResponse = aemContext.response();
    }

	@Test
	void test() throws Exception {
		Map<String,Object> mapValues=new HashMap<>();
		mapValues.put("q", "archer");
		mockSlingHttpServletRequest.setParameterMap(mapValues);
		archerAPIJobService = mock(ArcherAPIJobService.class);
		PrivateAccessor.setField(archerProduct, "archerAPIJobService", archerAPIJobService);
		lenient().when(archerAPIJobService.getProductDetails()).thenReturn(true);
		archerProduct.doGet(mockSlingHttpServletRequest, mockSlingHttpServletResponse);
	}

	@Test
	void testElse() throws Exception {
		Map<String,Object> mapValues=new HashMap<>();
		mapValues.put("q", "");
		mockSlingHttpServletRequest.setParameterMap(mapValues);
		archerAPIJobService = mock(ArcherAPIJobService.class);
		PrivateAccessor.setField(archerProduct, "archerAPIJobService", archerAPIJobService);
		archerProduct.doGet(mockSlingHttpServletRequest, mockSlingHttpServletResponse);
	}

}
