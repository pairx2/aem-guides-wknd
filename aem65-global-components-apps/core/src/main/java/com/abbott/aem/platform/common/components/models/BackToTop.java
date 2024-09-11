package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface BackToTop.
 */
@ConsumerType
public interface BackToTop extends Component {

	public 	String getButtonType();

	public 	String getTitle();
	public String getonlyTextBtnTitle();

	public 	String getIcon();
	public 	String gettextOnlyIcon();
	public 	String geticonWithText();

	public 	String getPosition();

	public 	String getScreenSize();

	public boolean isIconOnly();

	public 	boolean isonlyIconTextOnlyBtnMob();

}