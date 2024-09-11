package com.abbott.aem.an.abbottstore.services;

import org.apache.sling.api.resource.ResourceResolver;

public interface ResResolverBySysUserService {

	/**
     * getReadOnlyResourceResolver
     *
     * @return readUser resourceResolver
     */
    public ResourceResolver getReadOnlyResourceResolver();
    
    /**
     * getReadAndWriteResourceResolver
     *
     * @return writeUser resourceResolver
     */
    public ResourceResolver getReadAndWriteResourceResolver();
}
