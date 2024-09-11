package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class})
public class OrderDocumentListModelTest  extends BaseModelTest<OrderDocumentListModel> {
    
	@InjectMocks
	private OrderDocumentListModel model;

    @BeforeEach
	void setup() {
		model = loadModel(OrderDocumentListModel.class);
	}

    @Test
	public void getHeading() {
		Assert.assertEquals("Registrierung erfolgreich", model.getHeading());
	}

	@Test
	public void getSubHeading() {
		Assert.assertEquals("Haben Sie schon die Technische Einweisung erhalten?", model.getSubHeading());
	}	

	@Test
	public void getNumberOfResults(){
		Assert.assertEquals(10, model.getNumberOfResults());
	}
}
