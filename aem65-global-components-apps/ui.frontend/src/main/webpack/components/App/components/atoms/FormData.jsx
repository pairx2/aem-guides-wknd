import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import InnerHTML from 'dangerously-set-html-content';
import { CommerceContext } from '../../context/CommerceContext';
import RadioButton from './RadioButton';
import { getDataInfo, cleanDisplayString } from '../../utils/common';

const FormData = ({ displayOutput = '', source, radioGroupName }) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);

  const data = getDataInfo(commerceContext, source);
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const regex = /\$\{[^\}]*\}/g;
  const displayStr = displayOutput
    .replace(regex, (subStr) =>
      !!(data && data[subStr.slice(2, -1)])
        ? cleanDisplayString(data[subStr.slice(2, -1)])
        : ''
    )
    .replace(/^\s*[\r\n]/gm, '')
    .replace(/[\n]\s/gm, '\n');

  if (displayStr) {
    return (
      <>
        <InnerHTML className="m-form-data__list" html={displayStr} />

        {radioGroupName && (
          <>
            <RadioButton
              name={radioGroupName}
              checked={
                data?.id === getDataInfo(commerceContext, radioGroupName)?.id
              }
              value={source}
            />
          </>
        )}
      </>
    );
  }

  return null;
};

FormData.defaultProps = {
  radioGroupName: '',
};

FormData.propTypes = {
  displayOutput: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  radioGroupName: PropTypes.string,
};

export default FormData;
