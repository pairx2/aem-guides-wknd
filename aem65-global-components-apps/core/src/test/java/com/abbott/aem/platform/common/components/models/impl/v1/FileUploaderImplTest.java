package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.FileUploader;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

@ExtendWith(AemContextExtension.class)
class FileUploaderImplTest {

	private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	public void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(FileUploaderImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FileUploaderImplTest.json", "/content");
	}

	@Test
	void testGetUploaderIcon() {
		final String expected = "abt-icon abt-icon-avatar";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getUploaderIcon();
		assertEquals(expected, actual);
	}	

	@Test
	void testGetDragAndDropText() {
		final String expected = "Test Drag and Drop Text";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getDragAndDropText();
		assertEquals(expected, actual);
	}	
	
	@Test
	void testOrText() {
		final String expected = "Test Or Text";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getOrText();
		assertEquals(expected, actual);
	}

	@Test
	void testFileSelectionText() {
		final String expected = "Test File Selection Text";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getFileSelectionText();
		assertEquals(expected, actual);
	}

	@Test
	void testFileUploadedLabel() {
		final String expected = "Test File Uploaded Label";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getFileUploadedLabel();
		assertEquals(expected, actual);
	}

	@Test
	void testGetFileCheckIcon() {
		final String expected = "abt-icon abt-icon-avatar";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getFileCheckIcon();
		assertEquals(expected, actual);
	}

	@Test
	void testGetRemoveIcon() {
		final String expected = "abt-icon abt-icon-avatar";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getRemoveIcon();
		assertEquals(expected, actual);
	}

	@Test
	void testGetRemoveLabel() {
		final String expected = "Test Remove Label";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getRemoveLabel();
		assertEquals(expected, actual);
	}	

	@Test
	void testGetIsEnableCropping() {
		final boolean expected = true;
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		boolean actual = fileUploader.isEnableCropping();
		assertEquals(expected, actual);
	}

	@Test
	void testGetCroppingLabel() {
		final String expected = "Test Cropping Label";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getCroppingLabel();
		assertEquals(expected, actual);
	}	

	@Test
	void testGetCropWidth() {
		final Integer expected = 500;
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		Integer actual = fileUploader.getCropWidth();
		assertEquals(expected, actual);
	}

	@Test
	void testGetCropHeight() {
		final Integer expected = 500;
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		Integer actual = fileUploader.getCropHeight();
		assertEquals(expected, actual);
	}

	@Test
	void testGetImageValidateSizeMinWidth() {
		final Integer expected = 500;
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		Integer actual = fileUploader.getImageValidateSizeMinWidth();
		assertEquals(expected, actual);
	}

	@Test
	void testGetImageValidateSizeMinHeight() {
		final Integer expected = 500;
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		Integer actual = fileUploader.getImageValidateSizeMinHeight();
		assertEquals(expected, actual);
	}

	@Test
	void testGetMaxFileSize() {
		final String expected = "5MB";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getMaxFileSize();
		assertEquals(expected, actual);
	}

	@Test
	void testGetAcceptedFileTypes() {
		final String expected = "image/png, image/jpg";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getAcceptedFileTypes();
		assertEquals(expected, actual);
	}

	@Test
	void testGetLabelMaxFileSize() {
		final String expected = "Test Max File Size Label";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getLabelMaxFileSize();
		assertEquals(expected, actual);
	}

	@Test
	void testGetImageValidateSizeLabelImageSizeTooSmall() {
		final String expected = "Test Validate Size Too Small Label";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getImageValidateSizeLabelImageSizeTooSmall();
		assertEquals(expected, actual);
	}

	@Test
	void testGetImageValidateSizeLabelExpectedMinSize() {
		final String expected = "Test Validate Expected Minimum Size";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getImageValidateSizeLabelExpectedMinSize();
		assertEquals(expected, actual);
	}

	@Test
	void testGetLabelFileTypeNotAllowed() {
		final String expected = "Test File Type is not allowed";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getLabelFileTypeNotAllowed();
		assertEquals(expected, actual);
	}
	@Test
	void testGetFileUploaderIsRequired() {
		final String expected = "upload";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getFileUploaderIsRequired();
		assertEquals(expected, actual);
	}

	@Test
	void testGetRequiredMessage() {
		final String expected = "required";
		ctx.currentResource("/content/fileuploadandcropping");
		FileUploader fileUploader = ctx.request().adaptTo(FileUploader.class);
		String actual = fileUploader.getRequiredMessage();
		assertEquals(expected, actual);
	}
}
