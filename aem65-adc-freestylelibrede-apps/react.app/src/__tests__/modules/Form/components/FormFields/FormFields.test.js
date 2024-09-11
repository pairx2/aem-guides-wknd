import React from 'react';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import {fireEvent, render , userEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FirstNameField from '../../../../../modules/Form/components/FormFields/FirstNameField';
import MockForm from '../../../../../__mocks__/mockForm';
import AdditionalAddressField from '../../../../../modules/Form/components/FormFields/AdditionalAddressField';
import EmailField from '../../../../../modules/Form/components/FormFields/EmailField';
import BirthDateField from '../../../../../modules/Form/components/FormFields/BirthDateField';
import PayerNumberField from '../../../../../modules/Form/components/FormFields/PayerNumberField';
import LastNameField from '../../../../../modules/Form/components/FormFields/LastNameField';
import KVNRField from '../../../../../modules/Form/components/FormFields/KVNRField';
import AddressTypeField from '../../../../../modules/Form/components/FormFields/AddressTypeField';
import VoucherField from '../../../../../modules/Form/components/FormFields/VoucherField';
import I18n from '../../../../../modules/Translation/components/I18n';
import {fraudDomains} from '../../../../../modules/Form/components/FormFields/EmailField.jsx';

describe('test AdditionalAddressField component', () => {
	test('is not a required field, so it should not show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			<MockForm>
				{children}
			</MockForm>
		</Provider>;
		const {getByPlaceholderText, getByText} = render(
			<AdditionalAddressField text={'test_key'}/>, {wrapper: wrapper}
			,
		);
		const field = getByPlaceholderText('additionaladdress_hinttext');
		expect(field).toHaveClass('adc-form-group__input');
		fireEvent.click(getByText('submit'));
		expect(field).toHaveClass('adc-form-group__input');

	});
});

describe('test FirstNameField component', () => {
	test('is a required field, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			<MockForm>
				{children}
			</MockForm>
		</Provider>;
		const {getByPlaceholderText, getByText} = render(
			<FirstNameField text={'test_key'}/>, {wrapper: wrapper}
			,
		);
		const field = getByPlaceholderText('firstname_hinttext');
		expect(field).toHaveClass('form-control adc-form-group__input');
		fireEvent.click(getByText('submit'));
		expect(field).toHaveClass('adc-form-group__input--error');

	});
});
describe('test EmailField component', () => {
	test('is a required field, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			<MockForm>
				{children}
			</MockForm>
		</Provider>;
		const {getByPlaceholderText, getByText} = render(
			<EmailField text={'test_key'}/>, {wrapper: wrapper}
			,
		);
		const field = getByPlaceholderText('email_hinttext');
		expect(field).toHaveClass('adc-form-group__input');
		fireEvent.click(getByText('submit'));
		
		fireEvent.change(field, { target: { value: 'a' } })
		expect(typeof field.value).toBe('string');
		expect(field).toHaveClass('adc-form-group__input--error');		
	});
	test('Fraud domain valiation message', async () => {

		const actualMessage = fraudDomains("test@test.com");
		const expectedMessage = <I18n text="email_fraud_domain_message" />;
		expect(actualMessage).toEqual(expectedMessage);
			
	});
});
describe('test BirthDateField component', () => {
	test('is a required field, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			<MockForm>
				{children}
			</MockForm>
		</Provider>;
		const {getByPlaceholderText, getByText} = render(
			<BirthDateField text={'test_key'}/>, {wrapper: wrapper}
			,
		);
		const field = getByPlaceholderText('birthdate_hinttext');
		expect(field).toHaveClass('adc-form-group__input');
		fireEvent.click(getByText('submit'));
		expect(field).toHaveClass('adc-form-group__input--error');

	});
});
describe('test PayerNumberField component', () => {
	test('is a required field, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			<MockForm>
				{children}
			</MockForm>
		</Provider>;
		const {getByPlaceholderText, getByText} = render(
			<PayerNumberField text={'test_key'}/>, {wrapper: wrapper}
			,
		);
		const field = getByPlaceholderText('insurance_number_label_hinttext');
		expect(field).toHaveClass('adc-form-group__input');
		fireEvent.click(getByText('submit'));
		expect(field).toHaveClass('adc-form-group__input--error');

	});
});
describe('test LastNameField component', () => {
	test('is a required field, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			<MockForm>
				{children}
			</MockForm>
		</Provider>;
		const {getByPlaceholderText, getByText} = render(
			<LastNameField text={'test_key'}/>, {wrapper: wrapper}
			,
		);
		const field = getByPlaceholderText('surname_hinttext');
		expect(field).toHaveClass('adc-form-group__input');
		fireEvent.click(getByText('submit'));
		expect(field).toHaveClass('adc-form-group__input--error');

	});
});
describe('test KVNRField component', () => {
	test('is a required field, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			<MockForm>
				{children}
			</MockForm>
		</Provider>;
		const {getByPlaceholderText, getByText} = render(
			<KVNRField text={'test_key'}/>, {wrapper: wrapper}
			,
		);
		const field = getByPlaceholderText('kvnr_hinttext');
		expect(field).toHaveClass('adc-form-group__input');
		fireEvent.click(getByText('submit'));
		expect(field).toHaveClass('adc-form-group__input--error');

	});
});
describe('test VoucherField component', () => {
	test('is a required field, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			<MockForm>
				{children}
			</MockForm>
		</Provider>;
		const {getByPlaceholderText, getByText} = render(
			<VoucherField text={'test_key'}/>, {wrapper: wrapper}
			,
		);
		const field = getByPlaceholderText('voucher_hint');
		expect(field).toHaveClass('adc-form-group__input');
		fireEvent.click(getByText('submit'));
		expect(field).toHaveClass('adc-form-group__input--error');

	});
});
describe('test AddressTypeField component', () => {
	test('is a not required field, so it should not show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			<MockForm>
				{children}
			</MockForm>
		</Provider>;
		const {getByPlaceholderText, getByText} = render(
			<AddressTypeField text={'test_key'}/>, {wrapper: wrapper}
			,
		);
		const field = getByPlaceholderText('addresstype_hinttext');
		expect(field).toHaveClass('adc-form-group__input');
		fireEvent.click(getByText('submit'));
		expect(field).toHaveClass('adc-form-group__input');
	});
});