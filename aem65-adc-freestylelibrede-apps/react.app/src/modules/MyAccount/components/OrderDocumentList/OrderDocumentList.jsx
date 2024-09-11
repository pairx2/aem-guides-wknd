import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, CardContent } from "../../../Generic/components/Card/Card";
import Row from "../../../Generic/components/Container/Row";
import Col from "../../../Generic/components/Container/Col";
import Button, {
  BUTTON_OPTIONS,
} from "../../../Generic/components/Button/Button";
import I18n from "../../../Translation/components/I18n";
import { i18nLabels } from "../../../../utils/translationUtils";
import { getAllOrdersRequest } from "../../redux/actions/get_orders.action";
import LoadingIndicator from "../../../Generic/components/Loading/LoadingIndicator";
import { downloadInvoiceRequest } from "../../redux/actions/orders.action";
import {ORDER_DOCUMENT_LIST} from "../../../../utils/enums";
import DocumentCountSection from "./DocumentCountSection";
import DocumentSection from "./DocumentSection";
import SearchSection from "./SearchSection";
import ShowResults from "./ShowResults";
import UseIntersection from "./UseIntersection"

const mapStateToProps = (state) => {
  const { allOrders } = state.myAccountModuleReducer.GetOrdersReducer;
  return {
    allOrders,
  };
};

const mapDispatchToProps = {
  getAllOrders: getAllOrdersRequest,
  getInvoice: downloadInvoiceRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class OrderDocumentList extends Component {
    static propTypes = {
      allOrders: PropTypes.object,
      getAllOrders: PropTypes.func,
      heading: PropTypes.string,
      subHeading: PropTypes.string,
      getInvoice: PropTypes.func,
      numberOfResults: PropTypes.number
    };

    state = {
      fetchedResults: [],
      isLoaded: false,
      resultsToShow: this.props.numberOfResults,
      query: "",
      isLoadMore: true,
      isButtonClicked: false,
      noSearchResults: false,
      isQueryLength: true,

    };
     
   fetchOrders = () => {
      const { allOrders, getAllOrders } = this.props;
      if(allOrders.fetched === false){
        getAllOrders({})
      }
    }

    componentDidUpdate() {
      const { isLoaded } = this.state;
      const { allOrders } = this.props;
      if (
        isLoaded === false &&
        allOrders?.fetched &&
        this.getOnlyPdfAvailableOrders().length !== 0
      ) {
        this.setState({
          fetchedResults: this.getOnlyPdfAvailableOrders(),
          isLoaded: true,
          resultsToShow:
          this.getOnlyPdfAvailableOrders().length > this.state.resultsToShow ? this.state.resultsToShow : this.getOnlyPdfAvailableOrders().length,
        });
      }
    }

getOnlyPdfAvailableOrders = () => {
  const { allOrders } = this.props;
  return (allOrders?.orders || []).reduce((orderInvoiceList, order) => {
    const { orderId, orderDate, deliveryDetails } = order;

    deliveryDetails.forEach((invoiceDetail) => {
        const { deliveryOrderId, invoiceIdDetails } = invoiceDetail;

        (invoiceIdDetails || []).forEach((invoiceIdDetail) => {
            const { invoiceId, invoiceStatus, invoiceDate } = invoiceIdDetail;

            if (invoiceId) {
                let orderType = ORDER_DOCUMENT_LIST.DOC;

                if (invoiceId.startsWith(ORDER_DOCUMENT_LIST.INVOICE)) {
                    orderType = ORDER_DOCUMENT_LIST.RECHNUNG;
                } else if (invoiceId.startsWith(ORDER_DOCUMENT_LIST.CREDIT)) {
                    orderType = ORDER_DOCUMENT_LIST.GUTSCHRIFT;
                }

                const orderInvoiceObj = {
                    orderType,
                    orderId,
                    orderDeliveryId: deliveryOrderId,
                    orderDate,
                    invoiceId,
                    invoiceStatus,
                    invoiceDate
                };

                orderInvoiceList.push(orderInvoiceObj);
            }
        });
    });
    
    return orderInvoiceList.sort((a,b) => b.invoiceDate-a.invoiceDate);
}, []);
}

    handleSearchClick = (searchArray) => {
      const { query } = this.state;
      if(query.length > 0){
          if (query.length >= 3) {
            const pdfOrders = searchArray;
            const searchFiltered = pdfOrders?.filter(
              (eachOrder) =>
                eachOrder.orderDeliveryId?.toLowerCase().includes(query.toLowerCase()) ||
                eachOrder.orderType?.toLowerCase().includes(query.toLowerCase()) ||
                eachOrder.invoiceId?.toLowerCase().includes(query.toLowerCase())
              );
              if(searchFiltered?.length > 0){
                this.setState({
                  ...this.state,
                  isLoadMore: true,
                  fetchedResults: searchFiltered,
                  resultsToShow: this.props.numberOfResults,
                  isQueryLength: true
                });
              }
              else{
                this.setState({
                  ...this.state,
                  isLoadMore: true,
                  resultsToShow: this.props.numberOfResults,
                  fetchedResults:[],
                  noSearchResults: true,
                  isQueryLength: true
                })
              }
          } 
          else {
            this.setState({
              ...this.state,
              isLoadMore: true,
              resultsToShow: this.props.numberOfResults,
              fetchedResults:[],
              isQueryLength: false,
              noSearchResults: false
            })
          }
    }
    };

    handleKeyPress = (event) => {
      if (event.key === 'Enter'){
        event.preventDefault();
        this.handleSearchClick(this.getOnlyPdfAvailableOrders())
      }
    };

    handleSearchQuery = (event) => {
      this.setState({
        ...this.state,
        query: event.target.value,
        noSearchResults:false,
        fetchedResults: this.getOnlyPdfAvailableOrders(),
      });
    };

    handleCreditButton = () => {
      const {query} = this.state
      const creditPdfOrders = this.getOnlyPdfAvailableOrders();
      const creditButtonFiltered = creditPdfOrders?.filter(
        (each) =>
          each.invoiceId?.startsWith(ORDER_DOCUMENT_LIST.INVOICE) || each.invoiceId?.startsWith(ORDER_DOCUMENT_LIST.CREDIT)
      );
      if(query.length > 0){
        this.handleSearchClick(creditButtonFiltered)
        this.setState({
          ...this.state,
          isButtonClicked: true,
        });
      }
      else {
        this.setState({
          ...this.state,
          fetchedResults: creditButtonFiltered,
          isButtonClicked: true,
          isLoadMore: true,
          resultsToShow: this.props.numberOfResults,
          noSearchResults: false,
          isQueryLength:true,
        })
      }
      
    
   };

    handleAllButton = () => {
      const {query} = this.state
      if(query.length > 0){
        this.handleSearchClick(this.getOnlyPdfAvailableOrders())
        this.setState({
          ...this.state,
          isButtonClicked: false,
          resultsToShow: this.props.numberOfResults,
          isLoadMore: true,
          isQueryLength: true,
        })
      }
      else{
        this.setState({
          ...this.state,
          fetchedResults: this.getOnlyPdfAvailableOrders(),
          isButtonClicked: false,
          resultsToShow: this.props.numberOfResults,
          isLoadMore: true,
          isQueryLength: true
        });
      }
      
    };

    handleLoadMore = () => {
      const length = this.state.fetchedResults?.length;
      const increment = this.state.resultsToShow + this.props.numberOfResults;
      if(length >= increment){
        this.setState({
          ...this.state,
          resultsToShow: increment
        })
      }
      else{
        this.setState({
          ...this.state,
          resultsToShow: length,
          isLoadMore: false
        })
      }
    }

    resetSearch = () => {
      this.setState({
        ...this.state,
        fetchedResults: this.getOnlyPdfAvailableOrders(),
        isLoadMore: true,
        resultsToShow: this.props.numberOfResults,
        query: "",
        noSearchResults: false,
        isQueryLength: true,
      });
    };

    resetAllFilters = () => {
      const {numberOfResults} = this.props;
      this.setState({
      fetchedResults: this.getOnlyPdfAvailableOrders(),
      isLoaded: true,
      resultsToShow: numberOfResults,
      query: "",
      isLoadMore: true,
      isButtonClicked: false,
      noSearchResults: false,
      isQueryLength: true,
      })
    }

    handleDocumentList = () => {
      const { allOrders, heading, subHeading, numberOfResults } = this.props;
      const { fetchedResults, isLoaded, query, isLoadMore, isButtonClicked, noSearchResults, isQueryLength } = this.state;
          return (
            <div className="adc-order-document-list">
          <Card title={heading} className="border-bottom-none heading-card">
            <CardContent>
              <p className="sub-heading">{subHeading}</p>
            </CardContent>
          </Card>
          <if condition={isLoaded}>
          <Card className="border-bottom-none-two">
              <CardContent>
                <Row>
                  <Col className={"col-lg-4 search-doc-fields"}>

                  <div class="modal fade" id="mobileFilterModel" tabindex="-1" role="dialog" aria-labelledby="mobileFilterModel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header shadow">
                            <div type="button" data-dismiss="modal" class="Close closemodal-box" aria-label="Close">
                            <em class="adc-icon adc-icon--small  close-icon"></em>
                              <div class="closemodal closemodal-box-font"><I18n text={i18nLabels.ORDER_DOCUMENT_CANCEL_AND_CLOSE}/></div>
                            </div>
                            </div>
                            <div class="modal-body">
                                    <div className="mobile-search-section">
                                  <SearchSection query={query} 
                                  handleSearchQuery={this.handleSearchQuery}
                                  handleKeyPress={this.handleKeyPress}
                                  handleSearchClick={this.handleSearchClick}
                                  getOnlyPdfAvailableOrders={this.getOnlyPdfAvailableOrders}
                                  resetSearch={this.resetSearch}
                                  />
                                    </div>
                                    <div className="mt-4">
                                    <DocumentSection isButtonClicked={isButtonClicked} handleAllButton={this.handleAllButton} handleCreditButton={this.handleCreditButton}/>
                                    </div>
                            </div>
                            <div class="modal-footer shadow" data-dismiss="modal" className="modal-footer shadow Close" aria-label="Close">
                            <Button
                              type={BUTTON_OPTIONS.TYPE.SUBMIT}
                              className={"mt-2 modal-footer-button w-100"}
                              ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
                              hasNoMargin
                              label={i18nLabels.ORDER_DOCUMENT_APPLY_FILTER_LABEL}
                              action={() => this.handleSearchClick(this.getOnlyPdfAvailableOrders())}
                            />
                            <p data-dismiss="modal" className="Close modal-footer-apply-close" aria-label="Close">{<I18n text={i18nLabels.ORDER_DOCUMENT_CANCEL_AND_CLOSE}/>}</p>
                            </div>
                          </div>
                        </div>
                  </div>

                  <div className="col-md-none mobile-div">
                    <div>
                    <p className="mobile-count-placeholder"><I18n text={i18nLabels.ORDER_DOCUMENT_COUNT_PLACEHOLDER} params={[fetchedResults?.length]} /></p>
                    </div>
                    <div className="mobile-filter-and-resetall">
                          <div className="mobile-filter" type="button" data-toggle="modal" data-target="#mobileFilterModel">
                          <em class="adc-icon adc-icon--medium filter-icon"></em>
                            {ORDER_DOCUMENT_LIST.FILTER}
                          </div>
                        <div className={query?.length>0 || isButtonClicked ? "mobile-reset-all text-normal" : "mobile-reset-all"}>
                          <span className = "ml-2" onClick={this.resetAllFilters}> 
                          <em class="adc-icon adc-icon--small  close-icon"></em>
                            <I18n text={i18nLabels.ORDER_DOCUMENT_RESET_ALL_FILTERS} />
                            </span>
                        </div>
                    </div>
                  </div>

                    <div className="col-main-div">
                      <SearchSection query={query} 
                                  handleSearchQuery={this.handleSearchQuery}
                                  handleKeyPress={this.handleKeyPress}
                                  handleSearchClick={this.handleSearchClick}
                                  getOnlyPdfAvailableOrders={this.getOnlyPdfAvailableOrders}
                                  resetSearch={this.resetSearch}
                                  />
                    </div>
                    <div className="col-sub-div mt-4">
                    <DocumentSection isButtonClicked={isButtonClicked} handleAllButton={this.handleAllButton} handleCreditButton={this.handleCreditButton}/>
                    </div>
                  </Col>

                  <Col className={"col-lg-8"}>
                    <DocumentCountSection fetchedResults={fetchedResults} query={query} isButtonClicked={isButtonClicked} resetAllFilters={this.resetAllFilters}/>
                    <if condition={allOrders.loading === true}>
                      <div className="mt-5 ml-5">
                        <LoadingIndicator />
                      </div>
                    </if>

                    <if
                      condition={
                        !allOrders?.loading &&
                        allOrders?.fetched &&
                        isLoaded &&
                        isQueryLength &&
                        !noSearchResults
                      }
                    >
                      <ShowResults results={fetchedResults} resultsToShow={this.state.resultsToShow} getInvoice={this.props.getInvoice} />
                    </if>
                    
                    <if condition = {noSearchResults === true && isQueryLength === true && fetchedResults?.length === 0}>
                      <div className="mt-5"> 
                        <p><I18n text={i18nLabels.ORDER_DOCUMENT_NO_RESULTS_MSG} /></p>
                      </div>
                    </if> 
                    <if condition = {!isQueryLength}>
                      <div className="mt-5"> 
                        <p><I18n text={i18nLabels.ORDER_DOCUMENT_SEARCH_QUERY_LENGTH_ERR} /></p>
                      </div>
                    </if> 
                  <if
                      condition={
                        allOrders?.fetched === true && isLoadMore && !noSearchResults && isQueryLength  && fetchedResults?.length > this.state.resultsToShow
                      }
                    >
                      <div className="load-more">
                        <Button
                          type={BUTTON_OPTIONS.TYPE.SUBMIT}
                          className={"mt-2 load-more-button"}
                          ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
                          hasNoMargin
                          label={i18nLabels.ORDER_DOCUMENT_LOAD_MORE_BUTTON}
                          params={[numberOfResults + " "]}
                          action={this.handleLoadMore}
                        />
                      </div>
                    </if>
                  </Col>
                </Row>
              </CardContent>
          </Card>
          </if>

          <elseif condition={!isLoaded && allOrders?.fetched && this.getOnlyPdfAvailableOrders()?.length === 0}>
              <Card className="border-bottom-none">
                <CardContent>
                        <div className="no-pdf-msg-style"> 
                            <p><I18n text={i18nLabels.ORDER_DOCUMENT_NO_PDF_MSG} /></p>
                          </div>
                  </CardContent>
              </Card> 
          </elseif>

          <elseif condition={!allOrders.fetched && allOrders.loading}>
              <div className="loader-position">
                  <LoadingIndicator />
              </div>
          </elseif>
          <elseif condition = {allOrders?.fetched === false && allOrders?.loading === false && !isLoaded}>
          <Card className="border-bottom-none-two">
            <CardContent>
                    <Row>
                      <Col className="col-lg-4 border-bottom-none-two">
                        <div className="col-main-div">
                        <SearchSection query={query} 
                                  handleSearchQuery={this.handleSearchQuery}
                                  handleKeyPress={this.handleKeyPress}
                                  handleSearchClick={this.handleSearchClick}
                                  getOnlyPdfAvailableOrders={this.getOnlyPdfAvailableOrders}
                                  resetSearch={this.resetSearch}
                                  />
                      </div>
                      <div className="col-sub-div mt-4">
                      <DocumentSection isButtonClicked={isButtonClicked} handleAllButton={this.handleAllButton} handleCreditButton={this.handleCreditButton}/>
                      </div>
                      </Col>
                      <Col className={"col-lg-8"}>
                        <DocumentCountSection fetchedResults={fetchedResults} query={query} isButtonClicked={isButtonClicked} resetAllFilters={this.resetAllFilters}/>
                      <div className="mt-5"> 
                        <p> <I18n text={i18nLabels.ORDER_DOCUMENT_TECHNICAL_ERROR_MSG} /> </p>
                      </div>
                      </Col>
                    </Row>
            </CardContent>
          </Card>
        </elseif> 
        </div>
          )
    }

  render() {
      return (
        <UseIntersection onVisible={this.fetchOrders}>
           { this.handleDocumentList }
              </UseIntersection>
      );
    }
  }
);

