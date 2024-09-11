import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React, { Suspense } from 'react';

const withSuspense = (Component) => {
  const WithSuspense = (props) => {
    return (
      <Suspense fallback="">
        <Component {...props} />
      </Suspense>
    );
  };
  WithSuspense.displayName = `withSuspense(${
    Component.displayName || Component.name
  })`;
  return WithSuspense;
};

const PortalTemplate = (props) => {
  const { selector, children } = props;

  let elem;
  if (selector instanceof HTMLElement) {
    elem = selector;
  } else if (typeof selector === 'string') {
    elem = document.querySelector(selector);
  }

  if (elem) {
    return ReactDOM.createPortal(
      React.Children.map(children, (child) => {
        return React.cloneElement(child, { ...elem.dataset });
      }),
      elem
    );
  }

  return null;
};

PortalTemplate.propTypes = {
  selector: PropTypes.string.isRequired,
};

export default withSuspense(PortalTemplate);
