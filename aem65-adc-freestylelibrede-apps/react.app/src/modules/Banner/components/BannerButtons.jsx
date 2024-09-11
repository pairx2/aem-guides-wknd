import React from 'react';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../Generic/components/Button/Button';
import {CTA_LAYOUT} from '../../../utils/enums';

const BannerButtons = ({cta1, cta2, size, className, disclaimer, ctaLayout, downloadcta, hasImageDownloadButton})=> {
	return (
		<>
			<div className={'adc-banner-buttons' + (ctaLayout === CTA_LAYOUT.VERTICAL ? ' adc-banner-buttons__verticalCta mb-2' : '') + ` ${className || ''}`}>
				{cta1?.text &&
				<Button
					className={'mb-3 mt-lg-0 col-lg-6 col-md-12'}
					label={cta1?.text}
					ctaStyle={cta1?.type}
					target={cta1?.action}
					href={cta1?.link}
					isFullWidth
					size={size}
				/>
				}
				<if condition={downloadcta?.text && !hasImageDownloadButton}>
					<Button
						label={downloadcta?.text}
						ctaStyle={downloadcta?.type}
						href={downloadcta?.assetPath}
						isDownload
						isFullWidth
						hasNoMargin
						icon={downloadcta?.type === BUTTON_OPTIONS.STYLE.PRIMARY ? 'download-white' : 'arrow-blue-download'}
						iconPosition={'left'}
						className={'adc-banner__ctaDownload p-relative'}
					/>
				</if>
				<elseif condition={cta1?.text && cta2?.text}>
					<Button
						className={`col-lg-6 col-md-12 mt-lg-0 ${ctaLayout === CTA_LAYOUT.VERTICAL ? 'ml-0' : ''}`}
						label={cta2?.text}
						ctaStyle={cta2?.type}
						target={cta2?.action}
						href={cta2?.link}
						isFullWidth
						size={size}
					/>
				</elseif>
			</div>
			<div className={'adc-banner-buttons__text'} dangerouslySetInnerHTML={{__html: disclaimer}}/>
		</>
	);
};

BannerButtons.propTypes = {
	cta1: PropTypes.shape({}),
	cta2: PropTypes.shape({}),
	size: PropTypes.string,
	disclaimer: PropTypes.string,
	ctaLayout: PropTypes.string,
	downloadcta: PropTypes.object,
	hasImageDownloadButton: PropTypes.bool
};
export default BannerButtons;