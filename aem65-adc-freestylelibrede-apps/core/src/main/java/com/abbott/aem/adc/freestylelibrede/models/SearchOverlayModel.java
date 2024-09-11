package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/search-overlay")
public class SearchOverlayModel extends SearchResultModel{

    @Getter
    @Inject
    String showAllStyle;

    @Getter
    @Externalize
    String resultPage;

    @Getter
    @Inject
    int nrOfResults;

    @Getter
    @Inject
    int nrOfViewMore;

    @Getter
    @Inject
    int searchNrOfResults;

    @Getter
    @Inject
    int searchNrOfViewMore;

    @Getter
    @Inject
    String topFaqLabel;

    @Getter
    @Externalize
    String faqPagePath;

    @Getter
    @Inject
    private List<SearchDefaultList> searchDefaultList= new ArrayList<>();

    @Getter
    @Inject
    @Default(values = "v1-rendition")
    String rendition;

    @Getter
    @Inject
    String noResultDescription;

    @Getter
    @Inject
    String sysSourceType;

    @Getter
    @Inject
    String noResultBtnLink;

    public List<SearchDefaultList> getSearchDefaultList() {
        return Collections.unmodifiableList(new ArrayList<>(this.searchDefaultList));
    }

}
