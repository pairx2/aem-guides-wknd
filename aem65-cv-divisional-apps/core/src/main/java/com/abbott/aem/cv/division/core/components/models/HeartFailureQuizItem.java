package com.abbott.aem.cv.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

/**
 * The interface Heart failure quiz item.
 */
@ConsumerType
public interface HeartFailureQuizItem extends Component {

    /**
     * Gets question text.
     *
     * @return the question text
     */
    public String getQuestionText();

    /**
     * Gets question image path.
     *
     * @return the question image path
     */
    public String getQuestionImagePath();

    /**
     * Gets image alt text.
     *
     * @return the image alt text
     */
    public String getImageAltText();

}