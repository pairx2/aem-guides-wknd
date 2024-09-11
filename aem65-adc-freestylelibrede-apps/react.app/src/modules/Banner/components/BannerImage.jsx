import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BANNER_TYPE} from '../../../utils/enums';

export default class BannerImage extends Component {

	static propTypes = {
		image: PropTypes.string,
		isHalfWidth: PropTypes.bool,
		textPosition:  PropTypes.string,
		bannerType: PropTypes.string
	};

	render() {
		const {children, isHalfWidth, image, textPosition, bannerType} = this.props;
		return (
			<>
				<if condition={isHalfWidth}>
					<div className="adc-banner-halfBleedImage adc-banner__order1 justify-content-center text-center align-self-center">
						<div>
							{bannerType !== BANNER_TYPE.VIDEO && <img className="adc-banner-halfBleedImage--img  lazyload" data-src={image} />}
							{children}
						</div>
					</div>
				</if>
				<else>
					<div
						className={`adc-banner-image lazyload ${textPosition}` + (children ? ' adc-banner-image--fullBleed ' : '') + ` ${this.props.className || ''}`}
						data-bg={image}>
						{children}
					</div>
				</else>
			</>
		);
	}
}
