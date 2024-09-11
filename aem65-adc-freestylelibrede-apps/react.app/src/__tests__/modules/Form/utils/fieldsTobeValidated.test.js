import '@testing-library/jest-dom/extend-expect';
import {formFields} from '../../../../modules/Form/utils/fieldsTobeValidated';


describe('test formFields', () => {
	test('test formFields', async () => {
		const result = formFields;
		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
	});

});