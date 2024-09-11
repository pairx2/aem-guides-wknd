import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from '../../../Generic/components/Link/Link';
import Button, { BUTTON_OPTIONS } from '../../../Generic/components/Button/Button';
import { logOutRequest } from '../../redux/actions/login.action';
import { i18nLabels } from '../../../../utils/translationUtils';
import LoadingIndicator from '../../../Generic/components/Loading/LoadingIndicator';
import { updateCustomerRequest } from '../../../MyAccount/redux/actions/customer.action';
import { closeModalAction } from '../../../Modal/redux/actions';
import { BOOLEAN_STRING } from '../../../../utils/enums';

const mapDispatchToProps = {
	signOut: logOutRequest,
    updateCustomer: updateCustomerRequest,
    closeModal: closeModalAction
};
const mapStateToProps = state => {
    const { loading: isLoading, loggedIn: isLoggedIn } = state.authenticationModuleReducer;
    const {customer, errorMessage} = state.myAccountModuleReducer.GetCustomerReducer;
    return { isLoading, isLoggedIn, customer, errorMessage };
};
const dataProcessConsentId = document?.getElementById('dataProcessingConsentModal');

const DataProcessingConsentModal = ({logoutPageRedirect, errorMessage, signOut, isLoading, isLoggedIn, customer, updateCustomer, closeModal, isModalOpen}) => {
    const dataProcessingConsentProps = dataProcessConsentId?.dataset?.jsonString && JSON.parse(dataProcessConsentId?.dataset?.jsonString) || {};
    const { dataProcessingConsentHeading: heading, dataProcessingConsentBody: content } = dataProcessingConsentProps;

    const submitDataProcessConsentHandler = () => {
        const updatedCustomerValues = {
            ...customer,
            data_processing: true
        };
        updateCustomer(updatedCustomerValues);
        closeModal();
        isModalOpen();
        sessionStorage.setItem('dataConsentModal', BOOLEAN_STRING.FALSE);
    };

    const signOutHandler = () =>{
        signOut(logoutPageRedirect);
        closeModal();
    }

    return (
            <>
                <div className={`adc-modal adc-modal-data-processing-consent has-overlay-popup`}>
                    <if condition={(isLoading && isLoggedIn)}>
                        <LoadingIndicator isOverlay pageLoader />
                    </if>
                                <div className="adc-modal__header text-break">{heading}</div>
                                <div className="adc-modal-body" dangerouslySetInnerHTML={{__html: content}}/>
                                <div className="actions">
                                    <div className="row">
                                        <div className="col-12 col-md-5 pr-md-0">
                                            {
                                                errorMessage && (
                                                    <p className="adc-login__error-text mb-4">{errorMessage}</p>
                                                )
                                            }
                                            <Button
                                                className={'button-block text-center w-100 mx-0'}
                                                label={i18nLabels.DATA_PROCESSING_CONSENT_ACCEPT_LABEL}
                                                ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
                                                size={BUTTON_OPTIONS.SIZE.SMALL}
                                                type={BUTTON_OPTIONS.TYPE.BUTTON}
                                                action={submitDataProcessConsentHandler}
                                            />
                                            <Link action={() => signOutHandler()}
                                                className="top-nav-item-link"
                                                label={i18nLabels.DATA_PROCESSING_CONSENT_LOGOUT_LABEL}
                                                hasNoLinkClass />
                                        </div>
                                    </div>
                                </div>
                            </div>
            </>
    )
};

DataProcessingConsentModal.propTypes = {
	errorMessage: PropTypes.string,
	logoutPageRedirect: PropTypes.string,
	signOut: PropTypes.func,
    isLoading: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    customer: PropTypes.object,
    updateCustomer: PropTypes.func,
    closeModal: PropTypes.func,
    isModalOpen: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DataProcessingConsentModal);
