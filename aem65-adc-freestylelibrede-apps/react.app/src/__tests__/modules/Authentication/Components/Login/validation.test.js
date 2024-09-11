
import '@testing-library/jest-dom/extend-expect';
import {validate} from '../../../../../modules/Authentication/components/Login/validation';


describe('test validate method', () => {

	test('both invalid values', async () => {
		const values = {
			password:null,
			email:null
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});
	test('no email', async () => {
		const values = {
			password:'qwert@1234',
			email:null
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});
	test('no password', async () => {
		const values = {
			password:null,
			email:'qwert@yopmail.com'
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});
	test('email format invalid', async () => {
		const values = {
			password:null,
			email:'qwert/awert'
		};
		const result = validate(values);
		expect(result).toBeDefined();
	});
});
