package com.abbott.aem.an.similac.core.models;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.an.similac.core.beans.CartComponentBean;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class CartComponentModelTest {

	private static final String CART_JSON = "/com/abbott/aem/an/similac/core/models/my-cart.json";
	private static final String CONTENT_PATH = "/content";
	
	private CartComponentModel cartComponentModel;
	private AemContext context;
	
	@BeforeEach
	void setUp()  {		
		context.load().json(CART_JSON, CONTENT_PATH);
		context.addModelsForClasses(CartComponentModel.class);
	}

	@Test
	final void testCartJson() {
		context.currentResource(context.resourceResolver().getResource("/content/carts/jcr:content/my-cart"));
		cartComponentModel = context.request().adaptTo(CartComponentModel.class);
		CartComponentBean  cartComponentBean = cartComponentModel.geCartBean();
		validateCartDetails(cartComponentBean);
		Assertions.assertNotNull(cartComponentModel.getCartJson());
		Assertions.assertNotNull(cartComponentModel.getComponentProp());
	}

	private void validateCartDetails(CartComponentBean cartBean) {
		Assertions.assertNotNull(cartBean);
		Assertions.assertNotNull(cartBean.getButtonLabel());
		Assertions.assertNotNull(cartBean.getCloseLabel());
		Assertions.assertNotNull(cartBean.getEditLabel());
		Assertions.assertNotNull(cartBean.getEmptyButtonLabel());
		Assertions.assertNotNull(cartBean.getEmptyLabel());
		Assertions.assertNotNull(cartBean.getQuantityLabel());
		Assertions.assertNotNull(cartBean.getSubscriptionLabel());
		Assertions.assertNotNull(cartBean.getTitleLabel());
		Assertions.assertNotNull(cartBean.getTotalLabel());
		Assertions.assertNotNull(cartBean.getCartURL());
		Assertions.assertNotNull(cartBean.getCheckoutURL());
		Assertions.assertNotNull(cartBean.getDiscountLabel());
		Assertions.assertNotNull(cartBean.getProductsURL());
		Assertions.assertNotNull(cartBean.getSubTotalLabel());
		Assertions.assertNotNull(cartBean.getTotalLabel());
		Assertions.assertNotNull(cartBean.getImgRendition_80());
	}
}
