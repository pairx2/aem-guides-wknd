use(function () {

    let redirectResource = request.getRequestPathInfo().getSuffixResource();

    let enabled = true;
    let filters = sling.getServices(Packages.javax.servlet.Filter, null);

    return {
        disabled: !enabled, // will trigger an alert on manage-redirects.html
        redirectResource: redirectResource
     };
});