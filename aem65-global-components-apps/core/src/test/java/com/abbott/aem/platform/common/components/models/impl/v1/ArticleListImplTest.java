package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.ArticleList;
import com.abbott.aem.platform.common.components.models.impl.v1.ArticleCategory;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class ArticleListImplTest {

    private final AemContext context = new AemContext();

    private ArticleList articleList;

    @BeforeEach
    void setUp() {
        context.addModelsForClasses(ArticleCategory.class);
        context.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ArticleListImplTest.json","/content");
        articleList = Objects.requireNonNull(context.currentResource("/content/articlelist")).adaptTo(ArticleList.class);
    }
    @Test
    void isAdaptedFromResourceType() {
        Assertions.assertNotNull(articleList);
    }

    @Test
    void testToString() {
        String expected ="{\"latestCategoryTitle\":\"Categorty Tile\",\"noResultsFound\":\"Articles not found\",\"loadMoreButtonText\":\"Load More\",\"defaultImage\":\"/content/dam/adc/navecomm/gb/en/images/keto/Healthy2.png\",\"categories\":[{\"primary\":{\"tagTitle\":\"Content Type\",\"tagLocalizedTitle\":null,\"path\":\"/content/how-ketone-affects-your-well-being.html\",\"title\":\"How Ketone affects your well being?\",\"description\":\"Description \",\"image\":\"/content/dam/adc/navecomm/gb/en/images/keto/Healthy2.png\"},\"tag\":{\"tagTitle\":\"Content Type\",\"tagLocalizedTitle\":null,\"tagId\":\"bts:global-reference/content-type\"}},{\"primary\":{\"tagTitle\":\"Content Type\",\"tagLocalizedTitle\":null,\"path\":\"/content/how-ketone-affects-your-well-being.html\",\"title\":\"How Ketone affects your well being?\",\"description\":\"Description \",\"image\":\"/content/dam/adc/navecomm/gb/en/images/keto/Healthy2.png\"},\"tag\":{\"tagTitle\":\"Content Type\",\"tagLocalizedTitle\":null,\"tagId\":\"bts:global-reference/content-type\"}}]}";
        Assertions.assertEquals(expected,articleList.getJson());
    }
}
