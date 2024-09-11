package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.form.Text;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The interface Fields.
 */
@ConsumerType
public interface Fields extends Text {

	/**
	 * Gets placeholder.
	 *
	 * @return the placeholder
	 */
	@Override
	public String getPlaceholder();

	/**
	 * Gets validation error message.
	 *
	 * @return the validation error message
	 */
	public String getValidationErrorMessage();

	/**
	 * Gets field icon.
	 *
	 * @return the field icon
	 */
	public String getFieldIcon();

	/**
	 * Gets left icon image.
	 *
	 * @return the left icon image
	 */
	public String getIconLeft();

	/**
	 * Gets right icon image.
	 *
	 * @return the right icon image
	 */
	public String getIconRight();

	/**
	 * Gets double icon right.
	 *
	 * @return the double icon right
	 */
	public String getDoubleIconRight();

	/**
	 * Gets double icon left.
	 *
	 * @return the double icon left
	 */
	public String getDoubleIconLeft();

	/**
	 * Gets boolean is regex required.
	 *
	 * @return the boolean is regex required
	 */
	public boolean isRegexRequired();

	/**
	 * Gets string regex pattern.
	 *
	 * @return the string regex pattern
	 */
	public String getRegexPattern();

	/**
	 * Gets double icon left.
	 *
	 * @return the String regex
	 */
	public String getRegexErrorMessage();
	
	/**
	 * Gets boolean is confirm password.
	 *
	 * @return the boolean is confirm password
	 */
	public boolean isConfirmPassword();
	
	/**
	 * Gets Password policy required
	 *
	 * @return the String password policy
	 */
	public String getPasswordPolicyRequired();
	
	/**
	 * Gets policy type
	 *
	 * @return the String password policy type
	 */
	public String getPolicyType();
	
	/**
	 * Gets policy type
	 *
	 * @return the String password policy type
	 */
	public String getTooltipIcon();
	
	/**
	 * Gets policy type
	 *
	 * @return the String password policy type
	 */
	public String getTooltipLabel();
	
	/**
	 * Gets policy type
	 *
	 * @return the String password policy type
	 */
	public String getTooltipDescription();
	
	/**
	 * Gets policy type
	 *
	 * @return the String password policy type
	 */
	public int getMinCharCount();
	
	/**
	 * Gets policy type
	 *
	 * @return the String password policy type
	 */
	public String getMinCharLabel();
	
	/**
	 * Gets policy type
	 *
	 * @return the String password policy type
	 */
	public String getMinCharDescription();
	
	/**
	 * Gets policy type
	 *
	 * @return the String password policy type
	 */
	public String getAlphabetLabel();
	
	/**
	 * Gets policy type
	 *
	 * @return the String password policy type
	 */
	public String getAlphabetDescription();
	
	/**
	 * Gets  numeric label
	 *
	 * @return the String numeric label
	 */
	public String getNumericLabel();
	
	/**
	 * Gets numeric description
	 *
	 * @return the String numeric description
	 */
	public String getNumericDescription();
	
	/**
	 * Gets special character label
	 *
	 * @return the String special char label
	 */
	public String getSpecialCharLabel();
	
	/**
	 * Gets special character description
	 *
	 * @return the string special char description
	 */
	public String getSpecialCharDescription();

	/**
	 * Gets special character regex
	 *
	 * @return the string special char regex
	 */
	public String getSpecialCharRegex();

	public  String getEnableTooltip();

}
