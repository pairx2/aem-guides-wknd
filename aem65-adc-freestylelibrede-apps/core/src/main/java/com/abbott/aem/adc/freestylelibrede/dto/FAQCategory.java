package com.abbott.aem.adc.freestylelibrede.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

public class FAQCategory {
    private String title;
    private String path;
    @Getter
    @Setter
    private List<FAQArticle> articles;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
