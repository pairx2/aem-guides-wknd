import React from 'react';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CouponForm from '../../../../../modules/Cart/components/CouponCode/CouponForm';
import {i18nLabels} from '../../../../../utils/translationUtils';


describe('test Couponform component', () => {
	test('is a required field, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;
		const {queryByText, rerender} = render(
			<CouponForm redeemCtaStyling={'primary'}/>, {wrapper: wrapper}
			,
		);
		const errorMessage1 = queryByText(i18nLabels.COUPON_CODE_FIELD_ERROR_MESSAGE_TEXT);
		const errorMessage2 = queryByText(i18nLabels.COUPON_CODE_ALREADY_APPLIED);
		const errorMessage3 = queryByText(i18nLabels.MANDATORY_FIELD_MESSAGE);
		expect(errorMessage1).toBeNull();
		expect(errorMessage2).toBeNull();
		expect(errorMessage3).toBeNull();
		rerender(
			<CouponForm isError isCouponInCart isEmptyField redeemCtaStyling={'primary'}/>, {wrapper: wrapper}
			,
		);
		expect(errorMessage1).toBeDefined();
		expect(errorMessage2).toBeDefined();
		expect(errorMessage3).toBeDefined();
		rerender(
			<CouponForm isError isCouponInCart isEmptyField redeemCtaStyling={'secondary'}/>, {wrapper: wrapper}
			,
		);
	});
});
