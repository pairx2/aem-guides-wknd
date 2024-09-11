
import I18n from "../../../Translation/components/I18n";
import { i18nLabels } from "../../../../utils/translationUtils";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "../../../Generic/components/Container/Row";
import Col from "../../../Generic/components/Container/Col";
import ProductQuantity from "../../../Cart/components/ProductQuantity/ProductQuantity";
import Icon from "../../../Generic/components/Icon/Icon";
import DatePickerField from "../../../Form/components/GenericFields/DatePickerField";
import { required } from "../../../Form/utils/validationRules";
import ProductPrice from "../ProductPrice/ProductPrice";

export default connect()(class MultiProductItem extends Component {
        static propTypes = {
            index: PropTypes.string,
            sku: PropTypes.string,
            product: PropTypes.object,
            description: PropTypes.string,
            breakpoints: PropTypes.object,
            currentBreakpoint: PropTypes.string,
            subscriptionOption: PropTypes.string,
            selectedProduct: PropTypes.string,
            handleSecondRadioButton: PropTypes.func,
            radioSelectionCheck: PropTypes.bool,
            handleConfirm: PropTypes.func,
            selectedDate: PropTypes.string,
            deliveryDate: PropTypes.string,
            handleChange: PropTypes.func,
            toggleCalendar: PropTypes.func,
            isCalendarOpen: PropTypes.bool,
            getProductPrice : PropTypes.func,
            listLength: PropTypes.bool,
            quantity: PropTypes.number,
            decrementQuantity: PropTypes.func,
            incrementQuantity: PropTypes.func,
            heading:PropTypes.string
        };

        getSubscriptionSelectedOptionLabel = () => {
            return this.props.product?.bundle_options
                [this.props.subscriptionOption]?.label || 'Monthly';
        };

        getFirstDeliveryDate = () => {
            if (!this.props.product.first_delivery_date_after) {
                return new Date().setDate(new Date().getDate() + parseInt("0.0") + 1);
            }
            return new Date()
                .setDate(new Date().getDate() +
                    parseInt(this.props.product?.first_delivery_date_after) + 1);
        };

        render() {
            const {
                sku,
                description,
                breakpoints,
                currentBreakpoint,
                index,
                product,
                quantity,
                heading
            } = this.props;
            return (

                <div className={!this.props.radioSelectionCheck ? "radiosection" : "radiosection radiosection-selected"} name={sku} id={"_" + index} onClick={() => this.props.handleSecondRadioButton(index,sku)}>
                    <if condition={this.props.listLength}> <input type="radio" class="multi-radio" checked={this.props.radioSelectionCheck} /></if>
                    <span className={this.props.listLength ? "radiosectionalign1" : "radiosectionalign1 radiosection-padding"} ><strong> {heading}</strong></span>
                    <div className={!this.props.radioSelectionCheck ? "d-none row" : "row"}>
                        <div
                            className={'col-12 order-3 order-md-4 mt-3'}>
                            <p className="multiradiodescription2" dangerouslySetInnerHTML={{__html: description}}/>
                            <Row className=" no-gutters multiradiodescription2">
                                <if condition={!product["is_subscription"]}>
                                    <Col width={7} md={7} lg={5} xl={4}>
                                        <ProductQuantity
                                            quantity={quantity}
                                            isManual
                                            onIncrement={this.props.incrementQuantity}
                                            onDecrement={this.props.decrementQuantity}
                                            max_sale_qty={parseInt(product["max_sale_qty"])}
                                            min_sale_qty={parseInt(product["min_sale_qty"])}
                                        />
                                    </Col>
                                </if>
                                <Col width={3}
                                     className="adc-product-detail__pricing adc-price-detail
									 d-flex pb-0 align-items-center">
                                    <ProductPrice price={this.props.getProductPrice()} withReference={false} />
                                </Col>
                            </Row>
                        </div>
                        <div className={`${breakpoints[currentBreakpoint] === breakpoints.mobile
                        && product["is_subscription"] ? 'col-12 col-md-8 order-4' : 'col-12 order-7'} order-md-5 `}>
                            <Row className={`${breakpoints[currentBreakpoint] === breakpoints.mobile
                        && product["is_subscription"] ? 'multidescription-padding' : ' '}  no-gutters multiradiodescription2`}>
                                <if condition={product["is_subscription"]}>
                                    <Col md={12} lg={8} xl={6} className={'pl-xl-2 adc-product-details__quaterly'}>
                                        <I18n text={this.getSubscriptionSelectedOptionLabel()} />
                                    </Col>
                                </if>

                                <if condition={!product["is_subscription"]}>
                                    <Col md={6} lg={4} xl={4} className="d-none d-lg-block" />
                                </if>
                                <Col md={12} lg={8} xl={6}
                                     className={`${breakpoints[currentBreakpoint] === breakpoints.mobile
                                     && product["is_subscription"] ? 'adc-product-details__quaterly--info-cps' : 'adc-product-details__quaterly--info'}
									 pl-xl-1 ml-lg-1 ml-md-0 justify-content-center justify-content-md-start `}>
									<span className="adc-product-details__tooltipbottom-title mr-1">
                                    <I18n text={i18nLabels.INCLUDING_VAT} params={[product["tax_value"] || '0']} /></span>
                                    <div className="d-flex align-items-center">
										<span className="adc-product-details__tooltipbottom-title"><I18n
                                            text={i18nLabels.PLUS_SHIPPING_COST} /></span>
                                        <Icon image={'info-box'}>
                                            <div className="adc-tooltipbottom__content shipping-options">
                                                <Row>
                                                    <Col className="font-weight-bold text-left px-4">
                                                        <I18n text={product["is_subscription"] ? i18nLabels.CPS_SHIPPING_METHOD_TEXT
                                                            : i18nLabels.CPO_SHIPPING_METHOD_TEXT} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Icon>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <if condition={product["is_subscription"]}>
                            <Col lg={8} className={`${breakpoints[currentBreakpoint] === breakpoints.mobile? 'mobile-datepicker' : 'desktop-datepicker'} order-6 order-md-8 `}>
                                <if condition={this.getFirstDeliveryDate()}>
                                        <Col md={12}>
                                            <div className="adc-form-group w-100 adc-product-details__date-picker multi-date-picker ">
                                                <DatePickerField
                                                    minDate={this.getFirstDeliveryDate()}
                                                    name='deliveryDate'
                                                    selectedDate={this.props.selectedDate}
                                                    confirmedDate={this.props.deliveryDate}
                                                    onChange={this.props.handleChange}
                                                    handleConfirm={this.props.handleConfirm}
                                                    toggleCalendar={this.props.toggleCalendar}
                                                    isCalendarOpen={this.props.isCalendarOpen}
                                                    label={i18nLabels.START_DATE}
                                                    validationRules={[required]}
                                                    icon='clock-calendar-blue'
                                                />
                                            </div>
                                        </Col>
                                </if>
                            </Col>
                        </if>
                    </div>
                </div>
            );
        }
    }
);