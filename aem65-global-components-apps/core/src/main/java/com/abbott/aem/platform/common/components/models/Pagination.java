package com.abbott.aem.platform.common.components.models;
import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Pagination extends Component {

	/**
	 * Return Pagination Type
	 * @return
	 */
	String getPaginationType();
	/**
	 * Return True if Hide Previous checkbox is checked
	 * @return
	 */
	boolean isHidePrevious();

	/**
	 * Return True if Hide Next checkbox is checked
	 * @return
	 */
	boolean isHideNext();

	/**
	 * Return Page Size
	 * @return
	 */
	int getPageSize();
}
