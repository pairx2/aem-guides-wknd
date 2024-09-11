import React from "react";

/**
 * @function
 * @desc Return cart Items to the Minicart
 * @param {object} props 
 */
const CartItem = props => {
  const [toggleOptions, settoggleOptions] = React.useState('');
  const aemBaseUrl = jQuery('#aem-base-url').val();
  const defaultImageUrl =  jQuery('#aem-default-image-url').val();

  /**
   * @function
   * @description Toggle eidt Options in Cart
   * @param {object} e 
   */
  function toggleOption(e) {
      e.stopPropagation();
      if(toggleOptions === '' ) {
        settoggleOptions('open');
      }
      else {
        settoggleOptions('');
      }
  }

  /**
   * @function
   * @desc Handle on click delete
   * @param {object} e 
   * @param {int} id 
   */
  function deleteItem(e, id) {
    e.stopPropagation();
    props.deleteItem(id);
  }

  return (
    <li className="similac-minicart-item">
        <div className="similac-product-image">
          <div className="similac-product-count">
              <span>{props.item.quantity}</span>
          </div>
          <img 
              src={aemBaseUrl + (props.item.dam_images || defaultImageUrl)}
              alt={props.item.product.image.lable}
          />
          <div className="similac-product-edit" onClick={(e) =>toggleOption(e)}>
              <i className="ai-edit"></i>
          </div>
        </div>
        <div className={toggleOptions === 'open' ? 'similac-product-option open' : 'similac-product-option' }>
            <div className="details-qty">{props.item.quantity}</div>
            <div className="delete-product">
                <i className="ai-bin" onClick={(e) => {deleteItem(e, props.item.id); ABBOTT.gtm.buildAndPush.removeFromCart(props.item);}}></i>
            </div>
        </div>
    </li>
  );
}

export default CartItem;
