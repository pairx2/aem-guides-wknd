import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import SickFundSearchModal from '../../../modules/SickFund/components/SickFundSearchModal';
import {mockStore} from '../../../__mocks__/storeMock';
import {Provider} from 'react-redux';


Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props= {}) => {
	const wrapper = shallow(<SickFundSearchModal store= {mockStore} {...props}/>).dive().dive().dive().dive().dive().dive().dive().dive().dive().dive().dive();
	return wrapper;
};

describe('SickFundSearchModal Component Test Suite with isSpecial as true & sickFundDocuments is valid', () => {
	let props;
	let wrapper;


	beforeEach(() => {

		props= {
			sickFund: 'sickFund',
			sickFundDocuments: [{language: 'de', path: 'path'}],
			pdfLink:  'pdfLink',
			moreInfoPath:  'moreInfoPath',
			closeModal: () => {},
			isSpecial: true
		};

		wrapper= setup(props);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});

describe('SickFundSearchModal Component Test Suite with isSpecial as false & sickFundDocuments is valid', () => {
	let props;
	let wrapper;

	beforeEach(() => {
		props= {
			sickFund: 'sickFund',
			sickFundDocuments: [{language: 'de', path: 'path'}],
			pdfLink: '',
			moreInfoPath:  'moreInfoPath',
			closeModal: () => {},
			isSpecial: false
		};
		wrapper= setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('getLanguageOptions check', () => {
		const options= wrapper.props().children.props.children[1].props.children.props.children[0].props.children.props.options;
		expect(options).toEqual([{label: 'language_de', value: 'path'}]);
	});

});

describe('SickFundSearchModal Component Test Suite with mount', () => {
	let props;
	let wrapper;

	beforeEach(() => {

		props= {
			sickFund: 'sickFund',
			sickFundDocuments: [],
			pdfLink: '',
			moreInfoPath:  'moreInfoPath',
			closeModal: () => {},
			isSpecial: false
		};
		wrapper= mount(<Provider store= {mockStore} ><SickFundSearchModal {...props}/></Provider>);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
});
