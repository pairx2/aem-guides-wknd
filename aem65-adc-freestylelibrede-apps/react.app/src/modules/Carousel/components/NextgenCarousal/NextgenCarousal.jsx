import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import NextgenCarousalControl from "./NextgenCarousalControl";

export default class NextgenCarousal extends Component {

	static propTypes = {
		cards: PropTypes.object
	};



	render() {
		const { cards } = this.props
		const blanckDiv = "blank"
		const cardList = cards.map((card, index) => ({ ...card, id: index + 4 }))
		const items = [{ div: blanckDiv, id: 1 }, ...cardList, { div: blanckDiv, id: 2 }, { div: blanckDiv, id: 3 }];
		return <>

			<div className={'adc-image-carousel adc-nexgen-carausel'}>
				<Carousel controlPosition={'bottom'} controlComponentDesktop={NextgenCarousalControl} withFade={false} canAutoSlide={false} isNexgenCarousel itemsToShowDesktop={2.5} scrollByDesktop={1}>
					{items?.map((t) => {
						if (t.div === "blank") {
							return <div key={t.id} clsas="d-block w-100"></div>
						} else {
							return <div key={t.id} className='adc-nexgen-carausel-item' dangerouslySetInnerHTML={{ __html: t.htmlText }} />
						}

					})}
				</Carousel>
			</div>
		</>;

	}
};