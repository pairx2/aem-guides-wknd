importScripts('workbox-sw.js');

workbox.setConfig({ modulePathPrefix: '/workbox-6-5-1/' });
// Force production builds
workbox.setConfig({ debug: false });

const { strategies } = workbox;
const { routing } = workbox;
const { expiration } = workbox;
const { cacheableResponse } = workbox;

// constant to read servlet config data
var swconfig = {
    "cachedTime": "",
    "cacheName": "",
    "precachedUrl": [],
    "offlinePage": "",
    "domainWhiteList": "",
    "cacheableUrls": [],
    "handlerExpirationLimit": "",
    "masterCacheUrlList": "",
    "cachingStrategy": "",
    "pwaServletUrl": "/bin/pwa/cfreader",
    "pwaContentfragmentUrl": "",
    "pwaUserConsent": "0",
    "starturl": "",
    "localHostUrl": "",
    "contentBasePath": ""
};

// all defined constant used in pwa 
let requestHandler = null;
const channel = new BroadcastChannel('sw-messages');
const networkFirstStrategyName = "networkFirst";
const cacheFirstStrategyName = "cacheFirst";
const cacheStaleWhileRevalidate = "StaleWhileRevalidate";
const destDocument = "document";
const destImage = "image";
const swconfigcache = "swconfig-cache";
const swconfigpathkey = "/swconfig.json";
const swSiteSearchCache = "swsitesearch-cache";
const swSiteSearchPathkey = "/swsitesearch.json";
const htmlextension = ".html";
const skipWaiting = "skipWaiting";
const downloadPWA = "downloadPWA";
const siteSearhcRegex = '.*(api\/public\/search\/sitesearch)(.*)';
let localurl = "";
let basepath = "";
let pwaServletUrl = "";

// pwa servlet call
async function callServlet(servleturlpath, param, event) {
    let servletResponse = null;
    let servleturl = location.origin + servleturlpath;
    let data = {
        "pwaContentFragmentPath": param
    };
    try {
        const rawResponse = await fetch(servleturl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            body: JSON.stringify(data)
        });
        servletResponse = await rawResponse.json();
    } catch (e) {
        console.log("CallServlet fetch Pwa Servlet Response failed");
    }
    if (servletResponse != null) {
        swconfig.masterCacheUrlList = servletResponse.masterCacheUrlList;
        swconfig.precachedUrl = servletResponse.precachedUrl;
        swconfig.cacheName = servletResponse.cacheName;
        swconfig.domainWhiteList = servletResponse.domainWhiteList;
        swconfig.offlinePage = servletResponse.offlinePage;
        swconfig.handlerExpirationLimit = servletResponse.handlerExpirationLimit;
        if (swconfig.handlerExpirationLimit == '' || swconfig.handlerExpirationLimit == 0 || isNaN(swconfig.handlerExpirationLimit)) {
            swconfig.handlerExpirationLimit = 1;
        }
        swconfig.cachingStrategy = servletResponse.cachingStrategy;
        swconfig.cacheableUrls = servletResponse.cacheableUrls;
        swconfig.pwaUserConsent = "1";
        swconfig.localHostUrl = servletResponse.localHostUrl;
        swconfig.contentBasePath = servletResponse.contentBasePath;
        if (swconfig.cachingStrategy === networkFirstStrategyName) {
            requestHandler = new strategies.NetworkFirst({
                cacheName: swconfig.cacheName,
                plugins: [
                    new workbox.cacheableResponse.CacheableResponsePlugin({
                        statuses: [200],
                        headers: { 'X-Is-Cacheable': 'yes', },
                    })
                ],
            });
        }
        else if (swconfig.cachingStrategy === cacheFirstStrategyName) {
            requestHandler = new strategies.CacheFirst({
                cacheName: swconfig.cacheName,
                plugins: [
                    // Don't cache more than 50 items, and expire them after 30 days
                    new expiration.ExpirationPlugin({
                        maxEntries: 5000,
                        maxAgeSeconds: 60 * 60 * 24 * swconfig.handlerExpirationLimit,
                    }),
                    new workbox.cacheableResponse.CacheableResponsePlugin({
                        statuses: [200],
                        headers: { 'X-Is-Cacheable': 'yes', },
                    })
                ],
            });
        }
        else if (swconfig.cachingStrategy === cacheStaleWhileRevalidate) {
            requestHandler = new strategies.StaleWhileRevalidate({
                cacheName: swconfig.cacheName,
                plugins: [
                    new workbox.cacheableResponse.CacheableResponsePlugin({
                        statuses: [200],
                        headers: { 'X-Is-Cacheable': 'yes', },
                    })
                ],
            });
        }
        routing.setDefaultHandler(requestHandler);
        workbox.routing.registerRoute(matchFunction, requestHandler);
        workbox.routing.registerRoute(new RegExp(siteSearhcRegex), handlerSiteSearch, 'POST');
        setOfflinePageHandler(swconfig);
        try {
            const cache = await caches.open(swconfigcache);
            swconfig.cachedTime = new Date().getTime();
            const swConfigJSON = JSON.stringify(swconfig);
            cache.put('/swconfig.json', new Response(swConfigJSON.toString()));

        } catch (error) {
            console.log("cache servlet data swconfig-cache error" + error);
        }
        console.log("Pwa Servlet Call completed");
        if (swconfig.masterCacheUrlList != null &&
            swconfig.masterCacheUrlList.length > 0) {
            if (location.origin.startsWith(swconfig.domainWhiteList)) {

                installPWA(event);
            }
            else
                console.log("domain " + swconfig.domainWhiteList + " is not whitelisted for " + location.origin);
        }
    }
}

var isValid = function (response) {
    if (!response || !response.cachedTime) return false;
    var fetched = response.cachedTime;
    if (fetched && (parseFloat(fetched) + (1000 * 60 * 60 * 2)) > new Date().getTime())
        return true;
    return false;
};

// This is a polyfill method
if (!Promise.allSettled) {
    Promise.allSettled = function (promises) {
        let mappedPromises = promises.map((p) => {
            return p
                .then((value) => {
                    return {
                        status: 'fulfilled',
                        value
                    };
                })
                .catch((reason) => {
                    return {
                        status: 'rejected',
                        reason
                    };
                });
        });
        return Promise.all(mappedPromises);
    };
}

//install event handler, includes fetching the URLs to cache from the configuration
self.addEventListener('install', event => {
    console.log('Installing service worker.');
    if (swconfig.pwaServletUrl != "" && swconfig.pwaContentfragmentUrl != "") {
        event.waitUntil(callServlet(swconfig.pwaServletUrl, swconfig.pwaContentfragmentUrl));
    }

});

//event handler for the activate event
self.addEventListener('activate', event => {
    console.log('--Service Worker Activated.--');
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            if (cacheName.startsWith(swconfig.cacheName) || cacheName.startsWith(swconfigcache)) {
                console.log('--Service Worker Deleted OLD cache ' + swconfig.cacheName + ' Successfully.');
                return caches.delete(cacheName);
            }
        }));
    }));
    if (swconfig.pwaServletUrl != "" && swconfig.pwaContentfragmentUrl != "") {
        event.waitUntil(callServlet(swconfig.pwaServletUrl, swconfig.pwaContentfragmentUrl));
    }
    clients.claim();
});

//event handler for the message passed from main js
self.addEventListener('message', function (event) {
    if (event.data.action === skipWaiting) {
        console.log("pwa skipWaiting message received");
        self.skipWaiting();
    } else if (event.data.message == downloadPWA) {
        console.log("pwa sync message received");
        swconfig.pwaContentfragmentUrl = event.data.cfpath;
        event.waitUntil(callServlet(event.data.servleturlpath, swconfig.pwaContentfragmentUrl, event));

    }
});

//function triggered when user clicks to download
async function installPWA(event) {
    console.log('----Installing PWA Service worker Started.---');
    let warmCache = new Set();
    if (Array.isArray(swconfig.masterCacheUrlList)) {
        swconfig.masterCacheUrlList.forEach(item => warmCache.add(item));
        let startUrl = event.data.starturl;
        if (startUrl != null && startUrl != '') {
            swconfig.starturl = event.data.starturl;
            warmCache.add(event.data.starturl);
        }
    }
    event.waitUntil(populateWarmCache(warmCache, swconfig.cacheName));
    console.log('---Installing PWA Service worker completed.---');
}

//this function actually writes to the cache store the urls to cache
function addURLToCacheAndRoute(url, cache) {
    localurl = swconfig.localHostUrl;
    basepath = swconfig.contentBasePath;
    if (url != undefined) {
        if (!url.endsWith('?pwa=activate')) {
            url = location.origin + url + htmlextension;
        } else {
            url = location.origin + url;
        }
        if (location.origin != localurl) {
            url = url.replace(basepath, "").replace(htmlextension, "");
        }
    }


    if (requestHandler == null) {
        requestHandler = new strategies.NetworkFirst({
            cacheName: cache
        });
    }
    return cache.add(url).then(() => {
        workbox.routing.registerRoute(url, requestHandler);
        console.log(url + ' -> has been added to cache.');
    }).catch((err) => {
        console.log(url + '-> could not add be added to cache. reason->' + err);
        throw new Error("rejected");
    })
}

// This function opens the cache store and adds the urls to it
function populateWarmCache(warmCache, abbottCacheName) {
    let downloadComplete = "true";
    caches.open(abbottCacheName).then((cache) => {
        let promises = [];
        let promisesResult = [];
        warmCache.forEach((url) => promises.push(addURLToCacheAndRoute(url, cache)));
        Promise.allSettled(promises).
            then((results) => {
                promisesResult = results;
                promisesResult.forEach((res) => {
                    if (res.status == "rejected")
                        downloadComplete = "false";
                }
                );
                if (downloadComplete == "true")
                    return channel.postMessage("downloadCompleted");
                else
                    return channel.postMessage("downloadFailed");
            });
    });
    return;
}

// This function opens the cache store and adds the urls to it
function populateWarmCacheWithoutNotification(warmCache, abbottCacheName) {
    return caches.open(abbottCacheName).then((cache) => {
        let promises = [];
        warmCache.forEach((url) => promises.push(addURLToCacheAndRoute(url, cache)));
        return Promise.allSettled(promises);
    });
}

// This function is used to set offline page
function setOfflinePageHandler(swconfigSetOffline) {
    //const to capture configs for the catch handler which redirects to offline page/image
    const handler = async options => {
        const dest = options.request.destination;
        basepath = swconfigSetOffline.contentBasePath;
        let pageFallback = "";
        if (dest === destDocument) {
            pageFallback = swconfigSetOffline.offlinePage + htmlextension;
            if (location.origin != localurl) {
                pageFallback = pageFallback.replace(basepath, "").replace(htmlextension, "");
            }
            const cache = await self.caches.open(swconfigSetOffline.cacheName);
            return (await cache.match(pageFallback)) || Response.error();
        }
        return Response.error();
    };
    //fall back handler for routing to offline content
    workbox.routing.setCatchHandler(handler);
}

// This function is used to intrcept the run time url and add to cache if it exist in cacheble url
const matchFunction = ({ url, event }) => {
    let iscacheurl = false;
    const destination = event.request.destination;
    let warmCache = new Set();
    if (destination == destDocument && (event.request.url.indexOf('undefined') == -1)) {
        iscacheurl = cachePath(url);
        console.log(event.request.url);
        if (iscacheurl != undefined && iscacheurl != false && iscacheurl.indexOf('undefined') == -1) {
            warmCache.add(iscacheurl);
            populateWarmCacheWithoutNotification(warmCache, swconfig.cacheName);
        }
    }
    return iscacheurl;
};
//Function to handle post request of site search
const handlerSiteSearch = async ({ url, request, event, params }) => {
    try {
       
        const response = await fetch(request);
        const responseBody = await response.text();
        const cache = await caches.open(swSiteSearchCache);
        swconfig.cachedTime = new Date().getTime();
        const resObject= JSON.parse(responseBody);
        if(resObject != null && resObject.response !=null){
        const resultsArray=resObject.response.results;
        if(resultsArray != null && resultsArray.length > 0 ){
            const contentCategory=resultsArray[0].contentcategory;
            if(contentCategory == "product"){
                const responseBodyJson = JSON.stringify(responseBody);
                cache.put(swSiteSearchPathkey, new Response(responseBodyJson.toString()));
            }
          }
        }
        return new Response(`${responseBody}`, {
            headers: response.headers,
        });
    } catch (ex) {
        let siteSearchurl = location.origin + swSiteSearchPathkey;
        let content = await getCachedData(swSiteSearchCache, siteSearchurl);
        return new Response(`${content}`);
    }
};
// This function return the servlet response cache store 
async function getCachedData(cacheName, url) {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);
    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    }
    return await cachedResponse.json();
}

// This function set the servlet cache response to global object
async function readConfigData() {
    try {
        if (isValid(swconfig)) return;
        let url = location.origin + swconfigpathkey;
        let content = await getCachedData(swconfigcache, url);
        swconfig.masterCacheUrlList = content.masterCacheUrlList;
        swconfig.preCacheUrls = content.precachedUrl;
        swconfig.cacheName = content.cacheName;
        swconfig.domainWhiteList = content.domainWhiteList;
        swconfig.offlinePage = content.offlinePage;
        swconfig.handlerExpirationLimit = content.handlerExpirationLimit;
        swconfig.cachingStrategy = content.cachingStrategy;
        swconfig.cacheableUrls = content.cacheableUrls;
        swconfig.cachedTime = content.cachedTime;
        swconfig.pwaUserConsent = content.pwaUserConsent;
        if (!isValid(swconfig) && swconfig.pwaUserConsent == "1") {
            callServlet(swconfig.pwaServletUrl, swconfig.pwaContentfragmentUrl);
        }

    } catch (ex) {
        console.log("ReadConfigData fromm cache failed.", ex);
    }
}


//workbox.routing.registerRoute(new RegExp('.html'), requestHandler);

//function that will check run time url match to cachable ruls list
function cachePath(url) {
    let isCacheable = false;
    readConfigData();
    if (!swconfig || !swconfig.cacheableUrls || swconfig.cacheableUrls.length == 0) {
        return isCacheable;
    }
    if (!url.origin.startsWith(swconfig.domainWhiteList)) {
        console.log('inside cachePath->');
        return isCacheable;
    }
    isCacheable = swconfig.cacheableUrls.find(function (path) {
        let matched = false;
        // Support both relative and absolute URLs
        const trimmedPath = path.trim();
        matched = url.pathname.endsWith(trimmedPath + htmlextension);
        return matched;
    });
    return isCacheable;
}
self.addEventListener('fetch', event => {
    try {
        const url = new URL(event.request.url);
        if (url.origin === location.origin) {
            readConfigData();
        }
    }
    catch (error) {
        console.log("PWA fetch event failed; returning offline page instead.", error);
        const pageFallback = swconfig.offlinePage + htmlextension;
        return async (options) => {
            const destination = options.request.destination;
            const cache = await self.caches.open(cacheName);
            if (destination === 'document') {
                return (await cache.match(pageFallback)) || Response.error();
            }
            return Response.error();
        }
    }
});

