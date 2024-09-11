package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.models.TreeTag;
import com.abbott.aem.adc.freestylelibrede.services.TreeTagService;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import static com.day.cq.commons.jcr.JcrConstants.JCR_TITLE;

@Component(service= TreeTagService.class,configurationPolicy=ConfigurationPolicy.OPTIONAL)
public class TreeTagServiceImpl implements TreeTagService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TreeTagServiceImpl.class);

	public List<TreeTag> resolveTreeTags(ResourceResolver resolver, Resource resource, String rootTag, int depth, boolean useTitleAsValue)  {
		Locale locale = getLocaleFromResource(resolver, resource);
		Tag tag = resolver.adaptTo(TagManager.class).resolve(rootTag);

		List<TreeTag> treeTags = new ArrayList<>();
		if (tag == null) {
			LOGGER.error("Unable to resolve to a Tag namespace at path:{}", tag);
			return treeTags;
		}

		Resource tagResource = resolver.resolve(tag.getPath());
		treeTags = getProductCategories(tagResource, 1, locale, depth, useTitleAsValue);

		return treeTags;
	}

	private List<TreeTag> getProductCategories(Resource tagResource, int depth, Locale locale, int maxDepth, boolean useTitleAsValue) {
		List<TreeTag> productCategories = new ArrayList<>();
		Iterator<Resource> it = tagResource.listChildren();

		while (it.hasNext()) {
			Resource childTagResource = it.next();
			List<TreeTag> children = new ArrayList<>();

			if (maxDepth > depth) {
				children = getProductCategories(childTagResource, depth + 1, locale, maxDepth, useTitleAsValue);
			}

			String value = useTitleAsValue ? childTagResource.getValueMap().get(JCR_TITLE , "") : childTagResource.getPath();
			String label = childTagResource.getValueMap().get(JCR_TITLE + "." + locale.getLanguage(), useTitleAsValue ? value : childTagResource.getValueMap().get(JCR_TITLE , ""));

			productCategories.add(new TreeTag(label, value, children));
		}

		return productCategories;
	}

	private Locale getLocaleFromResource(ResourceResolver resolver, Resource resource) {
		PageManager pageManager = resolver.adaptTo(PageManager.class);
		Page currentPage = pageManager.getContainingPage(resource);
		return currentPage.getLanguage(true);
	}

}
