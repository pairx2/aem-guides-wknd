package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import com.abbott.aem.platform.common.components.models.navigation.PlatformNavigationItem;
import com.adobe.cq.wcm.core.components.models.NavigationItem;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ValueMap;

@Getter
@SuperBuilder
public abstract class AbstractNavigationItemImpl implements PlatformNavigationItem {

	static final String PN_SUBTITLE = "subtitle";
	static final String PN_ACTION = "action";
	static final String PN_EXTERNAL = "external";
	static final String PN_IMAGE = "image";
	static final String PN_NAV_IMAGE = "navImage";
	static final String PN_IMAGE_ALT = "imageAlt";
	static final String PN_BADGE_REQUIRED = "badgeRequired";
	static final String PN_BADGE_TYPE = "badgeType";
	static final String PN_BADGE_TEXT = "badgeText";
	static final String PN_BADGE_POSITION = "badgePosition";
	static final String PN_SEE_MORE_TEXT = "seeMoreText";
	static final String PN_SEE_MORE_URL = "seeMoreUrl";
	static final String PN_SEE_MORE_ACTION = "seeMoreAction";
	static final String PN_SEE_MORE_EXTERNAL = "seeMoreExternal";
	static final String PROP_ACTION_DEFAULT = "_self";
	static final String PROP_BADGE_POSITION_DEFAULT = "top-right";
	static final String ID_SEPARATOR = "-";
	private AbstractNavigationItemImpl parent;
	@Getter(AccessLevel.NONE)
	private ValueMap properties;

	public NavigationItem getParent() {
		return this.parent;
	}

	public String getSubtitle() {
		return properties.get(PN_SUBTITLE, String.class);
	}

	public String getAction() {
		return this.properties.get(PN_ACTION, PROP_ACTION_DEFAULT);
	}

	public boolean isExternal() {
		return this.properties.get(PN_EXTERNAL, false);
	}

	public String getImage() {
		String navImage = this.properties.get(PN_IMAGE, String.class);
		if (StringUtils.isBlank(navImage)) {
			/*For pages, the navigation image field has been updated to navImage as it was conflicting
			  with the page thumbnail field name.*/
			navImage = this.properties.get(PN_NAV_IMAGE, String.class);
		}
		return navImage;
	}

	public String getImageAlt() {
		return this.properties.get(PN_IMAGE_ALT, "");
	}

	public String getSeeMoreText() {
		return this.properties.get(PN_SEE_MORE_TEXT, String.class);
	}

	public String getSeeMoreUrl() {
		String seeMoreUrl = this.properties.get(PN_SEE_MORE_URL, String.class);
		return PlatformUtil.ensureProperLink(seeMoreUrl);
	}

	public String getSeeMoreAction() {
		return this.properties.get(PN_SEE_MORE_ACTION, PROP_ACTION_DEFAULT);
	}

	public boolean isSeeMoreExternal() {
		return this.properties.get(PN_SEE_MORE_EXTERNAL, false);
	}

	public boolean isBadgeRequired() {
		return this.properties.get(PN_BADGE_REQUIRED, false);
	}

	public String getBadgeType() {
		if (isBadgeRequired()) {
			return this.properties.get(PN_BADGE_TYPE, "");
		}
		return null;
	}

	public String getBadgeText() {
		if (isBadgeRequired()) {
			return this.properties.get(PN_BADGE_TEXT, "");
		}
		return null;
	}

	public String getBadgePosition() {
		if (isBadgeRequired()) {
			return this.properties.get(PN_BADGE_POSITION, PROP_BADGE_POSITION_DEFAULT);
		}
		return null;
	}

	public boolean isImageConfigured() {
		return StringUtils.isNotBlank(this.getImage());
	}

	public boolean isSeeMoreConfigured() {
		return StringUtils.isNotBlank(this.getSeeMoreText());
	}
}
