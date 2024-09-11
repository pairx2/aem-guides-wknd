import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {i18nLabels} from '../../../../../utils/translationUtils';
import Button, {BUTTON_OPTIONS} from '../../../../../modules/Generic/components/Button/Button';
import Icon from '../../../../../modules/Generic/components/Icon/Icon';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../__mocks__/storeMock';
import {empty} from '../../../../../utils/default';

describe('test Button component', () => {
	const spyError = jest.spyOn( console, 'error' );

	beforeEach(() => {
		spyError.mockReset();
	});

	test('action and href should not be used together, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		render(
			<Button label={i18nLabels.ADD_TO_CART} href="#" action={empty.function}/>, {wrapper: wrapper}
		);

		expect(spyError).toHaveBeenCalled();
	});

	test('action can be used without href, so it should not show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Button label={i18nLabels.ADD_TO_CART} action={empty.function}/>, {wrapper: wrapper}
		);

		expect(container.firstChild.tagName).toBe('BUTTON');
		expect(spyError).not.toHaveBeenCalled();
	});

	test('action should be called on click', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const mockAction = jest.fn(empty.function);
		const {container} = render(
			<Button label={i18nLabels.ADD_TO_CART} action={mockAction}/>, {wrapper: wrapper}
		);

		fireEvent.click(container.firstChild);
		expect(mockAction).toHaveBeenCalled();
	});

	test('href can be used without action, so it should not show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Button label={i18nLabels.ADD_TO_CART} href="#"/>, {wrapper: wrapper}
		);

		expect(container.firstChild.tagName).toBe('A');
		expect(spyError).not.toHaveBeenCalled();
	});

	test('submit button should always be a button', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Button label={i18nLabels.ADD_TO_CART} type={BUTTON_OPTIONS.TYPE.SUBMIT} href="#"/>, {wrapper: wrapper}
		);

		expect(container.firstChild.tagName).toBe('BUTTON');
	});
	test('Redirect button', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Button label={i18nLabels.ADD_TO_CART} href="#"/>, {wrapper: wrapper}
		);

		expect(container.firstChild.tagName).toBe('A');
	});

	test('anchor tag should have href attribute', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Button label={i18nLabels.ADD_TO_CART} href="#"/>, {wrapper: wrapper}
		);

		expect(container.firstChild).toHaveAttribute('href', '#');
	});

	test('action should be a function, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		render(
			<Button label={i18nLabels.ADD_TO_CART} action={1}/>, {wrapper: wrapper}
		);

		expect(spyError).toHaveBeenCalled();
	});

	test('href should be a string, so it should show an error message', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		render(
			<Button label={i18nLabels.ADD_TO_CART} href={1}/>, {wrapper: wrapper}
		);

		expect(spyError).toHaveBeenCalled();
	});

	test('icon can be placed on either side, so should be the first or last child', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container, rerender} = render(
			<Button label={i18nLabels.ADD_TO_CART} icon={'edit-icon'} iconPosition={Icon.POSITION.LEFT}/>, {wrapper: wrapper}
		);

		expect(container.firstChild.childNodes.length > 1).toBe(true);
		expect(container.firstChild.firstChild).toHaveClass('adc-icon');

		rerender(
			<Button label={i18nLabels.ADD_TO_CART} icon={'edit-icon'} iconPosition={Icon.POSITION.RIGHT}/>, {wrapper: wrapper}
		);

		expect(container.firstChild.childNodes.length > 1).toBe(true);
		expect(container.firstChild.lastChild).toHaveClass('adc-icon');
	});

	test('button style can be passed, so correct class should be added on button', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Button label={i18nLabels.ADD_TO_CART} ctaStyle={BUTTON_OPTIONS.STYLE.SECONDARY}/>, {wrapper: wrapper}
		);

		expect(container.firstChild).toHaveClass('adc-button-secondary');
	});

	test('button has dynamic classes, so correct classes should be added on button', async () => {
		const wrapper = ({children}) => <Provider store={mockStore}>
			{children}
		</Provider>;

		const {container} = render(
			<Button label={i18nLabels.ADD_TO_CART} hasNoMargin/>, {wrapper: wrapper}
		);

		expect(container.firstChild).toHaveClass('adc-button');
		expect(container.firstChild).toHaveClass('adc-button-primary');
		expect(container.firstChild).toHaveClass('text-center');
		expect(container.firstChild).toHaveClass('m-0');
	});
});
