package com.abbott.aem.cloud.platform.core.cloudconfig;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import lombok.NonNull;

/**
 * Defines the {@code CloudConfigurationList} Sling Model used for the cloudconfig component.
 *
 */
@ConsumerType
public interface CloudConfigurationList {

  /**
   * Retrieve the list of CloudConfigurations for the specified request.
   *
   * @return the list of {@code CloudConfiguration}s
   */
  @NonNull
  default List<CloudConfiguration> getCloudConfigurations() {
      throw new UnsupportedOperationException();
  }
}
