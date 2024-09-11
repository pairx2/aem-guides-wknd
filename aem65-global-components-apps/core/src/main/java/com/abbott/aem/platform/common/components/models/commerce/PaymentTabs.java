package com.abbott.aem.platform.common.components.models.commerce;

import com.abbott.aem.platform.common.components.models.CustomTabs;
import org.osgi.annotation.versioning.ConsumerType;

import java.util.Map;

@ConsumerType
public interface PaymentTabs extends CustomTabs {
    Map<String, String> getPaymentTypes();
}
