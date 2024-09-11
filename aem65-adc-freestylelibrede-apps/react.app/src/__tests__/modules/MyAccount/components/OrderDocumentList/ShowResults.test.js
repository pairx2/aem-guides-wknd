import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ShowResults from '../../../../../modules/MyAccount/components/OrderDocumentList/ShowResults';


Enzyme.configure({
	adapter: new EnzymeAdapter(),
});

describe('ShowResults component Test Suite isButtonClicked: true,', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			results: [{
                orderType: 'INVOICE',
                orderId: 'DE15006789',
                orderDeliveryId: 'DE5500003448',
                orderDate: undefined,
                invoiceId: 'DEI0000838122',
                invoiceStatus: 'Payment Completed'
              },
              {
                orderType: 'CREDIT',
                orderId: 'DE15006789',
                orderDeliveryId: 'DE5500003448',
                orderDate: undefined,
                invoiceId: 'DEC0000838122',
                invoiceStatus: 'Payment Completed'
              }, {
                orderType: 'INVOICE',
                orderId: 'DE15006789',
                orderDeliveryId: 'DE5500003448',
                orderDate: undefined,
                invoiceId: 'DEI0000838122',
                invoiceStatus: 'Payment Completed'
              },
              {
                orderType: 'CREDIT',
                orderId: 'DE15006789',
                orderDeliveryId: 'DE5500003448',
                orderDate: undefined,
                invoiceId: 'D0000838122',
                invoiceStatus: 'Payment Completed'
              }],
            resultsToShow: 2
		};
	wrapper = shallow(<ShowResults {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});
   
});

describe('ShowResults component Test Suite isButtonClicked: true,', () => {
	let props, wrapper;

	beforeEach(() => {
		props = {
			results: [{}, {}, {}, {}],
            resultsToShow: 6
		};
	wrapper = shallow(<ShowResults {...props} />);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
       
	});

});

describe('ShowResults component Test Suite isButtonClicked: true,', () => {
	let props, wrapper;
    beforeEach(() => {
		props = {
			results: [],
            resultsToShow: 6
		};
	wrapper = shallow(<ShowResults {...props} />);
	});
    test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});

describe('ShowResults onclick Invoice', () => {
    it('calls getInvoice on get-invoice click', () => {
      const getInvoiceMock = jest.fn();
      const results = [
        {
          orderId: '123',
          invoiceId: 'DEI-456',
          orderDeliveryId: '789',
          orderDate: '2023-01-01',
        },
      ];
   const wrapper = shallow(
        <ShowResults results={results} getInvoice={getInvoiceMock} resultsToShow={5} />
      );
   wrapper.find('[data-testid="get-invoice"]').simulate('click');
   expect(getInvoiceMock).toHaveBeenCalledWith({
        orderId: '123',
        invoiceId: 'DEI-456',
      });
    });
  });



