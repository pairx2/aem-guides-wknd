import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {For} from '../../../../../modules/Generic/components/Logic/LogicalComponents';

describe('test For component', () => {
	test('should not fail to render when input array is not of type array,  and has empty content, and filter function is not of type function', async () => {
		const testArray = [1];
		const testFilter = item => item < 4;
		render(
			<For array={testArray} filter={testFilter}>
				{item => item}
			</For>
		);
	});
	test('should render content when input array is valid', async () => {
		const testArray = [1, 2, 3, 4, 5];
		const {queryByText} = render(
			<For array={testArray}>
				{item => item}
			</For>
		);
		const output = queryByText('12345');
		expect(output).toBeDefined();
	});
	test('should filter content when filter function is valid', async () => {
		const testArray = [1, 2, 3, 4, 5];
		const testFilter = item => item < 4;
		const {queryByText} = render(
			<For array={testArray} filter={testFilter}>
				{item => item}
			</For>
		);
		const invalidOutput = queryByText('12345');
		const validOutput = queryByText('123');
		expect(invalidOutput).toBeNull();
		expect(validOutput).toBeDefined();
	});
	test('should return null', async () => {
		const testArray = null;
		const testFilter = item => item < 4;
		const {queryByText} = render(
			<For array={testArray} filter={testFilter}>
				{item => item}
			</For>
		);
		const invalidOutput = queryByText('12345');
		const validOutput = queryByText('123');
		expect(invalidOutput).toBeNull();
		expect(validOutput).toBeDefined();
	});
});
