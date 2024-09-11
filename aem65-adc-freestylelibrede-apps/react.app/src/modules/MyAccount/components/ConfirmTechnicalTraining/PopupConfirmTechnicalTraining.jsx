import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import { closeModalAction } from '../../../Modal/redux/actions';
import { BOOLEAN_STRING } from '../../../../utils/enums';

const mapDispatchToProps = {
	closeModal: closeModalAction
};

class PopupConfirmTechnicalTraining extends Component {
    static propTypes = {
		closeModal: PropTypes.func,
        technicalTrainingPopUpHeading: PropTypes.string,
        technicalTrainingPopUpMessage: PropTypes.string,
        cta: PropTypes.object
	};
    
    redirectHandler = () => {
        const { closeModal, cta } = this.props;
        closeModal();
        sessionStorage.setItem('techTrainingPopup', BOOLEAN_STRING.FALSE);
        window.location.hash = cta.link;
        window.location.replace(window.location.hash);

    }
    render() {
        const { technicalTrainingPopUpHeading, technicalTrainingPopUpMessage, cta } = this.props;
        return (
            <>
                <div className="adc-modal-delete">
                    <h4 className="text-left">
                        <div className=" d-flex justify-content-start align-items-center col-12 text-left mb-3 col-md-12 p-0 flex-wrap">
                            <i className='adc-confirm-tech-training--exclamation-icon'/>
                            { technicalTrainingPopUpHeading && <span className='adc-title--blue' dangerouslySetInnerHTML={{__html: technicalTrainingPopUpHeading}}></span> }
                        </div>
                    </h4>
                    <div className="row mt-3 p-0">
                        { technicalTrainingPopUpMessage && <div className="col-12 col-md-12 text-left" dangerouslySetInnerHTML={{__html: technicalTrainingPopUpMessage}}></div> }
                    </div>
                    <div className="row mt-4 text-left">
                                <div className="col-12 col-lg-8">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <Button
                                                action={() => this.redirectHandler()}
                                                ctaStyle={BUTTON_OPTIONS.STYLE[cta.type]}
                                                className={'px-0 close-modal'}
                                                isFullWidth
                                                hasNoMargin
                                                label={cta.text}
                                            />
                                        </div>
                                    </div>
                                </div>
                    </div>
                </div>
            </>
        )
    }
}

PopupConfirmTechnicalTraining = connect(
	null, mapDispatchToProps
)(PopupConfirmTechnicalTraining);

export default PopupConfirmTechnicalTraining;