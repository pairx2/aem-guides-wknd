package com.abbott.aem.an.abbottstore.beans;

/**
 * ThumbNailConfigImpl has properties of Image Thumb nail.
 *
 * @author saikrishna.s
 */
public class ThumbNailConfigImpl {

	/** The width. */
	private final int width;

	/** The height. */
	private final int height;

	/** The device type. */
	private final String deviceType;

	/** The size str. */
	private final String sizeStr;

	/**
	 * Instantiates a new thumb nail config impl.
	 *
	 * @param width      the width
	 * @param height     the height
	 * @param deviceType the device type
	 * @param sizeStr    the size str
	 */
	public ThumbNailConfigImpl(final int width, final int height, final String deviceType, final String sizeStr) {
		this.width = width;
		this.height = height;
		this.deviceType = deviceType;
		this.sizeStr = sizeStr;

	}

	/**
	 * Gets the device type.
	 *
	 * @return the device type
	 */
	public String getDeviceType() {
		return deviceType;
	}

	/**
	 * Gets the size str.
	 *
	 * @return the size str
	 */
	public String getSizeStr() {
		return sizeStr;
	}

	/**
	 * Gets the width.
	 *
	 * @return the width
	 */
	public int getWidth() {
		return width;
	}

	/**
	 * Gets the height.
	 *
	 * @return the height
	 */
	public int getHeight() {
		return height;
	}

}
