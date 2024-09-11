import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { plusServiceCancellationRequest } from '../redux/actions/plus_service_cancellation.action';
import FieldsPlus from '../components/FieldsPlus';
import { formateDateWithDotSeprator } from "../../../utils/dateUtils";
import { structureValue } from '../utils/plusServiceFiledCheck';
import {cancelPlusServiceFormSuccess, cancelPlusServiceFormStart, cancelPlusServiceFormError} from '../../../utils/adobeAnalyticsUtils';

const mapStateToProps = state => {
    const { values: fieldsPlusValues } = state.form.fieldsPlus || {};
    const { plusServiceCancellationResponce, errorMessage,errorCode } = state.plusServiceCancellationModuleReducer?.PlusServiceCancellationReducer || {};
    return { fieldsPlusValues, plusServiceCancellationResponce, errorMessage,errorCode }
}
const mapDispatchToProps = (dispatch) => ({ cancelRequest: (inputValue) => dispatch(plusServiceCancellationRequest(inputValue)) });
export default connect(mapStateToProps, mapDispatchToProps)(class PlusServiceCancellation extends Component {
    static propTypes = {
        fields: PropTypes.object,
        fieldsPlusValues: PropTypes.object,
        enablecaptcha: PropTypes.bool,
        serviceEndpoint: PropTypes.string,
        endpointpath: PropTypes.string,
        cta: PropTypes.object,
        disclaimerText: PropTypes.string,
        confirmationPageTitle: PropTypes.string,
        confirmationPageDescription: PropTypes.string,
        confirmationPageCta: PropTypes.object,
        cancelRequest: PropTypes.func,
        plusCancellationErrorMessage: PropTypes.string,
        plusServiceCancellationErrorMessage: PropTypes.string,
        confirmationPageCancellationDateLabel: PropTypes.string,
        plusServiceCancellationResponce: PropTypes.string,
        errorMessage: PropTypes.string,
        errorCode: PropTypes.number
    };
    state = {
        isSubmited: false,
        currentDate: "",
        finalValueArray: [],
        reset: false,
        isTrackingCalled : false
    };


    constructPayload = () => {
        const { fields, fieldsPlusValues } = this.props;
        const firstname = structureValue("firstname", fields, fieldsPlusValues);
        const lastname = structureValue("lastname", fields, fieldsPlusValues);
        const email = structureValue("email", fields, fieldsPlusValues);
        const dob = structureValue("dob", fields, fieldsPlusValues);
        const termination = structureValue("requiredDate", fields, fieldsPlusValues);
        const terminationTime = termination.toLowerCase().includes("datum") ? structureValue("terminationTime", fields, fieldsPlusValues) : "";
        const terminationType = structureValue("terminationType", fields, fieldsPlusValues);
        const terminationReason = structureValue("terminationReason", fields, fieldsPlusValues);

        const returnarr = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            dob: dob,
            termination: termination,
            terminationTime: terminationTime,
            terminationType: terminationType,
            terminationReason: terminationReason,
        }
        return returnarr;
    }
    handleSubmit = async () => {
        await window?.grecaptcha?.enterprise?.execute().then((token)=> {
        this.setState({  reset: false });
        const { cancelRequest } = this.props;
        const payloadValue = this.constructPayload();
        cancelRequest(payloadValue);    
        })  
    }
    handlePrint = () => {
        window.print();
    }
    getValues = () => {
        let arr = [];
        const valueFormateDate = this.props.fieldsPlusValues['terminationTime'] ? formateDateWithDotSeprator(this.props.fieldsPlusValues['terminationTime']) : "";
        arr = this.state.finalValueArray?.map(value => ({ key: value.id, value: value.fieldId?.toLowerCase().includes("terminationtime") ? valueFormateDate : this.props.fieldsPlusValues[value.id] }))
        return arr;
    }



    componentDidUpdate = (prevProps) => {
        if (!this.state.isTrackingCalled && this.props.fieldsPlusValues !== undefined) {
            cancelPlusServiceFormStart();
            this.setState({ isTrackingCalled: true });
        }

        if (this.props.fieldsPlusValues !== prevProps.fieldsPlusValues && this.state.reset === true) {
            this.setState({ reset: false });
        }

        if (this.props.plusServiceCancellationResponce !== prevProps.plusServiceCancellationResponce && this.state.reset === false) {

            if (this.props.plusServiceCancellationResponce === "success") {
                cancelPlusServiceFormSuccess();
                window?.grecaptcha?.enterprise.reset();
                this.setState({ isSubmited: true, reset: true });
                document.getElementById('noPrint').style.display = "none";
                window.scrollTo(0, 0);
            }
            if (this.props.plusServiceCancellationResponce === "fails") {
                cancelPlusServiceFormError(this.props.errorMessage);
                window?.grecaptcha?.enterprise.reset();
                this.setState({ isSubmited: false, reset: true });
                document.getElementById('noPrint').style.display = "block";
            }
        }
    }
    render() {
        const { fields, fieldsPlusValues, enablecaptcha, cta, disclaimerText, confirmationPageTitle,
            confirmationPageDescription,
            confirmationPageCta, plusServiceCancellationResponce, plusServiceCancellationErrorMessage, confirmationPageCancellationDateLabel , errorCode } = this.props;
        const { isSubmited, currentDate, finalValueArray } = this.state;


        if (currentDate === "") {
            this.setState({ currentDate: formateDateWithDotSeprator(new Date()) });

        }
        if (finalValueArray.length < 1 && fields.length > 0) {
            const finalValue = fields.map((valuearr) => ({ id: valuearr.fieldName?.split('(')[0].trim(), value: "" , fieldId: valuearr.fieldId }));
            this.setState({ finalValueArray: finalValue });
        }
        return (
            <>
                <if condition={!isSubmited}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="container">
                            <div className="row align-items-center px-3 px-md-0 px-sm-0">
                                <div className="col-12 col-lg-8" >
                                    <div className="adc-registration">
                                        <FieldsPlus fields={fields}
                                            cta={cta}
                                            disclaimerText={disclaimerText}
                                            enablecaptcha={enablecaptcha}
                                            plusServiceCancellationResponce={plusServiceCancellationResponce}
                                            plusServiceCancellationErrorMessage={plusServiceCancellationErrorMessage}
                                            onSubmit={this.handleSubmit}
                                            errorCode={errorCode} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </if>
                <else>

                    <div className="container">
                        <div className="row align-items-center px-3 px-md-0 px-sm-0">
                            <div className="col-12 col-lg-8 plus-cancellation-row-position" >
                                <div id="printablediv" className='myDivToPrint'>
                                    <div className="plus-cancellation-tittle-headding">{confirmationPageTitle}</div>
                                    <br />
                                    <div className="plus-cancellation-content" dangerouslySetInnerHTML={{ __html: confirmationPageDescription }}></div>
                                    <br />
                                    {
                                        fieldsPlusValues && this.getValues().map(arrayValue => <>
                                            <if condition={arrayValue.value !== "" && arrayValue.value !== undefined}>
                                                <div key={arrayValue.key} className="plus-cancellation-print-flex plus-cancellation-printvalue-Item">
                                                    <div className="col-xs-6 plus-cancellation-printvalue-Item-bold">{arrayValue.key}: </div>

                                                    <div className="col-xs-6 plus-cancellation-confirmation-screen-item-padding"> {typeof arrayValue.value === "string" ? arrayValue.value : arrayValue.value.value}
                                                    </div>

                                                </div>
                                                <br />
                                            </if></>
                                        )


                                    }
                                    <div key={"currentDate"} className="plus-cancellation-print-flex plus-cancellation-printvalue-Item">
                                        <div className="col-xs-6 plus-cancellation-printvalue-Item-bold">{confirmationPageCancellationDateLabel}: </div>

                                        <div className="col-xs-6 plus-cancellation-confirmation-screen-item-padding"> {currentDate}
                                        </div>

                                    </div>
                                    <br />
                                </div>
                                <button
                                    className={'adc-button mt-3 mb-4 ml-0 mr-0 adc-button--block adc-button-' + confirmationPageCta.type}
                                    onClick={this.handlePrint}>{confirmationPageCta.text}
                                </button>
                            </div>
                        </div>
                    </div>
                </else>
            </>
        )
    }
});