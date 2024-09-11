package com.abbott.aem.an.abbottstore.models;

import com.day.cq.commons.RangeIterator;
import com.day.cq.search.Predicate;
import com.day.cq.search.SimpleSearch;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.designer.Style;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.jcr.RepositoryException;
import java.util.*;

/**
 * The Class ListModel.
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterLinkListModel extends UrlServiceModel{

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(FooterLinkListModel.class);

	/** The Constant LIMIT_DEFAULT. */
	private static final int LIMIT_DEFAULT = 100;

	/** The Constant SHOW_DESCRIPTION_DEFAULT. */
	private static final boolean SHOW_DESCRIPTION_DEFAULT = false;

	/** The Constant SHOW_MODIFICATION_DATE_DEFAULT. */
	private static final boolean SHOW_MODIFICATION_DATE_DEFAULT = false;

	/** The Constant LINK_ITEMS_DEFAULT. */
	private static final boolean LINK_ITEMS_DEFAULT = false;

	/** The Constant PN_DEPTH_DEFAULT. */
	private static final int PN_DEPTH_DEFAULT = 1;

	/** The Constant PN_DATE_FORMAT_DEFAULT. */
	private static final String PN_DATE_FORMAT_DEFAULT = "yyyy-MM-dd";

	/** The Constant TAGS_MATCH_ANY_VALUE. */
	private static final String TAGS_MATCH_ANY_VALUE = "any";

	/** The Constant PN_SOURCE. */
	private static final String PN_SOURCE = "listFrom";

	/** The Constant PN_PARENT_PAGE. */
	private static final String PN_PARENT_PAGE = "parentPage";

	/** The Constant PN_TAGS_PARENT_PAGE. */
	private static final String PN_TAGS_PARENT_PAGE = "tagsSearchRoot";

	/** The Constant PN_TAGS. */
	private static final String PN_TAGS = "tags";

	/** The Constant PN_TAGS_MATCH. */
	private static final String PN_TAGS_MATCH = "tagsMatch";

	/** The Constant PN_SHOW_DESCRIPTION. */
	private static final String PN_SHOW_DESCRIPTION = "showDescription";

	/** The Constant PN_SHOW_MODIFICATION_DATE. */
	private static final String PN_SHOW_MODIFICATION_DATE = "showModificationDate";

	/** The Constant PN_LINK_ITEMS. */
	private static final String PN_LINK_ITEMS = "linkItems";

	/** The Constant PN_SEARCH_IN. */
	private static final String PN_SEARCH_IN = "searchIn";

	/** The Constant PN_SORT_ORDER. */
	private static final String PN_SORT_ORDER = "sortOrder";

	/** The Constant PN_ORDER_BY. */
	private static final String PN_ORDER_BY = "orderBy";

	/** The Constant PN_DATE_FORMAT. */
	private static final String PN_DATE_FORMAT = "dateFormat";



	/** The Constant CLASS_TYPE_LINK_MODEL. */
	private static final String CLASS_TYPE_LINK_MODEL = "LinkModel";

	/** The Constant CLASS_TYPE_PAGE. */
	private static final String CLASS_TYPE_PAGE = "Page";

	/** The Constant CLASS_TYPE_LIST_CHILD_PAGE. */
	private static final String CLASS_TYPE_LIST_CHILD_PAGE = "ListChildPage";


	/** The properties. */
	@ScriptVariable
	private ValueMap properties;

	/** The current style. */
	@ScriptVariable
	private Style currentStyle;

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The resource. */
	@SlingObject
	private Resource resource;

	/** The request. */
	@Self
	private SlingHttpServletRequest request;

	/** The limit. */
	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Default(intValues = LIMIT_DEFAULT)
	private int limit;

	/** The child depth. */
	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Default(intValues = PN_DEPTH_DEFAULT)
	private int childDepth;

	/** The query. */
	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Default(values = StringUtils.EMPTY)
	private String query;

	/** The max items. */
	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Default(intValues = 0)
	private int maxItems;

	/** The footer links res. */
	@ChildResource(name = "footerLinks", injectionStrategy = InjectionStrategy.OPTIONAL)
	private Resource footerLinksRes;

	/** The title */
	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	private String title;

	/** The start in. */
	private String startIn;

	/** The sort order. */
	private SortOrder sortOrder;

	/** The order by. */
	private OrderBy orderBy;

	/** The date format string. */
	private String dateFormatString;

	/** The show description. */
	private boolean showDescription;

	/** The show modification date. */
	private boolean showModificationDate;

	/** The link items. */
	private boolean linkItems;


	/** The page manager. */
	private PageManager pageManager;

	/** The list items. */
	protected List<Object> listItems;

	/** The parent link. */
	@ValueMapValue
	private String parentLink;

	private String listFromValue;

	/**
	 * Inits the model.
	 */
	@PostConstruct
	private void initModel() {
		pageManager = resourceResolver.adaptTo(PageManager.class);
		readProperties();
	}

	/**
	 * Read properties.
	 */
	private void readProperties() {
		// read edit config properties
		startIn = properties.get(PN_SEARCH_IN, currentPage.getPath());
		sortOrder = SortOrder.fromString(properties.get(PN_SORT_ORDER, SortOrder.ASC.value));
		orderBy = OrderBy.fromString(properties.get(PN_ORDER_BY, StringUtils.EMPTY));

		// read design config properties
		showDescription = properties.get(PN_SHOW_DESCRIPTION,
				currentStyle.get(PN_SHOW_DESCRIPTION, SHOW_DESCRIPTION_DEFAULT));
		showModificationDate = properties.get(PN_SHOW_MODIFICATION_DATE,
				currentStyle.get(PN_SHOW_MODIFICATION_DATE, SHOW_MODIFICATION_DATE_DEFAULT));
		linkItems = properties.get(PN_LINK_ITEMS, currentStyle.get(PN_LINK_ITEMS, LINK_ITEMS_DEFAULT));
		dateFormatString = properties.get(PN_DATE_FORMAT, currentStyle.get(PN_DATE_FORMAT, PN_DATE_FORMAT_DEFAULT));

	}

	/**
	 * Gets the items.
	 *
	 * @return the items
	 */
	public List<Object> getItems() {
		if (listItems == null) {
			Source listType = getListType();
			populateListItems(listType);
		}
		return listItems;
	}

	/**
	 * Link items.
	 *
	 * @return true, if successful
	 */
	public boolean linkItems() {
		return linkItems;
	}

	/**
	 * Show description.
	 *
	 * @return true, if successful
	 */
	public boolean showDescription() {
		return showDescription;
	}

	/**
	 * Show modification date.
	 *
	 * @return true, if successful
	 */
	public boolean showModificationDate() {
		return showModificationDate;
	}

	/**
	 * Gets the date format string.
	 *
	 * @return the date format string
	 */
	public String getDateFormatString() {
		return dateFormatString;
	}


	/**
	 * Gets the heading.
	 *
	 * @return the heading
	 */
	public String getHeading() {
		return title;
	}

	/**
	 * Gets the exported type.
	 *
	 * @return the exported type
	 */
	public String getExportedType() {
		return resource.getResourceType();
	}

	/**
	 * Populate list items.
	 *
	 * @param listType the list type
	 */
	protected void populateListItems(Source listType) {
		switch (listType) {
		case STATIC:
			populateStaticListItems();
			break;
		case CHILDREN:
			populateChildListItems();
			break;
		case TAGS:
			populateTagListItems();
			break;
		case SEARCH:
			populateSearchListItems();
			break;

		default:
			listItems = new ArrayList<>();
			break;
		}
	}

	/**
	 * Populate child list items.
	 */
	private void populateChildListItems() {
		listItems = new ArrayList<>();
		Page rootPage = getRootPage(PN_PARENT_PAGE);
		if (rootPage != null) {
			collectChildren(rootPage.getDepth(), rootPage);
		}
		sortListItems(listItems, CLASS_TYPE_LIST_CHILD_PAGE);
		setMaxItems(listItems);
	}

	/**
	 * Collect children.
	 *
	 * @param startLevel the start level
	 * @param parent the parent
	 */
	private void collectChildren(int startLevel, Page parent) {
		Iterator<Page> childIterator = parent.listChildren();
		while (childIterator.hasNext()) {
			Page child = childIterator.next();
			ValueMap childResource= child.getContentResource().getValueMap();
			if(!childResource.containsKey("type_id") || !StringUtils.equals(childResource.get("type_id").toString(),"configurable")) {
				ListChildPage listChildPage = new ListChildPage();
				listChildPage.setTitle(child.getTitle());
				listChildPage.setPath(resourceResolver.map(child.getPath()));
				listItems.add(listChildPage);
			}
			if (child.getDepth() - startLevel < childDepth) {
				collectChildren(startLevel, child);
			}
		}
	}

	/**
	 * Populate tag list items.
	 */
	private void populateTagListItems() {
		listItems = new ArrayList<>();
		String[] tags = properties.get(PN_TAGS, new String[0]);
		boolean matchAny = properties.get(PN_TAGS_MATCH, TAGS_MATCH_ANY_VALUE).equals(TAGS_MATCH_ANY_VALUE);
		if (ArrayUtils.isNotEmpty(tags)) {
			Page rootPage = getRootPage(PN_TAGS_PARENT_PAGE);
			if (rootPage != null) {
				TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
				if (tagManager != null) {
					RangeIterator<Resource> resourceRangeIterator = tagManager.find(rootPage.getPath(), tags, matchAny);
					setListItems(resourceRangeIterator);
				}
			}
		}
		sortListItems(listItems, CLASS_TYPE_PAGE);
		setMaxItems(listItems);
	}

	/**
	 * Sets the list items.
	 *
	 * @param resourceRangeIterator the new list items
	 */
	private void setListItems(RangeIterator<Resource> resourceRangeIterator) {
		if (resourceRangeIterator != null) {
			while (resourceRangeIterator.hasNext()) {
				Page containingPage = pageManager.getContainingPage(resourceRangeIterator.next());
				if (containingPage != null && !StringUtils.equals(containingPage.getPath(), currentPage.getPath())
						&& StringUtils.equals(containingPage.getContentResource().getResourceType(),
								"abbott/components/content/list")) {
					listItems.add(containingPage);
				}
			}
		}
	}

	/**
	 * Populate search list items.
	 */
	private void populateSearchListItems() {
		if (!StringUtils.isBlank(query)) {
			SimpleSearch search = resource.adaptTo(SimpleSearch.class);
			if (search != null) {
				search.setQuery(query);
				search.setSearchIn(startIn);
				search.addPredicate(new Predicate("type", "type").set("type", NameConstants.NT_PAGE));
				search.setHitsPerPage(limit);
				try {
					listItems = collectSearchResults(search.getResult());
				} catch (RepositoryException e) {
					LOGGER.error("Unable to retrieve search results for query.", e);
				}
			}
		}
		sortListItems(listItems, CLASS_TYPE_PAGE);
		setMaxItems(listItems);
	}

	/**
	 * Collect search results.
	 *
	 * @param result the result
	 * @return the list
	 * @throws RepositoryException the repository exception
	 */
	private List<Object> collectSearchResults(SearchResult result) throws RepositoryException {
		List<Object> searchResults = new LinkedList<>();
		for (Hit hit : result.getHits()) {
			Page containingPage = pageManager.getContainingPage(hit.getResource());
			if (containingPage != null) {
				searchResults.add(containingPage);
			}
		}
		return searchResults;
	}

	/**
	 * Gets the list type.
	 *
	 * @return the list type
	 */
	protected Source getListType() {
		listFromValue = properties.get(PN_SOURCE, currentStyle.get(PN_SOURCE, StringUtils.EMPTY));
		LOGGER.debug("inside getListType :: {}", listFromValue);
		return Source.fromString(listFromValue);
	}

	
	/**
	 * The Enum SortOrder.
	 */
	private enum SortOrder {

		ASC("asc"),

		DESC("desc");

		/** The value. */
		private String value;

		/**
		 * Instantiates a new sort order.
		 *
		 * @param value the value
		 */
		SortOrder(String value) {
			this.value = value;
		}

		/**
		 * From string.
		 *
		 * @param value the value
		 * @return the sort order
		 */
		public static SortOrder fromString(String value) {
			for (SortOrder s : values()) {
				if (StringUtils.equals(value, s.value)) {
					return s;
				}
			}
			return ASC;
		}
	}

	/**
	 * The Enum OrderBy.
	 */
	private enum OrderBy {

		TITLE("title"), MODIFIED("modified");

		/** The value. */
		private String value;

		/**
		 * Instantiates a new order by.
		 *
		 * @param value the value
		 */
		OrderBy(String value) {
			this.value = value;
		}

		/**
		 * From string.
		 *
		 * @param value the value
		 * @return the order by
		 */
		public static OrderBy fromString(String value) {
			for (OrderBy s : values()) {
				if (StringUtils.equals(value, s.value)) {
					return s;
				}
			}
			return null;
		}
	}

	/**
	 * The Enum Source.
	 */
	protected enum Source {

		CHILDREN("children"), STATIC("static"), SEARCH("search"), TAGS("tags"),EMPTY(StringUtils.EMPTY);

		/** The value. */
		private String value;

		/**
		 * Instantiates a new source.
		 *
		 * @param value the value
		 */
		Source(String value) {
			this.value = value;
		}

		/**
		 * From string.
		 *
		 * @param value the value
		 * @return the source
		 */
		public static Source fromString(String value) {
			for (Source s : values()) {
				if (StringUtils.equals(value, s.value)) {
					return s;
				}
			}
			return null;
		}
	}

	/**
	 * Gets the root page.
	 *
	 * @param fieldName the field name
	 * @return the root page
	 */
	private Page getRootPage(String fieldName) {
		String parentPath = properties.get(fieldName, currentPage.getPath());
		return pageManager.getContainingPage(resourceResolver.getResource(parentPath));
	}


	/**
	 * Gets the list from resource.
	 *
	 * @param <T> the generic type
	 * @param resource the resource
	 * @param model the model
	 * @return the list from resource
	 */
	private static  <T> List<T> getListFromResource(Resource resource, Class<T> model) {
		List<T> models = new LinkedList<>();
		if (null == resource) {
			return models;
		}
		Iterator<Resource> children = resource.listChildren();
		while (children.hasNext()) {
			Resource child = children.next();
			if (null != child) {
				models.add(child.adaptTo(model));
			}
		}
		return models;
	}


	/**
	 * Populate static list items.
	 */
	private void populateStaticListItems() {
		listItems = new LinkedList<>();
		listItems.addAll(getListFromResource(footerLinksRes, LinkModel.class));
		sortListItems(listItems, CLASS_TYPE_LINK_MODEL);
		setMaxItems(listItems);
	}

	/**
	 * Sort by.
	 *
	 * @param list the list
	 * @param classType the class type
	 */
	private void sortBy(List<Object> list, String classType) {
		Comparator<Object> orderByComparator = null;
		if (orderBy == OrderBy.MODIFIED) {
			if (classType.equals(CLASS_TYPE_PAGE)) {
				orderByComparator = (Object o1, Object o2) -> ((Page) o1).getLastModified()
						.compareTo(((Page) o2).getLastModified());
			}

		} else if (orderBy == OrderBy.TITLE) {
			if (classType.equals(CLASS_TYPE_PAGE)) {
				orderByComparator = (Object o1, Object o2) -> ((Page) o1).getTitle().compareTo(((Page) o2).getTitle());
			}else if (classType.equals(CLASS_TYPE_LINK_MODEL)) {
				orderByComparator = (Object o1, Object o2) -> ((LinkModel) o1).getTitle()
						.compareTo(((LinkModel) o2).getTitle());
			}else if (classType.equals(CLASS_TYPE_LIST_CHILD_PAGE)) {
				orderByComparator = (Object o1, Object o2) -> ((ListChildPage) o1).getTitle()
						.compareTo(((ListChildPage) o2).getTitle());
			}
		}
		if (null != orderByComparator) {
			list.sort(orderByComparator);
			if (sortOrder == SortOrder.DESC) {
				list.sort(orderByComparator.reversed());
			}
		}
	}


	/**
	 * Sort list items.
	 *
	 * @param list the list
	 * @param classTypeCtaTile the class type cta tile
	 */
	private void sortListItems(List<Object> list, String classTypeCtaTile) {
		if (null != orderBy && null != list && !list.isEmpty()) {
			for (Object item : list) {
				if (orderBy == OrderBy.TITLE) {
					if (classTypeCtaTile.equals(CLASS_TYPE_LINK_MODEL)
							&& StringUtils.isBlank(((LinkModel) item).getTitle())) {
						((LinkModel) item).setTitle(StringUtils.EMPTY);
					}else if (classTypeCtaTile.equals(CLASS_TYPE_LIST_CHILD_PAGE)
							&& StringUtils.isBlank(((ListChildPage) item).getTitle())) {
						((ListChildPage) item).setTitle(StringUtils.EMPTY);
					}
				}
			}
			sortBy(list, classTypeCtaTile);
		}
	}

	/**
	 * Sets the max items.
	 *
	 * @param list the new max items
	 */
	private void setMaxItems(List<Object> list) {
		if (null != list && !list.isEmpty() && maxItems != 0) {
			List<Object> tmpListItems = new ArrayList<>();
			for (Object item : list) {
				if (tmpListItems.size() < maxItems) {
					tmpListItems.add(item);
				} else {
					break;
				}
			}
			listItems = tmpListItems;
		}
	}

	/**
	 * Gets the parent link.
	 *
	 * @return the parent link
	 */
	public String getParentLink() {
		if (StringUtils.isEmpty(parentLink)){
			return "";
		}
		if(parentLink.startsWith("/content")) {
			LOGGER.debug("parentLink value ::{}",parentLink);
			return resourceResolver.map(parentLink)+".html";
		}
		return parentLink;
	}

	public String getListFromValue() {
		LOGGER.debug("List from value :: {}",listFromValue);
		return listFromValue;
	}
}
