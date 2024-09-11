import React, {useState, useEffect, useContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';
import { getStoryConfigs } from '../../models/Stories';
import TreeMenu from '../TreeMenu/TreeMenu';
import './SideNav.scss';


const SideNav = (props) => {

  const {customPages, selected} = props;
  let timer;
  const {setSelectedComponent} = useContext(AppContext);
  const [storyConfigs, setStoryConfigs] = useState();
  const [searchString, setSearchString] = useState('');

  /**
   * Creates the menu structure for custom pages
   * @returns Object
   */
  const getMenuStructureForCustompages = () => {
    let themeMenu = {
      id:'theme',
      name: 'Theme',
      components: []
    };

    customPages.map((page)=>{
      themeMenu.components.push({
        id: page.title.toLowerCase().replace(' ','-'),
        name: page.title,
        type: 'custom',
        page: page.page,
        componentName: page.title,
        showRightRail: page.showRightRail
      });
    });

    return themeMenu;

  }

  /**
   * This method fetches the stories and custom pages and appends them
   * as one structure, and updated selected stories
   * @returns Array stories
   */
  const fetchStoryConfigs = () => {
    let stories = getStoryConfigs();
    if (customPages) {
      const themeMenu = getMenuStructureForCustompages();
      stories = [themeMenu, ...stories];
    }

    if (selected && selected.branchId && selected.componentId) {
      applySelectedItems(stories);
    }
    return stories;
  }

  /**
   * Appends isOpen=true for selected item object to keep
   * the item expanded by default
   * @param {Array} stories
   */
  const applySelectedItems = (stories) => {
    const branch = stories.find((b)=>b.id === selected.branchId);
    if (branch) {
      branch.isOpen = true;
      const component = branch.components.find((comp)=>comp.id === selected.componentId);
      if (component) {
        component.isOpen = true;
      }
    }
  }


  /*
   Gets the story configurations on the component mount
  */
  useEffect(()=> {
    setStoryConfigs(fetchStoryConfigs());
  }, []);


  /*
   Perform filter operation on searchString change
  */
  useEffect(()=> {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{filterStoriesBySearchString()}, 100);
  },[searchString]);


  /**
   * Search input change event handled
   * @param {event} e
   */
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchString(val);
  }


  /**
   * TreeMenue items select handler
   * @param {*} component
   */
  const handleTreeMenuSelect = (component) => {
    setSelectedComponent(component);
  }

  /*
    Search Logic
    if branch matches return  {branch -> components -> variants}
    if component matches, return {branch -> component -> variants}
    if variant matches, return {branch -> component -> variant}
  */

  /**
   * Method to filter the stories
   * @returns void
   */
  const filterStoriesBySearchString = () => {

    const branches = fetchStoryConfigs();

    if (!searchString.length) {
      setStoryConfigs(branches);
      return;
    }

    let isMatchFound = false;

    const filteredBranches = branches.filter((branch)=>{
      isMatchFound = nameCompareFn(branch);
      //if Match not found at the branch level, look at component level
      if (!isMatchFound) {
        const foundComponents = branch.components.filter((component) => {
          isMatchFound = nameCompareFn(component);
          if(!isMatchFound) {
            const foundVariants = component.variants ? component.variants.filter((variant)=>{
              isMatchFound = nameCompareFn(variant);
              return isMatchFound;
            }) : []
            component.variants = foundVariants;
            component.isOpen = foundVariants.length > 0;
            return (foundVariants.length > 0);
          }
          return isMatchFound;
        });
        branch.components = foundComponents;
        branch.isOpen = foundComponents.length > 0;
        return (foundComponents.length > 0);
      }
      return isMatchFound;

    });

    setStoryConfigs(filteredBranches);
  }

  /**
   * Name compare function
   * @param {*} obj
   * @returns bool
   */
  const nameCompareFn = (obj) => {
    return new RegExp(searchString,'i').test(obj.name);
  }


  /**
   * Returns memoized Treemenu to reduce the no of items to re-render
   * @returns TreeMenu
   */
  const renderTreeView =  () => {
    return useMemo(() => {
      return <TreeMenu
          listItems={storyConfigs}
          selected={selected}
          onSelect={(component)=>handleTreeMenuSelect(component)}
        />;
    }, [storyConfigs])
  }

  const renderSideNav = () => {
    return (
      <nav className="stb-side-nav">
        <h4 className="stb-heading">Component Library</h4>
        <div className="stb-search-nav">
            <i className="mdi mdi-magnify stb-icon" aria-hidden="true"></i>
            <input type="text" value={searchString} onChange={handleSearchChange} className="stb-input" placeholder="Search Stories" />
        </div>
        {
          renderTreeView()
        }
      </nav>
    );
  }

  return(
    renderSideNav()
  )
};

SideNav.propTypes = {
  customPages: PropTypes.any,
  selected: PropTypes.any
}

export default SideNav;
