package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.dto.FAQArticle;
import com.abbott.aem.adc.freestylelibrede.dto.FAQCategory;
import com.abbott.aem.adc.freestylelibrede.dto.FAQInput;
import com.abbott.aem.adc.freestylelibrede.services.FAQArticleGeneratorService;
import com.abbott.aem.adc.freestylelibrede.services.FileReaderService;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.IOException;

import static com.day.cq.commons.jcr.JcrConstants.JCR_TITLE;
import static com.day.cq.commons.jcr.JcrConstants.NT_UNSTRUCTURED;
import static com.day.cq.wcm.api.NameConstants.NN_RESPONSIVE_CONFIG;
import static org.apache.sling.api.SlingConstants.PROPERTY_RESOURCE_TYPE;

@Component(
        service = FAQArticleGeneratorService.class,
        immediate = true,
        configurationPolicy = ConfigurationPolicy.REQUIRE
)
@Designate(ocd = FAQArticleGeneratorServiceImpl.Configuration.class)
public class FAQArticleGeneratorServiceImpl implements FAQArticleGeneratorService {
    private static final Logger LOG = LoggerFactory.getLogger(FAQArticleGeneratorServiceImpl.class);
    private static final String ROOT = "/root";
    private static final String FAQ_ARTICLE_TEMPLATE = "/conf/adc/freestylelibrede/settings/wcm/templates/article";
    private static final String TITLE_COMPONENT = "adc/freestylelibrede/components/content/title";
    private static final String TEXT_COMPONENT = "adc/freestylelibrede/components/content/text";
    private static final String GENERATED_TITLE = "/generatedTitle";
    private static final String GENERATED_ANSWER = "/generatedAnswer";
    private static final String TEXT_ALIGNMENT = "textAlignment";
    private static final String TEXT_COLOR = "textColor";
    private static final String TYPE = "type";
    private static final String DEFAULT = "default";
    private static final String OFFSET = "offset";
    private static final String WIDTH = "width";
    private static final String TEXT_IS_RICH = "textIsRich";
    private static final String TEXT = "text";
    private static final String SLING_PREFIX = "sling:";
    //Suppressing as paths with extensions are treated as hardcoded sting literals
    @SuppressWarnings("CQRules:CQBP-71")
    private static final String FAQ_GEN_PATH = "/apps/adc/freestylelibrede/faq-generation-input/input.json";

    private String fileLocation = "";

    @Reference
    private FileReaderService fileReaderService;

    @Activate
    private void init(Configuration configuration) {
        fileLocation = configuration.articles_location();
    }

    @Override
    public void generateFromFile(ResourceResolver resolver) {
        String jsonInput = fileReaderService.readTextFile(fileLocation, resolver);
        LOG.debug("Read in JSON from {}", fileLocation);
        ObjectMapper mapper = new ObjectMapper();
        try {
            PageManager pageManager = resolver.adaptTo(PageManager.class);

            if (pageManager != null) {
                FAQInput input = mapper.readValue(jsonInput, FAQInput.class);
                LOG.debug("Now looping over categories");
                for (FAQCategory category : input.getCategories()) {
                    LOG.info("Now working with category {}", category.getTitle());
                    LOG.debug("Trying to retrieve page from {}", category.getPath());
                    Page categoryPage = pageManager.getPage(category.getPath());

                    if (categoryPage != null) {
                        for (FAQArticle article : category.getArticles()) {
                            createArticle(article, categoryPage, pageManager, resolver);
                        }
                    } else {
                        LOG.warn("Skipping category, root page not found: {}",category.getPath());
                    }
                }
            }
        } catch (IOException e) {
            LOG.error("Couldn't unparse following json {}", jsonInput, e);
        }
    }

    private void createArticle(FAQArticle article, Page parentPage, PageManager pageManager, ResourceResolver resolver) {
        try {
            Page createdPage = pageManager.create(parentPage.getPath(), null, FAQ_ARTICLE_TEMPLATE, article.getTitle());
            Node node = createdPage.adaptTo(Node.class);
            if (node != null) {
                Node jcrContent = node.getNode(Node.JCR_CONTENT);

                if (jcrContent != null) {
                    Session session = resolver.adaptTo(Session.class);
                    Node responsiveGrid = JcrUtils.getOrCreateByPath(jcrContent.getPath().concat(ROOT), NT_UNSTRUCTURED, session);
                    responsiveGrid.setProperty(SLING_PREFIX +PROPERTY_RESOURCE_TYPE, "wcm/foundation/components/responsivegrid");
                    session.save();


                    String title = setTitleOnArticle(article, responsiveGrid.getPath(), resolver.adaptTo(Session.class));
                    String answer = setAnswerOnArticle(article, responsiveGrid.getPath(), resolver.adaptTo(Session.class));

                    adjustResponsivenessOnComponent(title, resolver.adaptTo(Session.class));
                    adjustResponsivenessOnComponent(answer, resolver.adaptTo(Session.class));
                }
            }

        } catch (WCMException e) {
            LOG.error("Couldn't create a page for the article \"{}\"", article.getTitle(), e);
        } catch (RepositoryException e) {
            LOG.error("Couldn't create content for the article \"{}\"", article.getTitle(), e);
        }
    }

    private String setTitleOnArticle(FAQArticle article, String parentPath, Session session) throws RepositoryException {
        Node titleNode = JcrUtils.getOrCreateByPath(parentPath.concat(GENERATED_TITLE), NT_UNSTRUCTURED, session);
        titleNode.setProperty(SLING_PREFIX +PROPERTY_RESOURCE_TYPE, TITLE_COMPONENT);
        titleNode.setProperty(JCR_TITLE, article.getTitle().toUpperCase());
        titleNode.setProperty(TEXT_ALIGNMENT, "left");
        titleNode.setProperty(TEXT_COLOR, "blue");
        titleNode.setProperty(TYPE, "h3");

        session.save();

        return titleNode.getPath();
    }

    private String setAnswerOnArticle(FAQArticle article, String parentPath, Session session) throws RepositoryException {
        Node textNode = JcrUtils.getOrCreateByPath(parentPath.concat(GENERATED_ANSWER), NT_UNSTRUCTURED, session);
        textNode.setProperty(SLING_PREFIX +PROPERTY_RESOURCE_TYPE, TEXT_COMPONENT);

        StringBuilder generatedHtml = new StringBuilder();
        String[] paragraphs = article.getAnswer().split("\n");
        for (String paragraph : paragraphs) {
            generatedHtml.append("<p>");
            generatedHtml.append(paragraph);
            generatedHtml.append("</p>");
        }
        textNode.setProperty(TEXT, generatedHtml.toString());
        textNode.setProperty(TEXT_IS_RICH, "true");

        session.save();

        return textNode.getPath();
    }

    private void adjustResponsivenessOnComponent(String nodePath, Session session) throws RepositoryException {
        Node responsiveNode = JcrUtils.getOrCreateByPath(nodePath.concat("/").concat(NN_RESPONSIVE_CONFIG), NT_UNSTRUCTURED, session);
        session.save();

        Node actualResponsiveNode = JcrUtils.getOrCreateByPath(responsiveNode.getPath().concat("/").concat(DEFAULT), NT_UNSTRUCTURED, session);
        actualResponsiveNode.setProperty(OFFSET, "3");
        actualResponsiveNode.setProperty(WIDTH, "6");
        session.save();
    }

    @SuppressWarnings("squid:S00100")
    @ObjectClassDefinition(name = "ADC Freestyle Libre DE - FAQ Article Generator Service")
    protected static @interface Configuration {
        @AttributeDefinition(
                name = "File Generated Articles Location"
        )
        String articles_location() default FAQ_GEN_PATH ;
    }
}
