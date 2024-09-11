package com.abbott.aem.an.division.core.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.division.core.models.CustomContentFragmentModel;
import com.abbott.aem.platform.common.components.services.APILookupService;

@ExtendWith(MockitoExtension.class)
class CustomContentFragmentModelTest {
	
	@Mock
	APILookupService apiLookUpService;

	@InjectMocks
	CustomContentFragmentModel customContentFragmentModel;

	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testGetSearchAPIEndPoint() {
		assertEquals("", customContentFragmentModel.getSearchApiEndPoint());
	}

}
