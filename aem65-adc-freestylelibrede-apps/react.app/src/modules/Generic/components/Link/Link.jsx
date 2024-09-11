import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../Translation/components/I18n';
import Icon from '../Icon/Icon';
import {CustomPropTypes} from '../../../../utils/propTypeUtils';


const Link = ({action, href, target, hasNoLinkClass, className, hasNoMargin, isDownload, icon, iconPosition, label, params, mobileBreak, hasOnClickHref}) => {
	
	className = `${!hasNoLinkClass ? 'adc-text-link' : ''} ${className} ${hasNoMargin ? 'm-0' : ''}`;
	return (
		<>
		<if condition={hasOnClickHref}>
			<OnClickRedirectLink href={href} target={target} className={className} isDownload={isDownload} action={action}>
				<LinkContent icon={icon} iconPosition={iconPosition} label={label} params={params} mobileBreak={mobileBreak}/>
			</OnClickRedirectLink>
		</if> 
		<elseif condition={action}>
			<ActionLink action={action} className={className} icon={icon} params={params}>
				<LinkContent icon={icon} iconPosition={iconPosition} label={label} params={params}/>
			</ActionLink>
		</elseif>
		<else>
			<RedirectLink href={href} target={target} className={className} isDownload={isDownload}>
				<LinkContent icon={icon} iconPosition={iconPosition} label={label} params={params} mobileBreak={mobileBreak}/>
			</RedirectLink>
		</else>
		</>
	);
};

Link.propTypes = {
	action: CustomPropTypes.conflictsWith('href', 'function'),
	href: CustomPropTypes.conflictsWith('action', 'string'),
	target: PropTypes.string,
	className: PropTypes.string,
	hasNoMargin: PropTypes.bool,
	isDownload: PropTypes.bool,
	icon: PropTypes.string,
	iconPosition: PropTypes.oneOf([...Object.values(Icon.POSITION)]),
	label: PropTypes.string,
	params: PropTypes.array,
	hasNoLinkClass: PropTypes.bool,
	hasOnClickHref: PropTypes.bool
};

Link.defaultProps = {
	className: '',
	iconPosition: Icon.POSITION.RIGHT
};

export default Link;

const ActionLink = ({action, className, children}) => <span onClick={action} className={className}>
	{children}
</span>;

ActionLink.propTypes = {
	action: PropTypes.func,
	className: PropTypes.string
};

const RedirectLink = ({href, target, className, isDownload, children}) => <a href={href} target={target}
																			 className={className}
																			 download={isDownload}>
	{children}
</a>;

RedirectLink.propTypes = {
	href: PropTypes.string,
	target: PropTypes.string,
	className: PropTypes.string,
	isDownload: PropTypes.bool
};

RedirectLink.defaultProps = {
	href: '#',
	target: '_self',
};

const LinkContent = ({icon, iconPosition, label, params,mobileBreak}) => <>
<if condition={mobileBreak}>
{icon && Icon.POSITION.LEFT === iconPosition && <Icon image={icon} size={Icon.SIZE.MEDIUM} className='adc-icon--force-size float-left'/>}
	
	{icon && Icon.POSITION.RIGHT === iconPosition && <Icon image={icon} size={Icon.SIZE.MEDIUM} className='adc-icon--force-size float-right'/>}

</if>
<else>
<span className='d-flex align-items-center'>
	{icon && Icon.POSITION.LEFT === iconPosition && <Icon image={icon} size={Icon.SIZE.MEDIUM} className='adc-icon--force-size float-left'/>}
	<I18n text={label} params={params}/>
	{icon && Icon.POSITION.RIGHT === iconPosition && <Icon image={icon} size={Icon.SIZE.MEDIUM} className='adc-icon--force-size float-right'/>}
</span>
</else></>
;

LinkContent.propTypes = {
	icon: PropTypes.string,
	iconPosition: PropTypes.oneOf([...Object.values(Icon.POSITION)]),
	label: PropTypes.string,
	params: PropTypes.array
};

const OnClickRedirectLink = ({href, target, className, isDownload, children, action}) => <a href={href} target={target}
																							className={className}
																							download={isDownload}
																							onClick={action}>
																							{children}
																						</a>;

OnClickRedirectLink.propTypes = {
	href: PropTypes.string,
	target: PropTypes.string,
	className: PropTypes.string,
	isDownload: PropTypes.bool,
	action: PropTypes.func
};