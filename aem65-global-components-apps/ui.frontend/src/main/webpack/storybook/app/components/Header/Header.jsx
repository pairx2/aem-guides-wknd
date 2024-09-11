import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { App } from '../../constants/App';
import QueryParams from '../../models/QueryParams'
import './header.scss';
const Header = () => {
  const location = useLocation();
  const storyBookPath = QueryParams.getPagePathWithHash(App.STORYBOOK);
  return (
    <div className="stb-header">
        <a href="" title="Abbott styleguide storybook">
            <img src="/public/images/global/abbott-logo-1.svg" alt="Abbott styleguide storybook" />
        </a>
        <ul className="stb-header__nav">
            <li>
                <NavLink className="stb-header__nav-link" activeClassName="active" exact={true} to={storyBookPath}>{App.STORYBOOK.TITLE}</NavLink>
            </li>
            <li>
                <NavLink className={`stb-header__nav-link ${location.pathname === App.THEME_BUILDER.PATH ? 'active':''}`} activeClassName="active" to={App.NEW_THEME.PATH}>{App.THEME_BUILDER.TITLE}</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Header;
