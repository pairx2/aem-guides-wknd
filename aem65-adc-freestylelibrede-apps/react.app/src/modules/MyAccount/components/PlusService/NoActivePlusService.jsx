import React from "react";
import I18n from "../../../Translation/components/I18n";
import PropTypes from "prop-types";
import { i18nLabels } from "../../../../utils/translationUtils";
import { Card, CardContent } from "../../../Generic/components/Card/Card";
import ProductPrice from "../../../Product/components/ProductPrice/ProductPrice";
import Button, {
  BUTTON_OPTIONS,
} from "../../../Generic/components/Button/Button";

const NoActivePlusService = ({
  subscriptionHeading,
  subscriptionImage,
  informationalHeading,
  informationalDesc,
  informationalMessage,
  moreInfoPath,
  moreInfoStyle,
  bookServicePath,
  frequency,
  price,
  informationalPriceSuperscript
}) => {
  return (
    <Card title={subscriptionHeading} className={"adc-plus-service"}>
      <CardContent>
        <div className="row">
          <div className="col-12 col-lg-7 order-2 order-lg-1 pt-4 pb-2 adc-subscription__info">
            <h2 className="adc-title adc-title--blue  mb-3 adc-subscription__info--title">
              {informationalHeading}
            </h2>
            <p>{informationalDesc}</p>
            <p className="adc-subscription__info__price d-flex align-items-center">
              <ProductPrice 
                  price={parseFloat(price)} 
                  withReference 
              />
              <span class="adc-subscription__info__price--sup-top">{informationalPriceSuperscript}</span>
              <span className="adc-subscription__info__price--duration ml-2 mt-3">
                {frequency ? (
                  <I18n text={frequency} />
                ) : (
                  <I18n text={i18nLabels.QUARTERLY} />
                )}
              </span>
            </p>
          <div className="row mb-4 mt-4 mt-lg-1">
              <div className="col-12 col-lg-6 mt-2">
                <Button
                  label={i18nLabels.MORE_INFO_CTA}
                    ctaStyle={
                    moreInfoStyle
                      ? moreInfoStyle
                      : BUTTON_OPTIONS.STYLE.SECONDARY
                  }
                  className={"m-0 px-0"}
                  noMargin
                  isFullWidth
                  href={moreInfoPath}
                />
              </div>
              <div className="col-12 col-lg-6 mt-2">
                <Button
                  label={"Plus-Service buchen"}
                  ctaStyle={BUTTON_OPTIONS.STYLE.PRIMARY}
                  className={"m-0 px-0"}
                  noMargin
                  isFullWidth
                  href={bookServicePath}
                />
              </div>
            </div>
                  <p className="adc-subscription__info--info-text m-0">
                    {informationalMessage}
                  </p>
          </div>
          <div className="col-12 col-lg-5 py-4 order-1 order-lg-2 d-flex justify-content-lg-end justify-content-center">
            <div className="adc-subscription__image p-4">
              <img
                alt="subscriptionImage"
                className="image"
                src={subscriptionImage}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

NoActivePlusService.propTypes = {
  subscriptionHeading: PropTypes.string,
  subscriptionImage: PropTypes.string,
  informationalHeading: PropTypes.string,
  informationalDesc: PropTypes.string,
  informationalMessage: PropTypes.string,
  moreInfoPath: PropTypes.string,
  moreInfoStyle: PropTypes.string,
  bookServicePath: PropTypes.string,
  frequency: PropTypes.string,
  price: PropTypes.string,
  informationalPriceSuperscript: PropTypes.string
};
export default NoActivePlusService;
