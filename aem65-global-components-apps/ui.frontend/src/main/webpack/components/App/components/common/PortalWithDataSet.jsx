import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PortalTemplate from './PortalTemplate';

const PortalWithDataSet = (props) => {
  const [count, setCount] = useState(0);
  const { selector, children } = props;
  let elem;

  if (typeof selector === 'string') {
    elem = [...document.querySelectorAll(selector)];
  }

  useEffect(() => {
    window.addEventListener('rerenderPortal', (event) => {
      if (event?.detail?.selector === selector) {
        setCount(Date.now()); // Arbitrary state change to trigger a re-render of this portal
      }
    });
  }, []);

  if (elem && elem.length > 0) {
    return (
      <>
        {elem.map((e) => {
          return <PortalTemplate selector={e}>{children}</PortalTemplate>;
        })}
      </>
    );
  }

  return null;
};

PortalWithDataSet.propTypes = {
  selector: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PortalWithDataSet;
