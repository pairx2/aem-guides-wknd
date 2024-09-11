package com.abbott.aem.platform.common.components.pojo;

/**
 * The Class TitleTagBean.
 */
public class TitleTagBean {

    /**
     * The title.
     */
    private String title;

    /**
     * The tag title.
     */
    private String tagTitle;

    private String searchType;

    /**
     * Gets the title.
     *
     * @return the title
     */

    private boolean placeHolderErrorMessage;

    public boolean isPlaceHolderErrorMessage() {
        return placeHolderErrorMessage;
    }

    public void setPlaceHolderErrorMessage(boolean placeHolderErrorMessage) {
        this.placeHolderErrorMessage = placeHolderErrorMessage;
    }

    public String getTitle() {
        return title;
    }

    /**
     * Sets the title.
     *
     * @param title the new title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets the tag title.
     *
     * @return the tag title
     */
    public String getTagTitle() {
        return tagTitle;
    }

    /**
     * Sets the tag title.
     *
     * @param tagTitle the new tag title
     */
    public void setTagTitle(String tagTitle) {
        this.tagTitle = tagTitle;
    }

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

}
