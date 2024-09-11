import '@testing-library/jest-dom/extend-expect';
import {ClickOutsideHandler, clickOutsideConfig} from '../../../../../modules/Search/components/SearchBar/ClickOutsideHandler';

describe('ClickOutsideHandler', () => {
	const children =[
		{
			a:'b'
		}
	];
	const handleClickOutside = jest.fn();

	test('ClickOutsideHandler call check',() => {
		expect(ClickOutsideHandler(children,handleClickOutside)).toBe(undefined);
	});
});
describe('clickOutsideConfig', () => {
	test('clickOutsideConfig call check',() => {
		expect(clickOutsideConfig).not.toBe(null);
	});
});