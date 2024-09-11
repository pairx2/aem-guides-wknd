import '@testing-library/jest-dom/extend-expect';
import {getUrlParameter, getHashUrlParameter} from '../../utils/getParams';

describe('test getParams', () => {

	test('test getUrlParameter with empty input', async () => {
		const result = getUrlParameter('');
		expect(result).toBeDefined();
	});

	test('test getUrlParameter', async () => {
		const result = getUrlParameter('redirectTo');
		expect(result).toBeDefined();
		expect(result).toEqual('');
	});
	test('test getUrlParameter', async () => {
		delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      hash: '#param1=value1&param2=value2',
    };
 
    expect(getHashUrlParameter('param1')).toEqual('value1');
	});
});
