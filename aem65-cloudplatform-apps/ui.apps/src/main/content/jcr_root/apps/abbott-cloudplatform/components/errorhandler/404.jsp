<%--
Copyright (c) Abbott
  --%>
<%@page session="false"
        import="com.abbott.aem.cloud.platform.core.errorpagehandler.ErrorPageHandlerService"%>
<%@include file="/libs/foundation/global.jsp" %><%
    ErrorPageHandlerService errorPageHandlerService = sling.getService(ErrorPageHandlerService.class);
		  
    if (errorPageHandlerService != null && errorPageHandlerService.isEnabled()) {

        // Check for and handle 404 Requests properly according on Author/Publish
        if (errorPageHandlerService.doHandle404(slingRequest, slingResponse)) {
        	
        	final String path = errorPageHandlerService.findErrorPage(slingRequest, resource);

			if (path != null) {
				slingResponse.setStatus(404);
                errorPageHandlerService.resetRequestAndResponse(slingRequest, slingResponse, 404);
				errorPageHandlerService.includeUsingGET(slingRequest, slingResponse, path);
				return;
            }
    	}
    }
%><%@include file="/libs/sling/servlet/errorhandler/default.jsp" %>
