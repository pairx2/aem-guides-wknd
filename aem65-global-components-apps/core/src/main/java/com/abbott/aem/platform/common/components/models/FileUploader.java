package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface FileUploader extends Component {

	/**
	 * Returns the uploader icon.
	 *
	 * @return the uploader icon value.
	 */
	default String getUploaderIcon() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Drag and drop text.
	 *
	 * @return the Drag and drop value.
	 */
	default String getDragAndDropText() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Or text.
	 *
	 * @return the Or value.
	 */
	default String getOrText() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the File Selection Text.
	 *
	 * @return the file selection value.
	 */
	default String getFileSelectionText() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the File Uploaded Label.
	 *
	 * @return the file Uploaded label value.
	 */
	default String getFileUploadedLabel() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the File Check icon.
	 *
	 * @return the file check icon value.
	 */
	default String getFileCheckIcon() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Remove icon.
	 *
	 * @return the remove file icon value.
	 */
	default String getRemoveIcon() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Remove Label.
	 *
	 * @return the remove Label value.
	 */
	default String getRemoveLabel() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Cropping Label.
	 *
	 * @return the Cropping Label value.
	 */
	default String getCroppingLabel() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Enable Cropping.
	 *
	 * @return the enable cropping value.
	 */
	default boolean isEnableCropping() {
		throw new UnsupportedOperationException();
	}	

	/**
	 * Returns the Crop Width.
	 *
	 * @return the crop width value.
	 */
	default Integer getCropWidth() {
		throw new UnsupportedOperationException();
	}	

	/**
	 * Returns the Crop Height.
	 *
	 * @return the crop height value.
	 */
	default Integer getCropHeight() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Image Minimum Width.
	 *
	 * @return the image minimum width value.
	 */
	default Integer getImageValidateSizeMinWidth() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Image Minimum Height.
	 *
	 * @return the image minimum height value.
	 */
	default Integer getImageValidateSizeMinHeight() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Max File Size.
	 *
	 * @return the max file size value.
	 */
	default String getMaxFileSize() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Accepted File Types.
	 *
	 * @return the accepted file types value.
	 */
	default String getAcceptedFileTypes() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Label Max File Size.
	 *
	 * @return the Label Max File Size value.
	 */
	default String getLabelMaxFileSize() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Image Validate Size Label Image Size Too Small.
	 *
	 * @return the Image  Validate Size  Label Image Size Too Small value.
	 */
	default String getImageValidateSizeLabelImageSizeTooSmall() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Image Validate Size Label Image Size Too Small.
	 *
	 * @return the Image  Validate Size  Label Image Size Too Small value.
	 */
	default String getImageValidateSizeLabelExpectedMinSize() {
		throw new UnsupportedOperationException();
	}


	/**
	 * Returns the File Type Validation Message.
	 *
	 * @return the File Type Validation Message value.
	 */
	default String getLabelFileTypeNotAllowed() {
		throw new UnsupportedOperationException();
	}

	default String getFileUploaderIsRequired() {
		throw new UnsupportedOperationException();
	}

	default String getRequiredMessage() {
		throw new UnsupportedOperationException();
	}


}
