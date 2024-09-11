package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.HeartFailureQuizItem;
import com.abbott.aem.cv.division.core.components.models.HeartFailureQuiz;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

/**
 * The type Heart failure quiz.
 */
@Model(adaptables = {SlingHttpServletRequest.class},
        adapters = {HeartFailureQuiz.class, ComponentExporter.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeartFailureQuizImpl extends ComponentProxyImpl implements HeartFailureQuiz {

    /**
     * The Yes questions quiz panel.
     */
    @ChildResource
    @Getter
    public List<HeartFailureQuizItem> yesQuestionsQuizPanel;

    /**
     * The No questions quiz panel.
     */
    @ChildResource
    @Getter
    public List<HeartFailureQuizItem> noQuestionsQuizPanel;

    @Getter
    @ValueMapValue
    public String typeOfPage;

    @Getter
    @ValueMapValue
    public String results1;

    @Getter
    @ValueMapValue
    public String results2;

    @Getter
    @ValueMapValue
    public String componentId;

    @Getter
    @ValueMapValue
    public String topmargin;

    @Getter
    @ValueMapValue
    public String bottommargin;

    @Getter
    @ValueMapValue
    public String button1Label;

    @Getter
    @ValueMapValue
    public String button2Label;

    @Getter
    @ValueMapValue
    public String button3Label;

    @Getter
    @ValueMapValue
    public String previousLabel;

    @Getter
    @ValueMapValue
    public String nextLabel;

}
