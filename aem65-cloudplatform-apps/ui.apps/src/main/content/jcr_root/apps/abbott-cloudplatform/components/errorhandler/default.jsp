<%--
Copyright (c) Abbott
  --%>
<%@include file="/libs/foundation/global.jsp" %><%
%><%@page session="false"
        import="org.apache.sling.api.SlingHttpServletResponse,
        		com.abbott.aem.cloud.platform.core.wcm.ComponentHelper,
        		com.abbott.aem.cloud.platform.core.util.ModeUtil,
        		com.abbott.aem.cloud.platform.core.errorpagehandler.ErrorPageHandlerService"%><%

    final ErrorPageHandlerService errorPageHandlerService = sling.getService(ErrorPageHandlerService.class);

    if (errorPageHandlerService != null && errorPageHandlerService.isEnabled()) {
        final ComponentHelper componentHelper = sling.getService(ComponentHelper.class);
        final int status = errorPageHandlerService.getStatusCode(slingRequest);

        if (status >= SlingHttpServletResponse.SC_INTERNAL_SERVER_ERROR &&
                !ModeUtil.isDisabled(slingRequest)) {
            // If error is some sort of internal error (500+) and on Author (since WCMMode.DISABLED ~> Publish)
            if (ModeUtil.isPreview(slingRequest)) {
                %><cq:include script="/apps/abbott-cloudplatform/components/errorhandler/preview/errormessage.jsp" /><%
                return;
            } else {
                // In Author and Edit or Design, so allow OOTB WCMDebugFilter to handle the error message display
                return;
            }
        } else {
            slingResponse.setStatus(status);
            final String path = errorPageHandlerService.findErrorPage(slingRequest, resource);

            if (path != null) {
                errorPageHandlerService.resetRequestAndResponse(slingRequest, slingResponse, status);
                errorPageHandlerService.includeUsingGET(slingRequest, slingResponse, path);
                return;
            }
        }
    }
%><%@include file="/libs/sling/servlet/errorhandler/default.jsp" %>