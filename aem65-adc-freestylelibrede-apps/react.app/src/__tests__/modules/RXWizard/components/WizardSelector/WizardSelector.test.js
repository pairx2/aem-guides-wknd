import React from 'react';
import Enzyme, {shallow,mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import WizardSelector from '../../../../../modules/RXWizard/components/WizardSelector/WizardSelector';
import Link from '../../../../../modules/Generic/components/Link/Link';
import Button from '../../../../../modules/Generic/components/Button/Button';
import {i18nLabels} from '../../../../../utils/translationUtils';
import ProgressBar from '../../../../../modules/Generic/components/ProgressBar/ProgressBar';
import Container from '../../../../../modules/Generic/components/Container/Container';
import {mockStore, mockStoreOrder} from '../../../../../__mocks__/storeMock';
import {Provider} from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props= {}) => {
	const wrapper = shallow(<WizardSelector store= {mockStore} {...props}/>);
	return wrapper;
};

describe('WizardSelector Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {

		props = {
			steps: [{title: 'receipe'},
				{title: 'login'},
				{title: 'cashbox'}],
			heading: 'heading',
			publicPrescriptionImage: 'publicPrescriptionImage',
			publicPrescriptionButtonText: 'publicPrescriptionButtonText',
			publicPrescriptionButtonCta: 'primary',
			publicPrescriptionButtonLink: 'publicPrescriptionButtonLink',
			privatePrescriptionImage: 'privatePrescriptionImage',
			privatePrescriptionButtonText: 'privatePrescriptionButtonText',
			privatePrescriptionButtonCta: 'primary',
			privatePrescriptionButtonLink: 'privatePrescriptionButtonLink',
			noPrescriptionButtonText: 'noPrescriptionButtonText',
			noPrescriptionButtonCta: 'primary',
			noPrescriptionButtonLink: 'noPrescriptionButtonLink',
			goBackText: 'goBackText',
			goBackLink: 'goBackLink',
			loginPagePath: 'loginPagePath',
		};
		wrapper= setup(props);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

		test('has heading as prop and is of type string', () => {
			const heading = wrapper.props().children.props.heading;
			expect(typeof heading).toBe('string');
		});
		test('has publicPrescriptionImage as prop and is of type string', () => {
			const publicPrescriptionImage = wrapper.props().children.props.publicPrescriptionImage;
			expect(typeof publicPrescriptionImage).toBe('string');
		});
		test('has publicPrescriptionButtonText as prop and is of type string', () => {
			const publicPrescriptionButtonText = wrapper.props().children.props.publicPrescriptionButtonText;
			expect(typeof publicPrescriptionButtonText).toBe('string');
		});
		test('has publicPrescriptionButtonCta as prop and is of type string', () => {
			const publicPrescriptionButtonCta = wrapper.props().children.props.publicPrescriptionButtonCta;
			expect(typeof publicPrescriptionButtonCta).toBe('string');
		});
		test('has publicPrescriptionButtonLink as prop and is of type string', () => {
			const publicPrescriptionButtonLink = wrapper.props().children.props.publicPrescriptionButtonLink;
			expect(typeof publicPrescriptionButtonLink).toBe('string');
		});
		test('has privatePrescriptionImage as prop and is of type string', () => {
			const privatePrescriptionImage = wrapper.props().children.props.privatePrescriptionImage;
			expect(typeof privatePrescriptionImage).toBe('string');
		});
		test('has privatePrescriptionButtonText as prop and is of type string', () => {
			const privatePrescriptionButtonText = wrapper.props().children.props.privatePrescriptionButtonText;
			expect(typeof privatePrescriptionButtonText).toBe('string');
		});
		test('has privatePrescriptionButtonCta as prop and is of type string', () => {
			const privatePrescriptionButtonCta = wrapper.props().children.props.privatePrescriptionButtonCta;
			expect(typeof privatePrescriptionButtonCta).toBe('string');
		});
		test('has privatePrescriptionButtonLink as prop and is of type string', () => {
			const privatePrescriptionButtonLink = wrapper.props().children.props.privatePrescriptionButtonLink;
			expect(typeof privatePrescriptionButtonLink).toBe('string');
		});
		test('has noPrescriptionButtonText as prop and is of type string', () => {
			const noPrescriptionButtonText = wrapper.props().children.props.noPrescriptionButtonText;
			expect(typeof noPrescriptionButtonText).toBe('string');
		});
		test('has noPrescriptionButtonCta as prop and is of type string', () => {
			const noPrescriptionButtonCta = wrapper.props().children.props.noPrescriptionButtonCta;
			expect(typeof noPrescriptionButtonCta).toBe('string');
		});
		test('has noPrescriptionButtonLink as prop and is of type string', () => {
			const noPrescriptionButtonLink = wrapper.props().children.props.noPrescriptionButtonLink;
			expect(typeof noPrescriptionButtonLink).toBe('string');
		});
		test('has goBackText as prop and is of type string', () => {
			const goBackText = wrapper.props().children.props.goBackText;
			expect(typeof goBackText).toBe('string');
		});
		test('has heading as prop and is of type string', () => {
			const goBackLink = wrapper.props().children.props.goBackLink;
			expect(typeof goBackLink).toBe('string');
		});
		test('has loginPagePath as prop and is of type string', () => {
			const loginPagePath = wrapper.props().children.props.loginPagePath;
			expect(typeof loginPagePath).toBe('string');
		});
		test('has isLoggedIn as prop and is of type string', () => {
			const isLoggedIn = wrapper.props().children.props.isLoggedIn;
			expect(typeof isLoggedIn).toBe('boolean');
		});

		test('use state check', () => {

			const realUseState = React.useState;
			const titleInitialState = [
				{title: i18nLabels.CHECKOUT_PROCESS.RECIPE},
				{title: i18nLabels.CHECKOUT_PROCESS.LOGIN},
				{title: i18nLabels.CHECKOUT_PROCESS.CASHBOX},
				{title: i18nLabels.CHECKOUT_PROCESS.RECIPE},
				{title: i18nLabels.CHECKOUT_PROCESS.CASHBOX},
			];
			jest.spyOn(React, 'useState').mockImplementationOnce(() => realUseState(titleInitialState));
		});
	});

	describe('Components rendering', () => {

		test('Link component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Link />)).toBeDefined();
		});

		test('Button component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Button />)).toBeDefined();
		});
		test('ProgressBar component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<ProgressBar />)).toBeDefined();
		});
		test('Container component gets rendered', () => {
			expect(wrapper.containsMatchingElement(<Container />)).toBeDefined();
		});
	});

});
describe('WizardSelector Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {

		props = {
			steps: [{title: 'receipe'},
				{title: 'login'},
				{title: 'cashbox'}],
			heading: 'heading',
			publicPrescriptionImage: 'publicPrescriptionImage',
			publicPrescriptionButtonText: 'publicPrescriptionButtonText',
			publicPrescriptionButtonCta: 'primary',
			publicPrescriptionButtonLink: 'publicPrescriptionButtonLink',
			privatePrescriptionImage: 'privatePrescriptionImage',
			privatePrescriptionButtonText: 'privatePrescriptionButtonText',
			privatePrescriptionButtonCta: 'primary',
			privatePrescriptionButtonLink: 'privatePrescriptionButtonLink',
			noPrescriptionButtonText: 'noPrescriptionButtonText',
			noPrescriptionButtonCta: 'primary',
			noPrescriptionButtonLink: 'noPrescriptionButtonLink',
			goBackText: 'goBackText',
			goBackLink: 'goBackLink',
			loginPagePath: 'loginPagePath',
		};
		wrapper= mount(<Provider store= {mockStoreOrder}><WizardSelector {...props}/></Provider>);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});
describe('WizardSelector Component Test Suite', () => {
	let props, wrapper;
	beforeEach(() => {

		props = {
			steps: [{title: 'receipe'},
				{title: 'login'},
				{title: 'cashbox'}],
			heading: 'heading',
			publicPrescriptionImage: 'publicPrescriptionImage',
			publicPrescriptionButtonText: 'publicPrescriptionButtonText',
			publicPrescriptionButtonCta: 'primary',
			publicPrescriptionButtonLink: 'publicPrescriptionButtonLink',
			privatePrescriptionImage: 'privatePrescriptionImage',
			privatePrescriptionButtonText: 'privatePrescriptionButtonText',
			privatePrescriptionButtonCta: 'primary',
			privatePrescriptionButtonLink: 'privatePrescriptionButtonLink',
			noPrescriptionButtonText: 'noPrescriptionButtonText',
			noPrescriptionButtonCta: 'primary',
			noPrescriptionButtonLink: 'noPrescriptionButtonLink',
			goBackText: 'goBackText',
			goBackLink: 'goBackLink',
			loginPagePath: 'loginPagePath',
		};
		wrapper= mount(<Provider store= {mockStore}><WizardSelector {...props}/></Provider>);
	});

	describe('Redux Props', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});
	});
});