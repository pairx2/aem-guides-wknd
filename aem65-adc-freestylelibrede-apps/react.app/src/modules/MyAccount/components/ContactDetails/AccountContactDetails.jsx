import React, {Component} from 'react';
import {connect} from 'react-redux';
import ParentContactBoxes from './ParentContactDetails';
import PropTypes from 'prop-types';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import {getCustomerPermissionRequest, updateCustomerPermissionRequest} from '../../redux/actions/customer.action';
import {COMMUNICATION_CHANNEL_TYPES} from '../../../../utils/enums';

const mapStateToProps = state => {
	const {permissions, errorCode, errorCodeUpdate} = state.myAccountModuleReducer.GetCustomerPermissionReducer;
	const {email, is_mobile_verified:isMobileVerified} = state.myAccountModuleReducer.GetCustomerReducer.customer;
	return {email, isMobileVerified, permissions, errorCode, errorCodeUpdate};
};
const mapDispatchToProps = {
	getCustomerPermissionRequest,
	updateCustomerPermissionRequest
};
export default connect(mapStateToProps, mapDispatchToProps)(class ContactBoxes extends Component {
	static propTypes = {
		heading: PropTypes.string,
		abortCtaStyle: PropTypes.string,
		saveCtaStyle: PropTypes.string,
		email:PropTypes.string,
		permissions:PropTypes.array,
		getCustomerPermissionRequest: PropTypes.func,
		updateCustomerPermissionRequest: PropTypes.func,
		errorCode:PropTypes.number,
		errorCodeUpdate: PropTypes.number,
		isMobileVerified: PropTypes.bool
	};
	state = {
		editClick: false
	};
	componentDidMount() {
		this.props.getCustomerPermissionRequest();
	}
	switchComponentHandler = () => {
		this.setState({
			editClick: !this.state.editClick
		});
	};
	updateCustomerPermissions = async (values) => {
		const { updateCustomerPermissionRequest } = this.props;
		const permissionsObj = {};
		Object.keys(values).forEach(key=>{
			const comm_type = key.split('_FOR_')[1];
			const comm_channel = key.split('_FOR_')[0];
			if(comm_type !== COMMUNICATION_CHANNEL_TYPES.PROACTIVE) {
				permissionsObj[comm_type] = {...permissionsObj[comm_type]};
				permissionsObj[comm_type]['subscriber_email'] = this.props.email;
				permissionsObj[comm_type]['communication_type'] = comm_type;
				permissionsObj[comm_type]['communication_channel'] = permissionsObj[comm_type]['communication_channel'] ? [...permissionsObj[comm_type]['communication_channel']] : [];
				if(values[key]) permissionsObj[comm_type]['communication_channel'].push(comm_channel);
			}
		});
		await window?.grecaptcha?.enterprise?.execute().then(function (token){
				Object.keys(permissionsObj).forEach( key =>{
					updateCustomerPermissionRequest(permissionsObj[key]);
				});
			});
		this.switchComponentHandler();
	};
	render() {
		const {heading, abortCtaStyle, saveCtaStyle, permissions, email, errorCode, isMobileVerified, errorCodeUpdate} = this.props;
		return <Card title={heading}>
			<CardContent>
				<ParentContactBoxes
					abortCtaStyle={abortCtaStyle}
					saveCtaStyle={saveCtaStyle}
					switchComponentHandler={this.switchComponentHandler}
					isEditing={this.state.editClick}
					permissions={permissions}
					isMobileVerified={isMobileVerified}
					email={email}
					onSubmit={this.updateCustomerPermissions}
					errorCode={errorCode}
					errorCodeUpdate={errorCodeUpdate}
				/>
			</CardContent>
		</Card>;
	}
});