import React from 'react';
import Enzyme, {mount , shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NextgenCarousal from '../../../../../modules/Carousel/components/NextgenCarousal/NextgenCarousal';

Enzyme.configure({
	adapter: new EnzymeAdapter()
});

describe('NextgenCarousal Component Test Suite', () => {
	let props;
	let wrapper;
	beforeEach(() => {
		props = {
            "cards": [

                    {
                
                      "cardTitle": "Card 1",
                
                      "cardImage": "/content/dam/adc/freestylelibrede/de/de/Abbott_header_logo.svg",
                
                      "htmlText": "<h1>Hello</h1>",
                
                      "cta": {
                
                        "link": "/content/adc/freestylelibrede/de/de/v3/homepage.html",
                
                        "type": "primary",
                
                        "action": "_blank",
                
                        "text": "Card 1 CTA ",
                
                        "assetPath": null,
                
                        "disclaimer": null
                
                      }
                
                    },
                
                    {
                
                      "cardTitle": "Car 2 title",
                
                      "cardImage": "/content/dam/adc/freestylelibrede/de/de/Abbott_header_logo.svg",
                
                      "htmlText": "<h2>heading</h2>",
                
                      "cta": {
                
                        "link": "/content/adc/freestylelibrede/de/de/v3/produkte/alle-produkte.html",
                
                        "type": "secondary",
                
                        "action": "_self",
                
                        "text": "Card 2 cta text",
                
                        "assetPath": null,
                
                        "disclaimer": null
                
                      }
                
                    }
                
                  ],
                
                  "path": "/content/adc/freestylelibrede/de/de/v3/hilfe/plusservice-kuendigen.html"
                
		};
		wrapper = shallow(<NextgenCarousal {...props} />);
	});

	test('render check',() => {
		expect(wrapper.type()).not.toEqual(null);
	});

	test('renders without crashing', () => {
		expect(wrapper).toBeDefined();
	});

});
