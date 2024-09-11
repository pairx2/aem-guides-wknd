import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import './TreeItem.scss';

const TreeItem = (props) => {
  const {label, children, selected, onSelect, expanded, root} = props;

  /*
    Trigger an onClick event when selected is true
    This is required to trigger a component change
    when the hash on the page load or page change
  */
  useEffect(()=>{
    if (selected) {
      handleOnClick();
    }
  }, [selected])

  const handleOnClick = (e) => {
    if (!children) {
      onSelect && onSelect(e);
    }
  }
  const handleTransitionEnd = (e) => {
    const target = e.currentTarget;
    const isOpen = target.previousSibling.classList.contains('open');
    if (isOpen) {
      target.style.height  = 'auto'
    } else {
      target.style.height  = '0'
    }
  }

  return (
    <div className="stb-tree-item__wrap">
      <p tabIndex="0" className={`stb-tree-item__head ${selected ? 'selected': ''} ${expanded ? 'open': ''} ${root ? 'root':''}`} onKeyUp={(e)=>{e.key==='Enter' && e.target.click()}}  onClick={handleOnClick}>
        <span className="stb-tree-item__label">{label}</span>
        { children && <i className="mdi mdi-chevron-right"></i>}
      </p>
      {children && <div className="stb-tree-item__children" onTransitionEnd={handleTransitionEnd}>
        <div className="stb-tree-item__children-wrap">
        {children}
        </div>
      </div>}
    </div>
  );
}

TreeItem.propTypes = {
  label: PropTypes.string.isRequired,
  root: PropTypes.bool,
  expanded: PropTypes.bool,
  selected: PropTypes.bool,
  children: PropTypes.any,
  onSelect: PropTypes.func
}

export default TreeItem;
