import '@testing-library/jest-dom/extend-expect';
import I18n from '../../../../modules/Translation/components/I18n';
import React from 'react';
import {mockStore} from '../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';

describe('test I18n component', () => {
	test('test translation rendering', async () => {
		const {getByText} = render(
			<Provider store={mockStore}>
				<I18n text={'test_key'}/>
			</Provider>
			,
		);
		expect(getByText('test_key')).not.toBeNull();
	});
});

