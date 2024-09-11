import React, {Component} from 'react';
import {withBreakpoints} from 'react-breakpoints';
import BannerContent from './BannerContent';
import BannerImage from './BannerImage';
import BannerVideo from './BannerVideo';
import BannerProduct from './BannerProduct';
import BannerButtons from './BannerButtons';
import PropTypes from 'prop-types';
import Button, {BUTTON_OPTIONS} from '../../Generic/components/Button/Button';
import {BANNER_TYPE, BANNER_IMAGE_TYPE, TEXT_ALIGNMENT} from '../../../utils/enums';
import {VIDEO_PLAY_OPTION} from '../../../utils/enums';
import Link from '../../Generic/components/Link/Link';

class Banner extends Component {
	static propTypes = {
		heading: PropTypes.string,
		subHeading: PropTypes.string,
		cta1: PropTypes.object,
		cta2: PropTypes.object,
		description: PropTypes.string,
		image: PropTypes.string,
		productImage: PropTypes.string,
		video: PropTypes.string,
		bannerType: PropTypes.string,
		textAlignmentImageBanner: PropTypes.string,
		videoTextAlignmentFullBleed: PropTypes.string,
		imageAlignment: PropTypes.string,
		productImageAlignment: PropTypes.string,
		textAlignmentProduct: PropTypes.string,
		productSku: PropTypes.string,
		videoAlignment: PropTypes.string,
		subHeadingTextColor: PropTypes.string,
		headingTextColor: PropTypes.string,
		headingType: PropTypes.string,
		subHeadingType: PropTypes.string,
		disclaimer: PropTypes.string,
		ctaLayout: PropTypes.string,
		deepLinkTarget: PropTypes.string,
		deepLinkText: PropTypes.string,
		deepLink: PropTypes.string,
		downloadcta: PropTypes.object,
		productFrequency: PropTypes.string,
		bgColor: PropTypes.string,
		hasImageDownloadButton: PropTypes.bool,
		headingAlignment: PropTypes.string,
		deepLinkId: PropTypes.string,
		imageMobile: PropTypes.string,
		imageTab: PropTypes.string,
		videoImage: PropTypes.string,
		videoPlayOption:PropTypes.string,
		textPositionImageBanner: PropTypes.string,
		productImageMobile: PropTypes.string,
		productImageTab: PropTypes.string
	};
	isFullBleed = () => (
		(this.props.bannerType === BANNER_TYPE.IMAGE && this.props.imageAlignment === BANNER_IMAGE_TYPE.FULL_BLEED) ||
		(this.props.bannerType === BANNER_TYPE.VIDEO && this.props.videoAlignment === BANNER_IMAGE_TYPE.FULL_BLEED) ||
		(this.props.bannerType === BANNER_TYPE.PRODUCT && this.props.productImageAlignment === BANNER_IMAGE_TYPE.FULL_BLEED)
	);

	isHalfWidth = () => (
		(this.props.bannerType === BANNER_TYPE.IMAGE && this.props.imageAlignment === BANNER_IMAGE_TYPE.HALF_WIDTH) ||
		(this.props.bannerType === BANNER_TYPE.PRODUCT && this.props.productImageAlignment === BANNER_IMAGE_TYPE.HALF_WIDTH) ||
		(this.props.bannerType === BANNER_TYPE.VIDEO && this.props.videoAlignment === BANNER_IMAGE_TYPE.HALF_WIDTH)
	);

	getBannerImage = () => {
		const {imageMobile, imageTab, image, breakpoints, currentBreakpoint} = this.props;
		switch (breakpoints[currentBreakpoint]) {
			case breakpoints.mobile:
				return imageMobile || image;
			case breakpoints.tablet:
				return imageTab || image;
			default:
				return image;
		}
	}
	getProductImage = () => {
		const {productImageMobile, productImageTab, productImage, breakpoints, currentBreakpoint} = this.props;
		switch (breakpoints[currentBreakpoint]) {
			case breakpoints.mobile:
				return productImageMobile || productImage;
			case breakpoints.tablet:
				return productImageTab || productImage;
			default:
				return productImage;
		}
	}

	renderFullBleed = () => {
		const {
			heading, productSku, textAlignmentProduct, disclaimer, ctaLayout, subHeading, subHeadingTextColor,
			headingType, subHeadingType, headingTextColor, videoTextAlignmentFullBleed, cta1, cta2, description, video, bannerType, textAlignmentImageBanner,
			videoPlayOption, textPositionImageBanner, deepLinkTarget, deepLinkText, deepLink, productFrequency, downloadcta, hasImageDownloadButton, headingAlignment
		} = this.props;
		const deepLinkUrl = `${deepLink}#${deepLinkTarget}`;
		let fullBleedText;
		if(bannerType === BANNER_TYPE.PRODUCT) {
			fullBleedText = textAlignmentProduct;
		}
		if(bannerType === BANNER_TYPE.IMAGE) {
			fullBleedText = textAlignmentImageBanner;
		}

		return (bannerType !== BANNER_TYPE.VIDEO ?
			<BannerImage
				textPosition={textPositionImageBanner}
				className={`adc-banner-image--text-${fullBleedText} position-relative`}
				image={bannerType === BANNER_TYPE.PRODUCT ? this.getProductImage() : this.getBannerImage()}
			>
				<if condition={bannerType === BANNER_TYPE.PRODUCT}>
					<div className="container">
						<BannerProduct
							productSku={productSku}
							headingType={headingType}
							headingTextColor={headingTextColor}
							title={heading}
							description={description}
							subHeading={subHeading}
							subHeadingTextColor={subHeadingTextColor}
							subHeadingType={subHeadingType}
							productFrequency={productFrequency}
						>
							<BannerButtons cta1={cta1} cta2={cta2} disclaimer={disclaimer} ctaLayout={ctaLayout} downloadcta={downloadcta} hasImageDownloadButton={hasImageDownloadButton}/>
						</BannerProduct>
					</div>
				</if>
				<if condition={bannerType === BANNER_TYPE.IMAGE}>
					<div className="container">
						<BannerContent
							title={heading}
							subHeadingTextColor={subHeadingTextColor}
							headingType={headingType}
							subHeadingType={subHeadingType}
							headingTextColor={headingTextColor}
							description={description}
							subHeading={subHeading}
							headingAlignment={headingAlignment}
						>
							<BannerButtons cta1={cta1} cta2={cta2} disclaimer={disclaimer} ctaLayout={ctaLayout} downloadcta={downloadcta} hasImageDownloadButton={hasImageDownloadButton}/>
						</BannerContent>
					</div>
				</if>
				<div><Link href={deepLinkUrl} className='adc-deep-link icon' label={deepLinkText}/></div>
			</BannerImage> :
			<BannerImage
				className={`adc-banner-image--text-${fullBleedText} position-relative`}
				image={videoPlayOption === VIDEO_PLAY_OPTION.DISPLAY_ON_MODAL? this.getBannerImage() : ''}>
				<BannerVideo video={video} videoPlayOption={videoPlayOption}>
					<BannerContent title={heading} subHeading={subHeading} subHeadingTextColor={subHeadingTextColor} headingType={headingType} subHeadingType={subHeadingType} headingTextColor={headingTextColor}
						className={`adc-banner-content--${videoTextAlignmentFullBleed}`} />
					<BannerButtons cta1={cta1} disclaimer={disclaimer} ctaLayout={ctaLayout} className={`adc-banner-buttons--${videoTextAlignmentFullBleed}`}
						size={BUTTON_OPTIONS.SIZE.SMALL} downloadcta={downloadcta} hasImageDownloadButton={hasImageDownloadButton}/>
					<div><Link href={deepLinkUrl} className='adc-deep-link icon' label={deepLinkText}/></div>
				</BannerVideo>
			</BannerImage>
		);
	};

	renderHalfWidth = () => {
		const {heading, subHeading, productImage, productSku, textAlignmentProduct, disclaimer, ctaLayout,
			subHeadingTextColor, headingType, subHeadingType, headingTextColor, cta1, cta2, description, image,
			video, bannerType, videoImage, videoPlayOption, textAlignmentImageBanner, downloadcta, productFrequency, hasImageDownloadButton
		} = this.props;
		const halfWidthText = textAlignmentImageBanner === TEXT_ALIGNMENT.RIGHT ? ' adc-banner__half-width--flipped' : '';
		const productText = textAlignmentProduct === TEXT_ALIGNMENT.RIGHT ? ' adc-banner__product--flipped' : '';
		return (
			<div className="container">
				<div className={'adc-banner__half-width d-flex' + (bannerType === BANNER_TYPE.PRODUCT ? productText : halfWidthText)}>
					<if condition={bannerType === BANNER_TYPE.PRODUCT}>
						<BannerProduct
							productFrequency={productFrequency}
							productSku={productSku}
							headingType={headingType}
							headingTextColor={headingTextColor}
							title={heading}
							description={description}
							subHeading={subHeading}
							subHeadingTextColor={subHeadingTextColor}
							subHeadingType={subHeadingType}
							productImage={productImage}
						>
							<BannerButtons cta1={cta1} cta2={cta2} disclaimer={disclaimer} ctaLayout={ctaLayout} downloadcta={downloadcta} hasImageDownloadButton={hasImageDownloadButton}/>
						</BannerProduct>
					</if>
					<else>
						<BannerContent
							title={heading}
							description={description}
							subHeading={subHeading}
							subHeadingTextColor={subHeadingTextColor}
							headingType={headingType}
							subHeadingType={subHeadingType}
							bannerType={bannerType}
							headingTextColor={headingTextColor}
							textAlignment={textAlignmentImageBanner}
							image={image}
							className={'d-flex justify-content-center align-self-center'}
						>
							<BannerButtons cta1={cta1} cta2={cta2} disclaimer={disclaimer} ctaLayout={ctaLayout} downloadcta={downloadcta} hasImageDownloadButton={hasImageDownloadButton}/>
						</BannerContent>
					</else>
					<div className={bannerType !== BANNER_TYPE.VIDEO ? 'd-none d-md-block' : ''}>
						{bannerType !== BANNER_TYPE.VIDEO ?
							<BannerImage image={bannerType === BANNER_TYPE.PRODUCT ? productImage : image} isHalfWidth={this.isHalfWidth()}>
								{bannerType === BANNER_TYPE.IMAGE && downloadcta?.text && hasImageDownloadButton &&
								<div className="mt-5 col mx-auto">
									<Button
										label={downloadcta?.text}
										ctaStyle={downloadcta?.type}
										href={downloadcta?.assetPath}
										isDownload
										isFullWidth
										hasNoMargin
										icon={downloadcta?.type === BUTTON_OPTIONS.STYLE.PRIMARY ? 'download-white' : 'arrow-blue-download'}
										iconPosition={'left'}
										className={'adc-banner__ctaDownload'}
									/>
								</div>
								}
							</BannerImage>
							:
							<BannerImage image={videoImage} bannerType={bannerType} isHalfWidth={this.isHalfWidth()}>
								<BannerVideo video={video} image={videoImage} videoPlayOption={videoPlayOption}/>
							</BannerImage>
						}
					</div>
				</div>
			</div>);
	};

	render() {
		const {bgColor, deepLinkId} = this.props;
		let content;
		if (this.isFullBleed()) {
			content = this.renderFullBleed();
		} else {
			content = this.renderHalfWidth();
		}
		return (
			<div className={'adc-banner ' + bgColor + (this.isFullBleed() ? ' adc-banner--fullBleed' : '')} id={deepLinkId}>
				{content}
			</div>
		);
	}
}
export default withBreakpoints(Banner);