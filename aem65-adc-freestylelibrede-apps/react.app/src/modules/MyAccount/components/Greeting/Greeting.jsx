import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logInRequest} from '../../../Authentication/redux/actions/login.action';

const mapStateToProps = state => {
	const {loading: isLoading, loggedIn: isLoggedIn} = state.authenticationModuleReducer;
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	return {customer, isLoading, isLoggedIn};
};

const mapDispatchToProps = {
	login: logInRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class Greeting extends Component {
	static propTypes = {
		messageMorning: PropTypes.string,
		messageAfternoon: PropTypes.string,
		messageEvening: PropTypes.string,
		customer: PropTypes.object,
		isLoggedIn: PropTypes.bool,
		isLoading: PropTypes.bool,
		login: PropTypes.func,
	};
	state = {
		greeting: ''
	};
	times = {
		noon: 12,
		evening: 18
	};

	setMessage = () => {
		const {messageMorning, messageAfternoon, messageEvening} = this.props;
		const currentHour = new Date().getHours();
		let message = '';
		if(currentHour < this.times.noon) 
			message = messageMorning;
		else 
			message = currentHour < this.times.evening ? messageAfternoon : messageEvening;
		this.setState({
			greeting: message
		});

	};

	componentDidMount() {
		const {isLoading, isLoggedIn, login} = this.props;
		!isLoading && !isLoggedIn && login({});
		this.setMessage();
	}

	render() {
		const {isLoggedIn, customer} = this.props;
		const {greeting} = this.state;
		return isLoggedIn && customer &&
				<div className="adc-greeting text-center py-4">
					<p className="adc-greeting__message fsize-16 mb-0">{`${greeting},`}</p>
					<p className="adc-greeting__message fsize-16 mb-0">{`${customer.firstname || ''} ${customer.lastname || ''}`}</p>
				</div>;
	}
});




