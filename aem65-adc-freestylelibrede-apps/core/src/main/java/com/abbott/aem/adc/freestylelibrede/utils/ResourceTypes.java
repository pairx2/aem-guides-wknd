package com.abbott.aem.adc.freestylelibrede.utils;

import org.apache.sling.api.resource.Resource;

public class ResourceTypes {
    private ResourceTypes() {
    }

    public static String getResourceTypeName(String resourceType) {
        String[] resourceTypeSplit = resourceType.split("/");
        if (resourceTypeSplit.length > 1) {
            final String resourceTypeName = resourceTypeSplit[resourceTypeSplit.length - 1];
            return String.format(resourceTypeName.replaceAll("\\-(.)", "%S"), resourceTypeName.replaceAll("[^-]*-(.)[^-]*", "$1-").split("-"));
        }
        return resourceType;
    }

    public static String getResourceTypeName(Resource resource) {
        return getResourceTypeName(resource.getResourceType());
    }

    public static Resource getChildByResourceType(Resource resource, String resourceType) {

        Iterable<Resource> resItrb = resource.getChildren();
        for (Resource childResource : resItrb) {
            if (resourceType.equalsIgnoreCase(childResource.getResourceType())) {
                return childResource;

            } else {
                Resource targetResource = getChildByResourceType(childResource, resourceType);
                if(targetResource != null){
                    return targetResource;
                }
            }

        }
        return null;
    }

}
