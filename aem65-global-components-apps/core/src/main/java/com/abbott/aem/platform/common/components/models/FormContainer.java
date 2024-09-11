package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface FormContainer.
 */
@ConsumerType
public interface FormContainer extends Component {

	/**
	 * Gets the Form Mode.
	 *
	 * @return the Form Mode
	 */
	default String getFormMode() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the Form type.
	 *
	 * @return the Form type
	 */
	default String getFormType() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the Success Message.
	 *
	 * @return the Success Message
	 */
	default String getSuccessMessage() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the Failure Message.
	 *
	 * @return the Failure Message
	 */
	default String getFailureMessage() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Checks if is Recaptcha enabled.
	 *
	 * @return true, if Recaptcha is enabled
	 */
	default String getRecaptcha() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Checks if is Submit enabled.
	 *
	 * @return true, if Submit is enabled
	 */
	default String getSubmit() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Checks if is Reset enabled.
	 *
	 * @return true, if Reset is enabled
	 */
	default String getReset() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Checks if is Cancel enabled.
	 *
	 * @return true, if Cancel is enabled
	 */
	default String getCancel() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Checks if is Kount Checkbox enabled.
	 *
	 * @return true, if Kount Checkbox is enabled
	 */
	default String getKountEnable() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Gets the Kount Client ID .
	 *
	 * @return the  Kount Client ID .
	 */
	default String getKountClientID() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Gets the  Kount Environment . .
	 *
	 * @return the Kount Environment .
	 */
	default String getKountEnvironment() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Checks if is  Single Page Application enabled.
	 *
	 * @return true, if  Single Page Application  is enabled
	 */
	default String getIsSPA() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the Step Labels.
	 *
	 * @return the Step Labels
	 */
	default java.util.List<String> getStepLabel() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the Step Complete Icon.
	 *
	 * @return the Step Complete Icon
	 */
	default String getStepCompleteIcon() {
		throw new UnsupportedOperationException();
	}

	default String getReCaptchaKey() {
		throw new UnsupportedOperationException();
	}

	default String getRecaptchaScriptsrc() {
		throw new UnsupportedOperationException();
	}

	default String getThankYouPage() {
		throw new UnsupportedOperationException();
	}

	default String getDomainName() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Gets the Request Type.
	 *
	 * @return the Request Type
	 */
	default String getRequestType() {
		throw new UnsupportedOperationException();
	}

	default String getUpdateRequest() {
		throw new UnsupportedOperationException();
	}

	default String getOnBeforeCall() {
		throw new UnsupportedOperationException();
	}

	default String getOnSuccess() {
		throw new UnsupportedOperationException();
	}

	default String getOnError() {
		throw new UnsupportedOperationException();
	}

	default String getOnComplete() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * Gets the Method Action
	 *
	 * @return the Method Action
	 */
	default String getMethodAction() {
		throw new UnsupportedOperationException();
	}
	
	default String getButtonProxyPath() {
		throw new UnsupportedOperationException();
	}
	
	default String getCurrentPagePath() {
		throw new UnsupportedOperationException();
	}
	default String getEnterpriseRecaptcha() {
		throw new UnsupportedOperationException();
	}
}
