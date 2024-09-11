package com.abbott.aem.adc.freestylelibrede.servlets;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component(service = Servlet.class, property = {
        Constants.SERVICE_DESCRIPTION + "=Sickfund Search Mock Servlet",
        ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
        ServletResolverConstants.SLING_SERVLET_PATHS+"=/bin/adc/freestylelibrede/fsl/sf-search"},configurationPolicy = ConfigurationPolicy.OPTIONAL)
public class SickfundSearchMockServlet extends SlingAllMethodsServlet {


    private static final  List<SickFundSearchItem> items = new ArrayList<>();

    static{
        items.add(new SickFundSearchItem("AOK Hessen",false));
        items.add(new SickFundSearchItem("AOK Bayern",false));
        items.add(new SickFundSearchItem("AOK Bremen",true));
        items.add(new SickFundSearchItem("AOK PLUS",true));
    }


    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        new ObjectMapper().writeValue(response.getWriter(),items);
    }



    private static class SickFundSearchItem {
        private final String name;
        private final boolean special;
        private SickFundSearchItem(String name, boolean special) {
            this.name = name;
            this.special = special;
        }

        public String getName() {
            return name;
        }

        public boolean isSpecial() {
            return special;
        }
    }

}
