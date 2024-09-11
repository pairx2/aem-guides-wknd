import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLocalContextStoreName } from '../utils/common';

const CommerceContext = React.createContext({});

function CommerceProvider(props) {
  const localState =
    JSON.parse(localStorage.getItem(getLocalContextStoreName()) || null) ||
    null;
  const [commerceContext, setCommerceContext] = useState(localState);
  const { children } = props;

  useEffect(() => {
    localStorage.setItem(
      getLocalContextStoreName(),
      JSON.stringify(commerceContext) || null
    );
  }, [commerceContext]);

  return (
    <CommerceContext.Provider value={[commerceContext, setCommerceContext]}>
      {children}
    </CommerceContext.Provider>
  );
}

CommerceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CommerceContext, CommerceProvider };
