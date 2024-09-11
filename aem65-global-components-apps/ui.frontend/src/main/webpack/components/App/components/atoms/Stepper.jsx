import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Alert from './Alert';

const Stepper = (props) => {
  const { defaultVal, minVal, maxVal, size, onChange, onMiniCart, applySubscriptionStyle } = props;
  const [stepperVal, setStepperVal] = useState(onMiniCart ? parseFloat(defaultVal):parseFloat(minVal));
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);
  const [minQuantityReached, setMinQuantityReached] = useState(false);
  const { t } = useTranslation();

  const waitForElementToExist = (selector) => {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        subtree: true,
        childList: true,
      });
    });
  };

  waitForElementToExist('#stepper-div').then(element => {
    const stepperDiv = document.getElementById('stepper-div');
    const stepperSubscriptionDiv = document.getElementById('stepper-place');
    if(applySubscriptionStyle && (applySubscriptionStyle == 'all' || applySubscriptionStyle == 'singlePurchase') && stepperSubscriptionDiv) {
      stepperDiv.classList.add("move-stepper");
    } else {
      stepperDiv.classList.remove("move-stepper");
    }
  });

  onMiniCart && useEffect(() => {
    if (parseFloat(defaultVal) !== parseFloat(stepperVal)) {
      setStepperVal(parseFloat(defaultVal));
    }
  }, [defaultVal]);

  !onMiniCart && useEffect(() => {
    if (parseFloat(minVal) !== parseFloat(stepperVal)) {
      setStepperVal(parseFloat(minVal));
    }
  }, [minVal]);

  const onStepperChange = (sum) => {
    let newStepperVal = stepperVal;
    let intMaxQuantityReached = false,
      intMinQuantityReached = false;
    if (sum && stepperVal < parseFloat(maxVal)) {
      newStepperVal += 1;
      setMinQuantityReached(false)
      intMinQuantityReached = false;
    } else if (sum && stepperVal >= parseFloat(maxVal)) {
      setMaxQuantityReached(true);
      intMaxQuantityReached = true;
    } else if (!sum && stepperVal > parseFloat(minVal)) {
      newStepperVal -= 1;
      setMaxQuantityReached(false);
      intMaxQuantityReached = false;
    }
    else if (!sum && stepperVal <= parseFloat(minVal)) {
      setMinQuantityReached(true);
      intMinQuantityReached = true;
    }
    setStepperVal(newStepperVal);

    if (onChange) {
      if (
        onMiniCart &&
        intMaxQuantityReached &&
        defaultVal < newStepperVal &&
        newStepperVal <= parseFloat(maxVal)
      ) {
        intMaxQuantityReached = false;
        setMaxQuantityReached(false);
      }

      onChange(newStepperVal, intMaxQuantityReached, intMinQuantityReached);
    }
  };

  return (
    <>
      <div className="a-stepper " id="stepper-div">
      <div class="js-a-stepper a-stepper__input-wrapper">
        <span
          className="a-stepper__input-grp-btn js-a-stepper__input-grp-btn"
          onClick={() => onStepperChange()}
          aria-hidden="true"
        >
          <i
            className="a-stepper--btn a-stepper--btn-minus abt-icon-minus"
            aria-label="minus icon"
          />
        </span>
        <input
          type="text"
          className="a-stepper__number input-number "
          aria-label="stepper"
          value={stepperVal}
          min={minVal}
          max={maxVal}
          size={size}
        />
        <span
          className="a-stepper__input-grp-btn js-a-stepper__input-grp-btn"
          onClick={() => onStepperChange(true)}
          aria-hidden="true"
        >
          <i
            className="a-stepper--btn a-stepper--btn-plus abt-icon-plus"
            aria-label="minus icon"
          />
        </span>
      </div>
      </div>
      {(maxQuantityReached || minQuantityReached ) && (
        <div className="a-add-to-cart__max-quantity-error">
          <Alert type="danger" iconClass="information" message={t('product-not-available-quantity')} />
        </div>
      )}
    </>
  );
};

Stepper.defaultProps = {
  defaultVal: '1',
  minVal: '1',
  maxVal: '1',
  size: 4,
  onChange: null,
  onMiniCart: false,
  applySubscriptionStyle: false,
};

Stepper.propTypes = {
  defaultVal: PropTypes.string,
  minVal: PropTypes.string,
  maxVal: PropTypes.string,
  size: PropTypes.number,
  onChange: PropTypes.func,
  onMiniCart: PropTypes.bool,
  applySubscriptionStyle: PropTypes.bool,
};

export default Stepper;
