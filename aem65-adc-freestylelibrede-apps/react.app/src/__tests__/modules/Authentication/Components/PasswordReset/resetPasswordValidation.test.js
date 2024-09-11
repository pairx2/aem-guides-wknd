
import '@testing-library/jest-dom/extend-expect';
import {validate} from '../../../../../modules/Authentication/components/PasswordReset/resetPasswordValidation';

describe('test validate method', () => {

	test('both invalid values', async () => {
		const values = {
			password:null,
			confirmCode:null
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});
	test('no confirmCode', async () => {
		const values = {
			password:'Qwert@1234',
			retypepassword:'Qwert@1234',
			confirmCode:null
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});
	test('no password', async () => {
		const values = {
			password:null,
			retypepassword:'Qwert@1234',
			confirmCode:'AQWSDE'
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});
	test('password !== values.retypepassword', async () => {
		const values = {
			password:'Qwert@1234',
			retypepassword:'qwert123',
			confirmCode:'AQWSDE'
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});
	test('!validatePassword(password)', async () => {
		const values = {
			password:'asd@12',
			retypepassword:'asd@12',
			confirmCode:'AQWSDE'
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});
	test('formFieldValidationRegexes.PASSWORD.VALID_CHAR.test(password)', async () => {
		const values = {
			password:'Qwert 1234',
			retypepassword:'Qwert 1234',
			confirmCode:'AQWSDE'
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});

});
