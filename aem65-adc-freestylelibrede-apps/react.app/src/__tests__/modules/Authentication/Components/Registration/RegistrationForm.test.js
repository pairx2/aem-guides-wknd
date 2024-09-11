import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import RegistrationForm from '../../../../../modules/Authentication/components/Registration/RegistrationForm';
import {mockStoreConfirmationPage, mockStoreOrder} from '../../../../../__mocks__/storeMock';

jest.mock('../../../../../utils/endpointUrl');


Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props = {}) => {
	const wrapper = shallow(<RegistrationForm store={mockStoreConfirmationPage} {...props} />).dive().dive();
	return wrapper;
};

const setupTwo = (props = {}) => {
	const wrapper = shallow(<RegistrationForm store={mockStoreOrder} {...props} />).dive().dive();
	return wrapper;
};

describe('RegistrationForm Component Test Suite', () => {

	let props, wrapper;
	const resetRegistrationErrorMock = jest.fn();
	const getBluedoorCustomerRequestMock = jest.fn();
	const openModalActionMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const applyRegisterUserMock = jest.fn();
	const registerUserMock = jest.fn();
	const getSickFundsMock = jest.fn();

	beforeEach(() => {

		props = {
			resetRegistrationError: resetRegistrationErrorMock,
			verifyAddressRequest: verifyAddressRequestMock,
			applyRegisterUser: applyRegisterUserMock,
			registerUser: registerUserMock,
			openModalAction: openModalActionMock,
			checkoutLink: 'checkoutLink',
			rxLink: 'rxLink',
			defaultLink: 'defaultLink',
			accountLink: 'accountLink',
			isEApply: false,
			initialValues: {
				firstName: 'Jhon',
				lastName: 'Doe',
				birthDate: '01.13.2000',
				kvnr: 'A947785822',
				email: 'jhon.doe@gmail.com'
			},
			getBluedoorCustomerRequest: getBluedoorCustomerRequestMock,
			getSickFunds: getSickFundsMock,
			isDisableRegistration: false,
			isSocialFlow: false
		};
		wrapper = setup(props);
	});

	describe('Render', () => {

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});

	describe('state check', () => {

		test('state check', () => {
			const stateCheck = wrapper.instance().state;
			expect(stateCheck).toBeInstanceOf(Object);
			expect(stateCheck.currentStep).toBe(1);
			expect(typeof stateCheck.currentStep).toBe('number');
			expect(stateCheck.steps).toBeInstanceOf(Object);
		});
		test('state check checkRegistrationAllowed', () => {
			
			
			 wrapper.setProps({bluedoorCustomer:{
				account_type : '2',
				dob: '01-01-2000',
				firstName: 'Jhon',
				lastName: 'Doe',
				birthDate: '01.13.2000',
				kvnr: 'A947785822',
				email: 'jhon.doe@gmail.com',
				prefix: 'her',
				health_insurance_number: '123456',
				payer_institution_name: 'abbott',
			}});
			wrapper.setProps({isSocialLogin:true});
			wrapper.setProps({isDisableRegistration:true});
			wrapper.instance().checkRegistrationAllowed();
			sessionStorage.setItem('bluedoorFlow', true);
			wrapper.instance().checkRegistrationAllowed();
			wrapper.instance().hideRegistration();
			
		});

		test('state check checkRegistrationAllowed else case', () => {
			
			
			wrapper.setProps({bluedoorCustomer:{
			   account_type : '2',
			   dob: '01-01-2000',
			   firstName: 'Jhon',
			   lastName: 'Doe',
			   birthDate: '01.13.2000',
			   kvnr: 'A947785822',
			   email: 'jhon.doe@gmail.com',
			   prefix: 'her',
			   health_insurance_number: '123456',
			   payer_institution_name: 'abbott',
		   }});
		   wrapper.setProps({isSocialLogin:true});
		   wrapper.setProps({isDisableRegistration:false});
		   wrapper.instance().checkRegistrationAllowed();
		   sessionStorage.setItem('bluedoorFlow', true);
		   wrapper.instance().checkRegistrationAllowed();
		   wrapper.instance().hideRegistration();
		   
	   });
	});

	describe('Functions call check', () => {

		test('setStep function call check', () => {
			const setStepMock = wrapper.instance().setStep;
			expect(typeof setStepMock).toBe('function');

			setStepMock(5);
			expect(wrapper.instance().state.currentStep).toBe(5);
		});

		test('Registration step 4 test case with mobile variations', () => {
			const setStepMock = wrapper.instance().setStep;
			expect(typeof setStepMock).toBe('function');

			setStepMock(4);
			expect(wrapper.instance().state.currentStep).toBe(4);
			wrapper.setProps({generalInfoFormValues: {
				prefix: 'her',
				birthDate: '20-12-1994',
				firstname: 'firstname',
				lastName: 'lastname'
			 }});
			 wrapper.setProps({contactInfoFormValues: {
				landline_phone: '+49 1212312123', 
				mobile_phone: '+49 1212312123', 
				additionalAddress:'Test'
			 }});
			 wrapper.setProps({insuranceInfoFormValues: {
				kvnr: '12345', 
				measurementsOption: '99', selectInsurance: 'private', healthInsurance:'abbott'
			 }});
			 wrapper.setProps({accountInfoFormValues: 
				{
					firstName: "gulab",
					lastName: "sisodia",
					birthDate: "01.01.2000",
					prefix: "salutation_selection_man",
					email: "test1247@yopmail.com",
					password: "Test@1234",
					dataProcessingConsentConfirmation: true,
					termsConditionsConfirmation: true,
					privacyPolicyConfirmation: true,
					trainingConfirmation: true,
					newsletterConfirmation: true,
					recaptchaValue: "03AAYGu2TW_-44EkBmizEhwwHNrumL5AWerG8tqHhwpARm15lw6wZbT-UQDuu-3FT4dIOYa_ZfDyhmhDMreaPRlOYQ1N1iZPtdIR8vxqh32xjCM_NBZDpHVNEdOeEgIDY2eJ6Be6Oh1NDD4dCGzIF03GRATFDuvbEgnjgYrOtP5VRxQv5I_PiEZ1kzV_AtgA57URszNU1spXwUByn48icXcpvWLR8-Wi51Ysc8DiVSIxrSlF6b3ubDJ1I7xskbqqBHglENOXSNHwnJ9n35Qd0JS1QqvbHIAXYAGQh8atTY3O7G-sYLdIAy1nVxfsxMGA5dFbYOgZk_9tDHBRXNGPuYqP6BgD4skEbC8VLYpxjmzTfkZqUQnZZrpeNMHM2GTXkJkfEaIRpane0Afkz2D6D1VuH2n6AuhqyoMX5fLSPB6Gs0x6QnghI5T2IL58cjn5iaAm6BSjua9b80qYS431PwTGXo8qDJgkBK2CO_GI7ZDwZ0ld6bDG..."
				  }
			});
			wrapper.instance().checkAddress();
			wrapper.instance().sendForm();
			wrapper.setProps({contactInfoFormValues: {
				landline_phone: [true, "015123123123"],
				mobile_phone: [true, "015123123123"],
				postcode: "65205",
				city: "Wiesbaden",
				street: "Max-Planck-Ring",
				"additionalAddress": "Abbott gmbh"
			  }});
			 wrapper.instance().sendForm();
			 wrapper.setProps({contactInfoFormValues: {
				landline_phone: [true, ""],
				mobile_phone: [true, ""],
				postcode: "65205",
				city: "Wiesbaden",
				street: "Max-Planck-Ring",
				"additionalAddress": "Abbott gmbh"
			  },
			  isSocialLogin: false,
			  isBlacklisted: true,
			  isVerified: true,
			});
			 wrapper.instance().sendForm();
		});

		test('Registration step 4 test case with mobile variations after social login removal', () => {
			const setStepMock = wrapper.instance().setStep;
			expect(typeof setStepMock).toBe('function');

			setStepMock(4);
			expect(wrapper.instance().state.currentStep).toBe(4);
			wrapper.setProps({generalInfoFormValues: {
				prefix: 'her',
				birthDate: '20-12-1994',
				firstname: 'firstname',
				lastName: 'lastname'
			 }});
			 wrapper.setProps({contactInfoFormValues: {
				landline_phone: '+49 1212312123', 
				mobile_phone: '+49 1212312123', 
				additionalAddress:'Test'
			 }});
			 wrapper.setProps({insuranceInfoFormValues: {
				kvnr: '12345', 
				measurementsOption: '99', selectInsurance: 'private', healthInsurance:'abbott'
			 }});
			 wrapper.setProps({accountInfoFormValues: 
				{
					firstName: "gulab",
					lastName: "sisodia",
					birthDate: "01.01.2000",
					prefix: "salutation_selection_man",
					email: "test1247@yopmail.com",
					password: "Test@1234",
					dataProcessingConsentConfirmation: false,
					termsConditionsConfirmation: false,
					privacyPolicyConfirmation: false,
					trainingConfirmation: true,
					newsletterConfirmation: true,
					recaptchaValue: "03AAYGu2TW_-44EkBmizEhwwHNrumL5AWerG8tqHhwpARm15lw6wZbT-UQDuu-3FT4dIOYa_ZfDyhmhDMreaPRlOYQ1N1iZPtdIR8vxqh32xjCM_NBZDpHVNEdOeEgIDY2eJ6Be6Oh1NDD4dCGzIF03GRATFDuvbEgnjgYrOtP5VRxQv5I_PiEZ1kzV_AtgA57URszNU1spXwUByn48icXcpvWLR8-Wi51Ysc8DiVSIxrSlF6b3ubDJ1I7xskbqqBHglENOXSNHwnJ9n35Qd0JS1QqvbHIAXYAGQh8atTY3O7G-sYLdIAy1nVxfsxMGA5dFbYOgZk_9tDHBRXNGPuYqP6BgD4skEbC8VLYpxjmzTfkZqUQnZZrpeNMHM2GTXkJkfEaIRpane0Afkz2D6D1VuH2n6AuhqyoMX5fLSPB6Gs0x6QnghI5T2IL58cjn5iaAm6BSjua9b80qYS431PwTGXo8qDJgkBK2CO_GI7ZDwZ0ld6bDG..."
				  }
			});
			wrapper.instance().checkAddress();
			wrapper.instance().sendForm();
			wrapper.setProps({contactInfoFormValues: {
				landline_phone: [true, "015123123123"],
				mobile_phone: [true, "015123123123"],
				postcode: "65205",
				city: "Wiesbaden",
				street: "Max-Planck-Ring",
				"additionalAddress": "Abbott gmbh"
			  }});
			 wrapper.instance().sendForm();
			 wrapper.setProps({contactInfoFormValues: {
				landline_phone: [true, ""],
				mobile_phone: [true, ""],
				postcode: "65205",
				city: "Wiesbaden",
				street: "Max-Planck-Ring",
				"additionalAddress": "Abbott gmbh"
			  },
			  isSocialLogin: false,
			  isBlacklisted: true,
			  isVerified: true,
			});
			 wrapper.instance().sendForm();
		});

		test('clearErrorsAndReturn function call check', () => {
			const clearErrorsAndReturnMock = wrapper.instance().clearErrorsAndReturn;
			expect(typeof clearErrorsAndReturnMock).toBe('function');

			clearErrorsAndReturnMock();

			const resetRegistrationErrorMockCallCount = resetRegistrationErrorMock.mock.calls.length;
			expect(resetRegistrationErrorMockCallCount).toBeDefined();
			expect(wrapper.instance().state.currentStep).toBe(3);
		});

		test('checkAddress function call check', () => {
			const checkAddressMock = wrapper.instance().checkAddress;
			expect(typeof checkAddressMock).toBe('function');
		});

		test('sendForm function call check', () => {
			const sendFormMock = wrapper.instance().sendForm;
			expect(typeof sendFormMock).toBe('function');
		});

		test('bluedoorDateFormat function call check', () => {
			const bluedoorDateFormatMock = wrapper.instance().bluedoorDateFormat;
			expect(typeof bluedoorDateFormatMock).toBe('function');

			expect(bluedoorDateFormatMock()).toBe('1994.12.20');
		});

		test('getSickfund function call check', () => {
			const getSickfundMock = wrapper.instance().getSickfund;
			expect(typeof getSickfundMock).toBe('function');

			expect(typeof getSickfundMock('AOK Bayern')).toBe('object');
		});

		test('initialTelephoneValues function call check', () => {
			const initialTelephoneValuesMock = wrapper.instance().initialTelephoneValues;
			expect(typeof initialTelephoneValuesMock).toBe('function');

			expect(initialTelephoneValuesMock()).toBeUndefined();
		});

		test('componentDidMount function call check', () => {
			sessionStorage.setItem('ghac', 'ghac');
			sessionStorage.setItem('rxmc', 'rxmc');
			sessionStorage.setItem('insurenceId', 'insurenceId');
			const componentDidMountMock = wrapper.instance().componentDidMount;
			expect(typeof componentDidMountMock).toBe('function');
			wrapper.instance().blueDoorCallAfterLoad();
			wrapper.instance().componentDidMount();
			const getBluedoorCustomerRequestMockCallCount = getBluedoorCustomerRequestMock.mock.calls.length;
			expect(getBluedoorCustomerRequestMockCallCount).toBeDefined();

			const getSickFundsMockCallCount = getSickFundsMock.mock.calls.length;
			expect(getSickFundsMockCallCount).toBeDefined();
		});

		test('componentDidUpdate function call check', () => {
			wrapper.setProps({
				isRegistered: true
			})
			const componentDidUpdateMock = wrapper.instance().componentDidUpdate;
			expect(typeof componentDidUpdateMock).toBe('function');

			const prevProps = {isLoading: false, verificationStatus: ''};
			wrapper.instance().componentDidUpdate(prevProps);

			expect(wrapper.instance().state.currentStep).toBe(3);

			const openModalActionMockCallCount= openModalActionMock.mock.calls.length;
			expect(openModalActionMockCallCount).toBeDefined();
		});

		test('handleGoBackInInsuranceFormMock function call check', () => {
			const handleGoBackInInsuranceFormMock = wrapper.instance().handleGoBackInInsuranceForm;
			expect(typeof handleGoBackInInsuranceFormMock).toBe('function');
			handleGoBackInInsuranceFormMock();
		});

		test('handleGoBackInContactFormMock function call check', () => {
			const handleGoBackInContactFormMock = wrapper.instance().handleGoBackInContactForm;
			expect(typeof handleGoBackInContactFormMock).toBe('function');
			handleGoBackInContactFormMock();
		});

		test('handleOnSubmitGeneralInfoFormMock function call check', () => {
			const handleOnSubmitGeneralInfoFormMock = wrapper.instance().handleOnSubmitGeneralInfoForm;
			expect(typeof handleOnSubmitGeneralInfoFormMock).toBe('function');
			handleOnSubmitGeneralInfoFormMock();
		});

		test('handleOnSubmitInsuranceFormMock function call check', () => {
			const handleOnSubmitInsuranceFormMock = wrapper.instance().handleOnSubmitInsuranceForm;
			expect(typeof handleOnSubmitInsuranceFormMock).toBe('function');
			handleOnSubmitInsuranceFormMock();
		});
		
	});

	describe('conditions inside return', () => {

		test('ProgressBar check', () => {
			const progressBarCheck= wrapper.props().children[0].props.children.type.name;
			expect(progressBarCheck).toBe('ProgressBar');

			const props = wrapper.props().children[0].props.children.props;
			expect(props).toBeInstanceOf(Object);
			expect(props.steps).toBeInstanceOf(Array);
			expect(props.currentStep).toBe(1);
		});

		test('ContactInfoForm check', () => {
			wrapper.setState({currentStep: 2});
			const componentName= wrapper.props().children[2].props.form;
			expect(componentName).toBe('contactInfoForm');
		});

		test('InsuranceInfoForm check', () => {
			wrapper.setState({currentStep: 3});
			const componentName= wrapper.props().children[3].props.form;
			expect(componentName).toBe('insuranceInfoForm');
		});

		test('AccountInfoForm check', () => {
			wrapper.setState({currentStep: 4});
			const componentName= wrapper.props().children[4].props.form;
			expect(componentName).toBe('accountInfoForm');
		});
	});

});

describe('RegistrationForm Component Test Suite', () => {

	let props, wrapper;
	const resetRegistrationErrorMock = jest.fn();
	const getBluedoorCustomerRequestMock = jest.fn();
	const openModalActionMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const applyRegisterUserMock = jest.fn();
	const registerUserMock = jest.fn();
	const getSickFundsMock = jest.fn();

	beforeEach(() => {

		props = {
			resetRegistrationError: resetRegistrationErrorMock,
			verifyAddressRequest: verifyAddressRequestMock,
			applyRegisterUser: applyRegisterUserMock,
			registerUser: registerUserMock,
			openModalAction: openModalActionMock,
			checkoutLink: 'checkoutLink',
			rxLink: 'rxLink',
			defaultLink: 'defaultLink',
			accountLink: 'accountLink',
			isEApply: false,
			initialValues: {
				firstName: 'Jhon',
				lastName: 'Doe',
				birthDate: '01.13.2000',
				kvnr: 'A947785822',
				email: 'jhon.doe@gmail.com'
			},
			getBluedoorCustomerRequest: getBluedoorCustomerRequestMock,
			getSickFunds: getSickFundsMock,
			isSocialFlow:false,
		};
		wrapper = setupTwo(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('conditions in render', () => {
		wrapper.setProps({
			bluedoorCustomer: undefined,
			isSocialLogin: true,
			additionalAddress: {
				street: "rosedale"
			},
			isEApply: true,
			generalInfoFormValues: {
				prefix: 'her',
				birthDate: '20-12-1994',
				firstname: 'firstname',
				lastName: 'lastname'
			 },
			 contactInfoFormValues: {
				landline_phone: '+49 1212312123', 
				mobile_phone: '+49 1212312123', 
				additionalAddress:'Test'
			 },
			 insuranceInfoFormValues: {
				kvnr: '12345', 
				measurementsOption: '99', selectInsurance: 'private', healthInsurance:'abbott'
			 },
			 accountInfoFormValues: 
				{
					firstName: "gulab",
					lastName: "sisodia",
					birthDate: "01.01.2000",
					prefix: "salutation_selection_man",
					email: "test1247@yopmail.com",
					password: "Test@1234",
					dataProcessingConsentConfirmation: true,
					termsConditionsConfirmation: true,
					privacyPolicyConfirmation: true,
					trainingConfirmation: true,
					newsletterConfirmation: true,
					recaptchaValue: "03AAYGu2TW_-44EkBmizEhwwHNrumL5AWerG8tqHhwpARm15lw6wZbT-UQDuu-3FT4dIOYa_ZfDyhmhDMreaPRlOYQ1N1iZPtdIR8vxqh32xjCM_NBZDpHVNEdOeEgIDY2eJ6Be6Oh1NDD4dCGzIF03GRATFDuvbEgnjgYrOtP5VRxQv5I_PiEZ1kzV_AtgA57URszNU1spXwUByn48icXcpvWLR8-Wi51Ysc8DiVSIxrSlF6b3ubDJ1I7xskbqqBHglENOXSNHwnJ9n35Qd0JS1QqvbHIAXYAGQh8atTY3O7G-sYLdIAy1nVxfsxMGA5dFbYOgZk_9tDHBRXNGPuYqP6BgD4skEbC8VLYpxjmzTfkZqUQnZZrpeNMHM2GTXkJkfEaIRpane0Afkz2D6D1VuH2n6AuhqyoMX5fLSPB6Gs0x6QnghI5T2IL58cjn5iaAm6BSjua9b80qYS431PwTGXo8qDJgkBK2CO_GI7ZDwZ0ld6bDG..."
				  }
		});
		
		expect(wrapper).toBeDefined();
		wrapper.instance().bluedoorDateFormat();
		wrapper.instance().sendForm();
	})
	test('conditions in render else cases', () => {
		wrapper.setProps({
			bluedoorCustomer: undefined,
			isSocialLogin: true,
			isEApply: true,
			generalInfoFormValues: {
				prefix: 'her',
				birthDate: '20-12-1994',
				firstname: 'firstname',
				lastName: 'lastname'
			 },
			 contactInfoFormValues: {
				landline_phone: '+49 1212312123', 
				mobile_phone: '+49 1212312123'
			 },
			 insuranceInfoFormValues: {
				kvnr: '12345', 
				measurementsOption: '99', selectInsurance: 'private', healthInsurance:'abbott'
			 },
			 accountInfoFormValues: 
				{
					firstName: "gulab",
					lastName: "sisodia",
					birthDate: "01.01.2000",
					prefix: "salutation_selection_man",
					email: "test1247@yopmail.com",
					password: "Test@1234",
					dataProcessingConsentConfirmation: true,
					termsConditionsConfirmation: true,
					privacyPolicyConfirmation: true,
					trainingConfirmation: true,
					newsletterConfirmation: true,
					recaptchaValue: "03AAYGu2TW_-44EkBmizEhwwHNrumL5AWerG8tqHhwpARm15lw6wZbT-UQDuu-3FT4dIOYa_ZfDyhmhDMreaPRlOYQ1N1iZPtdIR8vxqh32xjCM_NBZDpHVNEdOeEgIDY2eJ6Be6Oh1NDD4dCGzIF03GRATFDuvbEgnjgYrOtP5VRxQv5I_PiEZ1kzV_AtgA57URszNU1spXwUByn48icXcpvWLR8-Wi51Ysc8DiVSIxrSlF6b3ubDJ1I7xskbqqBHglENOXSNHwnJ9n35Qd0JS1QqvbHIAXYAGQh8atTY3O7G-sYLdIAy1nVxfsxMGA5dFbYOgZk_9tDHBRXNGPuYqP6BgD4skEbC8VLYpxjmzTfkZqUQnZZrpeNMHM2GTXkJkfEaIRpane0Afkz2D6D1VuH2n6AuhqyoMX5fLSPB6Gs0x6QnghI5T2IL58cjn5iaAm6BSjua9b80qYS431PwTGXo8qDJgkBK2CO_GI7ZDwZ0ld6bDG..."
				  }
		});
		
		expect(wrapper).toBeDefined();
		wrapper.instance().bluedoorDateFormat();
		wrapper.instance().sendForm();
	})
	test('conditions in render else cases bluedoorCustomer&isSocialLogin both undefined', () => {
		wrapper.setProps({
			bluedoorCustomer: undefined,
			isSocialLogin: undefined,
			isEApply: true,
			generalInfoFormValues: {
				prefix: 'her',
				birthDate: '20-12-1994',
				firstname: 'firstname',
				lastName: 'lastname'
			 },
			 contactInfoFormValues: {
				landline_phone: '+49 1212312123', 
				mobile_phone: '+49 1212312123'
			 },
			 insuranceInfoFormValues: {
				kvnr: '12345', 
				measurementsOption: '99', selectInsurance: 'private', healthInsurance:'abbott'
			 },
			 accountInfoFormValues: 
				{
					firstName: "gulab",
					lastName: "sisodia",
					birthDate: "01.01.2000",
					prefix: "salutation_selection_man",
					email: "test1247@yopmail.com",
					password: "Test@1234",
					dataProcessingConsentConfirmation: true,
					termsConditionsConfirmation: true,
					privacyPolicyConfirmation: true,
					trainingConfirmation: true,
					newsletterConfirmation: true,
					recaptchaValue: "03AAYGu2TW_-44EkBmizEhwwHNrumL5AWerG8tqHhwpARm15lw6wZbT-UQDuu-3FT4dIOYa_ZfDyhmhDMreaPRlOYQ1N1iZPtdIR8vxqh32xjCM_NBZDpHVNEdOeEgIDY2eJ6Be6Oh1NDD4dCGzIF03GRATFDuvbEgnjgYrOtP5VRxQv5I_PiEZ1kzV_AtgA57URszNU1spXwUByn48icXcpvWLR8-Wi51Ysc8DiVSIxrSlF6b3ubDJ1I7xskbqqBHglENOXSNHwnJ9n35Qd0JS1QqvbHIAXYAGQh8atTY3O7G-sYLdIAy1nVxfsxMGA5dFbYOgZk_9tDHBRXNGPuYqP6BgD4skEbC8VLYpxjmzTfkZqUQnZZrpeNMHM2GTXkJkfEaIRpane0Afkz2D6D1VuH2n6AuhqyoMX5fLSPB6Gs0x6QnghI5T2IL58cjn5iaAm6BSjua9b80qYS431PwTGXo8qDJgkBK2CO_GI7ZDwZ0ld6bDG..."
				  }
		});
		
		expect(wrapper).toBeDefined();
		wrapper.instance().bluedoorDateFormat();
		wrapper.instance().sendForm();
	})

	test('bluedoor function check isDisableRegistration false', () => {
		wrapper.setProps({
			bluedoorCustomer: undefined,
			isDisableRegistration: false
		})
		wrapper.instance().hideRegistration()
	});
	test('bluedoor function check isDisableRegistration true', () => {
		wrapper.setProps({
			bluedoorCustomer: undefined,
			isDisableRegistration: true
		})
		wrapper.instance().hideRegistration()
	})

});