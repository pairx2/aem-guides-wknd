import React from "react";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

// This component handles translation for rare edge cases in which the translation call cannot be made within the component itself, e.g. the react-table columns in SupportRequestResultsTable and LabIncidentsTable

export const Translate = (props) => {
    const { t, i18n } = useTranslation();
  const { text, classes } = props;

  return (
    <p className={classes}>{t(text)}</p>
  );
};

Translate.defaultProps = {
  text: '',
  classes: ''
};

Translate.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.string
};

export default Translate;
