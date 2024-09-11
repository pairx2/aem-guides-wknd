package com.abbott.aem.platform.common.components.models;

import java.util.List;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ColumnControl {

    List<Integer> getColumnList();

    List<String> getColumnLayout();
}
