/**
 * CUSTOMTABLE FUNCTIONS FOR CYBERSECURITY PORTAL
 */

/**
 * @function
 * Summary: Function to update payload data for Documents tab in products description page
 * Parameters: data -> payload
 */
function updateRequestProductAPI(data) {
    delete data.body['action'];
    return data;
}

/**
 * @function
 * Summary: Function to update payload data for VSI tab in products description page
 * Parameters: data -> payload
 */
function updateRequestVsiAPI(data) {
    data.body['action'] = 'listVsiDetails';
    delete data.body['lastLogin'];
    return data;
}

/**
 * @function
 * Summary: Function to update payload data for Vulnerabilities page
 * Parameters: data -> payload
 */
function updateRequestVulnerabilities(data) {
    let vsiFilters = localStorage.getItem('vsiFilters');
    if (vsiFilters == null || vsiFilters?.length == 0) return [];
    vsiFilters = JSON.parse(vsiFilters);
    data.body = Object.assign(data.body, vsiFilters);
    data.body['action'] = 'listVsiDetails';
    return data;
}
