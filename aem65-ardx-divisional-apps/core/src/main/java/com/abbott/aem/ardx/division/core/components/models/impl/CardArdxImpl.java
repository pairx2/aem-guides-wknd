package com.abbott.aem.ardx.division.core.components.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.abbott.aem.ardx.division.core.components.models.CardArdx;

import com.abbott.aem.platform.common.components.models.Cards;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

/**
 * The type Cards.
 *
 * @author Pawan.Namagiri
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { CardArdx.class }, resourceType = {
		CardArdxImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CardArdxImpl implements CardArdx {
	protected static final String RESOURCE_TYPE = "ardx/division/components/content/cards";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Cards.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	public Cards cards;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String videoID;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String imagePath;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String backgroundColor;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String videoDocumentNumber;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String popup;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String cardLink;
	
	@Override
	public String getCardLink() {
		return cardLink;
	}
	


	
	
	

	
	
	

}