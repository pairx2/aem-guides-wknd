import React from 'react';
import PropTypes from  'prop-types';
import QueryParams from '../../models/QueryParams';
import SideNav from '../SideNav';
import BottomNav from '../BottomNav';
import './Page.scss';

const Page = (props) => {
  const {className, noNav, showFooter, customPages, children} = props;
  const navProps = QueryParams.getSelectPageParams();


  return (
    <div className={`stb-pages ${noNav? 'no-side-nav':''} ${showFooter? 'has-footer':''}`}>
      <div className="stb-pages-content">
        {!noNav && <SideNav customPages={customPages} selected={navProps} />}
        <div className={`stb-page ${className?className:''}`}>
          {children}
        </div>
      </div>
      {showFooter && <BottomNav />}
    </div>
  )
}

Page.propTypes = {
  className: PropTypes.string,
  noNav: PropTypes.bool,
  showFooter: PropTypes.bool,
  customPages: PropTypes.array
}

export default Page;
