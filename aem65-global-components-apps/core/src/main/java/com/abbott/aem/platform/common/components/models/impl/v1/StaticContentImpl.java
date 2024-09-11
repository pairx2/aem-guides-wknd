package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.StaticContent;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.RangeIterator;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.foundation.Image;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.*;
import com.day.cq.commons.jcr.JcrConstants;


@Data
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {StaticContent.class,
        ComponentExporter.class}, resourceType = {
        StaticContentImpl.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class StaticContentImpl implements StaticContent {

    /**
     * The Constant RESOURCE_TYPE.
     */
    public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/searchresults/v1/searchresults";

    public static final String ARTICLE_PAGE = "link";

    public static final String AUTHORED_DATE = "authoredDate";

    public static final String ROOT_PATH = "root";

    public static final String CONTAINER = "container";

    public static final String FILE_REFERENCE = "fileReference";

    public static final String ALT = "alt";

    public static final String IMAGE = "/image";

    public static final String JCR_CONTENT = "/" + JcrConstants.JCR_CONTENT;

    public static final String CONTENT_TYPE_PRODUCT = "product";

    public static final String LIST_OPTION_PAGE_PATH = "pagepath";

    public static final String LIST_OPTION_CHILD_PAGES = "childpages";

    public static final String PROP_OG_DESC = "ogDescription";
	
	public static final String PROP_OG_IMAGE = "ogImage";

    public static final String PROP_PRODUCT_PAGE_PATH = "productPagePath";

    public static final String PROP_PRODUCT_SEARCH_PATH = "productSearchPath";

    public static final String PRODUCT_TITLE = "root/container/columncontrol/tab_item_no_0/title/jcr:title";

    public static final String PRODUCT_IMAGE = "root/container/columncontrol/tab_item_no_1/image";

    public static final String TITLE_STRING = "title";

    public static final String DESCRIPTION_STRING = "description";

    public static final String IMAGE_STRING = "image";

    public static final String URL_STRING = "URL";
	
	public static final int PAGE_GRID_SIZE = 12;
	
	public static final String ARTICLE_SUBTITLE = "articlesubtitle";
	
	public static final String ARTICLE_DESCRIPTION = "articledescription";
	
	public static final String ARTICLE_DATE = "articledate";

    public static final String PATH_DELIMITER = "/";
    @Inject
    protected Page currentPage;

    List<Map<String, String>> articleDetails = new ArrayList<>();
    List<Map<String, String>> productDetails = new ArrayList<>();
    String imageURL;
    String altText;
	int textColumnSize;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String tagName;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String tagHeadingColor;
    @ChildResource(name = "links")
    @Setter(AccessLevel.NONE)
    private List<Resource> links;
    @ChildResource(name = "productlinks")
    @Setter(AccessLevel.NONE)
    private List<Resource> productLinks;
    @ChildResource(name = "productsearchlinks")
    @Setter(AccessLevel.NONE)
    private List<Resource> productSearchLinks;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String link;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String seeMoreLink;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Default(values = "article")
    private String contentType;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String productParentPath;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Default(intValues = 3)
    private int columnLayout;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Default(intValues = 6)
    private int imageColumnSize;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private Boolean cardBorderRequired;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String listOption;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String[] filterTags;
    @SlingObject
    private ResourceResolver resourceResolver;
    @ScriptVariable
    private PageManager pageManager;

    @PostConstruct
    protected void init() {
        if (null != links) {
            getArticlePageData();
        }
        if (contentType.equals(CONTENT_TYPE_PRODUCT)) {
            getProductPageData();
			textColumnSize = PAGE_GRID_SIZE - imageColumnSize;
        }
    }

    @Override
	public int getTextColumnSize() {
		return textColumnSize;
	}

    public void getArticlePageData() {
        for (Resource childResource : links) {
            if (null != childResource) {
                ValueMap valueMap = childResource.getValueMap();
                if (null != valueMap) {
                    String urlPath = valueMap.get(ARTICLE_PAGE, StringUtils.EMPTY) + JCR_CONTENT;
                    String articlePageURL = valueMap.get(ARTICLE_PAGE, StringUtils.EMPTY) + ".html";
                    Resource pageResource = resourceResolver.getResource(urlPath);
                    if (null != pageResource) {
                        getArticlePageMap(pageResource, articlePageURL);
                    }
                }
            }
        }
    }

    public void getProductPageData() {
        if (LIST_OPTION_PAGE_PATH.equalsIgnoreCase(listOption)) {
            filterProductPagesByPath();
        } else if (LIST_OPTION_CHILD_PAGES.equalsIgnoreCase(listOption)) {
            filterProductPagesByParentPath();
        } else {
            filterProductPagesByTags();
        }
    }

    private void filterProductPagesByTags() {
        //filter page based on tags under specified page paths.
        String currentPagePath = currentPage.getPath();
        if (productSearchLinks.isEmpty()){
            //if productSearchLinks is/are not specified, default to current page.
            productSearchLinks.add(resourceResolver.getResource(currentPagePath));
        }
        if (ArrayUtils.isNotEmpty(filterTags)) {
            TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
            for (Resource childResource : productSearchLinks) {
                ValueMap valueMap = childResource.getValueMap();
                String productSearchPath = valueMap.get(PROP_PRODUCT_SEARCH_PATH, StringUtils.EMPTY);
                if (StringUtils.isBlank(productSearchPath)) {
                    continue;
                }
                RangeIterator<Resource> taggedProductResources = tagManager.find(productSearchPath, filterTags, true);
                while (taggedProductResources.hasNext()) {
                    Resource taggedResource = taggedProductResources.next();
                    Page taggedPage = pageManager.getContainingPage(taggedResource);
                    if (taggedPage != null && !currentPagePath.equals(taggedPage.getPath())) {
                        getProductPageMap(taggedPage);
                    }
                }
            }
        }
    }

    private void filterProductPagesByParentPath() {
        //filter based on child pages.
        String currentPagePath = currentPage.getPath();
        if (StringUtils.isNotBlank(productParentPath)) {
            Page parentPage = pageManager.getPage(productParentPath);
            Iterator<Page> productPages = parentPage.listChildren(new PageFilter());
            while (productPages.hasNext()) {
                Page productPage = productPages.next();
                if (!currentPagePath.equals(productPage.getPath())) {
                    getProductPageMap(productPage);
                }
            }
        }
    }

    private void filterProductPagesByPath() {
        //filter based on page paths.
        for (Resource childResource : productLinks) {
            ValueMap valueMap = childResource.getValueMap();
            String pageUrl = valueMap.get(PROP_PRODUCT_PAGE_PATH, StringUtils.EMPTY);
            if (StringUtils.isNotBlank(pageUrl)) {
                Resource productRes = resourceResolver.getResource(pageUrl);
                Page productPage = null != productRes ? productRes.adaptTo(Page.class) : null;
                if (null != productPage) {
                    getProductPageMap(productPage);
                }
            }
        }
    }

    private void getArticlePageMap(Resource resource, String pageUrl) {
        ValueMap articlePageValues = resource.getValueMap();
        if (null != articlePageValues) {
            Map<String, String> map = new HashMap<>();
            map.put("URL", pageUrl);
            map.put(TITLE_STRING, getValue(articlePageValues,ARTICLE_SUBTITLE));
            map.put(DESCRIPTION_STRING, getValue(articlePageValues,ARTICLE_DESCRIPTION));
            map.put("date", articlePageValues.get(ARTICLE_DATE, StringUtils.EMPTY));            
            getImageProperties(resource);
            map.put("imageUrl", imageURL);
            map.put("altText", altText);
            articleDetails.add(map);
        }
    }

    private void getProductPageMap(Page productPage) {
        Map<String, String> map = new HashMap<>();
        ValueMap pageProperties = productPage.getProperties();
        String title = pageProperties.get(PRODUCT_TITLE, productPage.getPageTitle());
        String productDesc = pageProperties.get(PROP_OG_DESC, productPage.getDescription());
        //get product image from product page.
        Resource image = productPage.getContentResource(PRODUCT_IMAGE);
        String imageUrl = StringUtils.EMPTY;
        String productImageAltText = StringUtils.EMPTY;
        if (image == null) {
            //use thumbnail image when product image is not available.
            image = productPage.getContentResource(IMAGE_STRING);
        }
        if (image != null) {
            Image productImage = new Image(image);
            imageUrl = productImage.getFileReference();
            productImageAltText = productImage.getAlt();
        }
        map.put(TITLE_STRING, title);
        map.put(DESCRIPTION_STRING, productDesc);
		//use ogImage if both thumbnail and product images are not available.
        map.put(IMAGE_STRING, StringUtils.isNotBlank(imageUrl) ? imageUrl : pageProperties.get(PROP_OG_IMAGE, String.class));
		//use page title as alt text if image doesn't have an alt text.
        map.put(ALT, StringUtils.isNotBlank(productImageAltText) ? productImageAltText : productPage.getTitle());
        map.put(URL_STRING, PlatformUtil.ensureProperLink(productPage.getPath()));
        productDetails.add(map);
    }

    private void getImageProperties(Resource resource) {
        String pagePath = resource.getPath() + PATH_DELIMITER + ROOT_PATH;
        Resource pageResource = resourceResolver.getResource(pagePath);
        if (null != pageResource) {
            Iterator<Resource> resnodes = pageResource.listChildren();
            while (resnodes.hasNext()) {
                Resource child = resnodes.next();
                if (child.getName().contains(CONTAINER)) {
                    String childPath = child.getPath() + IMAGE;
                    Resource imageResource = resourceResolver.getResource(childPath);
                    if (null != imageResource) {
                        ValueMap imageData = imageResource.getValueMap();
                        if (null != imageData) {
                            imageURL = imageData.get(FILE_REFERENCE, StringUtils.EMPTY);
                            altText = imageData.get(ALT, StringUtils.EMPTY);
                        }
                    }
                }
            }
        }
    }

     
    public String getValue(ValueMap articlePageValues,String key) {		
		String value=null;
		if(null !=articlePageValues) {
		 value =articlePageValues.get(key, StringUtils.EMPTY);
		 	if(StringUtils.isNotEmpty(value)) {
		 		value= value.replaceAll("<[^>]++>", "");
		 		return value;
		 	}
			}
		return value;	
	}
}
