import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { mockStore } from '../../../../../__mocks__/storeMock';
import AccountAddress from '../../../../../modules/MyAccount/components/AccountAddress/AccountAddress';
import { i18nLabels } from '../../../../../utils/translationUtils';
import { BUTTON_OPTIONS } from '../../../../../modules/Generic/components/Button/Button';
import { Provider } from 'react-redux';
import { ADDRESS_CHECK_ERROR, ADDRESS_CHECK_SUCCESS } from '../../../../../modules/Address/api/addressVerification.api';
import { ADDRESS_TYPE } from '../../../../../utils/enums';

Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

const setup = (props) => {
	const wrapper = shallow(<AccountAddress store={mockStore} {...props} />).dive().dive();
	return wrapper;
};
describe('AccountAddress component Test Suite ', () => {
	let props, wrapper;
	const updateAddressMock = jest.fn();
	const createAddressMock = jest.fn();
	const hideEditFormMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const openModalActionMock = jest.fn();

	beforeEach(() => {
		props = {
			heading: 'headingString',
			noAddressHeading: 'noAddressHeadingString',
			noAddressImage: 'noAddressImageString',
			verificationStatus: ADDRESS_CHECK_SUCCESS,
			updateAddress: updateAddressMock,
			createAddress: createAddressMock,
			hideEditForm: hideEditFormMock,
			verifyAddressRequest: verifyAddressRequestMock,
			openModalAction: openModalActionMock,
			verifiedAddress: {
				'id': 200891,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '56789',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 11134512',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			},
			updatedAddresses: [{
				"_200892": {
					'id': 200892,
					'prefix': 'Ms',
					'firstname': 'Alexa',
					'lastname': 'Google',
					'postcode': '12345',
					'country_id': 'DE',
					'country_name': 'Deutschland',
					'region_code': null,
					'region': null,
					'city': 'sadasdas',
					'street': [
						'ewewr'
					],
					'telephone': '+49 176 22222222',
					'rss_result_code': null,
					'address_label': 'null',
					'default_shipping': true,
					'default_billing': true,
					'__typename': 'AdcCustomerAddress'

				},
				"_-1": {
					'id': -1,
					'prefix': 'Ms',
					'firstname': 'Alexa',
					'lastname': 'Google',
					'postcode': '12345',
					'country_id': 'DE',
					'country_name': 'Deutschland',
					'region_code': null,
					'region': null,
					'city': 'sadasdas',
					'street': [
						'ewewr'
					],
					'telephone': '+49 176 22222222',
					'rss_result_code': null,
					'address_label': 'null',
					'default_shipping': true,
					'default_billing': true,
					'__typename': 'AdcCustomerAddress'

				}
			}]
		};
		wrapper = setup(props);
	});

	describe('props check', () => {

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('render check', () => {
			expect(wrapper.type()).not.toEqual(null);
		});
		test('customer object', () => {
			expect(typeof wrapper.instance().props.customer).toBe('object');
		});



	});
	describe('lifecycle method calls', () => {
		test('propsDidChange', () => {
			const prevProps = {
				heading: 'head',
				noAddressHeading: 'noaddress',
				noAddressImage: 'ImageString',
				updateAddress: updateAddressMock,
				createAddress: createAddressMock,
				hideEditForm: hideEditFormMock,
				verifyAddressRequest: verifyAddressRequestMock,
				openModalAction: openModalActionMock,
				verifiedAddress: { 'www': 'www' },
				updatedAddresses: { 'www': 'www' },
				verificationStatus: "ADDRESS_CHECK_SUCCESS"

			};
			const didChange = wrapper.instance().propsDidChange(prevProps);
			expect(didChange).toBe(true);
		});
		test('componentDidUpdate', () => {
			wrapper.instance().setState({ currentEditedAddressId: -1 });
			const prevProps = {
				heading: 'head',
				noAddressHeading: 'noaddress',
				noAddressImage: 'ImageString',
				updateAddress: updateAddressMock,
				createAddress: createAddressMock,
				hideEditForm: hideEditFormMock,
				verifyAddressRequest: verifyAddressRequestMock,
				openModalAction: openModalActionMock,
				verifiedAddress: { 'www': 'www' },
				verificationStatus: ADDRESS_CHECK_SUCCESS,
				customer: {
					'addresses': [
						{
							id: 770288,
							prefix: 'Herr',
							firstname: 'De',
							lastname: 'Qw',
							postcode: '64145',
							country_id: 'DE',
							country_name: 'Deutschland',
							region_code: null,
							region: null,
							city: 'Fr',
							street: [
								'5',
								'Tr'
							],
							telephone: '+49 15100221100',
							rss_result_code: 'AVD999',
							address_label: '',
							default_shipping: true,
							default_billing: true,
							is_blacklisted: false,
							missing_verification: false,
							__typename: 'AdcCustomerAddress'
						},
						{
							id: 778031,
							prefix: 'Herr',
							firstname: 'Hari',
							lastname: 'Goud',
							postcode: '64145',
							country_id: 'DE',
							country_name: 'Deutschland',
							region_code: null,
							region: null,
							city: 'Friedberg',
							street: [
								'45'
							],
							telephone: '+49 6122445500',
							rss_result_code: 'AVD999',
							address_label: 'billing',
							default_shipping: false,
							default_billing: false,
							is_blacklisted: false,
							missing_verification: false,
							__typename: 'AdcCustomerAddress'
						},
					]
				},
				updatedAddresses: [{
					"_-1": {
						'id': -1,
						'prefix': 'Ms',
						'firstname': 'Alexa',
						'lastname': 'Google',
						'postcode': '12345',
						'country_id': 'DE',
						'country_name': 'Deutschland',
						'region_code': null,
						'region': null,
						'city': 'sadasdas',
						'street': [
							'ewewr'
						],
						'telephone': '+49 176 22222222',
						'rss_result_code': null,
						'address_label': 'null',
						'default_shipping': true,
						'default_billing': true,
						'__typename': 'AdcCustomerAddress'

					}
				}]

			};
			wrapper.setProps({customer:{'addresses': []}});
			wrapper.instance().componentDidUpdate(prevProps);

		});
		test('componentDidUpdate', () => {
			wrapper.instance().setState({ currentEditedAddressId: -1 });
			const prevProps = {
				heading: 'head',
				noAddressHeading: 'noaddress',
				noAddressImage: 'ImageString',
				updateAddress: updateAddressMock,
				createAddress: createAddressMock,
				hideEditForm: hideEditFormMock,
				verifyAddressRequest: verifyAddressRequestMock,
				openModalAction: openModalActionMock,
				verifiedAddress: { 'www': 'www' },
				verificationStatus: ADDRESS_CHECK_SUCCESS,
				customer: {},
				updatedAddresses: [{
					"_-1": {
						'id': -1,
						'prefix': 'Ms',
						'firstname': 'Alexa',
						'lastname': 'Google',
						'postcode': '12345',
						'country_id': 'DE',
						'country_name': 'Deutschland',
						'region_code': null,
						'region': null,
						'city': 'sadasdas',
						'street': [
							'ewewr'
						],
						'telephone': '+49 176 22222222',
						'rss_result_code': null,
						'address_label': 'null',
						'default_shipping': true,
						'default_billing': true,
						'__typename': 'AdcCustomerAddress'

					}
				}]

			};
			wrapper.setProps({customer:{
				'addresses': [
					{
						id: 770288,
						prefix: 'Herr',
						firstname: 'De',
						lastname: 'Qw',
						postcode: '64145',
						country_id: 'DE',
						country_name: 'Deutschland',
						region_code: null,
						region: null,
						city: 'Fr',
						street: [
							'5',
							'Tr'
						],
						telephone: '+49 15100221100',
						rss_result_code: 'AVD999',
						address_label: ADDRESS_TYPE.SHIPPING,
						default_shipping: true,
						default_billing: true,
						is_blacklisted: false,
						missing_verification: false,
						__typename: 'AdcCustomerAddress'
					},
					{
						id: 7702881,
						prefix: 'Herr',
						firstname: 'De',
						lastname: 'Qw',
						postcode: '64145',
						country_id: 'DE',
						country_name: 'Deutschland',
						region_code: null,
						region: null,
						city: 'Fr',
						street: [
							'5',
							'Tr'
						],
						telephone: '+49 15100221100',
						rss_result_code: 'AVD999',
						address_label: ADDRESS_TYPE.SHIPPING,
						default_shipping: true,
						default_billing: true,
						is_blacklisted: false,
						missing_verification: false,
						__typename: 'AdcCustomerAddress'
					},
					{
						id: 778031,
						prefix: 'Herr',
						firstname: 'Hari',
						lastname: 'Goud',
						postcode: '64145',
						country_id: 'DE',
						country_name: 'Deutschland',
						region_code: null,
						region: null,
						city: 'Friedberg',
						street: [
							'45'
						],
						telephone: '+49 6122445500',
						rss_result_code: 'AVD999',
						address_label: ADDRESS_TYPE.BILLING,
						default_shipping: false,
						default_billing: false,
						is_blacklisted: false,
						missing_verification: false,
						__typename: 'AdcCustomerAddress'
					},
					{
						id: 7780311,
						prefix: 'Herr',
						firstname: 'Hari',
						lastname: 'Goud',
						postcode: '64145',
						country_id: 'DE',
						country_name: 'Deutschland',
						region_code: null,
						region: null,
						city: 'Friedberg',
						street: [
							'45'
						],
						telephone: '+49 6122445500',
						rss_result_code: 'AVD999',
						address_label: ADDRESS_TYPE.BILLING,
						default_shipping: false,
						default_billing: false,
						is_blacklisted: false,
						missing_verification: false,
						__typename: 'AdcCustomerAddress'
					}
				]}})
			wrapper.instance().componentDidUpdate(prevProps);

		});
	});
	describe('method calls', () => {
		test('addressEditView', () => {
			const isAddressEditViewState = wrapper.instance().state.isAddressEditView;
			wrapper.instance().addressEditView(!isAddressEditViewState);
			expect(isAddressEditViewState).not.toBe(wrapper.instance().state.isAddressEditView);
		});
		test('createNewAddress', () => {
			const PrevNewAddress = wrapper.instance().state.newAddress;
			wrapper.instance().createNewAddress();
			expect(wrapper.instance().state.newAddress).not.toBe(PrevNewAddress);
		});
		test('cancelNewAddress', () => {
			const PrevNewAddress = wrapper.instance().state.newAddress;
			wrapper.instance().cancelNewAddress();
			expect(wrapper.instance().state.newAddress).not.toBe(PrevNewAddress);
		});
		test('saveNewAddress shiping add', () => {
			wrapper.setProps({
				updatedAddresses: {
					'_-1': {
						'id': -1,
						'prefix': 'Ms',
						'firstname': '',
						'lastname': '',
						'postcode': '12345',
						'country_id': 'DE',
						'country_name': 'Deutschland',
						'region_code': null,
						'region': null,
						'city': 'sadasdas',
						'street': [
							'ewewr'
						],
						'telephone': '+49 176 22222222',
						'rss_result_code': null,
						'address_label': ADDRESS_TYPE.SHIPPING,
						'default_shipping': true,
						'default_billing': true
					}
				}
			})
			wrapper.instance().saveNewAddress();
		});
		test('saveNewAddress billing add', () => {
			wrapper.setProps({
				updatedAddresses: {
					'_-1': {
						'id': -1,
						'prefix': 'Ms',
						'firstname': 'Alexa',
						'lastname': 'Google',
						'postcode': '12345',
						'country_id': 'DE',
						'country_name': 'Deutschland',
						'region_code': null,
						'region': null,
						'city': 'sadasdas',
						'street': [
							'ewewr'
						],
						'telephone': '+49 176 22222222',
						'rss_result_code': null,
						'address_label': ADDRESS_TYPE.BILLING,
						
					}
			}
			})
			wrapper.instance().saveNewAddress();
		});
		test('saveNewAddress', () => {
			wrapper.setProps({
				updatedAddresses: {
					'_-1': {
						'id': -1,
						'prefix': 'Ms',
						'firstname': 'Alexa',
						'lastname': 'Google',
						'postcode': '12345',
						'country_id': 'DE',
						'country_name': 'Deutschland',
						'region_code': null,
						'region': null,
						'city': 'sadasdas',
						'street': [
							'ewewr'
						],
						'telephone': '+49 176 22222222',
						'rss_result_code': null,
						'address_label': "",
						'default_shipping': null
					}
			}
			})
			wrapper.instance().saveNewAddress();
		});

		test('saveAddress ', () => {
			wrapper.setState({ allAddresses: [{
				id: 770288,
				prefix: 'Herr',
				firstname: 'De',
				lastname: 'Qw',
				postcode: '64145',
				country_id: 'DE',
				country_name: 'Deutschland',
				region_code: null,
				region: null,
				city: 'Fr',
				street: [
					'5',
					'Tr'
				],
				telephone: '+49 15100221100',
				rss_result_code: 'AVD999',
				address_label: ADDRESS_TYPE.SHIPPING,
				default_shipping: null,
				default_billing: null,
				is_blacklisted: false,
				missing_verification: false,
				__typename: 'AdcCustomerAddress'
			},]})
			wrapper.setProps({customer:{
				'addresses': [
					{
						id: 770288,
						prefix: 'Herr',
						firstname: 'De',
						lastname: 'Qw',
						postcode: '64145',
						country_id: 'DE',
						country_name: 'Deutschland',
						region_code: null,
						region: null,
						city: 'Fr',
						street: [
							'5',
							'Tr'
						],
						telephone: '+49 15100221100',
						rss_result_code: 'AVD999',
						address_label: ADDRESS_TYPE.SHIPPING,
						default_shipping: null,
						default_billing: null,
						is_blacklisted: false,
						missing_verification: false,
						__typename: 'AdcCustomerAddress'
					},
					{
						id: 7702881,
						prefix: 'Herr',
						firstname: 'De',
						lastname: 'Qw',
						postcode: '64145',
						country_id: 'DE',
						country_name: 'Deutschland',
						region_code: null,
						region: null,
						city: 'Fr',
						street: [
							'5',
							'Tr'
						],
						telephone: '+49 15100221100',
						rss_result_code: 'AVD999',
						address_label: ADDRESS_TYPE.BILLING,
						default_shipping:null,
						default_billing: null,
						is_blacklisted: false,
						missing_verification: false,
						__typename: 'AdcCustomerAddress'
					}
				]}, updatedAddresses: {
					'_-1': {
						'id': -1,
						'prefix': 'Ms',
						'firstname': 'Alexa',
						'lastname': 'Google',
						'postcode': '12345',
						'country_id': 'DE',
						'country_name': 'Deutschland',
						'region_code': null,
						'region': null,
						'city': 'sadasdas',
						'street': [
							'ewewr'
						],
						'telephone': '+49 176 22222222',
						'rss_result_code': null,
						'address_label': "",
					}
			}})
			const arrayAction=wrapper.props().children.props.children[0].props.children.props.children;
			wrapper.instance().saveAddress(-1);
			expect(typeof arrayAction).toBe('function');
	
			arrayAction();
		});
		test('deleteAddress', () => {
			const id = 123456;
			wrapper.instance().deleteAddress(id);
		});
		test('addressFormInitialValues', () => {
			const address = {
				'id': 567890,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'shipping',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			const data = wrapper.instance().addressFormInitialValues(address);
			expect(data).toBeDefined();
		});
		test('addressFormInitialValues returns data', () => {
			const address = {
				'id': -1,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': null,
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			const data = wrapper.instance().addressFormInitialValues(address);
			expect(data).toBeDefined();
		});
		test('submitAddress null address', () => {
			const updatedAddress = null;
			const address = null;
			wrapper.instance().submitAddress(updatedAddress, address);
		});
		test('submitAddress updatedaddress id > 0', () => {
			const updatedAddress = {
				'id': 123456,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			const address = {
				'id': 567890,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			wrapper.instance().submitAddress(updatedAddress, address);
		});
		test('submitAddress updatedaddress id <= 0', () => {
			const updatedAddress = {
				'id': 0,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': null,
				'rss_result_code': null,
				'address_label': 'shipping',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			const address = {
				'id': 567890,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			wrapper.instance().submitAddress(updatedAddress, address);
		});
		test('submitAddress updatedaddress id <= 0', () => {
			const updatedAddress = {
				'id': 0,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': 'street',
				'telephone': null,
				'rss_result_code': null,
				'address_label': 'billing',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			const address = {
				'id': 567890,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			wrapper.instance().submitAddress(updatedAddress, address);
		});
		test('compareAddress return 0', () => {
			const Address1 = {
				'id': 200892,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			const Address2 = {
				'id': 200892,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': false,
				'__typename': 'AdcCustomerAddress'
			};

			const compareAddress = wrapper.instance().compareAddress(Address1, Address2);
			expect(compareAddress).toBe(0);
		});
		test('compareAddress return -1', () => {
			const Address1 = {
				'id': 200892,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			const Address2 = {
				'id': 200892,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': false,
				'default_billing': false,
				'__typename': 'AdcCustomerAddress'
			};

			const compareAddress = wrapper.instance().compareAddress(Address1, Address2);
			expect(compareAddress).toBe(-1);

		});
		test('compareAddress return -1', () => {
			const Address1 = {
				'id': 200892,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': false,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			const Address2 = {
				'id': 200892,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': false,
				'__typename': 'AdcCustomerAddress'
			};

			const compareAddress = wrapper.instance().compareAddress(Address1, Address2);
			expect(compareAddress).toBe(1);

		});
		test('compareAddress return -1', () => {
			const Address1 = {
				'id': 200892,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': false,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			};
			const Address2 = {
				'id': 200892,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': false,
				'default_billing': false,
				'__typename': 'AdcCustomerAddress'
			};

			const compareAddress = wrapper.instance().compareAddress(Address1, Address2);
			expect(compareAddress).toBe(undefined);

		});

	});
	describe('render jsx if isAddressEditView state is false', () => {
		test('Card render', () => {
			expect(wrapper.props().children.type.displayName).toBe('withBreakpoints(CardRender)');
		});
		test('CardContent render', () => {
			const CardContent = wrapper.props().children.props.children[0];
			expect(CardContent.type.name).toBe('CardContent');
			expect(CardContent.props.children.type.name).toBe('For');
			expect(CardContent.props.children.props.children().props.children[1].type.name).toBe('AddressDisplay');

		});
		test('CardAction render', () => {
			const CardAction = wrapper.props().children.props.children[1];
			expect(CardAction.type.name).toBe('CardAction');
			expect(CardAction.props.children.type.name).toBe('Link');
			expect(CardAction.props.children.props.icon).toBe('arrow-right');
			expect(CardAction.props.children.props.label).toBe(i18nLabels.OPEN_ADDRESS_BOOK);
		});

	});
	describe('render jsx if isAddressEditView state is true', () => {
		test('Card render', () => {
			//make isAddressEditView state true
			wrapper.instance().setState({ isAddressEditView: true });
			expect(wrapper.props().children.type.displayName).toBe('withBreakpoints(CardRender)');
			expect(wrapper.props().children.props.title).toBe(wrapper.instance().props.heading);
		});
		test('CardContent render', () => {
			//make isAddressEditView state true
			wrapper.instance().setState({ isAddressEditView: true });
			const CardContent = wrapper.props().children.props.children;
			expect(CardContent.type.name).toBe('CardContent');
		});
		test('CardAction render', () => {
			//make isAddressEditView state true
			wrapper.instance().setState({isAddressEditView:true});
			const CardAction = wrapper.props().children.props.children.props.children[1];
			expect(CardAction[0][0].type.name).toBe('CardAction');
			expect(CardAction[0][0].props.children.type.name).toBe('Col');
		});
		test('MessageBanner render', () => {
			//make isAddressEditView state true
			wrapper.instance().setState({isAddressEditView:true});
			const MessageBanner = wrapper.props().children.props.children.props.children[1];
			expect(MessageBanner[0][2].type.name).toBe('MessageBanner');
		});
		test('Button render', () => {
			//make isAddressEditView state true
			wrapper.instance().setState({isAddressEditView:true});
			const Button = wrapper.props().children.props.children.props.children[1];
			expect(Button[0][3].props.children.type.name).toBe('Button');
			expect(Button[0][3].props.children.props.type).toBe(BUTTON_OPTIONS.TYPE.BUTTON);
			expect(Button[0][3].props.children.props.label).toBe(i18nLabels.ADD_ANOTHER_ADDRESS);
			expect(Button[0][3].props.children.props.ctaStyle).toBe(BUTTON_OPTIONS.STYLE.SECONDARY);


		});
		test('AddressSelectOption render', () => {
			//make isAddressEditView state true
			wrapper.instance().setState({isAddressEditView:true});
			const AddressSelectOption = wrapper.props().children.props.children.props.children[1];
			expect(AddressSelectOption[0][1].type.name).toBe('For');
		});

		test('addressEditView fucntion call in action property of Link', () => {
			const actionProp = wrapper.props().children.props.children[1].props.children.props.action;
			expect(typeof actionProp).toBe('function');

			actionProp(true);
			expect(wrapper.instance().state.isAddressEditView).toBeTruthy();
		});

		test('other addressEditView function call in action property of Link', () => {
			wrapper.instance().setState({isAddressEditView:true});
			const actionProp= wrapper.props().children.props.children.props.children[1][0][0].props.children.props.children.props.action;
			expect(typeof actionProp).toBe('function');

			actionProp(false);
			expect(wrapper.instance().state.isAddressEditView).toBeFalsy();
		});



	});

});
describe('AccountAddress component Test Suite with mount', () => {
	let props, wrapper;
	const updateAddressMock = jest.fn();
	const createAddressMock = jest.fn();
	const hideEditFormMock = jest.fn();
	const verifyAddressRequestMock = jest.fn();
	const openModalActionMock = jest.fn();

	beforeEach(() => {
		props = {
			heading: 'headingString',
			noAddressHeading: 'noAddressHeadingString',
			noAddressImage: 'noAddressImageString',
			verificationStatus: ADDRESS_CHECK_ERROR,
			updateAddress: updateAddressMock,
			createAddress: createAddressMock,
			hideEditForm: hideEditFormMock,
			verifyAddressRequest: verifyAddressRequestMock,
			openModalAction: openModalActionMock,
			verifiedAddress: {
				'id': 200891,
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '56789',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 11134512',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			},
			updatedAddresses: {
				'id': "_200892",
				'prefix': 'Ms',
				'firstname': 'Alexa',
				'lastname': 'Google',
				'postcode': '12345',
				'country_id': 'DE',
				'country_name': 'Deutschland',
				'region_code': null,
				'region': null,
				'city': 'sadasdas',
				'street': [
					'ewewr'
				],
				'telephone': '+49 176 22222222',
				'rss_result_code': null,
				'address_label': 'null',
				'default_shipping': true,
				'default_billing': true,
				'__typename': 'AdcCustomerAddress'
			}

		};
		wrapper = mount(<Provider store={mockStore}><AccountAddress {...props} /></Provider>);
	});
	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
	test('render check', () => {
		expect(wrapper.type()).not.toEqual(null);
	});
});