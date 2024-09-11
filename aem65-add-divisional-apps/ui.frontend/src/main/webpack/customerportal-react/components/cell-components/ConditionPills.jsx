import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

export const ConditionPills = (props) => {
  const { t, i18n } = useTranslation();
  const {  value} = props;
  const yes = useMemo(() => {
    return  t('yes');
  }, [])
  const no = useMemo(() => {
    return  t('no');
  }, [])
  return (
    <>
      <div
      className={'a-chips values'}>
       <a   role="link" 
            aria-label="button/tag 1" 
            className={`a-chips--link ${value}`}>
            {value =="Y"? yes : no}
        </a>
      </div>
    </>
  );


};

ConditionPills.defaultProps = {
  value: null,
};

ConditionPills.propTypes = {
  value: PropTypes.string
};

export default ConditionPills;
