package com.abbott.aem.epd.medicine.core.productlist.impl;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class ProductListServiceImplTest {

	@Mock
	Resource resource;

	@InjectMocks
	ProductListServiceImpl ProductListServiceImpl;

	@Mock
	ResourceResolver resourceResolver;

	@BeforeEach
	public void setUp()

	{
		resourceResolver = mock(ResourceResolver.class);
		List<Resource> resources = new ArrayList<>();
		resources.add(resource);
		Iterator<Resource> result = resources.iterator();
		Mockito.lenient().when(resourceResolver.findResources(Mockito.any(), Mockito.any())).thenReturn(result);
	}

	@Test
	public void testLookupMedicineProductData() {
		assertNotNull(ProductListServiceImpl.lookupMedicineProductData(resourceResolver, "path"));
	}
}
