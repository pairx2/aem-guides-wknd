import React, {Fragment, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types';
import TreeItem from '../TreeItem';
import QueryParams from '../../models/QueryParams';
import './TreeMenu.scss';

const TreeMenu = (props) => {
  const {listItems, onSelect, selected} = props;
  const [prevSelItem] = useState(selected || {});
  const ref = useRef();

  useEffect(()=>{
    ref.current.addEventListener('click', handleExpand, true);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('click', handleExpand, true);
      }
    };
  },[ref.current]);

  const handleExpand = (e) => {
    if (!e) {
      return;
    }
    const target = e.target;
    const ele = target.classList.contains('stb-tree-item__head');

    if (ele) {
      const isOpen = target.classList.contains('open');
      const nextSibling = target.nextSibling;

      if (nextSibling) {
        nextSibling.style.height = nextSibling.firstChild.clientHeight + 'px';
        if (isOpen) {
          requestAnimationFrame(()=>{
              nextSibling.style.height= '0';
          })
        }
      }

      target.classList.toggle('open');
      if (!target.classList.contains('root') && target.nextSibling) {
        target.nextSibling.scrollIntoView({behavior: "smooth", block: "nearest"});
      }
    }
  }

  const removePrevSelected = (e) => {
    if (ref.current && e) {
      const itemSelected = ref.current.querySelector('.selected');
      if (itemSelected && itemSelected !== e.target) {
        itemSelected.classList.remove('selected');
      }
      e.target.classList.add('selected');
    }
  }

  const handleComponentClick = (e, branch, component, selectedKey) => {
    if (selectedKey !== prevSelItem.key){
      QueryParams.setQueryparams(`b=${branch.id}&c=${component.id}`)
    }
    removePrevSelected(e);
    onSelect && onSelect({...component, component: branch.id});

  }

  const handleVariantClick = (e, branch, component, variant, selectedKey) => {

    if (selectedKey !== prevSelItem.key){
      QueryParams.setQueryparams(`b=${branch.id}&c=${component.id}&v=${variant.id}`);
    }
    removePrevSelected(e);
    onSelect && onSelect({...variant, component: component.id});

  }

  const getExpandedValue = (item, selectedId) => {
    if (!selectedId) {
      return item.isOpen;
    }
    if (item.isOpen === undefined) {
      return item.id === selectedId ?  true : undefined
    }
    return item.isOpen
  }

  const renderTree = (items) => {
    if (!items) {
      return;
    }
    return (
      <>
      {

        items.map((branch)=>{
          return <TreeItem label={branch.name}  key={branch.id} root={true} expanded={getExpandedValue(branch, prevSelItem.branchId)} data={branch}>
            <>
            {
              branch.components && branch.components.map((component)=>{
                const compKey = `${branch.id}-${component.id}-`
                return <TreeItem label={component.name} key={compKey}  selected={prevSelItem.key === compKey} expanded={getExpandedValue(component, prevSelItem.componentId)}  onSelect={(e)=>handleComponentClick(e, branch, component, compKey)}>
                  {component.variants && <>
                    {
                      component.variants && component.variants.map((variant)=>{
                        const varKey = `${branch.id}-${component.id}-${variant.id}`
                        return <TreeItem
                          label={variant.name}
                          key={varKey}
                          selected={prevSelItem.key === varKey}
                          expanded={variant.isOpen}
                          onSelect={(e)=>handleVariantClick(e, branch, component, variant, varKey)} />
                      })
                    }
                  </>
                  }
                </TreeItem>;
              })
            }
            </>
          </TreeItem>
        })
      }
      </>
    )
  }

  return (
    <div ref={ref} className="stb-tree-menu">
      {listItems && renderTree(listItems)}
    </div>
  )
}

TreeMenu.propTypes = {
  listItems: PropTypes.array,
  onSelect: PropTypes.func
}

export default TreeMenu;
