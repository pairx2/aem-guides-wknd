package com.abbott.aem.cloud.platform.core.cloudconfig;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Defines the {@code CloudConfiguration} Sling Model used for the cloudconfig
 * component.
 */
@ConsumerType
public interface CloudConfiguration {

  /**
   * Get the path of the configuration containing the cloud configuration instance
   *
   * @return the path of the configuration containing the cloud configuration
   *         instance
   */
  default String getConfigPath() {
    throw new UnsupportedOperationException();
  }

  /**
   * Get the path of the cloud configuration instance
   *
   * @return the path of the cloud configuration instance
   */
  default String getItemPath() {
    throw new UnsupportedOperationException();
  }

  /**
   * Get the title of the cloud configuration instance
   *
   * @return the title of the cloud configuration instance
   */
  default String getTitle() {
    throw new UnsupportedOperationException();
  }
}
