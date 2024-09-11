package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class})
public class AddressCheckoutModelTest  extends BaseModelTest<AddressCheckoutModel> {
    
	@InjectMocks
	private AddressCheckoutModel model;

    @BeforeEach
	void setup() {
		model = loadModel(AddressCheckoutModel.class);
	}

	@Test
	public void getSaveAddressCheckbox() {
		Assert.assertEquals("Save", model.getSaveAddressCheckbox());
	}

    @Test
	public void getInformationalMessage() {
		Assert.assertEquals("Information Message", model.getInformationalMessage());
	}

	@Test
	public void getFieldplaceholder() {
		Assert.assertEquals(false, model.enableNewPaymentFlow);
	}
}
