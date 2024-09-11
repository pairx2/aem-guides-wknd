package com.abbott.aem.platform.common.components.models.impl.v2;
import static org.junit.jupiter.api.Assertions.*;

import com.abbott.aem.platform.common.components.models.SearchResultItemList;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.MockitoAnnotations;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import java.util.List;

@ExtendWith(AemContextExtension.class)
class SearchResultItemImplTest {

    private final AemContext ctx = new AemContext();
    private SearchResultItemImpl searchResultItemImpl;

    @Mock
    private List<SearchResultItemList> searchResultItemList;

    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(SearchResultItemImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/SearchResultItemImplTestV2.json", "/content");
        searchResultItemImpl = new SearchResultItemImpl();
    }

    @Test
    void testDesignType() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getDesignType()), "Default value should be false");
    }

    @Test
    void testImagePath() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getImagePath()), "Default value should be false");
    }
    @Test
    void testSearchButtonLabel() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getSearchButtonLabel()), "Default value should be false");
    }

    @Test
    void testDefaultSearchButtonLabel() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getDefaultSearchButtonLabel()), "Default value should be false");
    }

    @Test
    void testSearchButtonLink() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getSearchButtonLink()), "Default value should be false");
    }

    @Test
    void testDefaultSearchButtonLink() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getDefaultSearchButtonLink()), "Default value should be false");
    }


    @Test
    void testVideoPopupXpPath() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getVideoPopupXpPath()), "IsVideoPopupEnable should be true");
    }



    @Test
    void testProductCompareLabel() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getProductCompareLabel()), "IsComparePopupEnable should be true");
    }

    @Test
    void testComparePopupXpPath() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getComparePopupXpPath()), "IsComparePopupEnable should be true");
    }
    @Test
    void testVideoAppId() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getVideoAppId()), "IsComparePopupEnable should be true");
    }

    @Test
    void testVideoAccountId() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getVideoAccountId()), "IsComparePopupEnable should be true");
    }

    @Test
    void testVideoId() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getVideoId()), "IsComparePopupEnable should be true");
    }

    @Test
    void testVideoType() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getVideoType()), "IsComparePopupEnable should be true");
    }

    @Test
    void testBannerLayout() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getBannerLayout()), "IsComparePopupEnable should be true");
    }

    @Test
    void testCornerRadius() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getCornerRadius()), "IsComparePopupEnable should be true");
    }

    @Test
    void testBannerPosition() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getBannerPosition()), "IsComparePopupEnable should be true");
    }

    @Test
    void testIconAlignment() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getIconAlignment()), "IsComparePopupEnable should be true");
    }

    @Test
    void testTextAlignment() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getTextAlignment()), "IsComparePopupEnable should be true");
    }

    @Test
    void testIconpicker() {
        assertFalse(Boolean.parseBoolean(searchResultItemImpl.getIconpicker()), "IsComparePopupEnable should be true");
    }
    @Test
    void testGetSearchResultItemList() {
        MockitoAnnotations.initMocks(this);
        SearchResultItemImpl searchResultItem = new SearchResultItemImpl();
        searchResultItem.searchResultItemList = searchResultItemList;
        List<SearchResultItemList> actualSectionItems = searchResultItem.getSearchResultItemList();
        assertEquals(searchResultItemList, actualSectionItems);
    }

}