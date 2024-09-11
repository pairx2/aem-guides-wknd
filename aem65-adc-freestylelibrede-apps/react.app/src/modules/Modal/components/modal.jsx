import React, {Component} from 'react';
import {connect} from 'react-redux';
import {closeModalAction} from '../redux/actions/index';
import {getComponentByTitle} from './modalComponentMapping';
import PropTypes from 'prop-types';
import I18n from '../../Translation/components/I18n';
import {withBreakpoints} from 'react-breakpoints';
import Icon from "../../Generic/components/Icon/Icon";

const mapStateToProps = state => {
	const {modalOpen: isModalOpen, modalHeading, modalContentID, modalProps, modalSize, modalClassName, canModalClose, showModalCloseIcon} = state.modalModuleReducer.ModalReducer;
	return {isModalOpen, modalHeading, modalContentID, modalProps, modalSize, modalClassName, canModalClose, showModalCloseIcon};
};

const mapDispatchToProps = {
	closeModalAction
};

export const MODAL_SIZE = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large'
};

export default connect(mapStateToProps, mapDispatchToProps)(withBreakpoints(class Modal extends Component {
	static propTypes = {
		modalSize: PropTypes.object,
		isModalOpen: PropTypes.bool,
		modalContentID: PropTypes.string,
		modalHeading: PropTypes.string,
		closeModalAction: PropTypes.func,
		modalProps: PropTypes.object,
		modalClassName: PropTypes.string,
		canModalClose: PropTypes.bool,
		showModalCloseIcon:PropTypes.bool
	};
	static defaultProps = {
		modalSize: {
			desktop: MODAL_SIZE.LARGE,
			tablet: MODAL_SIZE.MEDIUM,
			mobile: MODAL_SIZE.SMALL
		},
		canModalClose:true,
		showModalCloseIcon:false
	};
	componentDidMount() {
		document.addEventListener('keyup', this.modalClose);
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this.modalClose);
	}

	modalClose = (e) => {
		if (e.key === 'Escape' && this.props.canModalClose) this.props.closeModalAction();
	}

	componentDidUpdate(prevProps) {
		const modal = document?.querySelector('.adc-modal');
		const modalDataProcessing = document.querySelector('.adc-modal-data-processing-consent');
		if (this.propsDidChange(prevProps)) {
			if (this.props.isModalOpen && modalDataProcessing) {
				modal?.setAttribute('class', '');
			}
		}
	}

	propsDidChange(prevProps) {
		//check if the necessary props have actually updated
		if (this.props.isModalOpen !== prevProps.isModalOpen) {
			return true;
		}
	}

	getSize = () => {
		const {modalSize, currentBreakpoint} = this.props;
		switch(currentBreakpoint) {
			case 'mobile':
				return modalSize.mobile;
			case 'tablet':
				return modalSize.tablet;
			case 'desktop':
			default:
				return modalSize.desktop;
		}
	}

	render() {
		const {isModalOpen, modalContentID, modalHeading, closeModalAction, modalProps, modalClassName, canModalClose, showModalCloseIcon} = this.props;
		const ModalContent = modalContentID ? getComponentByTitle(modalContentID) : undefined;
		return <if condition={isModalOpen}>
			<div className={`adc-modal adc-modal--${this.getSize()} ${modalClassName || ''}`}>
				{modalHeading && <div className="adc-modal__header text-break"><I18n text={modalHeading}/></div>}
				{showModalCloseIcon && <Icon image={'close-icon'} className={'adc-modal__close-icon'} size={Icon.SIZE.MEDIUM} onClick={()=>closeModalAction()}/>}
				<div className="adc-modal-body">
					{ModalContent && <ModalContent {...modalProps} />}
				</div>
			</div>
			<div className="adc-modal-overlay" onClick={canModalClose ? closeModalAction : null}/>
		</if>;
	}
}));