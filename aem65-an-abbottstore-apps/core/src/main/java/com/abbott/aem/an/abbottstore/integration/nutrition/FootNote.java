package com.abbott.aem.an.abbottstore.integration.nutrition;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 *
 * @author saikrishna.s
 * 
 *         FootNote
 * 
 *         FootNote is the Pojo class to hold the details of individual FootNote
 * 
 *         Version Number: 1.0
 */
public class FootNote {

	/** The line number. */
	@SerializedName("LineNumber")
	@Expose
	private int lineNumber;

	/** The footnote symbol. */
	@SerializedName("FootnoteSymbol")
	@Expose
	private String footnoteSymbol;

	/** The footnote value. */
	@SerializedName("FootnoteValue")
	@Expose
	private String footnoteValue;

	/**
	 * Gets the line number.
	 *
	 * @return the line number
	 */
	public int getLineNumber() {
		return lineNumber;
	}

	/**
	 * Sets the line number.
	 *
	 * @param lineNumber the new line number
	 */
	public void setLineNumber(int lineNumber) {
		this.lineNumber = lineNumber;
	}

	/**
	 * Gets the footnote symbol.
	 *
	 * @return the footnote symbol
	 */
	public String getFootnoteSymbol() {
		return footnoteSymbol;
	}

	/**
	 * Sets the footnote symbol.
	 *
	 * @param footnoteSymbol the new footnote symbol
	 */
	public void setFootnoteSymbol(String footnoteSymbol) {
		this.footnoteSymbol = footnoteSymbol;
	}

	/**
	 * Gets the footnote value.
	 *
	 * @return the footnote value
	 */
	public String getFootnoteValue() {
		return footnoteValue;
	}

	/**
	 * Sets the footnote value.
	 *
	 * @param footnoteValue the new footnote value
	 */
	public void setFootnoteValue(String footnoteValue) {
		this.footnoteValue = footnoteValue;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "FootNote [lineNumber=" + lineNumber + ", footnoteSymbol=" + footnoteSymbol + ", footnoteValue="
				+ footnoteValue + "]";
	}

}
