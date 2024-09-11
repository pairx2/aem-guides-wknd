package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.beans.FaqBean;
import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author madhurim
 *
 *         This model is used to render authored faq question ,answers and
 *         titles
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FaqModel {

	private static final Logger log = LoggerFactory.getLogger(FaqModel.class);

	/** The faq path res. */
	@ChildResource(name = "faqFieldsList")
	private Resource faqPagePathRes;

	/** The faq items list. */
	@Getter
	private List<FaqBean> faqItemsList = new ArrayList<>();

	@PostConstruct
	protected void init() {
		if (faqPagePathRes != null) {
			Node node = faqPagePathRes.adaptTo(Node.class);
			try {
				if (node != null && node.hasNodes()) {
					NodeIterator nodeIterator = node.getNodes();
					while (nodeIterator.hasNext()) {
						populateFaqBean(nodeIterator.nextNode());
					}
				}
			} catch (RepositoryException re) {
				log.error("Repository Exception :: {}", re.getMessage());
			}
		}
	}

	/**
	 *
	 * @param linkItemNode
	 */
	public void populateFaqBean(Node linkItemNode) {
		FaqBean faqBean = new FaqBean();

		try {
			if (linkItemNode.hasProperty("question")) {
				faqBean.setQuestion(linkItemNode.getProperty("question").getString());
			}
			if (linkItemNode.hasProperty("answer")) {
				faqBean.setAnswer(linkItemNode.getProperty("answer").getString());
			}

			faqItemsList.add(faqBean);
		} catch (RepositoryException e) {
			log.error("Repository Exception :: {}", e.getMessage());
		}

	}


}
