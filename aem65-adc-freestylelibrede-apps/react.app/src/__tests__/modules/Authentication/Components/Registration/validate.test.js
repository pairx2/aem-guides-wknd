import '@testing-library/jest-dom/extend-expect';
import validate  from '../../../../../modules/Authentication/components/Registration/validate';

describe('test validate method', () => {

	test('weak password input', async () => {
		const values= {password: 'password'};
		const result = validate(values);
		expect(result).toBeDefined();
	});

	test('empty input', async () => {
		const values= {password: ''};
		const result = validate(values);
		expect(result).toBeDefined();
	});

	test('strong password input', async () => {
		const values= {password: 'DummyPass@224'};
		const result = validate(values);
		expect(result).toBeDefined();
	});
});
