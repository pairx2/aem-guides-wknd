import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import {Provider} from 'react-redux';
import PopupConfirmTechnicalTraining from '../../../../../modules/MyAccount/components/ConfirmTechnicalTraining/PopupConfirmTechnicalTraining';
import { mockStore } from '../../../../../__mocks__/storeMock';


Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('PopupConfirmTechnicalTraining Component Test Suite', () => {
	let props;
	let wrapper;
    let instance;
    const closeModalMock = jest.fn();

	beforeEach(() => {

		props= {
            technicalTrainingPopUpHeading: 'Technische Einweisung noch nicht bestätigt',
            technicalTrainingPopUpMessage: 'Die Durchführung der Technischen Einweisung ist erforderlich. Bestätigen Sie daher Ihre Teilnahme oder informieren Sie sich über die Möglichkeiten der Durchführung.',
            cta: {
                type: "Primary",
                text: 'jetzt fortfahren',
                action: null,
                link: '#technische_einweisung',
                assetPath: null,
                disclaimer: null
            },
			closeModal: closeModalMock,
		};

        wrapper = shallow(<PopupConfirmTechnicalTraining store={mockStore} {...props} />);

		instance = wrapper.dive().instance();
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

        test('redirect check', () => {
            expect(instance.redirectHandler()).not.toEqual(null);
        })
	});
});


describe('PopupConfirmTechnicalTraining Component Test Suite with mount', () => {
	let props;
	let wrapper;
    const closeModalMock = jest.fn();
	beforeEach(() => {

		props= {
			technicalTrainingPopUpHeading: 'Technische Einweisung noch nicht bestätigt',
            technicalTrainingPopUpMessage: 'Die Durchführung der Technischen Einweisung ist erforderlich. Bestätigen Sie daher Ihre Teilnahme oder informieren Sie sich über die Möglichkeiten der Durchführung.',
            cta: {
                type: "Primary",
                text: 'jetzt fortfahren',
                action: null,
                link: '#technische_einweisung',
                assetPath: null,
                disclaimer: null
            },
			closeModal: closeModalMock,
		};
		wrapper= mount(<Provider store= {mockStore} ><PopupConfirmTechnicalTraining {...props}/></Provider>);
	});

	describe('propTypes check', () => {

		test('render check',() => {
			expect(wrapper.type()).not.toEqual(null);
		});

		test('renders without crashing', () => {
			expect(wrapper).toBeDefined();
		});

	});
	test('redirectHandler Button',() => {
		const button = wrapper.find('Button');
		button.simulate('click');
		const closeModalCount = closeModalMock.mock.calls.length;
		expect(closeModalCount).toBeDefined();
	});
});
