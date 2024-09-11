package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class AbbottTags {
    public final long id;
    public final long parentId;
    public final long level;
    public final String name;
    public final String urlKey;
    public final String metaDescription;
    public final String metaTitle;
    public final String metaKeywords;
    public final AbbottTags [] children;

    @JsonCreator
    public AbbottTags(@JsonProperty("id") long id, @JsonProperty("parent_id") long parentId, @JsonProperty("level") long level, @JsonProperty("name") String name, @JsonProperty("meta_description") String metaDescription, @JsonProperty("meta_title") String metaTitle, @JsonProperty("meta_keywords") String metaKeywords, @JsonProperty("children") AbbottTags[] children,  @JsonProperty("url_key") String urlKey) {
        this.id = id;
        this.parentId = parentId;
        this.level = level;
        this.name = name;
        this.children = children;
        this.metaDescription = metaDescription;
        this.metaTitle = metaTitle;
        this.metaKeywords = metaKeywords;
        this.urlKey = urlKey;
    }
}
