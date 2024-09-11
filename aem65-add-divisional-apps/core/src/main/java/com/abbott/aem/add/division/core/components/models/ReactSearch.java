package com.abbott.aem.add.division.core.components.models;

import org.apache.sling.api.resource.Resource;

public interface ReactSearch {
    String getTitle();
    Iterable<Resource> getItems();
}
