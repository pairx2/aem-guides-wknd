import 'core-js/features/url';
import 'core-js/features/url-search-params';
import React, { useEffect, useState } from 'react';
import { SvgIcon } from "../../common/common";
import { Collapse } from 'react-collapse';
import RecentOrderWrap from './recent-order-wrap';

const theme = {
    collapse: 'ReactCollapse--collapse',
    content: 'ReactCollapse--content'
};

const checkUserContains = (userString, currentUsr) => {
    const userArray = String(userString).split("|").map(_itm => String(_itm).trim());

    if (userArray.includes(currentUsr)) {
        return true;
    }
    return false;
}

const getMagentoCookie = () => {
    const magJSON = ABBOTT.cookie('abt_usr');
    return JSON.parse(magJSON || "{}");
}

const getCurrentDomain = () => {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}`;
}

const checkAEMCurrentUrl = (aemURL = "/", extraPatternCheck = "") => {
    const urlAem = new URL(aemURL || "/", getCurrentDomain());
    const urlCurrent = new URL(window.location.href, getCurrentDomain());
    if (aemURL && String(urlCurrent.pathname).includes(urlAem.pathname) ||
        extraPatternCheck && new RegExp(`(${extraPatternCheck})`, "i").test(urlCurrent.pathname)) {
        return true;
    }
    return false;
}

const objToKeyOfOne = (obj, val = 1) => {
    const data = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === val) {
                data.push(key);
            }
        }
    }
    return data;
}

const getMagentoData = () => {
    const magData = getMagentoCookie();
    if (magData) {
        const { magento_page = {}, link_hide = {} } = magData;
        return {
            magentoPages: objToKeyOfOne(magento_page, 1),
            linksToHide: objToKeyOfOne(link_hide, 0)
        }
    }
}

const getProfileJSON = () => {
    const profileJSONString = ABBOTT.cookie("profile") || "{}";
    const profileJSON = JSON.parse(profileJSONString);
    return profileJSON;
}

const getUserType = (_ut) => {
    const SSM_USERTYPE = "similac-ssm"; // ecom user similac-ecom
    if (_ut === SSM_USERTYPE && ABBOTT.cookie("abt_usr")) {
        return "similac-fullaccount";
    }
    return String(_ut).trim();
}

const MenuItem = ({ label, aemURL, magURL, dataGtmLabel="", extraPatternCheck, cookieKey, hideInGroup = "", magentoGroupName = "", child, magData = {}, userType = "" }) => {
    let urlLink = aemURL;
    const { magentoPages = [], linksToHide = [] } = magData;
    if (linksToHide.includes(cookieKey) || checkUserContains(hideInGroup, userType)) {
        return null;
    }
    if (magentoPages.includes(cookieKey) || checkUserContains(magentoGroupName, userType)) {
        urlLink = magURL;
    }
    const active = urlLink ? checkAEMCurrentUrl(urlLink, extraPatternCheck) : false;
    return (
        <div className={`side-nav__sub-link ${active ? 'active' : ''}`}>
            <a href={urlLink ? urlLink : ""} data-gtm ={dataGtmLabel}>
                {label}
            </a>
        </div>
    )
}

function MenuBlock({ index, label, hideInGroup = "", magentoGroupName = "", aemURL, magURL, extraPatternCheck, cookieKey, child = [], magData = {}, main = false, userType = "" }) {
    const [show, setShow] = useState(true);
    const onClick = (e) => setShow(!show);
    const { linksToHide = [] } = magData;
    if (linksToHide.includes(cookieKey) || checkUserContains(hideInGroup, userType)) {
        return null;
    }
    return (
        <div className={main ? "side-nav__main" : "side-nav__sub-link"} style={main ? {} : { padding: 0 }}>
            {child ? (<>
                <div className="side-nav__title" onClick={onClick}>
                    {label}
                    <SvgIcon icon={show ? "minus" : "add"} className={"float-right"} />
                </div>
                <Collapse isOpened={show}>
                    {child.map(({ children: child, ...data }) => (
                        <React.Fragment key={data.label + index}>{child ? <MenuBlock  {...data} child={child} main={false} magData={magData} userType={userType} /> : <MenuItem {...data} child={child} magData={magData} userType={userType} />}</React.Fragment>))}
                </Collapse>
            </>) : (<MenuItem label={label} aemURL={aemURL} magURL={magURL} magData={magData} cookieKey child={child} userType={userType} />)}
        </div >)
}

const LeftMenu = ({ data: menuData }) => {
    const [data, setData] = useState({});
    const [mobileLabel, setMobileLabel] = useState("");
    const [isDesktop, setIsDesktop] = useState(false);
    const [show, setShow] = useState(false);
    const [userType, setUserType] = useState("");
    const onClick = (e) => setShow(!show);
    useEffect(() => {
        const loadData = async () => {
            const { mobileOnlyGroupName = "", ..._data } = menuData;
            const { userType: _ut } = getProfileJSON();
            setData(_data);
            setUserType(getUserType(_ut));
            setMobileLabel(mobileOnlyGroupName);
            setIsDesktop((window.innerWidth < 768) ? false : true);
        }
        function handleResize() {
            if (window.innerWidth >= 768) {
                setIsDesktop(true);
            }
            else {
                setIsDesktop(false);
            }
        }
        window.addEventListener('resize', handleResize);
        loadData();
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const { menuList = [], recentOrder } = data;
    const magData = getMagentoData();
    return (
        <>
            {mobileLabel && <div
                className="side-nav-mob mb-1_375 d-block d-md-none"
                onClick={onClick}
            >
                {mobileLabel}
                <SvgIcon icon={show ? "arrow-up" : "arrow-down"} className={"float-right"} />
            </div>}
            <Collapse isOpened={show || isDesktop || !mobileLabel}>
                <div className="side-nav collapse show mb-5">
                    {menuList &&
                        menuList.map(({ children: child, ...item }, index) =>
                            (<MenuBlock key={item.label + index} index={index} {...item} child={child} main={true} magData={magData} userType={userType} />))
                    }
                </div>
            </Collapse>
            {recentOrder && <RecentOrderWrap aemData={recentOrder} />}
        </>
    )
}

export default LeftMenu;