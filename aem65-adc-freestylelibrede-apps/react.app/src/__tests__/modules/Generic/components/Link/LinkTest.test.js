import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {i18nLabels} from '../../../../../utils/translationUtils';
import Link from '../../../../../modules/Generic/components/Link/Link';
import Icon from '../../../../../modules/Generic/components/Icon/Icon';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {empty} from '../../../../../utils/default';

describe('test Link component', () => {
	const spyError = jest.spyOn( console, 'error' );

	beforeEach(() => {
		spyError.mockReset();
	});

	test('action and href should not be used together, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		render(
			<Link label={i18nLabels.ADD_TO_CART} href="#" action={empty.function}/>, {wrapper: wrapper}
		);

		expect(spyError).toHaveBeenCalled();
	});

	test('action can be used without href, so it should not show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Link label={i18nLabels.ADD_TO_CART} action={empty.function}/>, {wrapper: wrapper}
		);

		expect(container.firstChild.tagName).toBe('SPAN');
		expect(spyError).not.toHaveBeenCalled();
	});

	test('action should be called on click', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const mockAction = jest.fn(empty.function);
		const {container} = render(
			<Link label={i18nLabels.ADD_TO_CART} action={mockAction}/>, {wrapper: wrapper}
		);

		fireEvent.click(container.firstChild);
		expect(mockAction).toHaveBeenCalled();
	});

	test('href can be used without action, so it should not show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Link label={i18nLabels.ADD_TO_CART} href="#"/>, {wrapper: wrapper}
		);

		expect(container.firstChild.tagName).toBe('A');
		expect(spyError).not.toHaveBeenCalled();
	});

	test('anchor tag should have href attribute', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Link label={i18nLabels.ADD_TO_CART} href="#"/>, {wrapper: wrapper}
		);

		expect(container.firstChild).toHaveAttribute('href', '#');
	});

	test('action should be a function, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		render(
			<Link label={i18nLabels.ADD_TO_CART} action={1}/>, {wrapper: wrapper}
		);

		expect(spyError).toHaveBeenCalled();
	});

	test('href should be a string, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		render(
			<Link label={i18nLabels.ADD_TO_CART} href={1}/>, {wrapper: wrapper}
		);

		expect(spyError).toHaveBeenCalled();
	});

	test('icon can be placed to the left, so should be the first child', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Link label={i18nLabels.ADD_TO_CART} icon={'edit-icon'} iconPosition={Icon.POSITION.LEFT}/>, {wrapper: wrapper}
		);

		expect(container.firstChild.firstChild.childNodes.length > 1).toBe(true);
		expect(container.firstChild.firstChild.firstChild).toHaveClass('adc-icon');
	});

	test('icon can be placed to the right, so should be the last child', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Link label={i18nLabels.ADD_TO_CART} icon={'edit-icon'} iconPosition={Icon.POSITION.RIGHT}/>, {wrapper: wrapper}
		);

		expect(container.firstChild.firstChild.childNodes.length > 1).toBe(true);
		expect(container.firstChild.firstChild.lastChild).toHaveClass('adc-icon');
	});

	test('link has dynamic classes, so correct classes should be added on link', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Link label={i18nLabels.ADD_TO_CART} hasNoMargin/>, {wrapper: wrapper}
		);

		expect(container.firstChild).toHaveClass('adc-text-link');
		expect(container.firstChild).toHaveClass('m-0');
	});
});