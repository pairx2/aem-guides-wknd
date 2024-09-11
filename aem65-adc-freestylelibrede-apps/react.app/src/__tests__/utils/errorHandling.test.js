import '@testing-library/jest-dom/extend-expect';
import {SagaError, ValidationError, NoResultsError} from '../../utils/errorHandling';


describe('test errorHandling', () => {

	test('error check', () => {
		expect(SagaError).not.toThrowError('my error');
		expect(ValidationError).not.toThrowError('my error');
		expect(NoResultsError).not.toThrowError('my error');
	});

	test('constructor check', () => {
		const result = new SagaError();
		expect(result).toBeTruthy();
	});

	test('constructor check', () => {
		const result = new ValidationError();
		expect(result).toBeTruthy();
	});

	test('constructor check', () => {
		const result = new NoResultsError();
		expect(result).toBeTruthy();
	});

});