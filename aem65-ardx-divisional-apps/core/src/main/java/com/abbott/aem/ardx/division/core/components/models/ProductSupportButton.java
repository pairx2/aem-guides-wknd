package com.abbott.aem.ardx.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface ProductSupportButton extends Component {

    public Boolean getSupportButton();

    public Boolean getTechnicalButton();

    public String getProduct();

}