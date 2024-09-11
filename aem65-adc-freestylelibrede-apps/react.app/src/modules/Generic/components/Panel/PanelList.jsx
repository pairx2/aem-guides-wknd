import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import {Title} from '../Title/Title.jsx';
import {PANEL_TYPE} from '../../../../utils/enums';

const PanelList = ({panelList, title, panelType, bgColor, subHeading, headingType, headingTextColor, image}) =>{
	return <div className="adc-panelList adc-panelList__image adc-panelList__bgPhoneImage" style={{backgroundImage: `url(${image})`, backgroundColor: `${bgColor}`}}>
		<if condition={panelType === PANEL_TYPE.HORIZONTAL}>
			<div className="container">
				<div className="row justify-content-center px-2">
					{title && <div className="col-12 col-lg-10">
						<Title className="text-center my-lg-3" text={title} size={headingType} color={headingTextColor} />
					</div>}
					<div className="d-lg-flex adc-panelList__flex d-block justify-content-center mt-lg-4 mb-lg-2">
						{panelList.length === 4 && panelList.map((item) =>
							<div
								key={item.icon} className={'adc-panelList__border text-md-left text-lg-center text-center mx-auto d-lg-block d-md-flex col-lg-3 col-10'}>
								<span className="px-md-2 mt-md-2 mr-md-4 mx-lg-auto mt-lg-0 mx-auto adc-panelList__circle d-flex align-items-center justify-content-center"><i className={`adc-icon adc-panelList__icon adc-icon--${item.icon} align-middle`} /></span>
								<div><Title className={'adc-panelList__sectionTitle px-1'} text={item.sectionTitle} color={item.sectionTitleColor} size={Title.SIZE.CARD}/>
									<p className={`mt-3 mt-md-0  adc-title--${item.sectionDescriptionColor} px-1`} dangerouslySetInnerHTML={{__html: item.sectionDescription}}/>
									{item.phoneNumber && <div x-ms-format-detection="none"  className={`text-align-center position-relative adc-title--${item.phoneTextColor} adc-panelList__phone`}><a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a><i className=" position-absolute mt-1 adc-icon adc-icon--medium adc-icon--online" /></div>}
									{item.ctaLabel && <Button href={item.ctaLink} label={item.ctaLabel} className={` ${item.ctaStyling == 'secondary' && 'adc-panelList__marginTop'} adc-panelList__btn mt-2`} ctaStyle={item.ctaStyling} target={item.ctaAction} />}
								</div>
							</div>)}
							 {panelList.length === 3 && panelList.map((item) =>
							<div
								key={item.icon} className={'adc-panelList__border text-md-left text-lg-center mx-auto  text-center d-lg-block d-md-flex col-lg-4 col-10'}>
								<span className="px-md-2 mt-md-2 mr-md-4 mx-lg-auto mt-lg-0 mx-auto adc-panelList__circle d-flex align-items-center justify-content-center"><i className={`adc-icon adc-panelList__icon adc-icon--${item.icon} align-middle`} /></span>
								<div><Title className={'adc-panelList__sectionTitle px-1 '} text={item.sectionTitle} color={item.sectionTitleColor} size={Title.SIZE.CARD} />
									<p className={`mt-3 mt-md-0  adc-title--${item.sectionDescriptionColor} px-lg-3`} dangerouslySetInnerHTML={{__html: item.sectionDescription}}/>
									{item.phoneNumber && <div x-ms-format-detection="none"  className={`text-align-center position-relative mt-lg-4 mt-xl-5  adc-title--${item.phoneTextColor} adc-panelList__phone`}><a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a><i className=" position-absolute mt-1 adc-icon adc-icon--medium adc-icon--online" /></div>}
									{item.ctaLabel && <Button href={item.ctaLink} label={item.ctaLabel} className={'adc-panelList__btn mt-2 '} ctaStyle={item.ctaStyling} target={item.ctaAction} />}
								</div>
							</div>)}
						{panelList.length === 2 && panelList.map((item) =>
							<div
								key={item.icon} className={'adc-panelList__border text-md-left  text-lg-center mx-auto text-center d-lg-block d-md-flex col-lg-6 col-10'}>
								<span className="px-md-2 mt-md-2 mr-md-4 mx-lg-auto mt-lg-0 mx-auto adc-panelList__circle d-flex align-items-center justify-content-center"><i className={`adc-icon adc-panelList__icon adc-icon--${item.icon} align-middle`} /></span>
								<div><Title className={'adc-panelList__sectionTitle px-1'} text={item.sectionTitle} color={item.sectionTitleColor} size={Title.SIZE.CARD}/>
									<p className={`mt-3 mt-md-0  adc-title--${item.sectionDescriptionColor} adc-panelList__description-padding `} dangerouslySetInnerHTML={{__html: item.sectionDescription}}/>
									{item.phoneNumber && <div x-ms-format-detection="none"  className={`text-align-center position-relative mt-lg-5  adc-title--${item.phoneTextColor} adc-panelList__phone`}><a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a><i className=" position-absolute mt-1 adc-icon adc-icon--medium adc-icon--online" /></div>}
									{item.ctaLabel && <Button href={item.ctaLink} label={item.ctaLabel} className={'adc-panelList__btn mt-2 '} ctaStyle={item.ctaStyling} target={item.ctaAction} />}
								</div>
							</div>)}
					</div>
				</div>
			</div>
		</if>
		<else>
			<div className="adc-panelList__bg">
				<div className="container">
					<div className="row justify-content-left col-lg-6 p-lg-0 col-12 col-md-7 offset-md-1">
						{title && <Title className="justify-content-left mb-4 mt-lg-1" text={title} size={headingType} color={headingTextColor} />}
						<p>{subHeading}</p>
						<div className="d-block adc-panelList__marginBottom">
							{panelList && panelList.map((item) =>
								<div
									key={item.icon} className={'flex-fill d-flex p-lg-0 col-lg-9 mt-lg-3'}>
									<div className="pr-3 pt-4"><span className="mx-auto"><i className={`adc-icon adc-panelList__verticalLayout-icon adc-icon--${item.icon} align-middle`} /></span></div>
									<div><Title className={'mt-3 px-1'}text={item.sectionTitle} color={item.sectionTitleColor} size={Title.SIZE.CARD}/>
										<p className={`mt-2 adc-panelList__description px-1 adc-title--${item.sectionDescriptionColor}`} dangerouslySetInnerHTML={{__html: item.sectionDescription}}/>
									</div>
								</div>)}
						</div>
					</div>
				</div>
			</div>
		</else>
	</div>};
PanelList.propTypes = {
	panelList: PropTypes.array,
	title: PropTypes.string,
	panelType: PropTypes.string,
	subHeading: PropTypes.string,
	headingType: PropTypes.string,
	headingTextColor: PropTypes.string,
	image: PropTypes.string,
	bgColor: PropTypes.string,
};
export default PanelList;


