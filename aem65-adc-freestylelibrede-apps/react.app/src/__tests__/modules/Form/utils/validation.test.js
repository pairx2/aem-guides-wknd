import '@testing-library/jest-dom/extend-expect';
import {validate} from '../../../../modules/Form/utils/validation';

const props = {
	form: 'orderAddressForm'
};

const values = {
	FIRSTNAME: 'firstname',
	SURNAME: 'lastname',
	STREET: 'street',
	POSTCODE: 'postcode',
	CITY: 'city',
	TELEPHONE: 'telephone'
};

describe('validate validation validation', () => {
	test('no value provided', async () => {
		const error = validate('');
		expect(error).not.toBe(undefined);
	});
	test('array value provided', async () => {
		const error = validate(['value']);
		expect(error).toBeDefined();
	});
	test('legit value provided', async () => {
		const error = validate(values, props);
		expect(error).toBeDefined();
	});
});