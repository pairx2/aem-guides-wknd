import React from 'react';
import RelativePortal from "react-relative-portal";
import LoginForm from "./login";
import MiniCart from "./mini_cart";
import UserProfile from "./user_profile";
import { getLocalStorage } from "../../common/localStorageState";
import OutsideClickHandler from '../../components/OutsideClickHandler';

export default class LoginSection extends React.Component {

  constructor(props) {
    super(props);

    const { iconState: { logoutLabel = "Login", loginLabel = "Profile" } = {} } = props;
    const isLogin = window.document.cookie.match(/x-id-token=/);
    const {thumbnailURL=""} = (getLocalStorage("profile") || {});

    this.state = {
      showLogin: false,
      showCart: false,
      itemsCount: 0,
      thumbnailURL,
      firstName: "",
      iconText: isLogin ? loginLabel : logoutLabel,
      thumbnail: isLogin ? thumbnailURL : ""
    };
    this.checkLogin = this.checkLogin.bind(this);
    window.showCart = this.showCart.bind(this);
  }

  checkLogin() {
    return window.document.cookie.match(/x-id-token=/);
  }

  componentDidMount() {
  }

  toggleLogin = () => {
    // Create a new "showLogin" state to mount the Portal component via the button
      this.setState({
        showLogin: !this.state.showLogin
      });
  };

 showCart = () => {
    this.setState({
      showCart: true
    });
    if (jQuery(window).width() < 768) {
      jQuery(".minicart-container").height(jQuery(document).height() - 150);
    }
  }
  
  // Method to toggle quick cart 
  toggleCart = (data) => {
    this.setState({
      showCart: !this.state.showCart
    });
    if (jQuery(window).width() < 768) {
      jQuery(".minicart-container").height(jQuery(document).height() - 150);
    }
  }
  // Method to set the cart badge with  cart items count  
  setItemsCount = (count) => {
    this.setState({
      itemsCount: count
    });
  };

  render() {

    const { showLogin, showCart, itemsCount, iconText,thumbnail } = this.state;
    const isLogin = this.checkLogin();
    return (
      <>
        <li id="open-search" className="nav-action text-center" data-gtm="search|submit|search-submit">
          <span className="sim-icons" data-icon="mag-glass">
            <svg viewBox="0 0 100 100" className="sim-icon">
              <use href="#icon-mag-glass"></use>
            </svg>
          </span>
          <div className="d-none d-lg-block">Search</div>
        </li>

        <li className={`nav-action text-center ${showLogin ? "active" : ""}`} id="user" >
          <span className="sim-icons" data-icon={isLogin && thumbnail ? "":"user"} onClick={this.toggleLogin} >
            {isLogin && thumbnail && <img src={thumbnail} style={{ height: 24, width: 24, borderRadius: "50%", overflow: "hidden" }} /> || <svg viewBox="0 0 100 100" className="sim-icon">
              <use href="#icon-user"></use>
            </svg>}
          </span>
          
          <div className="d-none d-lg-block" onClick={this.toggleLogin}>{iconText}</div>
          {!isLogin && showLogin && <OutsideClickHandler onOutsideClick={this.toggleLogin}><LoginForm toggleLogin={this.toggleLogin} {...this.props} /></OutsideClickHandler>}
          {isLogin && showLogin && <OutsideClickHandler onOutsideClick={this.toggleLogin}><UserProfile toggleLogin={this.toggleLogin} {...this.props} /></OutsideClickHandler>}

        </li>

        <li className={`nav-action text-center minicart-logo ${showCart ? "active" : ""}`}
          id='mini-cart' onClick={this.toggleCart} data-gtm="my-cart|click|home_my-cart_header-link">
          {itemsCount > 0 && <div className="minicart-logo__badge">{itemsCount}</div>}
          <span className="sim-icons" data-icon="cart-color">
            <svg viewBox="0 0 100 100" className="sim-icon">
              <use href="#icon-cart-color"></use>
            </svg>
          </span>
          <div className="d-none d-lg-block">My Cart</div>
        </li>
        <RelativePortal
          component="div"
          right={-41}
          top={-70}
          left={0}
          className="mini-cart-relative-portal"
          onOutClick={showCart ? this.toggleCart : null}>
          <MiniCart showCart={showCart} toggleCart={this.toggleCart}
            productCount={this.setItemsCount} label={this.props.cartLabel} />
        </RelativePortal>
      </>
    );
  }
}

