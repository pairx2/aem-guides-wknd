import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent} from '../../../Generic/components/Card/Card';
import Col from "../../../Generic/components/Container/Col";
import Row from "../../../Generic/components/Container/Row";

const AddressOverview = ({addressHeading, description, addressCards,cashPay, rxOrder, plusService}) => {
    return (
        <> <Card title={addressHeading}>
            <CardContent>
                <Row>
                    <Col md={12} className='pb-2'>
                        <div className="adc-prescription--border">
                            <h5 className="adc-title--black">{description}</h5>
                            <div className="address-overview container text-center">
                                <div className="row">
                                    {addressCards?.map((child, i) => <if key={child.cardType} condition={(child.cardType == 'cashPay' && cashPay) || (child.cardType == 'rxOrder' && rxOrder) || (child.cardType == 'plusService' && plusService)}><div className={`col-md-4 rectangle card-button ${child.cardType}`}>
                                        <a href={child.cardLink}>
                                        <div>
                                            <p className={"address-card-text"}>{child.text}</p>
                                        </div>
                                            <img className={"icon-logo"} src={child.cardImage} /></a>
                                        </div></if>)}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </CardContent>
        </Card>

        </>
    );
};

AddressOverview.propTypes = {
    addressHeading: PropTypes.string,
    description: PropTypes.string,
    addressCards: PropTypes.array,
    cashPay:PropTypes.bool,
    rxOrder:PropTypes.bool,
    plusService:PropTypes.bool
};
export default AddressOverview;
