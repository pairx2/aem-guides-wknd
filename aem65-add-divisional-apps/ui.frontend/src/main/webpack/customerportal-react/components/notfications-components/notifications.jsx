import React, { DOMElement, useState, useEffect, useRef } from 'react'
import { useSharedInstrumentFlags } from "../shared/InstrumentFlags";
import { useSharedInstrumentData } from '../shared/InstrumentData'
import {Modal, Checkbox, LoadingIndicator, XFDisplay} from "@abbott/add-platform";
import {useSharedNotifications} from "../shared/Notifications";
import {notificationsService} from "../services/NotificationsService";
import {useTranslation} from "react-i18next";

export const Notifications = (props) => {
    const { t, i18n } = useTranslation();
    const {notifications,isLoading, isLoaded} = useSharedNotifications();
    const {getNotifications, readNotification, archiveNotification} = notificationsService();
    const [mobileInbox, setMobileInbox] = useState(true);
    const [viewAllInbox, setViewAllInbox] = useState(true);
    const [hideRead, setHideRead] = useState(false);
    const [checkedState, setCheckedState] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState({});

    const mobileInboxHandler = (e)=>{
        if (mobileInbox) {
            showMobileInbox(e)
            setMobileInbox(false)
        } else {
            hideMobileInbox(e)
            setMobileInbox(true)
        }
    }

    const viewAllHandler = (e)=>{
        e.preventDefault();
        if (viewAllInbox) {
            viewAll(e)
            setViewAllInbox(false)
        } else {
            viewLess(e)
            setViewAllInbox(true)
        }
    }
  

    React.useEffect(() => {
        if (notifications?.length > 0) {
            // when selectedLabProfile is loaded into shared state object, try to initialize the lab profile users
            setCheckedState(new Array(notifications.length).fill(false));
            let unread = notifications.filter((item) => {
                return item.markedAsRead == "false";
            });
            setUnreadNotifications(unread);
        } else {
            if (!isLoaded) {
                getNotifications();
            }
        }
    }, [notifications])

    const handleRead = (notificationId, statusId) => {
        readNotification(notificationId, statusId);
    }

    const handleHideRead = (state) => {
        setHideRead(state);
    }

    const handleChecked = (position, notification) => {
        const updatedCheckedState = checkedState.map((item, index) => {
            return index === position ? !item : false;
        });

        setCheckedState(updatedCheckedState);

        setSelectedNotification(notification);
    }

    const handleArchive = (e, notificationId, statusId) => {
        e.preventDefault();
        archiveNotification(notificationId, statusId);
        closeModal(e);
    }

    const handleSelectedArchive = (e) => {
        e.preventDefault();
        archiveNotification(selectedNotification.aemNotifcationId, selectedNotification.userNotificationStatusId);
    }

    const showModalPrimary = (e,notificationId, statusId) => {
        e.preventDefault();
        handleRead(notificationId, statusId);
        let id = notificationId.replaceAll("/","-");
        document.querySelector('#inbox-profile-modal_'+ id).classList.add("show-modal")
        document.querySelector('.a-container').style.zIndex="auto";
        document.querySelector("body").style.overflow = "hidden";
    };

    const closeModal = () => {
        document.querySelector('.show-modal').classList.remove("show-modal")
        document.querySelector("body").style.overflow = "auto";
        document.querySelector('.a-container')["style"].zIndex="0";
    };

    const viewAll=(e)=>{
        e.preventDefault();
        document.querySelector('.inbox-messages').style.maxHeight="600px";
    };
    const viewLess=(e)=>{
        e.preventDefault();
        document.querySelector('.inbox-messages').style.maxHeight="200px";
    }
    const showMobileInbox= (e)=> {
        document.querySelector('.notifications-results-container').classList.add("show-inbox")
        
    }
    const hideMobileInbox= (e)=> {
        e.preventDefault();
        document.querySelector('.notifications-results-container').classList.remove("show-inbox")
        
    }
    const showAll = (e) => {
        setHideRead(false);
        showMobileInbox(e);
    }
    const showUnread = (e) => {
        setHideRead(true);
        showMobileInbox(e);
    }


    return (
        <>
            <div className='dash-notification-container'>
                <div className="header_notifications header_notifications--desktop">
                    <div className='notifications-dashboard-title'>
                        <h4>{t('notifications')}</h4>
                        <span>{notifications.length}</span>
                    </div>
                    <div className='filter-section'>
                        <span>{t('filter-by')}</span>
                        <div className='unread-desktop'>
                            <Checkbox text={t('unread')}
                                      value={'unread'}
                                      onChange={handleHideRead}/>
                            <span>{unreadNotifications.length}</span>
                        </div>
                    </div>
                </div>
                <div className="header_notifications header_notifications--mobile">
                    <div className='notifications-dashboard-title'>
                        <h4>{t('notifications')}</h4>
                        <span>{notifications.length}</span>
                    </div>
                    <div className='mobile-unread-all'>
                        <div className='all' onClick={showAll}>
                            <span className='inbox-label'>{t('all')}</span>
                            <span>{notifications.length}</span>
                        </div>
                        <div className='unread' onClick={showUnread}>
                            <span className='inbox-label'>{t('unread')}</span>
                            <span>{unreadNotifications.length}</span>
                        </div>
                    </div>
                </div>
                <div className='notifications-results-container'>
                    <div className='select-options'>
                        <a href="#" onClick={(e) => handleSelectedArchive(e)}>
                            <span className='delete'>{t('delete')}</span>
                        </a>
                        <a href="#" class="view-all" onClick={(e) => viewAllHandler(e)}>
                            {t('view-all')}
                        </a>
                    </div>
                    {isLoading && (
                        <div className='notifications-loading'>
                            <LoadingIndicator />
                        </div>
                    )}
                    <div className={`inbox-messages ${hideRead ? 'hide-read' : ''}`} >
                        {isLoaded && notifications.length < 1 && (
                            <div className="welcome-xf">
                                <XFDisplay
                                    xfid={'apiError_notifications'} />
                            </div>
                        )}
                        {notifications.map((item, index)  =>
                            <div key={`notification-${index}`} className={item.markedAsRead == "true" ? 'read' : ''}>
                                <Checkbox text={item.notificationSubject}
                                          parentControl={true}
                                          checked={checkedState[index]}
                                          onChange={() => handleChecked(index, item)}/>
                                <div className='full-message'
                                   onClick={(e) => showModalPrimary(e, item.aemNotifcationId, item.userNotificationStatusId)}>
                                    <div className='clip-message'
                                         dangerouslySetInnerHTML={{ __html: item.notificationBody.replace(/\&nbsp;/g,'') }}></div>
                                </div>
                                <Modal id={`inbox-profile-modal_${item.aemNotifcationId.replaceAll("/","-")}`}>
                                    <h4>
                                        {item.notificationSubject}
                                    </h4>
                                    <div dangerouslySetInnerHTML={{ __html: item.notificationBody.replace(/\&nbsp;/g,'') }}></div>
                                    <a href="#" onClick={(e) => handleArchive(e, item.aemNotifcationId, item.userNotificationStatusId)} className="" target="_blank">
                                        <span className='delete'>{(t('delete'))}</span>
                                    </a>
                                </Modal>
                                <button
                                    className={`d-none js-remove-lab-profile-modal`}
                                    data-toggle="modal"
                                    data-target={`#remove-lab-profile-modal`}>
                                    {" "}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
        );
    }