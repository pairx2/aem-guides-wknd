import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button, {BUTTON_OPTIONS} from '../../Generic/components/Button/Button';
import {openModalAction} from '../../Modal/redux/actions/index';
import PropTypes from 'prop-types';
import {socialShare} from '../../../utils/socialShare';
import Link from '../../Generic/components/Link/Link';
import translate, {i18nLabels} from '../../../utils/translationUtils';
import Icon from '../../Generic/components/Icon/Icon';

const mapDispatchToProps = {
	openModalAction
};

const mapStateToProps = state => {
	const {dictionary} = state.translationModuleReducer.translationReducer;
	return {dictionary};
};

export default connect(mapStateToProps, mapDispatchToProps)(class SocialShare extends Component {
	static propTypes = {
		openModalAction: PropTypes.func,
		ctaNoType: PropTypes.string,
		modalMessage: PropTypes.string,
		ctaNoText: PropTypes.string,
		ctaYesType: PropTypes.string,
		ctaYesText: PropTypes.string,
		dictionary: PropTypes.object
	};
	state = {
		togglelink: false
	};

	openSocialShare = () => {
	    this.setState(e => ({
			togglelink:!e.togglelink
		}));
	}
	shareModal = (pageUrl) => {
		const {openModalAction, ctaNoText, ctaNoType, modalMessage, ctaYesText, ctaYesType} = this.props;
		this.setState(  {
			togglelink: false
		});
		openModalAction({
			contentID: 'socialShareModal',
			props: {
				ctaNoType: ctaNoType,
				modalMessage: modalMessage,
				ctaNoText: ctaNoText,
				ctaYesType: ctaYesType,
				ctaYesText: ctaYesText,
				produtUrl: pageUrl
			}
		});
	}

	render() {
		const mailBodyURL = window.location.href;
		const {dictionary} = this.props;
		return (
			<div className="social-share" onClick={this.openSocialShare}>
				<div>
					<Icon image={'share'} size={Icon.SIZE.MEDIUM} className={'social-share__btn'}/>
				</div>
				{this.state.togglelink && socialShare.map((socialLink) =>(
					<div key={socialLink.icon}>
						<if condition={socialLink.icon==='mail'}>
							<div>
								<Link
									href={`mailto:?body=${translate(dictionary, i18nLabels.MAIL_SHARE_BODY)}: ${encodeURIComponent(mailBodyURL)}`}
									icon={socialLink.icon}
								/>
							</div>
						</if>
						<else>
							<Button
								icon={socialLink.icon}
								type={BUTTON_OPTIONS.TYPE.BUTTON}
								action={() => this.shareModal(socialLink.produtUrl)}
								className={'social-share__btn'}
							/>
						</else>
					</div>
				))
				}
			</div>
		);
	}
});