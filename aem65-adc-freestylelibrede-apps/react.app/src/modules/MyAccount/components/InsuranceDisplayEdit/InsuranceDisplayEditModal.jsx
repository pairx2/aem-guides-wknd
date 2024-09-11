import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from '../../../Generic/components/Icon/Icon';
import PropTypes from 'prop-types';
import Button from '../../../Generic/components/Button/Button';
import Row from '../../../Generic/components/Container/Row';
import Col from '../../../Generic/components/Container/Col';
import {updatePayerRequestSuccess} from '../../redux/actions/customer.action';
import {closeModalAction} from '../../../Modal/redux/actions/index';
import {empty} from '../../../../utils/default';


const mapStateToProps = state => {
	const {modalProps} = state.modalModuleReducer.ModalReducer;
	return {modalProps};
};

const mapDispatchToProps = {
	updatePayerRequestSuccess,
	closeModalAction
};
export default connect(mapStateToProps, mapDispatchToProps)(class InsuranceDisplayEditModal extends Component {

	static propTypes = {
		closeModalAction: PropTypes.func,
		updatePayerRequestSuccess: PropTypes.func,
		insuranceDisplayHeading: PropTypes.string,
		insuranceDisplayButtonText: PropTypes.string,
	};

	static defaultProps = {
		closeModalAction: empty.function
	};

	handleAction = () => {
		const {updatePayerRequestSuccess, closeModalAction} = this.props;
		updatePayerRequestSuccess();
		closeModalAction();

	};

	render() {
		const {insuranceDisplayHeading, insuranceDisplayButtonText} = this.props;
		return <Row>
			<Col className='border-bottom-grey'>
				<div className="row mt-3">
					<div className="col-12 col-md-1 text-center">
						<Icon
							image={'large-danger-orange'}
							size={'large'}
						/>
					</div>
					<div className="col-12 col-md-11 text-left" dangerouslySetInnerHTML={{__html: insuranceDisplayHeading}}/>
				</div>
				<div className="row mt-3 mb-4">
					<div className="col-12 col-md-1 text-center" />
				</div>
			</Col>
			<Col className='mt-4'>
				<Col lg={4} className='mt-2 float-right'>
					<Button
						label={insuranceDisplayButtonText}
						action={this.handleAction}
						hasNoMargin
						className={'full-width'}
						isFullWidth
					/>
				</Col>
			</Col>
		</Row>;
	}
});