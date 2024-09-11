import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {getComponentByTitle, getComponentData} from './utils/componentMapping';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';
import ReactBreakpoints from 'react-breakpoints';
import './less/main.less';
import axios from 'axios';
import {openModalAction} from './modules/Modal/redux/actions';
import {i18nLabels} from './utils/translationUtils';

axios.interceptors.response.use((response) => response, (error) => {
	if (typeof error.response === 'undefined') {
		store.dispatch(openModalAction({
			heading: i18nLabels.GENERAL_ERROR,
			contentID: 'generalErrorModal',
			props: {
				errorTitle: i18nLabels.GENERAL_ERROR,
				errorMessage: i18nLabels.GENERAL_TECHNICAL_ERROR
			}
		}));
	}
	return Promise.reject(error);
});

window.addEventListener('load', () => {
	const impressions= [];
	document.querySelectorAll('[data-react-component="productCard"]').forEach((element,index) => {
		const productSku = getComponentData(element.dataset.jsonString)?.productSkus?.[0].sku;
		const productData = JSON.parse(sessionStorage.getItem('productModuleReducer.getProductPricesReducer'))?.data?.productPrices;
		const product= {
			'name': productData?.[productSku]?.name,
			'id': productData?.[productSku]?.id,
			'price': productData?.[productSku]?.price,
			'category': productData?.[productSku]?.product_type,
			'variant': productData?.[productSku]?.product_version,
			'position': index + 1
		};
		productData && productSku && impressions.push(product);
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const breakpoints = {
		mobile: 320,
		tablet: 768,
		desktop: 1025
	};

	document.querySelectorAll('[data-react-component]').forEach(element => {
		const TargetComponent = getComponentByTitle(element.dataset.reactComponent);
		if (TargetComponent) {
			render(
				<Provider store={store}>
					<ReactBreakpoints breakpoints={breakpoints}>
						<TargetComponent {...getComponentData(element.dataset.jsonString)} />
					</ReactBreakpoints>
				</Provider>, element);
		}
	});
});

serviceWorker.unregister();
