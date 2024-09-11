package com.abbott.aem.an.similac.core.beans;

import java.util.Objects;

/**
 * Bean class to hold information about an Error
 * 
 * @author Anirudh Garg
 */
public class ErrorBean {

	/** The error code */
	private String errorCode;

	/** The error message */
	private String errorMessage;

	/**
	 * @return the errorCode
	 */
	public String getErrorCode() {
		return errorCode;
	}

	/**
	 * @param errorCode the errorCode to set
	 */
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	/**
	 * @return the errorMessage
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

	/**
	 * @param errorMessage the errorMessage to set
	 */
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	@Override
	public int hashCode() {
		return Objects.hash(errorCode, errorMessage);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof ErrorBean)) {
			return false;
		}
		ErrorBean other = (ErrorBean) obj;
		return Objects.equals(errorCode, other.errorCode) && Objects.equals(errorMessage, other.errorMessage);
	}

}
