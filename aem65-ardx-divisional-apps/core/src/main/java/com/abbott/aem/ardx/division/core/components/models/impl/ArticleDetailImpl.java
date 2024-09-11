package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.ArticleDetail;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {ArticleDetail.class,
        ComponentExporter.class}, resourceType = {
        ArticleDetailImpl.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ArticleDetailImpl implements ArticleDetail {

    protected static final String RESOURCE_TYPE = "ardx/division/components/content/article/articledetail";
    private static final String ARTICLE_DATE_FORMAT = "MMMM dd, yyyy";
    private static final String OFF_SET = "GMT+05:30";
    private static final String LOCALE_DEFAULT = "en";
    private static final String STR_UNDER_SCORE = "_";
    String articleDate;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String primaryAuthorBasicInfo;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String primaryAuthorSubInfo;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String secondaryAuthorBasicInfo;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String secondaryAuthorSubInfo;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private Date publishDate;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Default(values = "Published")
    private String publishText;
    @RequestAttribute
    private String locale;

    private void setFormattedArticleDate(Date publishDate) {
        String articlePubDate = StringUtils.EMPTY;
        if (publishDate != null) {
            String localeValue = LOCALE_DEFAULT;
            if (StringUtils.isNotBlank(locale)) {
                localeValue = locale.split(STR_UNDER_SCORE)[0];
            }
            DateFormat dateFormat = new SimpleDateFormat(ARTICLE_DATE_FORMAT, new Locale(localeValue));
            dateFormat.setTimeZone(TimeZone.getTimeZone(OFF_SET));
            articlePubDate = dateFormat.format(publishDate.getTime());
        }
        articleDate = StringUtils.capitalize(articlePubDate);
    }

    @PostConstruct
    private void init() {
        setFormattedArticleDate(publishDate);
    }

    @Override
    public String getArticleDate() {
        return articleDate;
    }
}