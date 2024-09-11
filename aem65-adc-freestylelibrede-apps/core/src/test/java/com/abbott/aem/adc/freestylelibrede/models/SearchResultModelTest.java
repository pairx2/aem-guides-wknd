package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.TreeTagService;

import static org.mockito.ArgumentMatchers.eq;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class SearchResultModelTest extends BaseModelTest<SearchResultModel> {


    private final AemContext context = new AemContext();


    @Mock
    private TreeTagService treeTagService;


    private SearchResultModel model;
    @BeforeEach
    void setUp() {
        context.registerService(TreeTagService.class,treeTagService);
        model = loadModel(SearchResultModel.class);
    }

    @Test
    void getViewMoreStyle() {
        Assert.assertEquals("view-more-style",model.getViewMoreStyle());
    }

    @Test
    void getNrOfResults() {
        Assert.assertEquals(1000,model.getNrOfResults());
    }

    @Test
    void getNrOfViewMore() {
        Assert.assertEquals(20,model.getNrOfViewMore());
    }

    @Test
    void getFilters() {
        Mockito.verify(treeTagService).resolveTreeTags(Mockito.any(), Mockito.any(), eq("/etc/tags/adc-tags"), eq(1), eq(true));
        Assert.assertTrue(model.getFilters().isEmpty());
    }
    
    @Test
    void getSearchRootPath() {
    	Assert.assertEquals("/etc/tags/adc-tags",model.getSearchRootPath());
    }
}