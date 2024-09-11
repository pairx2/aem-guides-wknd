import {useSharedNotifications} from "../shared/Notifications";
import {getCookie} from "../shared/Utils";

const JWT_TOKEN_KEY = "jwtToken";
export const notificationsService = () => {
    const {setSharedNotifications, setSharedIsLoading, setSharedIsLoaded} = useSharedNotifications();
    
    const getHeaders = () => {
        const headers = window.getPageDataAttributes();
        const token = getCookie(JWT_TOKEN_KEY);
        headers["x-id-token"] = token;
        return headers;
    }
    
    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    
    const handleResponse = (data, errorId) => {
        if (data?.errorCode == 0) {
            getNotifications();
        } else {
            // TODO: Handle Error
            console.error("Notifications Error");
        }
    }
    
    const getNotifications = () => {
        const service = eslEndpoint + ESL_EPT?.USER_NOTIFICATIONS;
        setSharedIsLoading(true);
        fetch(service, {
            method: 'GET', // or 'PUT'
            headers: getHeaders()
        })
          .then((response) => response.json())
          .then((data) => {
              let notifications = data?.response?.results;
              notifications.sort((a,b) => {
                 let aDate = Date.parse(a.notificationPublishedDate);
                 let bDate = Date.parse(b.notificationPublishedDate);

                 if (aDate < bDate) return 1;
                 if (aDate > bDate) return -1;
                 if (a.aemNotifcationId < b.aemNotifcationId) return 1;
                 if (a.aemNotifcationId > b.aemNotifcationId) return -1;
                 return 0;
              });
              setSharedIsLoading(false);
              setSharedIsLoaded(true);
              setSharedNotifications(notifications ?? []);
          })
          .catch((error) => {
              // TODO: Handle Error
              setSharedIsLoading(false);
              setSharedIsLoaded(true);
              console.error("Notifications Error");
          });
    };
    const readNotification = (notificationId, statusId) => {
        setSharedIsLoading(true);
        const service = eslEndpoint + ESL_EPT?.USER_NOTIFICATIONS;
        const body = {
            "aemNotifcationId": notificationId,
            "markedAsRead": true,
            "archive": false
        };

        if (statusId) {
            body["userNotificationStatusId"] = statusId;
        }

        fetch(service, {
            method: 'POST', // or 'PUT'
            headers: getHeaders(),
            body: JSON.stringify(body)
        })
          .then((response) => response.json())
          .then((data) => {
              handleResponse(data, "notification_read_failure");
          })
          .catch((error) => {
              // TODO: Handle Error
              setSharedIsLoading(false);
              console.error("Notifications Error");
          });
    }

    const archiveNotification = (notificationId, statusId) => {
        setSharedIsLoading(true);
        const service = eslEndpoint + ESL_EPT?.USER_NOTIFICATIONS;
        const body = {
            "aemNotifcationId": notificationId,
            "markedAsRead": true,
            "archive": true
        };

        if (statusId) {
            body["userNotificationStatusId"] = statusId;
        }

        fetch(service, {
            method: 'POST', // or 'PUT'
            headers: getHeaders(),
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((data) => {
                handleResponse(data, "notification_read_failure");
            })
            .catch((error) => {
                // TODO: Handle Error
                setSharedIsLoading(false);
                console.error("Notifications Error");
            });
    }
    
    return {
        getNotifications,
        readNotification,
        archiveNotification
    }
}

