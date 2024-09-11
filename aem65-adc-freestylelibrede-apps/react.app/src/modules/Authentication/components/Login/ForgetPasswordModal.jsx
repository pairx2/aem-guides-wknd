import React from 'react';
import {connect} from 'react-redux';
import {i18nLabels} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import PropTypes from 'prop-types';
import Icon from '../../../Generic/components/Icon/Icon';
import Row from "../../../Generic/components/Container/Row";
import Col from "../../../Generic/components/Container/Col";
import Button, {BUTTON_OPTIONS} from "../../../Generic/components/Button/Button";

const mapStateToProps = (state) => {
    const {modalProps} = state.modalModuleReducer.ModalReducer;
    return {modalProps};
};

const mapDispatchToProps = {
    closeModalAction
};

const ForgetPasswordModal = (props) => {
    return (
        <Row className="align-items-center mt-4">
            <Col md={2} xl={1} className="text-center">
                <Icon image={'large-information'} size={Icon.SIZE.LARGER}/>
            </Col>
            <Col md={10} xl={11} className="text-left">
                <p className="forget-password-model-heading"><I18n text={'forget_password_modal_description_heading'}/></p>
            </Col>
            <Col width={12} sm={10} offsetMd={2} offsetXl={1} className="forget-password-model-text">
                <p><I18n text={'forget_password_modal_description'}/></p>
            </Col>
            <Col width={12} sm={10} md={6} xl={5} offsetMd={2} offsetXl={1} className='mt-4'>
                <Button
                    label={i18nLabels.FORGET_PASSWORD_MODAL_CTA_TEXT}
                    ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
                    href={props.forgetPasswordLink}
                    hasNoMargin
                    isFullWidth
                    className={'white-text ml-0'}
                />
            </Col>
        </Row>
    );
};

ForgetPasswordModal.propTypes = {
    heading: PropTypes.string,
    modalProps: PropTypes.shape({}),
    closeModalAction: PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgetPasswordModal);
