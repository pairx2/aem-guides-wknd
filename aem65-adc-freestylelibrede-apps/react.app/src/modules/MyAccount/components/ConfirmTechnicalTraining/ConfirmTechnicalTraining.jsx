import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { valueDecode, completedTrainingStatus } from '../../../../utils/technicalTrainingUtils';
import { getWcmMode } from '../../../../utils/orderUtils';

const mapStateToProps = state => {
    const { customer } = state.myAccountModuleReducer.GetCustomerReducer;
    return { customer };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(class ConfirmTechnicalTraining extends Component {

    state = {
        breakIt: true,
        showTechTrainingContent: false
    }

    static propTypes = {
        heading: PropTypes.string,
        cta: PropTypes.object,
        technicalTrainingDoneMessage: PropTypes.string,
        technicalTrainingNotDoneMessage: PropTypes.string,
        customer: PropTypes.object,
        productTrainings: PropTypes.object,
        banner: PropTypes.string,
        hmmUrl: PropTypes.string,
        technicalTrainingTabMapping: PropTypes.string
    };


    showHideTechnischeEinweisungNav = (isTechTrainingAvailable, classId) => {
        if (!getWcmMode()) {
            if (document.getElementById('myTempStyle')) {
                document.getElementById('myTempStyle').remove();
            }
            const displayValue = isTechTrainingAvailable ? 'block' : 'none !important'
            let styleValue = document.createElement('style');
            styleValue.type = 'text/css';
            styleValue.id = 'myTempStyle';
            styleValue.innerHTML = '.' + classId + ' { display: ' + displayValue + '; }';
            document.getElementsByTagName('head')[0].appendChild(styleValue);
        }
    }

    componentDidMount() {
        const { technicalTrainingTabMapping } = this.props;
        this.showHideTechnischeEinweisungNav(false, technicalTrainingTabMapping);
    }

    showPendingTrainingCount = () => {
        document.querySelectorAll('i.adc-icon--technical-training-complete-icon')?.forEach(function (element) {
            element.classList.add('adc-icon--technical-training-pending-icon');
            element.classList.remove('adc-icon--technical-training-complete-icon')
        });
    }

    componentDidUpdate(prevProps) {
        const { customer, technicalTrainingTabMapping } = this.props;
        if (customer.technical_instructions && customer.technical_instructions.length > 0 && customer.payer_number && customer.payer_number !== null && customer.health_insurance_number && customer.health_insurance_number !== null && !this.state.showTechTrainingContent) {
            this.setState({ showTechTrainingContent: true })
            this.showHideTechnischeEinweisungNav(true, technicalTrainingTabMapping);
            if (customer?.technical_instructions?.filter(value => value.status.toLowerCase() !== completedTrainingStatus).length > 0) {
                this.showPendingTrainingCount();
                this.setState({ breakIt: false });
            }
        }
    }

    render() {
        const { customer, productTrainings, banner, hmmUrl } = this.props;
        const valueMergedData = customer?.technical_instructions?.map(obj => Object.assign(obj, productTrainings.find(user => obj.product_version === user.productVersion)));
        return (
            <>
                <if condition={this.state.showTechTrainingContent}>
                    <div className='adc-confirm-tech-training-flex-container'>

                        {valueMergedData?.filter(opt => opt.heading).map((item, i) => (
                            <div key={item.hmmProductVersion} className={"bg-white mb-3 px-4 px-md-5 py-4 rounded adc-confirm-tech-training-order-" + (item.status.toLowerCase() === completedTrainingStatus ? (valueMergedData?.filter(opt => opt.heading).length + i + 1).toString() : i.toString())}>
                                <h4 className=" adc-title adc-title--blue adc-title--border-bottom ">
                                    <span>{item.heading}</span>
                                </h4>

                                <div className='row justify-content-between align-items-center'>
                                    <if condition={item.status.toLowerCase() !== completedTrainingStatus}>
                                        <a href={hmmUrl + "?customerid=" + valueDecode(customer?.user_id) + "&product=" + valueDecode(item?.hmmProductVersion)} target={item.cta.action} className={"adc-button  text-center adc-panelList__btn adc-confirm-tech-training-btn mx-3 adc-button-" + item.cta.type}>{item.cta.text}</a>
                                    </if>
                                    <div className='d-flex justify-content-around ml-3'>
                                    <div className={item.status.toLowerCase() === completedTrainingStatus ? 'adc-confirm-tech-training-icon-done' : 'adc-confirm-tech-training-icon-not-done'}>
                                    </div>
                                        <p className='col adc-confirm-tech-training-tech-text'>
                                            {item.status.toLowerCase() === completedTrainingStatus ? item.technicalTrainingDoneMessage : item.technicalTrainingNotDoneMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <if condition={!this.state.breakIt}>
                            <div className={'adc-confirm-tech-training-order-' + (valueMergedData?.filter(opt => opt.heading)?.length)?.toString()} dangerouslySetInnerHTML={{ __html: banner }}></div>
                        </if>
                    </div>
                </if>

            </>
        )
    }
});