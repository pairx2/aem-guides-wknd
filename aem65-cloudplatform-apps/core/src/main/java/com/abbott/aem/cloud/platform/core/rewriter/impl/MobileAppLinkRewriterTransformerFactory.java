package com.abbott.aem.cloud.platform.core.rewriter.impl;

import lombok.extern.slf4j.Slf4j;
import org.apache.sling.rewriter.Transformer;
import org.apache.sling.rewriter.TransformerFactory;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Modified;

import java.util.Map;

@Slf4j
@Component(immediate = true, service = TransformerFactory.class, property = { "pipeline.type=mobileapplinkrewriter" })
public class MobileAppLinkRewriterTransformerFactory implements TransformerFactory {

	public Transformer createTransformer() {
		return new MobileAppLinkRewriterTransformer();
	}

	@Activate
	@Modified
	protected void activate(Map<String, Object> properties) {
		log.info("Entry into activate method of LinkRewriterTransformerFactory");
	}

	@Deactivate
	protected void deactivate(ComponentContext ctx) {
		log.info("Entry into deactivate method of LinkRewriterTransformerFactory");
	}
}