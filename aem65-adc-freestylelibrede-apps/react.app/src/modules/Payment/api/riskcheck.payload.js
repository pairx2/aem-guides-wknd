
export const riskCheckData = (orderType, user, billingAddress, shippingAddress, products, isRxCheckout) => {
	const data = {
		'RiskCheck': {}
	};

	const order = {
		'OrderChannel': 'INTERNET',
		'DeliveryType': products.deliveryType,
		'PaymentType': products.paymentType ? products.paymentType : 'other',
		'RegisteredOrder': '1',
		'Currency': 'EUR',
		'GrossTotalBill': products.grossTotal,
		'TotalOrderValue': products.total,
		'Item': isRxCheckout ? null : products.items,
	};

	const deliveryCustomer = {
		'LastName': shippingAddress.lastName,
		'FirstName': shippingAddress.firstName,
		'Email': user.mail,
		'DebitorNumber': user.id,
		'BirthDay': user.birthday,
		'Address': {
			'ZipCode': shippingAddress.zipcode,
			'StreetNumber': shippingAddress.streetNumber,
			'Street': shippingAddress.street,
			'Country': shippingAddress.country,
			'City': shippingAddress.city,
		}
	};

	const billingCustomer = {
		'LastName': billingAddress.lastName,
		'FirstName': billingAddress.firstName,
		'Email': user.mail,
		'DebitorNumber': user.id,
		'BirthDay': user.birthday,
		'Address': {
			'ZipCode': billingAddress.zipcode,
			'StreetNumber': billingAddress.streetNumber,
			'Street': billingAddress.street,
			'Country': billingAddress.country,
			'City': billingAddress.city,
		}
	};

	const deviceIdentification = {
		'SessionIDAddegree': sessionStorage.getItem('arvato_session_id')
	};

	const baseInformation = {
		'Dimension': {
			'OrderType': orderType,
			'LanguageCode': 'de',
			'Country': 'DE',
			'SourceSystem': 'ARV-WS'
		}
	};

	data['RiskCheck']['Order'] = order;
	data['RiskCheck']['DeliveryCustomer'] = deliveryCustomer;
	data['RiskCheck']['BillingCustomer'] = billingCustomer;
	data['RiskCheck']['DeviceIdentification'] = deviceIdentification;
	data['BaseInformation'] = baseInformation;

	return data;
};