package com.abbott.aem.add.molecular.core.productlist.impl;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.add.molecular.core.productlist.ProductListService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({MockitoExtension.class})
public class ProductListServiceImplTest {
	
	private static final String PATH = "/content/productlistservice";

	@Mock
	ResourceResolver resourceResolver;
	
	@InjectMocks
	ProductListServiceImpl service;
	
	@Mock
	Resource resource; 
		
@BeforeEach
public void setup() {
    List<Resource> resources = new ArrayList<>();
    resources.add(resource);
    when(resourceResolver.findResources(Mockito.any(), Mockito.any())).thenReturn(resources.iterator());
}

@Test
public void testLookupProductFilterData() {
	ProductFilterData filterData=mock(ProductFilterData.class);
	when(resource.adaptTo(ProductFilterData.class)).thenReturn(filterData);
	Assertions.assertNotNull(service.lookupProductFilterData(resourceResolver, PATH));
}


@Test
public void testLookupProductFilterDataNull() {
	when(resource.adaptTo(ProductFilterData.class)).thenReturn(null);
	Assertions.assertEquals(new ArrayList<>(),service.lookupProductFilterData(resourceResolver, PATH));
}

}
