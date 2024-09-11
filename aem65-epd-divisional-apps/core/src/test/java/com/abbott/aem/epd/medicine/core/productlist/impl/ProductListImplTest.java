 package com.abbott.aem.epd.medicine.core.productlist.impl;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class ProductListImplTest {   
	
	AemContext ctx = new AemContext();
 
	@Mock
	Resource resource;

	@InjectMocks
	ProductListImpl productListImpl;

@Mock
ProxyComponentService proxyComponentService;
@Mock
Component component;

	
@BeforeEach

void setUp()
{
    proxyComponentService = Mockito.mock(ProxyComponentService.class);
     component = Mockito.mock(Component.class);
     ProxyPaths path = null;
     Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
     ctx.registerService(ProxyComponentService.class, proxyComponentService);
     ctx.addModelsForClasses(ProductListImpl.class);
     ctx.load().json("/com/abbott/aem/epd/medicine/core/productlist/impl/ProductListServiceTest.json", "/content");
   
    resource = Mockito.mock(Resource.class);
}


@Test

void testGetdefaultHeading()
{
	
	 final String expected = "sampledefaultheading";
     ctx.currentResource("/content/productlist");
     
     ProductListImpl ProductList=new ProductListImpl();
     ProductList.setDefaultHeading(expected);
     String actual = ProductList.getDefaultHeading();
    assertEquals(expected, actual);
	}
    
@Test

void testGetshowAllResults()
{
	
	 final String expected = "showalltext";
     ctx.currentResource("/content/productlist");
     ProductListImpl ProductList=new ProductListImpl();

     ProductList.setShowAllResults(expected);
     String actual = ProductList.getShowAllResults();
    
   assertEquals(expected, actual);

	}

@Test
void testGetnumberOfResults()
{
	
	 final String expected = "resultscount";
     ctx.currentResource("/content/productlist");
     ProductListImpl ProductList=new ProductListImpl();

     ProductList.setNumberOfResults(expected);
     String actual = ProductList.getNumberOfResults();
    
   assertEquals(expected, actual);

	}

@Test
void testGetshowMore()
{
	
	 final String expected = "showmoretext";
     ctx.currentResource("/content/productlist");
     ProductListImpl ProductList=new ProductListImpl();

     ProductList.setShowMore(expected);
     String actual = ProductList.getShowMore();
    
   assertEquals(expected, actual);

	}
@Test
void testGetbackToTop()
{
	
	 final String expected = "direction";
     ctx.currentResource("/content/productlist");
     ProductListImpl ProductList=new ProductListImpl();

     ProductList.setBackToTop(expected);
     String actual = ProductList.getBackToTop();
    
   assertEquals(expected, actual);

	}
@Test
void testGetnoProducts()
{
	
	 final String expected = "productcount";
     ctx.currentResource("/content/productlist");
     ProductListImpl ProductList=new ProductListImpl();

     ProductList.setNoProducts(expected);
     String actual = ProductList.getNoProducts();
    
   assertEquals(expected, actual);

	}
@Test
void testGetproductsDataRootPath()
{
	
	 final String expected = "/content/epd";
     ctx.currentResource("/content/productlist");
     ProductListImpl ProductList=new ProductListImpl();

     ProductList.setProductsDataRootPath(expected);
     String actual = ProductList.getProductsDataRootPath();
    
   assertEquals(expected, actual);
   
	}
@Test
void testGetProductListJsonString()
{
	
	ProductListImpl ProductList=new ProductListImpl();
	assertNotNull(ProductList.getProductListJsonString());
	ProductList.init();
	assertNotNull(ProductList.getProducts());
		
}
}
   
      
    
    



