import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSiteContextLocalStoreName } from '../utils/common';
import commonConst from '../constants/commonConts';

const SiteContext = React.createContext({});

function SiteProvider(props) {
  const localState =
    JSON.parse(
      localStorage.getItem(
        getSiteContextLocalStoreName(commonConst.SITE_LOCAL_STORAGE)
      ) || null
    ) || null;
  const [siteContext, setSiteContext] = useState(localState);
  const { children } = props;

  useEffect(() => {
    localStorage.setItem(
      getSiteContextLocalStoreName(commonConst.SITE_LOCAL_STORAGE),
      JSON.stringify(siteContext) || null
    );
  }, [siteContext]);

  return (
    <SiteContext.Provider value={[siteContext, setSiteContext]}>
      {children}
    </SiteContext.Provider>
  );
}

SiteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SiteContext, SiteProvider };
