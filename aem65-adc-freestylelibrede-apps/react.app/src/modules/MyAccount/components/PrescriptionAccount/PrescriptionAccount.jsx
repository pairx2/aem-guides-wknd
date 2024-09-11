import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card} from '../../../Generic/components/Card/Card.jsx';
import {CardContent} from '../../../Generic/components/Card/Card';
import NoActivePrescription from './NoActivePrescription';
import {getGhostOrdersRequest} from '../../redux/actions/get_ghost_orders.action';
import {downloadInvoiceRequest} from '../../redux/actions/orders.action';
import GhostOrder from './GhostOrder';
import {getRxOrderStatus,getGhostOrdersbyStatusCode} from "../../../../utils/orderUtils";
const mapStateToProps = state => {
	const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
	const {dictionary} = state.translationModuleReducer.translationReducer;
	const {ghostOrders} = state.myAccountModuleReducer.GetGhostOrdersReducer;
	return {customer, dictionary, ghostOrders};
};

const mapDispatchToProps = {
	getGhostOrdersRequest,
	getInvoice: downloadInvoiceRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(class PrescriptionAccount extends Component {
	static propTypes = {
		title: PropTypes.string,
		statusLabel: PropTypes.string,
		downloadLabel: PropTypes.string,
		customer: PropTypes.object,
		getGhostOrdersRequest: PropTypes.func,
		getInvoice: PropTypes.func,
		ghostOrders: PropTypes.array,
		noPrescriptionDescription: PropTypes.string,
		noPrescriptionTitle: PropTypes.string,
		dictionary: PropTypes.object,
		image:PropTypes.string,
		icon:PropTypes.string,
		textdescription:PropTypes.string,
		linktext:PropTypes.string,
		linkpath:PropTypes.string,
		noprescriptionlink:PropTypes.string,
		instructionText: PropTypes.string
	};
	state= {
		checkOrder: true
	}
	ghostOrderTypes = {
		'active_order': [],
		'open_order': [],
		'completed_order': []
	};
	componentDidMount() {
		this.props.getGhostOrdersRequest();
	}

	componentDidUpdate(prevProps) {
		const {ghostOrders} = this.props;
		let ghostOrder;
		if ((this.propsDidChange(prevProps) && this.state.checkOrder) || (ghostOrders !== prevProps.ghostOrders)) {
			this.ghostOrderTypes['active_order'] = [];
			this.ghostOrderTypes['open_order'] = [];
			this.ghostOrderTypes['completed_order'] = [];
			for (ghostOrder in ghostOrders){
				if(!(ghostOrders[ghostOrder]?.status_code === 49 && ghostOrders[ghostOrder]?.frontend_status === null)){
					const statusCode = getRxOrderStatus(ghostOrders[ghostOrder]?.frontend_status || ghostOrders[ghostOrder]?.status_code);
					this.ghostOrderTypes = getGhostOrdersbyStatusCode(statusCode,ghostOrders,ghostOrder,this.ghostOrderTypes);
					this.setState({checkOrder: false});
				}
			}
		}
	}
	propsDidChange(prevProps) {
		return (this.props.ghostOrders?.length !== prevProps.ghostOrders?.length);
	}

	getPrescriptionStatus = () => `${this.props.statusLabel}`;

	render() {
		const {image,icon, textdescription, instructionText, linktext, linkpath, title, downloadLabel, customer, dictionary, getInvoice, ghostOrders, noPrescriptionDescription, noPrescriptionTitle, noprescriptionlink} = this.props;
		return (
			<>
				<if condition={ghostOrders?.length > 0}>
					{Object.keys(this.ghostOrderTypes).map((ghostType) =>
						<GhostOrder
							ghostType={ghostType}
							orders={this.ghostOrderTypes[ghostType]}
							title={title || 'FreeStyle Libre Nachversorgung'}
							downloadLabel={downloadLabel}
							customer={customer}
							getInvoice={getInvoice}
							dictionary={dictionary}
							icon={icon}
							textdescription={textdescription}
							instructionText={instructionText}
							linktext={linktext}
							linkpath={linkpath}
							key={ghostType}
						/>
					)}
				</if>
				<else>
					<Card title={this.props.statusLabel}>
						<CardContent>
							<NoActivePrescription title={noPrescriptionTitle} description={noPrescriptionDescription} image={image} noprescriptionlink={noprescriptionlink}/>
						</CardContent>
					</Card>
				</else>
			</>
		);
	}
});