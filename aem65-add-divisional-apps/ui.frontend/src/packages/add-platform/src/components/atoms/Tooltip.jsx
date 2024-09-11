import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

export const Tooltip = (props) => {
  const { title, icon, placement, dark } = props;

  const tooltipRef = useRef(null);

  useEffect(() => {
      const $ele = $(tooltipRef.current);
      const $tooltipDiv = $ele.find('[data-toggle="tooltip"]');
      $($tooltipDiv).tooltip({ container:  $ele });
  });
   
  return (
      <div className={`a-tooltip a-tooltip--small a-tooltip--${dark ? 'dark' : 'light'}`}
           ref={tooltipRef}>
        <span className="a-tooltilp__wrapper tooltip-wrapper tooltip-bg-white"
              tabIndex="0"
              data-placement={placement}
              data-toggle="tooltip"
              data-html="true"
              data-animation="false"
              title={title}>
          <i className={`abt-icon ${icon}`}></i>
        </span>
      </div>
  );
};

Tooltip.defaultProps = {
  icon: 'abt-icon-information',
  placement: 'right',
  dark: false
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placement: PropTypes.string,
  dark: PropTypes.bool
};

export default Tooltip;
