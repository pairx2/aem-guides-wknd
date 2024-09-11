import I18n from "../../../Translation/components/I18n";
import { i18nLabels } from "../../../../utils/translationUtils";
import React from "react";
import Button, {
  BUTTON_OPTIONS,
} from "../../../Generic/components/Button/Button";
import PropTypes from "prop-types";

const DocumentSection = ({
  isButtonClicked,
  handleAllButton,
  handleCreditButton,
}) => {
  return (
    <>
      <p className="document-type">
        <I18n text={i18nLabels.ORDER_DOCUMENT_TYPE} />
      </p>
      <div className="doc-buttons-align mt-2">
        <Button
          type={BUTTON_OPTIONS.TYPE.SUBMIT}
          className={"mt-2 style-button-all"}
          ctaStyle={isButtonClicked ? "" : "document-button-style"}
          hasNoMargin
          label={i18nLabels.ORDER_DOCUMENT_SHOW_ALL_BUTTON}
          action={handleAllButton}
        />
        <Button
          type={BUTTON_OPTIONS.TYPE.SUBMIT}
          className={"mt-2 style-button-invoice"}
          ctaStyle={isButtonClicked ? "document-button-style" : ""}
          hasNoMargin
          label={i18nLabels.ORDER_DOCUMENT_SHOW_INVOICE_BUTTON}
          action={handleCreditButton}
        />
      </div>
      <p
        className={
          isButtonClicked ? "buttons-reset text-normal" : "buttons-reset"
        }
        onClick={handleAllButton}
      >
        <I18n text={i18nLabels.ORDER_DOCUMENT_RESET_BUTTONS} />
      </p>
    </>
  );
};

DocumentSection.propTypes = {
	isButtonClicked: PropTypes.bool,
	handleAllButton: PropTypes.func,
	handleCreditButton: PropTypes.func
};

export default DocumentSection;
