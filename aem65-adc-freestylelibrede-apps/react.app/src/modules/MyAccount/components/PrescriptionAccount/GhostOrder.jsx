import React from 'react';
import PropTypes from 'prop-types';
import PrescriptionDetails from './PrescriptionDetails.jsx';
import {Card} from '../../../Generic/components/Card/Card.jsx';
import {CardContent} from '../../../Generic/components/Card/Card';

const GhostOrder = ({title, orders, downloadLabel, ghostType, customer, getInvoice, dictionary, icon, textdescription, instructionText, linktext, linkpath, expandActiveOrderLink, customerId}) => {
	return (
		<if condition={orders?.length > 0}>
			<Card title={ghostType} key={ghostType} customerId={customerId} className={customerId ? 'customer-id-section' : ''}>
				{orders.map((ghostOrder) =>
					<CardContent key={orders.id}>
						<PrescriptionDetails
							title={title || 'FreeStyle Libre Nachversorgung'}
							downloadLabel={downloadLabel}
							customer={customer}
							ghostOrder={ghostOrder}
							getInvoice={getInvoice}
							dictionary={dictionary}
							icon={icon}
							textdescription={textdescription}
							instructionText={instructionText}
							linktext={linktext}
							linkpath={linkpath}
							key={orders.id}
							expandActiveOrderLink={expandActiveOrderLink}
							ghostType={ghostType}
						/>
						<div className="d-flex border-bottom-grey mb-4"/>
					</CardContent>
				)}
			</Card>
		</if>
	);
};

GhostOrder.propTypes = {
	title: PropTypes.string,
	downloadLabel: PropTypes.string,
	customer: PropTypes.object,
	dictionary: PropTypes.object,
	icon: PropTypes.string,
	textdescription: PropTypes.string,
	linktext: PropTypes.string,
	linkpath: PropTypes.string,
	instructionText: PropTypes.string,
	orders: PropTypes.array,
	getInvoice: PropTypes.func,
	ghostType: PropTypes.string,
	customerId: PropTypes.number
};
export default GhostOrder;