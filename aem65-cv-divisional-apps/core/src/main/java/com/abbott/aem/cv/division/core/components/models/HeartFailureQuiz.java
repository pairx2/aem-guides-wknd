package com.abbott.aem.cv.division.core.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

/**
 * The interface Heart failure quiz.
 */
@ConsumerType
public interface HeartFailureQuiz extends Component {

    /**
     * Gets type of page.
     *
     * @return the type of page
     */
    public String getTypeOfPage();
    /**
     * Gets results 1.
     *
     * @return the results 1
     */
    public String getResults1();

    /**
     * Gets results 2.
     *
     * @return the results 2
     */
    public String getResults2();

    /**
     * Gets component id.
     *
     * @return the component id
     */
    public String getComponentId();
    /**
     * Gets topmargin.
     *
     * @return the topmargin
     */
    public String getTopmargin();

    /**
     * Gets bottommargin.
     *
     * @return the bottommargin
     */
    public String getBottommargin();

    /**
     * Gets button 1 label.
     *
     * @return the button 1 label
     */
    public String getButton1Label();

    /**
     * Gets button 2 label.
     *
     * @return the button 2 label
     */
    public String getButton2Label();

    /**
     * Gets button 3 label.
     *
     * @return the button 3 label
     */
    public String getButton3Label();

    /**
     * Gets previous label.
     *
     * @return the previous label
     */
    public String getPreviousLabel();

    /**
     * Gets next label.
     *
     * @return the next label
     */
    public String getNextLabel();

    /**
     * Gets yes questions quiz panel.
     *
     * @return the yes questions quiz panel
     */
    public List<HeartFailureQuizItem> getYesQuestionsQuizPanel();

    /**
     * Gets no questions quiz panel.
     *
     * @return the no questions quiz panel
     */
    public List<HeartFailureQuizItem> getNoQuestionsQuizPanel();

}
