import '@testing-library/jest-dom/extend-expect';
import {birthdate, email, kvnr, maxLength, required, voucher, isQuantityRequired, isRequired, emailMismatch, passwordMismatch, phone, mobilePhone, otpText} from '../../../../modules/Form/utils/validationRules';

describe('required validation validation', () => {
	test('no value provided', async () => {
		const error = required('');
		expect(error).not.toBe(undefined);
	});
	test('value provided', async () => {
		const error = required('value');
		expect(error).toBe(undefined);
	});
	test('array value provided', async () => {
		const error = required(['value']);
		expect(error).toBeDefined();
	});
	test('object value provided', async () => {
		const error = required({'value': 'value'});
		expect(error).toBe(undefined);
	});
});

describe('max length validation', () => {
	test('lower than max length', async () => {
		const error = maxLength(5)('a');
		expect(error).toBe(undefined);
	});
	test('equal to max length', async () => {
		const error = maxLength(5)('aaaaa');
		expect(error).toBe(undefined);
	});
	test('greater then max length', async () => {
		const error = maxLength(5)('aaaaaa');
		expect(error).not.toBe(undefined);
	});
});

describe('birthdate validation', () => {
	test('invalid month', async () => {
		let error = birthdate('01.13.2000');
		expect(error).not.toBe(undefined);
		error = birthdate('01.00.2000');
		expect(error).not.toBe(undefined);
	});
	test('invalid day', async () => {
		let error = birthdate('32.01.2000');
		expect(error).not.toBe(undefined);
		error = birthdate('00.01.2000');
		expect(error).not.toBe(undefined);
	});
	test('invalid year', async () => {
		let error = birthdate('01.01.1900');
		expect(error).not.toBe(undefined);
		error = birthdate(`01.01.${new Date().getFullYear() + 1}`);
		expect(error).not.toBe(undefined);
	});
	test('invalid format', async () => {
		const error = birthdate('01-01-2000');
		expect(error).not.toBe(undefined);
	});
	test('valid date', async () => {
		const error = birthdate('01.01.2000');
		expect(error).toBe(undefined);
	});
});

describe('email validation', () => {
	test('invalid email', async () => {
		const error = email('testuser.email.com');
		expect(error).not.toBe(undefined);
	});
	test('valid email', async () => {
		const error = email('testuser@email.com');
		expect(error).toBe(undefined);
	});
});

describe('voucher validation', () => {
	test('no voucher', async () => {
		const error = voucher();
		expect(error).not.toBe(undefined);
	});
	test('valid voucher', async () => {
		const error = voucher('1');
		expect(error).toBe(undefined);
	});
});

describe('kvnr validation', () => {
	test('null kvnr', async () => {
		const error = kvnr(null);
		expect(error).not.toBe(undefined);
	});
	test('invalid kvnr', async () => {
		const error = kvnr('823587498');
		expect(error).not.toBe(undefined);
	});
	test('valid kvnr', async () => {
		const error = kvnr('C823587498');
		expect(error).toBe(undefined);
	});
});

describe('isQuantityRequired validation', () => {
	test('no quantity selected', async () => {
		const error = isQuantityRequired(undefined, {'returnReason': 'R02'});
		expect(error).not.toBe(undefined);
	});
	test('no quantity selected', async () => {
		const error = isQuantityRequired(1, {'a00000000000000HEDI': '1'});
		expect(error).toBe(undefined);
	});
});

describe('required isRequired validation', () => {
	test('no value provided', async () => {
		const data = isRequired(null);
		expect(data).not.toBe(undefined);
	});
	test('value provided', async () => {
		const rules= [{name: 'required1'}, {name: 'required2'}, {name: 'required3'}];
		const data = isRequired(rules);
		expect(data).toBe(false);
	});
});

describe('required emailMismatch & passwordMismatch validation', () => {
	test('no value provided', async () => {
		const data = emailMismatch('');
		expect(data).not.toBe(undefined);
	});
	test('no value provided', async () => {
		const data = passwordMismatch('');
		expect(data).not.toBe(undefined);
	});
});

describe('required phone validation', () => {
	test('no value provided', async () => {
		const data = phone(null);
		expect(data).not.toBe(undefined);
	});
	test('no value provided', async () => {
		const data = phone('735487325487');
		expect(data).not.toBe(undefined);
	});
});

describe('required mobilePhone validation', () => {
	test('no value provided', async () => {
		const data = mobilePhone(null);
		expect(data).not.toBe(undefined);
	});
	test('no value provided', async () => {
		const data = mobilePhone('735487325487');
		expect(data).not.toBe(undefined);
	});
});

describe('required otpText validation', () => {
	test('no value provided', async () => {
		const data = otpText('735487325487');
		expect(data).toBeUndefined();
	});
	test('no value provided', async () => {
		const data = otpText('text');
		expect(data).toBeDefined();
	});
});