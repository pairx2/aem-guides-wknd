import '@testing-library/jest-dom/extend-expect';
import translate, {containsHTML, i18nLabels, getLocale} from '../../utils/translationUtils';
import React from 'react';
import {mockStore} from '../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';
import {ComponentMock} from '../../__mocks__/componentMock';

describe('test containsHTML method', () => {
	test('empty input', async () => {
		const result = containsHTML('');
		expect(result).toBeFalsy();
	});
	test('no HTML tags', async () => {
		const result = containsHTML('no html');
		expect(result).toBeFalsy();
	});
	test('has HTML tags', async () => {
		const result = containsHTML('<div>has html</div>');
		expect(result).toBeTruthy();
	});
});

describe('test translate method', () => {
	const dictionary = {
		'test_key': 'test_label',
		'key_interpolation': 'test {0}'
	};
	test('existing key', async () => {
		const result = translate(dictionary, 'test_key');
		expect(result).toBe('test_label');
	});
	test('non-existing key', async () => {
		const result = translate(dictionary, 'test_key_2');
		expect(result).toBe('test_key_2');
	});
	test('label with interpolation', async () => {
		const result = translate(dictionary, 'key_interpolation', ['interpolation']);
		expect(result).toBe('test interpolation');
	});
	test('i18nLabels', async () => {
		const result = i18nLabels.SUBSCRIPTION_FREQUENCY('FREQUENCY');
		expect(result).toBe('subscription_frequency_frequency');
	});
	test('getLocale', async () => {
		const result = getLocale();
		expect(result).toBe('de');
	});
});

describe('test useTranslation hook', () => {
	test('existing key', async () => {
		const {getByText} = render(
			<Provider store={mockStore}>
				<ComponentMock/>
			</Provider>
		);
		expect(getByText('test_key')).toBeTruthy();

	});

});