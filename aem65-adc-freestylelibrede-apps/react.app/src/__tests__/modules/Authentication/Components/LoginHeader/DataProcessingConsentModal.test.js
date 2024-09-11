import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DataProcessingConsentModal from '../../../../../modules/Authentication/components/LoginHeader/DataProcessingConsentModal';
import {mockStore} from '../../../../../__mocks__/storeMock';
import { Provider } from 'react-redux';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

const setup = (props) => {
	return mount(<Provider store={mockStore}> <DataProcessingConsentModal  {...props} /> </Provider>);
};

describe('DataProcessingConsentModal Component Test Suite', () => {
	let props,wrapper;
    const signOutMock= jest.fn();
	const closeModalMock = jest.fn();
    const updateCustomerMock = jest.fn();
	const isModalOpenMock = jest.fn();
	let bodyAttr = {'pageType':'account'};
		document.body.setAttribute("data-app-url",JSON.stringify(bodyAttr));
		document.body.setAttribute("data-react-component","modal");
		document.body.setAttribute("id","dataProcessingConsentModal");
		document.body.setAttribute("jsonString",JSON.stringify(bodyAttr));
	beforeEach(() => {
		props = {
			heading: "Einwilligung zur Datenverarbeitung",
            content: "<p>Ich willige ein, dass die Abbott GmbH, Max-Planck-Ring 2, 65205 Wiesbaden meine personenbezogenen Daten für die Eröffnung eines Kundenkontos und die Abwicklung von Bestellungen inkl. der Zahlungsabwicklung und Versendung sowie der damit verbundenen Einbindung entsprechender Dienstleister, zur Beantwortung von Anfragen sowie für Listenabgleiche entsprechend den Beschreibungen in den Ziffern [2.2, 2.4 und 3.1] der Datenschutzbestimmungen verarbeitet.</p>",
            logoutPageRedirect: "/content/adc/freestylelibrede/de/de/libre/anmelden/login.html",
            errorMessage: 'Error message',
            signOut: signOutMock,
			isLoading: true,
			isLoggedIn: true,
			updateCustomer: updateCustomerMock,
			closeModal: closeModalMock,
			isModalOpen: isModalOpenMock
		};
        wrapper = setup(props);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('submitDataProcessConsentHandler function', () => {
		const updateCustomerCount = updateCustomerMock.mock.calls.length;
		const closeModalCount = closeModalMock.mock.calls.length;
		const submitButton = wrapper.find('Button');
		submitButton.simulate('click');
		expect(updateCustomerCount).toBeDefined();
		expect(closeModalCount).toBeDefined();
	});

	test('signoutHandler link',() => {
		const linkTag = wrapper.find('Link');
		linkTag.simulate('click');
		const signOutCount = signOutMock.mock.calls.length;
		const closeModalCount = closeModalMock.mock.calls.length;
		expect(signOutCount).toBeDefined();
		expect(closeModalCount).toBeDefined();
	});
});