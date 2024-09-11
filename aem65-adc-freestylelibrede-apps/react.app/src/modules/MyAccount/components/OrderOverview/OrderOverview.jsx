import React, {Component} from 'react';
import {connect} from 'react-redux';
import CurrentOrder from '../CurrentOrderOverview/CurrentOrder';
import NoCurrentOrder from '../CurrentOrderOverview/NoCurrentOrder';
import {getCurrentOrdersRequest} from '../../redux/actions/get_orders.action';
import PropTypes from 'prop-types';
import {getProductsRequest} from '../../../Product/redux/actions/get_products.action';
import {fetchDictionaryRequest} from '../../../Translation/redux/actions/translation.actions';
import {DELIVERY_STATUSES, SUBSCRIPTION_STATUS} from '../../../../utils/enums';
import AddressEditor from '../CurrentOrderOverview/AddressEditor';
import ReturnArticle from '../OrderHistory/Return/ReturnArticle';
import {
    closeCurrentOrderReturnFormRequest,
    downloadInvoiceRequest,
    openReactivationFormRequest
} from '../../redux/actions/orders.action';
import {getGhostOrdersRequest} from "../../redux/actions/get_ghost_orders.action";
import GhostOrder from "../PrescriptionAccount/GhostOrder";
import {getProductPriceRequest} from "../../../Product/redux/actions/get_product_price.action";
import {openModalAction} from "../../../Modal/redux/actions";
import {resetAddressEditor} from "../../redux/actions/update_order.action";
import {
    resetPaymentReducer,
    updateAddressAndPaymentMethodRequest,
    updatePaymentMethodRequest
} from "../../redux/actions/update_payment_method.action";
import DataLayer from "../../../Data/DataLayer";
import ActivePlusService from "../PlusService/ActivePlusService";
import translate, {i18nLabels} from "../../../../utils/translationUtils";
import {getUrlParameter} from "../../../../utils/getParams";
import NoActivePlusService from "../PlusService/NoActivePlusService";
import AddressOverview from "./AddressOverview";
import {getRxOrderStatus, rxOrderEndStatusArray, rxOrderStatus50,getGhostOrdersbyStatusCode} from "../../../../utils/orderUtils";

const mapStateToProps = state => {
    const {ghostOrders} = state.myAccountModuleReducer.GetGhostOrdersReducer;
    const {orders, currentOrders} = state.myAccountModuleReducer.GetOrdersReducer;
    const {customer} = state.myAccountModuleReducer.GetCustomerReducer;
    const {products} = state.productModuleReducer.GetProductsReducer;
    const {dictionary} = state.translationModuleReducer.translationReducer;
    const {plusService: {isDeleted}, choosenDeliveryDate} = state.myAccountModuleReducer.OrdersReducer;
    const {productPrices} = state.productModuleReducer.getProductPricesReducer;
    const {canRedirect} = state.myAccountModuleReducer.UpdatePaymentMethodReducer;
    const {
        isCurrentOrderReturnFlow: isReturnFlow,
        delivery,
        orderDetails,
        productData
    } = state.myAccountModuleReducer.OrdersReducer;
    const {  loading :isPaymentUpdateLoading} = state.myAccountModuleReducer.UpdatePaymentMethodReducer;
    return {
        isDeleted,
        choosenDeliveryDate,
        productPrices,
        canRedirect,
        ghostOrders,
        orders,
        currentOrders,
        customer,
        products,
        dictionary,
        isReturnFlow,
        delivery,
        orderDetails,
        productData,
        isPaymentUpdateLoading
    };
};

const mapDispatchToProps = {
    getCurrentOrders: getCurrentOrdersRequest,
    getProductsRequest,
    fetchDictionaryRequest,
    closeCurrentOrderReturnFormRequest,
    getGhostOrdersRequest,
    getInvoice: downloadInvoiceRequest,
    getProductPriceRequest,
    openModalAction,
    resetAddressEditor,
    resetPaymentReducer,
    updatePaymentMethodRequest,
    openReactivationForm: openReactivationFormRequest,
    updateAddressAndPaymentMethodRequest
};

let choosenDeliveryDateFromUrl = null;
export default connect(mapStateToProps, mapDispatchToProps)(class OrderOverview extends Component {
    static propTypes = {
        getCurrentOrders: PropTypes.func,
        getProductsRequest: PropTypes.func,
        fetchDictionaryRequest: PropTypes.func,
        products: PropTypes.object,
        orders: PropTypes.object,
        currentOrders: PropTypes.object,
        customer: PropTypes.shape({
            id: PropTypes.number
        }),
        currentOrderHeading: PropTypes.string,
        emptyHeading: PropTypes.string,
        emptyInfoText: PropTypes.string,
        orderRecipeStyle: PropTypes.string,
        orderRecipeLink: PropTypes.string,
        orderShopStyle: PropTypes.string,
        dictionary: PropTypes.object,
        checkoutPage: PropTypes.string,
        orderShopLink: PropTypes.string,
        isReturnFlow: PropTypes.bool,
        productData: PropTypes.object,
        delivery: PropTypes.object,
        orderDetails: PropTypes.object,
        returnText: PropTypes.string,
        responsiveness: PropTypes.object,
        isAccountOverviewTab: PropTypes.bool,
        accountPagePath: PropTypes.string,
        accountPageTab: PropTypes.string,
        confirmationPath: PropTypes.string,
        checkboxes: PropTypes.array,
        closeCurrentOrderReturnFormRequest: PropTypes.func,
        orderType: PropTypes.string,
        tabName: PropTypes.string,
        title: PropTypes.string,
        statusLabel: PropTypes.string,
        downloadLabel: PropTypes.string,
        getGhostOrdersRequest: PropTypes.func,
        getInvoice: PropTypes.func,
        ghostOrders: PropTypes.array,
        noPrescriptionDescription: PropTypes.string,
        noPrescriptionTitle: PropTypes.string,
        image: PropTypes.string,
        icon: PropTypes.string,
        textdescription: PropTypes.string,
        linktext: PropTypes.string,
        linkpath: PropTypes.string,
        noprescriptionlink: PropTypes.string,
        instructionText: PropTypes.string,
        getProductPriceRequest: PropTypes.func,
        openReactivationForm: PropTypes.func,
        openModalAction: PropTypes.func,
        resetPaymentReducer: PropTypes.func,
        resetAddressEditor: PropTypes.func,
        productSku: PropTypes.string,
        choosenDeliveryDate: PropTypes.string,
        subscriptionHeading: PropTypes.string,
        subscriptionImage: PropTypes.string,
        informationalHeading: PropTypes.string,
        informationalDesc: PropTypes.string,
        moreInfoPath: PropTypes.string,
        moreInfoStyle: PropTypes.string,
        informationalMessage: PropTypes.string,
        bookServicePath: PropTypes.string,
        privacyPolicyPath: PropTypes.string,
        termsAndConditionsPath: PropTypes.string,
        trainingMaterialsPath: PropTypes.string,
        productPrices: PropTypes.object,
        isDeleted: PropTypes.bool,
        updatePaymentMethodRequest: PropTypes.func,
        updateAddressAndPaymentMethodRequest: PropTypes.func,
        canRedirect: PropTypes.bool,
        plusServiceConfirmationPath: PropTypes.string,
        plusServiceCheckboxes: PropTypes.array,
        plusServiceTabName: PropTypes.string,
        addressHeading: PropTypes.string,
        description: PropTypes.string,
        addressCards : PropTypes.array,
        isPaymentUpdateLoading: PropTypes.bool
    };

    state = {
        isEditing: false,
        currentOrder: {},
        addressType: '',
        checkOrder: true,
        rxOrderStatusRunning:false,
        rxOrderShowAddress:false,
        addressOverviewShown:0

    };
    ghostOrderTypes = {
        'active_order': [],
        'open_order': [],
        'completed_order': []
    };

    componentDidMount() {
        this.props.getGhostOrdersRequest();
        this.props.getProductsRequest();
        this.props.fetchDictionaryRequest();
        this.ref = React.createRef();
        window.addEventListener('hashchange', this.tabChanged, false);
        const {productSku, productPrices, getProductPriceRequest,isPaymentUpdateLoading} = this.props;
        const orderId = getUrlParameter('orderId');
        const currentSubscriptionOrderStatus = getUrlParameter('currentSubscriptionOrderStatus');
        const choosenDeliveryDate = getUrlParameter('choosenDeliveryDate');
        const {openReactivationForm} = this.props;
        if (productSku && !productPrices[productSku]) {
            getProductPriceRequest(productSku);
        }
        if (orderId && !isPaymentUpdateLoading) this.updatePaymentMethod();
        if (currentSubscriptionOrderStatus === SUBSCRIPTION_STATUS.INACTIVE) openReactivationForm();
        if (choosenDeliveryDate) {
            choosenDeliveryDateFromUrl = new Date(parseInt(choosenDeliveryDate));
        } else choosenDeliveryDateFromUrl = null;
    }

    ghostOrderAddressOverview = (ghostOrders) =>{
        for (let ghostOrder in ghostOrders) {
            let rxOrderStatusCode = ghostOrders[ghostOrder]?.frontend_status || ghostOrders[ghostOrder]?.status_code;
            if(rxOrderStatusCode){
                if(!rxOrderEndStatusArray.includes(rxOrderStatusCode)) {
                    if (rxOrderStatusCode === rxOrderStatus50) {
                        this.setState({rxOrderShowAddress: true});
                    }
                    this.setState({rxOrderStatusRunning: true});
                    const statusCode = getRxOrderStatus(rxOrderStatusCode);
                    this.ghostOrderTypes = getGhostOrdersbyStatusCode(statusCode,ghostOrders,ghostOrder,this.ghostOrderTypes);
                    this.setState({checkOrder: false});
                }

            }
            let activeOrderCondition =  (this.ghostOrderTypes['active_order'] && this.ghostOrderTypes['active_order'].length > 0);
            let openOrderCondition =  (this.ghostOrderTypes['open_order'] && this.ghostOrderTypes['open_order'].length > 0);
            this.setAddressOverviewShown(activeOrderCondition, openOrderCondition)
        }
    }
    setAddressOverviewShown = (activeOrderCondition, openOrderCondition) =>{
        if(activeOrderCondition){
            this.setState({addressOverviewShown: 0})
        }else if(openOrderCondition){
            this.setState({addressOverviewShown: 1})
        }else{
            this.setState({addressOverviewShown: 2})
        }
    }

    componentDidUpdate(prevProps) {
        const {orders, customer, getCurrentOrders, orderType, ghostOrders} = this.props;
        if (orders[orderType]?.orderList?.length && customer.id
            && (prevProps.customer.id !== customer.id || prevProps.orders[orderType]?.orderList?.length !== orders[orderType]?.orderList?.length)) {
            getCurrentOrders(orderType);
        }
        const tabName = getUrlParameter('tabName');
        if (prevProps.canRedirect !== this.props.canRedirect && this.props.canRedirect) {
            history.pushState({}, null, `${window.location.pathname}`);
            document.querySelector(`a[href="#${tabName}"]`)?.click();
        }

        if ((this.propsDidChange(prevProps) && this.state.checkOrder) || (ghostOrders !== prevProps.ghostOrders)) {
            this.ghostOrderTypes['active_order'] = [];
            this.ghostOrderTypes['open_order'] = [];
            this.ghostOrderTypes['completed_order'] = [];
            this.ghostOrderAddressOverview(ghostOrders)
        }
    }


    tabChanged = () => {
        this.setState({
            isEditing: false
        });
    };

    toggleEditing = (type, isEditing, currentOrder) => {
        this.setState({
            addressType: type,
            isEditing,
            currentOrder
        });
        this.ref.current.scrollIntoView();
        sessionStorage.removeItem('newAddressFromOrderUpdate');
        sessionStorage.removeItem('isAddressAndPaymentUpdate');
        sessionStorage.removeItem('customerEmail');
        localStorage.removeItem('showPayonWidget');
    };
    isLargeEnough = () => {
        const {responsiveness} = this.props;
        return !responsiveness || !responsiveness.default || responsiveness.default >= 10;
    };

    propsDidChange(prevProps) {
        return (this.props.ghostOrders?.length !== prevProps.ghostOrders?.length);
    }

    getPrescriptionStatus = () => `${this.props.statusLabel}`;

    getCurrentSubscriptionOrder = () => {
        return this.props.orders.CPS?.orderList?.filter(order => order.deliveryDetails !== null).sort((a, b) => b.orderDate - a.orderDate).find(order => order?.serviceData?.[0]?.serviceSKU && !order.isReimbursedOrder);
    };
    updatePaymentMethod = () => {
        const {updatePaymentMethodRequest} = this.props;
        const orderType = getUrlParameter('orderType');
        const paymentMethod = getUrlParameter('paymentMethod');
        const orderId = getUrlParameter('orderId');
        const checkoutId = getUrlParameter('id');
        const paymentMethodToken = getUrlParameter('paymentMethodToken');
        const isOpenInvoice = getUrlParameter('isOpenInvoice');
        const isAddressAndPaymentUpdate = JSON.parse(sessionStorage.getItem('isAddressAndPaymentUpdate'));
        const newAddressFromOrderUpdate = JSON.parse(sessionStorage.getItem('newAddressFromOrderUpdate'));
        const {address_id, address_type, isBlacklisted, isVerified, rssResultCode} = newAddressFromOrderUpdate || {};
        if (isAddressAndPaymentUpdate) {
            const payload = {
                address_type: address_type,
                address_id: address_id,
                rss_result_code: rssResultCode,
                is_blacklisted: isBlacklisted,
                is_verified: isVerified,
                code: paymentMethod,
                order_id: orderId,
                order_type: orderType,
                payon_checkout_id: checkoutId,
                payment_token: paymentMethodToken,
                isOpenInvoice: isOpenInvoice
            };
            this.updateAddressAndPayment(payload);
        } else {
            updatePaymentMethodRequest({
                code: paymentMethod,
                order_id: orderId,
                order_type: orderType,
                payon_checkout_id: checkoutId,
                payment_token: paymentMethodToken,
                isOpenInvoice: isOpenInvoice
            });
        }
    }
    updateAddressAndPayment = (payload) => {
        const {updateAddressAndPaymentMethodRequest} = this.props;
        updateAddressAndPaymentMethodRequest(payload);
        sessionStorage.removeItem('newAddressFromOrderUpdate');
        sessionStorage.removeItem('isAddressAndPaymentUpdate');
        sessionStorage.removeItem('customerEmail');
        localStorage.removeItem('showPayonWidget');
    }

    getCurrentSubscriptionOrderStatus = () => this.getCurrentSubscriptionOrder()?.serviceData?.[0]?.serviceStatus;

    deactivateSubscription = () => {
        const {dictionary, customer, resetAddressEditor, resetPaymentReducer, openModalAction} = this.props;
        const currentSubscriptionOrder = this.getCurrentSubscriptionOrder();

        resetAddressEditor();
        resetPaymentReducer();

        openModalAction({
            heading: translate(dictionary, i18nLabels.DEACTIVATE_PLUS_SERVICE_MODAL_HEADING, [customer?.firstname]),
            contentID: 'deactivatePlusServiceModal',
            props: {
                serviceToDate: currentSubscriptionOrder?.serviceData?.[0]?.serviceToDate,
                orderId: currentSubscriptionOrder?.orderId
            }
        });
    };

    deleteSubscription = () => {
        const {dictionary, customer, openModalAction} = this.props;
        const currentSubscriptionOrder = this.getCurrentSubscriptionOrder();
        openModalAction({
            heading: translate(dictionary, i18nLabels.DELETE_PLUS_SERVICE_MODAL_HEADING, [customer?.firstname]),
            contentID: 'deletePlusServiceModal',
            props: {
                orderId: currentSubscriptionOrder?.orderId
            }
        });
    };

   
    getIndexWithNonEmptyGhostOrderType = obj => {
            const key = Object.keys(obj).find(key => obj[key].length > 0);
            return key !== undefined ? Object.keys(obj).indexOf(key) : -1;
    };


    getSubscriptionFrequency = () => this.props.productPrices?.[this.props.productSku]?.cs_delivery_frequency;
    getSubscriptionPrice = () => this.props.productPrices?.[this.props.productSku]?.price;
    noOrderCondition = (currentOrderByType, currentOrderStatusArray, currentOrderDeliveryStatus, rxOrderStatusRunning, plusServiceCondition) => (!currentOrderByType || currentOrderStatusArray.includes(currentOrderDeliveryStatus)) && (this.props.ghostOrders?.length === 0 || !rxOrderStatusRunning) && !plusServiceCondition;
    render() {
        const {
            canRedirect,
            plusServiceConfirmationPath, plusServiceCheckboxes,
            plusServiceTabName,
            confirmationPath, checkboxes,
            isDeleted,
            currentOrderHeading,
            emptyHeading,
            emptyInfoText,
            orderRecipeStyle,
            orderRecipeLink,
            orderShopStyle,
            orderShopLink,
            products,
            dictionary,
            currentOrders,
            checkoutPage,
            isReturnFlow,
            delivery,
            orderDetails,
            productData,
            returnText,
            tabName,
            isAccountOverviewTab,
            accountPagePath,
            accountPageTab,
            closeCurrentOrderReturnFormRequest,
            orderType,
            icon,
            textdescription,
            instructionText,
            linktext,
            linkpath,
            title,
            downloadLabel,
            privacyPolicyPath, termsAndConditionPath, trainingMaterialsPath,
            customer,
            getInvoice,
            ghostOrders,
            subscriptionHeading, subscriptionImage, informationalHeading, informationalDesc,
            moreInfoPath, moreInfoStyle, informationalMessage, bookServicePath,choosenDeliveryDate,
            addressHeading, description,
            addressCards
        } = this.props;

        const {isEditing, currentOrder, addressType, rxOrderStatusRunning, rxOrderShowAddress, addressOverviewShown} = this.state;
        const myOrderUrl = `${accountPagePath}#${accountPageTab}`;
        const currentOrderByType = currentOrders?.[orderType];
        const currentOrderDeliveryDetails = currentOrderByType?.deliveryDetails?.[0];
        const currentOrderDeliveryStatus = currentOrderByType?.deliveryDetails?.[0]?.deliveryStatus;
        const currentSubscriptionOrder = this.getCurrentSubscriptionOrder();
        const currentSubscriptionOrderStatus = this.getCurrentSubscriptionOrderStatus();
        const choosenDeliveryDateFromState = currentSubscriptionOrderStatus === SUBSCRIPTION_STATUS.INACTIVE ? choosenDeliveryDate : null;
        const currentOrderStatusArray =[DELIVERY_STATUSES.CANCELLED, DELIVERY_STATUSES.DELIVERED, DELIVERY_STATUSES.DELIVERED_TO_3RD_PARTY];
        const plusServiceCondition = !isDeleted && currentSubscriptionOrder && currentSubscriptionOrderStatus !== SUBSCRIPTION_STATUS.CANCELLED && currentSubscriptionOrderStatus !== SUBSCRIPTION_STATUS.INACTIVE;
        const indexOfGhostOrderType = (ghostOrders?.length > 0 && rxOrderStatusRunning) && this.getIndexWithNonEmptyGhostOrderType(this.ghostOrderTypes)
        return (
            <div ref={this.ref}>
                <if condition={isReturnFlow}>
                    <ReturnArticle close={closeCurrentOrderReturnFormRequest} returnText={returnText}
                                   productData={productData}
                                   delivery={delivery} orderHistoryType={orderType} orderDetails={orderDetails}
                                   products={products} isLargeEnough={this.isLargeEnough()}/>
                </if>
                <elseif condition={isEditing}>
                    <AddressEditor order={currentOrder}
                                   confirmationPath={confirmationPath}
                                   checkboxes={checkboxes}
                                   addressType={addressType} close={() => this.toggleEditing(false)}/>
                </elseif>
                <else>
                    <if condition={currentOrderByType && !currentOrderStatusArray.includes(currentOrderDeliveryStatus)}>
                        <if condition={(ghostOrders?.length === 0 || !rxOrderStatusRunning) && !(plusServiceCondition)}>
                            <NoActivePlusService
                                subscriptionHeading={subscriptionHeading}
                                subscriptionImage={subscriptionImage}
                                informationalHeading={informationalHeading}
                                informationalDesc={informationalDesc}
                                informationalMessage={informationalMessage}
                                moreInfoPath={moreInfoPath}
                                moreInfoStyle={moreInfoStyle}
                                bookServicePath={bookServicePath}
                                frequency={this.getSubscriptionFrequency()}
                                price={this.getSubscriptionPrice()}
                            />
                            <AddressOverview
                                addressHeading={addressHeading}
                                description={description}
                                addressCards={addressCards}
                                cashPay={true}
                                rxOrder={false}
                                plusService={false}> </AddressOverview>
                        </if>
                        <CurrentOrder
                            editAddress={(type) => this.toggleEditing(type, true, currentOrderByType)}
                            order={{
                                ...currentOrderByType,
                                currentDeliveryDetails: currentOrderDeliveryDetails,
                                currentAddress: currentOrderDeliveryDetails?.deliveryAddress || currentOrderByType?.deliveryAddress,
                                currentProducts: currentOrderDeliveryDetails?.products,
                                currentDeliveryDate: currentOrderDeliveryDetails?.estimatedDeliveryDate,
                                currentTrackingNr: currentOrderDeliveryDetails?.deliveryTrackingNr,
                                orderStatus: currentOrderDeliveryDetails?.deliveryStatus || DELIVERY_STATUSES.CREATED
                            }}
                            currentOrderHeading={currentOrderHeading}
                            products={products}
                            tabName={tabName}
                            dictionary={dictionary}
                            checkoutPage={checkoutPage}
                            isAccountOverviewTab={isAccountOverviewTab}
                            myOrderUrl={myOrderUrl}
                            confirmationPath={confirmationPath}
                            checkboxes={checkboxes}
                        />
                        <if condition={rxOrderShowAddress || plusServiceCondition}>
                            <AddressOverview
                                addressHeading={addressHeading}
                                description={description}
                                addressCards={addressCards}
                                cashPay={true}
                                rxOrder={rxOrderShowAddress}
                                plusService={plusServiceCondition}> </AddressOverview></if>

                        <if condition={(ghostOrders?.length === 0 || !rxOrderStatusRunning) && !plusServiceCondition}>
                            <NoCurrentOrder
                                currentOrderHeading={currentOrderHeading}
                                emptyHeading={emptyHeading}
                                emptyInfoText={emptyInfoText}
                                orderRecipeStyle={orderRecipeStyle}
                                orderRecipeLink={orderRecipeLink}
                                orderShopStyle={orderShopStyle}
                                orderShopLink={orderShopLink}
                                isAccountOverviewTab={isAccountOverviewTab}
                                customerId={customer.user_id}
                            />
                        </if>
                    </if>


                    <if condition={ghostOrders?.length > 0 && rxOrderStatusRunning}>
                        {Object.keys(this.ghostOrderTypes).map((ghostType, index) =>
                            <if condition={this.ghostOrderTypes[ghostType]  && this.ghostOrderTypes[ghostType].length > 0} key={ghostType}>
                                <div><GhostOrder
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
                                    expandActiveOrderLink={true}
                                    customerId={index===indexOfGhostOrderType ? customer.user_id : null}
                                    />

                                    <if condition={index === addressOverviewShown && !(currentOrderByType && !currentOrderStatusArray.includes(currentOrderDeliveryStatus)) && (rxOrderShowAddress || plusServiceCondition)}>
                                        <AddressOverview
                                            key={ghostType}
                                            addressHeading={addressHeading}
                                            description={description}
                                            addressCards={addressCards}
                                            cashPay={false}
                                            rxOrder={rxOrderShowAddress}
                                            plusService={plusServiceCondition}> </AddressOverview></if>
                                </div></if>)}
                    </if>
                    <if condition={plusServiceCondition}>
                        <DataLayer orders products>
                            <ActivePlusService
                                order={currentSubscriptionOrder}
                                canRedirect={canRedirect}
                                choosenDeliveryDateFromUrl={choosenDeliveryDateFromUrl || choosenDeliveryDateFromState}
                                orderServiceStatus={currentSubscriptionOrderStatus}
                                privacyPolicyPath={privacyPolicyPath}
                                termsAndConditionsPath={termsAndConditionPath}
                                trainingMaterialsPath={trainingMaterialsPath}
                                deactivateSubscription={this.deactivateSubscription}
                                deleteSubscription={this.deleteSubscription}
                                confirmationPath={plusServiceConfirmationPath}
                                checkboxes={plusServiceCheckboxes}
                                tabName={plusServiceTabName}
                            />
                        </DataLayer>
                        <if condition={(ghostOrders?.length === 0 || !rxOrderStatusRunning) && !(currentOrderByType && !currentOrderStatusArray.includes(currentOrderDeliveryStatus))}>
                            <AddressOverview
                                addressHeading={addressHeading}
                                description={description}
                                addressCards={addressCards}
                                cashPay={false}
                                rxOrder={false}
                                plusService={true}> </AddressOverview>
                            <NoCurrentOrder
                                currentOrderHeading={currentOrderHeading}
                                emptyHeading={emptyHeading}
                                emptyInfoText={emptyInfoText}
                                orderRecipeStyle={orderRecipeStyle}
                                orderRecipeLink={orderRecipeLink}
                                orderShopStyle={orderShopStyle}
                                orderShopLink={orderShopLink}
                                isAccountOverviewTab={isAccountOverviewTab}
                            /></if>

                    </if>

                    <if
                        condition={this.noOrderCondition(currentOrderByType, currentOrderStatusArray, currentOrderDeliveryStatus, ghostOrders, rxOrderStatusRunning, plusServiceCondition)}>
                        <NoCurrentOrder
                            currentOrderHeading={currentOrderHeading}
                            emptyHeading={emptyHeading}
                            emptyInfoText={emptyInfoText}
                            orderRecipeStyle={orderRecipeStyle}
                            orderRecipeLink={orderRecipeLink}
                            orderShopStyle={orderShopStyle}
                            orderShopLink={orderShopLink}
                            isAccountOverviewTab={isAccountOverviewTab}
                            customerId={customer.user_id}
                        />
                    </if>
                </else>
            </div>);
    }
});