import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import I18n from '../../../Translation/components/I18n';
import {i18nLabels} from '../../../../utils/translationUtils';
import Link from '../Link/Link';

export const Title = ({size, color, text, infoText, editLink, hasBorder, isCentered, className, params}) => {
	return React.createElement(size,
		{className: `${className || ''} adc-title adc-title--${color}  ${isCentered ? 'text-center' : ''} ${hasBorder ? 'adc-title--border-bottom' : ''} ${editLink ? 'd-flex justify-content-between' : ''}`},
		<>
			<span><I18n text={text} params={params}/></span>
			{infoText ?
				<Icon image={'info-box align-top mt-1'} size={Icon.SIZE.SMALL}>
					<div className="adc-tooltipbottom__content text-left p-2"
						 dangerouslySetInnerHTML={{__html: infoText}}/>
				</Icon>
				:
				editLink && <Link href={editLink}
								  icon={'edit-icon'}
								  label={i18nLabels.EDIT} />
			}

		</>);
};

Title.SIZE = {
	H1: 'h1',
	H2: 'h2',
	SECTION: 'h3',
	CARD: 'h4',
	H5: 'h5',
	H6: 'h6',
	H3: 'h3',
};

Title.COLOR = {
	BLUE: 'blue',
	BLACK: 'black',
	WHITE: 'white'
};

Title.propTypes = {
	size: PropTypes.oneOf(Object.values(Title.SIZE)),
	color: PropTypes.oneOf(Object.values(Title.COLOR)),
	hasBorder: PropTypes.bool,
	isCentered: PropTypes.bool,
	text: PropTypes.string,
	infoText: PropTypes.string,
	editLink: PropTypes.string,
	params: PropTypes.array,
};

Title.defaultProps = {
	size: Title.SIZE.H1,
	color: Title.COLOR.BLUE,
	hasBorder: false,
};