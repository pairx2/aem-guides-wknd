import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import Icon from '../Icon/Icon';
import {CustomPropTypes} from '../../../../utils/propTypeUtils';
import {empty} from '../../../../utils/default';


export const BUTTON_OPTIONS = {
	STYLE: {
		PRIMARY: 'primary',
		SECONDARY: 'secondary',
		TRANSPARENT:'transparent',
		TERTIARY:'tertiary'
	},
	SIZE: {
		LARGE: 'large',
		SMALL: 'small'
	},
	TYPE: {
		SUBMIT: 'submit',
		RESET: 'reset',
		BUTTON: 'button'
	},
	COLOR: {
		BLUE: 'blue',
		ORANGE: 'orange',
		WHITE: 'white',
		YELLOW: 'yellow'
	}
};

const Button = ({id,action, href,target, className, ctaStyle, productData, color, isFullWidth, isMoreInfoButton, hasNoMargin, type, isDisabled, isDownload, icon, iconPosition, label, params}) => {
	className = `adc-button adc-button-${ctaStyle} text-center ${className} ${color} ${isFullWidth ? 'full-width' : ''} ${hasNoMargin ? 'm-0' : ''}`;
	return (
		<>
			<if condition={action || type === BUTTON_OPTIONS.TYPE.SUBMIT}>
				<ActionButton id={id} action={action} type={type} className={className} isDisabled={isDisabled}>
					<ButtonContent icon={icon} iconPosition={iconPosition} label={label} params={params}/>
				</ActionButton>
			</if>
			<else>
				<RedirectButton id={id} href={href} productData={productData} isMoreInfoButton={isMoreInfoButton} target={target} className={className} isDownload={isDownload} isDisabled={isDisabled}>
					<ButtonContent icon={icon} iconPosition={iconPosition} label={label} params={params}/>
				</RedirectButton>
			</else>
		</>
	);
};

Button.propTypes = {
	id: PropTypes.string,
	action: CustomPropTypes.conflictsWith('href', 'function'),
	href: CustomPropTypes.conflictsWith('action', 'string'),
	target: PropTypes.string,
	type: PropTypes.string,
	className: PropTypes.string,
	ctaStyle: PropTypes.oneOf([...Object.values(BUTTON_OPTIONS.STYLE)]),
	color: PropTypes.string,
	isFullWidth: PropTypes.bool,
	isMoreInfoButton: PropTypes.bool,
	hasNoMargin: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isDownload: PropTypes.bool,
	icon: PropTypes.string,
	iconPosition: PropTypes.oneOf([...Object.values(Icon.POSITION)]),
	label: PropTypes.string,
	params: PropTypes.array,
	productData: PropTypes.object
};

Button.defaultProps = {
	className: '',
	ctaStyle: BUTTON_OPTIONS.STYLE.PRIMARY,
	color: '',
	type: BUTTON_OPTIONS.TYPE.BUTTON,
	iconPosition: Icon.POSITION.RIGHT
};

export default Button;

const ActionButton = ({id,action, type, className, isDisabled, children}) => <button id={id} onClick={action} type={type} className={className} disabled={isDisabled}>
	{children}
</button>;

ActionButton.propTypes = {
	id: PropTypes.string,
	action: PropTypes.func,
	type: PropTypes.string,
	className: PropTypes.string,
	isDisabled: PropTypes.bool
};

ActionButton.defaultProps = {
	action: empty.function
};

const RedirectButton = ({id, href, target, className, isDownload, isDisabled, children}) => <a id={id} href={href} target={target} disabled={isDisabled} className={className + (isDisabled ? ' disabled' : '')} download={isDownload}>
	{children}
</a>;

RedirectButton.propTypes = {
	id: PropTypes.string,
	href: PropTypes.string,
	target: PropTypes.string,
	className: PropTypes.string,
	isDownload: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isMoreInfoButton: PropTypes.bool,
	productData: PropTypes.object
};

RedirectButton.defaultProps = {
	href: '#',
	target: '_self',
};

const ButtonContent = ({icon, iconPosition, label, params}) => <>
	{icon && Icon.POSITION.LEFT === iconPosition && <Icon image={icon} size={Icon.SIZE.MEDIUM} className='adc-icon--force-size adc-icon--absolute-left'/>}
	<I18n text={label} params={params}/>
	{icon && Icon.POSITION.RIGHT === iconPosition && <Icon image={icon} size={Icon.SIZE.MEDIUM} className=' adc-icon--absolute-right'/>}
</>;

ButtonContent.propTypes = {
	icon: PropTypes.string,
	iconPosition: PropTypes.oneOf([...Object.values(Icon.POSITION)]),
	label: PropTypes.string,
	params: PropTypes.array
};