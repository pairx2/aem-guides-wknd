import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SearchSection from '../../../../../modules/MyAccount/components/OrderDocumentList/SearchSection';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('SearchSection component Test Suite isButtonClicked: true,', () => {
	let props, wrapper;
    beforeEach(() => {
		props = {
			query: "test",
		};
	wrapper = shallow(<SearchSection {...props} />);
	});
    test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
});

describe('SearchSection component Test Suite isButtonClicked: true,', () => {
	let props, wrapper;
    beforeEach(() => {
		props = {
			query: "",
		};
	wrapper = shallow(<SearchSection {...props} />);
	});
    test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
    
});

describe('SearchSection click ', () => {
    it('calls handleSearchClick on search icon click', () => {
      const handleSearchClickMock = jest.fn();
	  const getOnlyPdfAvailableOrdersMock = jest.fn(() =>'mockedPdfOrders');
      const wrapper = shallow(<SearchSection handleSearchClick={handleSearchClickMock} getOnlyPdfAvailableOrders={getOnlyPdfAvailableOrdersMock}/>);
     wrapper.find('[data-testid="search-icon"]').simulate('click');
	 expect(handleSearchClickMock).toHaveBeenCalledWith('mockedPdfOrders');
    });
  });