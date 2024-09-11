package com.abbott.aem.platform.search.coveoconnector.core.utils;

import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;

/**
 * The Class OSGIServiceReference.
 */
public class OSGIServiceReference {

	/**
	 * Gets the osgi service reference.
	 *
	 * @param serviceClass the service class
	 * @return the osgi service reference
	 */
	public static Object getOsgiServiceReference(final Class<?> serviceClass) {
		BundleContext bundleContext = FrameworkUtil.getBundle(serviceClass).getBundleContext();
		ServiceReference<?> factoryRef = bundleContext.getServiceReference(serviceClass.getName());
		return bundleContext.getService(factoryRef);
	}
}
