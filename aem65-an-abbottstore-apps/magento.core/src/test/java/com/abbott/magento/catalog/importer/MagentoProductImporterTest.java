package com.abbott.magento.catalog.importer;

import static com.abbott.magento.constants.MagentoConstants.X_ORIGIN_SECRET;
import static com.abbott.magento.constants.MagentoConstants.X_ORIGIN_SECRET_VALUE;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;


import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.ValueFactory;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLStreamHandler;
import java.net.URLStreamHandlerFactory;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Response;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.catalog.connector.models.MagentoProduct;
import com.abbott.magento.catalog.connector.models.MagentoSubscriptionList;
import com.abbott.magento.services.IdentityProvider;
import com.abbott.magento.services.ProductRootCatConfigService;
import com.abbott.magento.services.ProductRootCatConfigs;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

class MagentoProductImporterTest extends MagentoProductImporter{
	private static final String CONTENT_PATH = "/content/abbott/en/path";
	private static final String AUTHORIZATION="Authorization";
	private static final String SIMILAC="similac";
	private static final String ABBOTT = "abbott";
	private static final String DEFAULT_CATEGORY="default category";
	private static final String LEVEL = "level";
	private static final String SUBSCRIPTION = "subscription";
	private static final String FLAVORS_PATH = "/content/cq:tags/abbott/abbott-flavors";
	private static final String PRODUCT_NODE = "Ensure Max Protein";
	
	String server = "https://test-server.abbott/unit-test";
	String productPath = "/rest/V1/products/con046";
	String username = "username";
	String password = "password";
	String token = "Bearer ";
	String storeServer = "https://dev-secure.abbottstore.com";
	String product ="{\r\n  \"id\": 627,\r\n  \"sku\": \"66899\",\r\n  \"name\": \"Ensure Max Protein\",\r\n  \"attribute_set_id\": 4,\r\n  \"price\": 29.97,\r\n  \"status\": 0,\r\n  \"visibility\": 4,\r\n  \"type_id\": \"simple\",\r\n  \"created_at\": \"2018-03-22 18:13:11\",\r\n  \"updated_at\": \"2023-10-19 12:44:40\",\r\n  \"weight\": 10,\r\n  \"extension_attributes\": {\r\n    \"website_ids\": [\r\n      1\r\n    ],\"configurableProductOptions\":{\r\n        \"id\":2,\r\n        \"label\":\"configured Product\",\r\n        \"values\":[{\r\n            \"value1\":23,\"value2\":43\r\n        }],\r\n        \"configurableProductLinks\":[\"link1\",\"link2\"]\r\n        },\r\n    \"category_links\": [\r\n      {\r\n        \"position\": 11,\r\n        \"category_id\": \"19\"\r\n      },\r\n      {\r\n        \"position\": 26,\r\n        \"category_id\": \"20\"\r\n      }\r\n    ],\r\n    \"stock_item\": {\r\n      \"item_id\": 684,\r\n      \"product_id\": 627,\r\n      \"stock_id\": 1,\r\n      \"qty\": 553,\r\n      \"is_in_stock\": true,\r\n      \"is_qty_decimal\": false,\r\n      \"show_default_notification_message\": false,\r\n      \"use_config_min_qty\": true,\r\n      \"min_qty\": 0,\r\n      \"use_config_min_sale_qty\": 1,\r\n      \"min_sale_qty\": 1,\r\n      \"use_config_max_sale_qty\": true,\r\n      \"max_sale_qty\": 10000,\r\n      \"use_config_backorders\": true,\r\n      \"backorders\": 2,\r\n      \"use_config_notify_stock_qty\": true,\r\n      \"notify_stock_qty\": 1,\r\n      \"use_config_qty_increments\": true,\r\n      \"qty_increments\": 0,\r\n      \"use_config_enable_qty_inc\": true,\r\n      \"enable_qty_increments\": false,\r\n      \"use_config_manage_stock\": true,\r\n      \"manage_stock\": true,\r\n      \"low_stock_date\": null,\r\n      \"is_decimal_divided\": false,\r\n      \"stock_status_changed_auto\": 0\r\n    }\r\n  },\r\n  \"product_links\": [],\r\n  \"options\": [],\r\n  \"media_gallery_entries\": [\r\n    {\r\n      \"id\": 29555,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Nutrition Shake\",\r\n      \"position\": 1,\r\n      \"disabled\": false,\r\n      \"types\": [\"image\"],\r\n      \"file\": \"/e/n/ensure-max-protein-milk-chocolate-front-new-v2_2.pdf\"\r\n    },\r\n    {\r\n      \"id\": 29558,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Milk Chocolate Shake - High Protein. Less Sugar.\",\r\n      \"position\": 2,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/e/n/ensure-max-protein-high-protein-less-sugar_sld-2_2_2.jpg\"\r\n    }\r\n  ],\r\n  \"tier_prices\": [\r\n    {\r\n      \"customer_group_id\": 1,\r\n      \"qty\": 1,\r\n      \"value\": 29.97,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 3,\r\n      \"qty\": 1,\r\n      \"value\": 17.98,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    }\r\n    \r\n  ],\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"product_flavor\",\r\n      \"value\": \"Milk Chocolate\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_status\",\r\n      \"value\": \"1\"\r\n    },{\r\n      \"attribute_code\": \"url_key\",\r\n      \"value\": \"ensure-max-protein-nutrition\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"parent_sku\",\r\n      \"value\": \"con046\"\r\n    },\r\n     {\r\n      \"attribute_code\": \"size_or_weight\",\r\n      \"value\": \"null\"\r\n    },{\r\n      \"attribute_code\": \"aw_sarp2_subscription_options\",\r\n      \"value\": [\r\n        {\r\n          \"option_id\": \"9473\",\r\n          \"plan_id\": \"2\",\r\n          \"product_id\": \"627\",\r\n          \"website_id\": \"1\",\r\n          \"initial_fee\": \"0.0000\",\r\n          \"trial_price\": \"0.0000\",\r\n          \"regular_price\": null,\r\n          \"is_auto_trial_price\": \"0\",\r\n          \"is_auto_regular_price\": \"1\"\r\n        },{\r\n          \"option_id\": \"9476\",\r\n          \"plan_id\": \"3\",\r\n          \"product_id\": \"627\",\r\n          \"website_id\": \"1\",\r\n          \"initial_fee\": \"0.0000\",\r\n          \"trial_price\": \"0.0000\",\r\n          \"regular_price\": null,\r\n          \"is_auto_trial_price\": \"0\",\r\n          \"is_auto_regular_price\": \"1\"\r\n        }\r\n        \r\n        ]\r\n        \r\n    },{\r\n      \"attribute_code\": \"thumbnail\",\r\n      \"value\": \"/e/n/ensure-max-protein-milk-chocolate-front-new-v2.jpg\"\r\n    },{\r\n      \"attribute_code\": \"case_of_product\",\r\n      \"value\": \"null\"\r\n    },{\r\n        \"attribute_code\":\"mmrf_link\",\"value\":\"Similac_PM_Form_2.pdf\"},{\r\n      \"attribute_code\": \"aw_sarp2_subscription_type\",\r\n      \"value\": \"2\"\r\n    },{\r\n      \"attribute_code\": \"description\",\r\n      \"value\": \"<ul>\\r\\n<li>30g PROTEIN: Each shake has 30g of high-quality protein\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"category_ids\",\r\n      \"value\": [\r\n        \"19\",\r\n        \"20\",\r\n        \"208\",\r\n        \"218\",\r\n        \"328\"\r\n      ]}\r\n]\r\n}\r\n\r\n    ";
    String deletedProduct = "{\r\n  \"id\": 627,\r\n  \"sku\": \"66899\",\r\n  \"name\": \"Ensure Max Protein\",\r\n  \"attribute_set_id\": 4,\r\n  \"price\": 29.97,\r\n  \"status\": 0,\r\n  \"visibility\": 4,\r\n  \"type_id\": \"simple\",\r\n  \"created_at\": \"2018-03-22 18:13:11\",\r\n  \"updated_at\": \"2023-10-19 12:44:40\",\r\n  \"weight\": 10,\r\n  \"extension_attributes\": {\r\n    \"website_ids\": [\r\n      1\r\n    ],\r\n    \"category_links\": [\r\n      {\r\n        \"position\": 11,\r\n        \"category_id\": \"19\"\r\n      },\r\n      {\r\n        \"position\": 26,\r\n        \"category_id\": \"20\"\r\n      }\r\n    ],\r\n    \"stock_item\": {\r\n      \"item_id\": 684,\r\n      \"product_id\": 627,\r\n      \"stock_id\": 1,\r\n      \"qty\": 553,\r\n      \"is_in_stock\": true,\r\n      \"is_qty_decimal\": false,\r\n      \"show_default_notification_message\": false,\r\n      \"use_config_min_qty\": true,\r\n      \"min_qty\": 0,\r\n      \"use_config_min_sale_qty\": 1,\r\n      \"min_sale_qty\": 1,\r\n      \"use_config_max_sale_qty\": true,\r\n      \"max_sale_qty\": 10000,\r\n      \"use_config_backorders\": true,\r\n      \"backorders\": 2,\r\n      \"use_config_notify_stock_qty\": true,\r\n      \"notify_stock_qty\": 1,\r\n      \"use_config_qty_increments\": true,\r\n      \"qty_increments\": 0,\r\n      \"use_config_enable_qty_inc\": true,\r\n      \"enable_qty_increments\": false,\r\n      \"use_config_manage_stock\": true,\r\n      \"manage_stock\": true,\r\n      \"low_stock_date\": null,\r\n      \"is_decimal_divided\": false,\r\n      \"stock_status_changed_auto\": 0\r\n    }\r\n  },\r\n  \"product_links\": [],\r\n  \"options\": [],\r\n  \"media_gallery_entries\": [\r\n    {\r\n      \"id\": 29555,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Nutrition Shake\",\r\n      \"position\": 1,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/e/n/ensure-max-protein-milk-chocolate-front-new-v2_2.jpg\"\r\n    },\r\n    {\r\n      \"id\": 29558,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Milk Chocolate Shake - High Protein. Less Sugar.\",\r\n      \"position\": 2,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/e/n/ensure-max-protein-high-protein-less-sugar_sld-2_2_2.jpg\"\r\n    }\r\n  ],\r\n  \"tier_prices\": [\r\n    {\r\n      \"customer_group_id\": 1,\r\n      \"qty\": 1,\r\n      \"value\": 29.97,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 3,\r\n      \"qty\": 1,\r\n      \"value\": 17.98,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    }\r\n    \r\n  ],\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"product_flavor\",\r\n      \"value\": \"Milk Chocolate\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_status\",\r\n      \"value\": \"0\"\r\n    },{\r\n      \"attribute_code\": \"url_key\",\r\n      \"value\": \"\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"parent_sku\",\r\n      \"value\": \"con046\"\r\n    },\r\n     {\r\n      \"attribute_code\": \"size_or_weight\",\r\n      \"value\": \"null\"\r\n    },{\r\n      \"attribute_code\": \"aw_sarp2_subscription_options\",\r\n      \"value\": [\r\n        {\r\n          \"option_id\": \"9473\",\r\n          \"plan_id\": \"2\",\r\n          \"product_id\": \"627\",\r\n          \"website_id\": \"1\",\r\n          \"initial_fee\": \"0.0000\",\r\n          \"trial_price\": \"0.0000\",\r\n          \"regular_price\": null,\r\n          \"is_auto_trial_price\": \"0\",\r\n          \"is_auto_regular_price\": \"1\"\r\n        },{\r\n          \"option_id\": \"9476\",\r\n          \"plan_id\": \"3\",\r\n          \"product_id\": \"627\",\r\n          \"website_id\": \"1\",\r\n          \"initial_fee\": \"0.0000\",\r\n          \"trial_price\": \"0.0000\",\r\n          \"regular_price\": null,\r\n          \"is_auto_trial_price\": \"0\",\r\n          \"is_auto_regular_price\": \"1\"\r\n        }\r\n        \r\n        ]\r\n        \r\n    },{\r\n      \"attribute_code\": \"thumbnail\",\r\n      \"value\": \"/e/n/ensure-max-protein-milk-chocolate-front-new-v2.jpg\"\r\n    },{\r\n      \"attribute_code\": \"case_of_product\",\r\n      \"value\": \"null\"\r\n    },{\r\n        \"attribute_code\":\"mmrf_link\",\"value\":\"Similac_PM_Form_1.pdf\"},{\r\n        \"attribute_code\":\"mmrf_link\",\"value\":\"Similac_PM_Form_2.pdf\"},{\r\n      \"attribute_code\": \"aw_sarp2_subscription_type\",\r\n      \"value\": \"2\"\r\n    },{\r\n      \"attribute_code\": \"description\",\r\n      \"value\": \"<ul>\\r\\n<li>30g PROTEIN: Each shake has 30g of high-quality protein\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"category_ids\",\r\n      \"value\": [\r\n        \"19\",\r\n        \"20\",\r\n        \"208\",\r\n        \"218\",\r\n        \"328\"\r\n      ]},{\r\n  \"id\": 627,\r\n  \"sku\": \"66899\",\r\n  \"name\": \"Ensure Max Protein\",\r\n  \"attribute_set_id\": 4,\r\n  \"price\": 29.97,\r\n  \"status\": 0,\r\n  \"visibility\": 4,\r\n  \"type_id\": \"simple\",\r\n  \"created_at\": \"2018-03-22 18:13:11\",\r\n  \"updated_at\": \"2023-10-19 12:44:40\",\r\n  \"weight\": 10,\r\n  \"extension_attributes\": {\r\n    \"website_ids\": [\r\n      1\r\n    ],\r\n    \"category_links\": [\r\n      {\r\n        \"position\": 11,\r\n        \"category_id\": \"19\"\r\n      },\r\n      {\r\n        \"position\": 26,\r\n        \"category_id\": \"20\"\r\n      }\r\n    ],\r\n    \"stock_item\": {\r\n      \"item_id\": 684,\r\n      \"product_id\": 627,\r\n      \"stock_id\": 1,\r\n      \"qty\": 553,\r\n      \"is_in_stock\": true,\r\n      \"is_qty_decimal\": false,\r\n      \"show_default_notification_message\": false,\r\n      \"use_config_min_qty\": true,\r\n      \"min_qty\": 0,\r\n      \"use_config_min_sale_qty\": 1,\r\n      \"min_sale_qty\": 1,\r\n      \"use_config_max_sale_qty\": true,\r\n      \"max_sale_qty\": 10000,\r\n      \"use_config_backorders\": true,\r\n      \"backorders\": 2,\r\n      \"use_config_notify_stock_qty\": true,\r\n      \"notify_stock_qty\": 1,\r\n      \"use_config_qty_increments\": true,\r\n      \"qty_increments\": 0,\r\n      \"use_config_enable_qty_inc\": true,\r\n      \"enable_qty_increments\": false,\r\n      \"use_config_manage_stock\": true,\r\n      \"manage_stock\": true,\r\n      \"low_stock_date\": null,\r\n      \"is_decimal_divided\": false,\r\n      \"stock_status_changed_auto\": 0\r\n    }\r\n  },\r\n  \"product_links\": [],\r\n  \"options\": [],\r\n  \"media_gallery_entries\": [\r\n    {\r\n      \"id\": 29555,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Nutrition Shake\",\r\n      \"position\": 1,\r\n      \"disabled\": false,\r\n      \"types\": [\"image\"],\r\n      \"file\": \"/e/n/ensure-max-protein-milk-chocolate-front-new-v2_2.jpg\"\r\n    },\r\n    {\r\n      \"id\": 29558,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Milk Chocolate Shake - High Protein. Less Sugar.\",\r\n      \"position\": 2,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/e/n/ensure-max-protein-high-protein-less-sugar_sld-2_2_2.jpg\"\r\n    }\r\n  ],\r\n  \"tier_prices\": [\r\n    {\r\n      \"customer_group_id\": 1,\r\n      \"qty\": 1,\r\n      \"value\": 29.97,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 3,\r\n      \"qty\": 1,\r\n      \"value\": 17.98,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    }\r\n    \r\n  ],\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"parent_sku\",\r\n      \"value\": \"con046\"\r\n    }, {\r\n      \"attribute_code\": \"category_ids\",\r\n      \"value\": [\r\n        \"19\",\r\n        \"20\",\r\n        \"208\",\r\n        \"218\",\r\n        \"328\"\r\n      ]\r\n    }\r\n     ]\r\n}\r\n     ]\r\n}\r\n";
    String productData =  "{\r\n  \"id\": 1152,\r\n  \"sku\": \"64719e-1\",\r\n  \"name\": \"Similac® Alimentum®§§\",\r\n  \"attribute_set_id\": 4,\r\n  \"price\": 38.16,\r\n  \"status\": 2,\r\n  \"visibility\": 4,\r\n  \"type_id\": \"configurable\",\r\n  \"created_at\": \"2020-04-20 15:52:02\",\r\n  \"updated_at\": \"2023-03-01 11:07:20\",\r\n  \"weight\": 2,\r\n  \"extension_attributes\": {\r\n    \"website_ids\": [\r\n      1,\r\n      3\r\n    ],\r\n    \"category_links\": [\r\n      {\r\n        \"position\": 317,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 171,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 10,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 17,\r\n        \"category_id\": \"45\"\r\n      }\r\n    ],\r\n    \"stock_item\": {\r\n      \"item_id\": 8601,\r\n      \"product_id\": 1152,\r\n      \"stock_id\": 1,\r\n      \"qty\": 0,\r\n      \"is_in_stock\": false,\r\n      \"is_qty_decimal\": false,\r\n      \"show_default_notification_message\": false,\r\n      \"use_config_min_qty\": true,\r\n      \"min_qty\": 0,\r\n      \"use_config_min_sale_qty\": 1,\r\n      \"min_sale_qty\": 1,\r\n      \"use_config_max_sale_qty\": true,\r\n      \"max_sale_qty\": 10000,\r\n      \"use_config_backorders\": true,\r\n      \"backorders\": 2,\r\n      \"use_config_notify_stock_qty\": true,\r\n      \"notify_stock_qty\": 1,\r\n      \"use_config_qty_increments\": true,\r\n      \"qty_increments\": 0,\r\n      \"use_config_enable_qty_inc\": true,\r\n      \"enable_qty_increments\": false,\r\n      \"use_config_manage_stock\": true,\r\n      \"manage_stock\": true,\r\n      \"low_stock_date\": \"2023-03-01 11:07:20\",\r\n      \"is_decimal_divided\": false,\r\n      \"stock_status_changed_auto\": 0\r\n    }\r\n  },\r\n  \"product_links\": [],\r\n  \"options\": [],\r\n  \"media_gallery_entries\": [\r\n    {\r\n      \"id\": 5574,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum\",\r\n      \"position\": 0,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-64719e-19-8-oz-powder-front_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5580,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Start feeling better today, within 24 hours\",\r\n      \"position\": 3,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-start-feeling-better-today_3.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5583,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Easy-to-digest hypoallergenic formula\",\r\n      \"position\": 4,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-easy-to-digest_1_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5586,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Number 1 pediatrician recommended brands based on combined recommendations of Similac and EleCare\",\r\n      \"position\": 5,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-recommended-brands_3.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5589,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac StrongMoms Rewards, Get up to $400 in rewards, visit similac.com/saveonalimentum to sign up and save. Offers may vary\",\r\n      \"position\": 6,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-strongmoms-offer_1_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5577,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\",\r\n      \"position\": 7,\r\n      \"disabled\": true,\r\n      \"types\": [\r\n        \"image\",\r\n        \"small_image\",\r\n        \"thumbnail\"\r\n      ],\r\n      \"file\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    }\r\n  ],\r\n  \"tier_prices\": [\r\n    {\r\n      \"customer_group_id\": 1,\r\n      \"qty\": 1,\r\n      \"value\": 43.49,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 2,\r\n      \"qty\": 1,\r\n      \"value\": 26.09,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 3,\r\n      \"qty\": 1,\r\n      \"value\": 26.09,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    }\r\n  ],\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"product_flavor\",\r\n      \"value\": \"Infant Formula\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"glucerna_funnel_index\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_subscription\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"image\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"url_key\",\r\n      \"value\": \"alimentum-19-8ozcan-64719e-1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"gift_message_available\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"allow_trial\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aw_sarp2_subscription_type\",\r\n      \"value\": \"3\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"description\",\r\n      \"value\": \"<p>For food allergies and colic symptoms due to protein sensitivity.</p>\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"small_image\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"options_container\",\r\n      \"value\": \"container2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"gift_wrapping_available\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"parent_sku\",\r\n      \"value\": \"con033\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aw_sarp2_subscription_options\",\r\n      \"value\": []\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_title\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder / 19.8 oz can \"\r\n    },\r\n    {\r\n      \"attribute_code\": \"subscribe_customer_group\",\r\n      \"value\": \"0,1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_keyword\",\r\n      \"value\": \"similac alimentum, hypoallergenic bay formula, formula for babies with colic, formula for infants with protein sensitivity\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"size\",\r\n      \"value\": \"5857\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"jet_product_status\",\r\n      \"value\": \"not_uploaded\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_description\",\r\n      \"value\": \"Similac Alimentum is a nutritionally complete, hypoallergenic formula for infants, including those with colic symptoms due to protein sensitivity. Alimentum starts reducing colic symptoms due to protein sensitivity within 24 hours in most infants\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"msrp_display_actual_price_type\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"order_on_call\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_url\",\r\n      \"value\": \"/infant-and-child/similac/similac-alimentum/similac-alimentum-infant-formula-powder/alimentum-19-8ozcan-64719e-1.html\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"tax_class_id\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"dam_images\",\r\n      \"value\": \"/content/dam/abbott/images/64719e-1/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"required_options\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"one_time\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"has_options\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_form\",\r\n      \"value\": \"Powder\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"image_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"category_ids\",\r\n      \"value\": [\r\n        \"45\",\r\n        \"58\",\r\n        \"63\",\r\n        \"206\"\r\n      ]\r\n    },\r\n    {\r\n      \"attribute_code\": \"small_image_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"size_or_weight\",\r\n      \"value\": \"19.8 oz\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"thumbnail_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_name_flavour\",\r\n      \"value\": \"Similac Alimentum Infant Formula Powder\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_rush\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_returnable\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_recurring\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"mst_search_weight\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_featured\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_hazardous\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"group_size\",\r\n      \"value\": \"64719,64719e,64715e,64715\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"sub_brand\",\r\n      \"value\": \"Similac Alimentum\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"case_of_product\",\r\n      \"value\": \"null\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_status\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_y\",\r\n      \"value\": \"SELECT 3 CANS\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"brand\",\r\n      \"value\": \"Similac\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"brand_name\",\r\n      \"value\": \"Similac\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_x\",\r\n      \"value\": \"SELECT 6 CANS\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"custom_discount\",\r\n      \"value\": \"10\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"metabolic_state\",\r\n      \"value\": \"null\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"forms\",\r\n      \"value\": \"6807\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"active\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"rma_able\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"avalara_tax_id\",\r\n      \"value\": \"PF050001\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_y_min_update\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_x_max_update\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_sold_qty\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"amazon_purchase\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"plans\",\r\n      \"value\": \"7209\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_gpas\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_family_order\",\r\n      \"value\": \"10000\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"order_in_family\",\r\n      \"value\": \"10000\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_recurring_discount\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"disable_sale\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"threshold\",\r\n      \"value\": \"0\"\r\n    }\r\n  ]\r\n}\r\n    ";
   	String subscribed = "{\n    \"items\":[{\"name\":\"subscribed1\",\"planId\":\"plan1\",\"regularpricePatternpercent\":\"100\"}\n        ]\n}";
    private MagentoConnectorService service = new MagentoConnectorService(server,username,password);

	MagentoProductImporter importer = new MagentoProductImporter();
	MagentoProductImporter importerwithService = new MagentoProductImporter(service);
	private ObjectMapper mapper = new ObjectMapper();
	public MockHttpUrlStreamHandler mockHttpUrlStreamHandler;
	
	@Mock
	MagentoConnectorService mockedService ;
	@Mock
	IdentityProvider magentoIdentityProvider;
	@Mock
	private ResourceResolverFactory resourceResolverFactory;
	@Mock
	ProductRootCatConfigs configs;
	@Mock
	ProductRootCatConfigService productRootCatConfigService;
	@Mock
	QueryBuilder queryBuilder;
	@Mock
	Session session;
	@Mock
	ResourceResolver resourceResolver;
	@Mock
	Resource resource;
	@Mock
	TagManager tagManager;
	@Mock
	Tag tag;
	@Mock
	PageManager pageManager;
	@Mock
	Page page;
	@Mock
	Node node;
	@Mock
	NodeIterator nodeItr;
	@Mock
	ModifiableValueMap mvp;
	@Mock
	AssetManager assetMgr;
	@Mock
	URLConnection urlConnection;
	@Mock
	HttpURLConnection httpURLConnection;
	@Mock
	URLStreamHandlerFactory urlStreamHandlerFactory;
	@Mock
	Replicator replicator;
	@Mock
	Config config;
    @Mock
	Query query;
	@Mock
	SearchResult result;
    @Mock 
    ValueMap vmp;
    @Mock
    ValueFactory valueFactory;
    @Mock
    ModifiableValueMap tagProperties;
    @Mock
    Response apiResponse;
    @Mock
    Request reqGet;
    @Mock
	Content content;
    List<Hit> hits = new ArrayList<>();
	Hit hit1 = mock(Hit.class);
	
	@BeforeEach
	void setUp() throws ClientProtocolException, IOException, RepositoryException {
		MockitoAnnotations.openMocks(this);
		mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		 when(reqGet.addHeader(AUTHORIZATION,token)).thenReturn(reqGet);
		 when(reqGet.addHeader(X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE)).thenReturn(reqGet);
		 when(reqGet.execute()).thenReturn(apiResponse);
		 when(apiResponse.returnContent()).thenReturn(content);
		 when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		 when(tag.adaptTo(Resource.class)).thenReturn(resource);
		 when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(tagProperties);
		 when(resourceResolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);
		 when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		 when(queryBuilder.createQuery(any(PredicateGroup.class), any(Session.class))).thenReturn(query);
		 when(query.getResult()).thenReturn(result);
		 when(result.getHits()).thenReturn(hits);
		 when(hit1.getProperties()).thenReturn(vmp);
		 when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		 when(productRootCatConfigService.getDefaultCategory()).thenReturn(DEFAULT_CATEGORY);
		 when(page.getPath()).thenReturn(CONTENT_PATH);
		 when(page.getContentResource()).thenReturn(resource);
			
		 importerwithService.bindReplicator(replicator);
		 importerwithService.bindMagentoIdentityProvider(magentoIdentityProvider);
		 importerwithService.bindConfigurationFactory(productRootCatConfigService);
			
	}
	
	private void buildNode() throws RepositoryException {
		when(resource.adaptTo(Node.class)).thenReturn(node);
        when(node.addNode(SUBSCRIPTION)).thenReturn(node);
		when(node.addNode("configured-product")).thenReturn(node);
		when(node.hasNode("subscription-week")).thenReturn(true);
		when(node.getNode("subscription-week")).thenReturn(node);
		when(node.getSession()).thenReturn(session);
        when(node.getNodes()).thenReturn(nodeItr);
		when(nodeItr.hasNext()).thenReturn(true,false);
		when(nodeItr.nextNode()).thenReturn(node);
		when(node.getName()).thenReturn("size");
		when(node.getName()).thenReturn("flavor");
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
	}

	@Test
	void testRespondWithMessages() throws IOException {
    	SlingHttpServletResponse response = mock(SlingHttpServletResponse.class);
		String summary = "test summary";
		PrintWriter pw = mock(PrintWriter.class);
		when(response.getWriter()).thenReturn(pw);
        importer.respondWithMessages(response, summary);
	}

	@Test
	void testProcessCustomVariationsTagsMetadata() throws ClientProtocolException,IOException{
		 String sizePath = "/content/cq:tags/abbott/abbott-sizes";
		 String value = "flavors";
		 List<HashMap<String,Object>> sizemap = new ArrayList<>();
		 HashMap<String,Object> map1 = new HashMap<>();
		 map1.put("size", 10);
		 sizemap.add(map1);
		 try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			when(content.asString()).thenReturn("test product variant");
			requestGet.when(()-> Request.Get(server+"/rest/V1/products/attributes/flavors/options" )).thenReturn(reqGet);
			importerwithService.processCustomVariationsTagsMetadata(resourceResolver,value,sizePath,token);
		 }
	
	}
	
	@Test
	void testProcessSubscriptionTags() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(subscribed);
			 requestGet.when(()-> Request.Get(server+"/rest/V1/awSarp2/plan/search/?searchCriteria[filter_groups][0][filters][0][field]=plan_id&searchCriteria[filter_groups][0][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][condition_type]=gteq" )).thenReturn(reqGet);
			 when(tagManager.resolve("/content/cq:tags/abbott/abbott-subscription/plan1")).thenReturn(tag);
			 importerwithService.processCustomVariationsTagsMetadata(resourceResolver,SUBSCRIPTION,FLAVORS_PATH,token,service);
		}
	}
	@Test
	void testProcessSubscriptionTagsException() throws ClientProtocolException, IOException, InvalidTagFormatException {
			 MagentoSubscriptionList magentoSubscriptionList = mapper.readValue(subscribed,MagentoSubscriptionList.class);
			 when(mockedService.getAbbottSubscriptionVariationCategories(token)).thenReturn(magentoSubscriptionList);
			 doThrow(new InvalidTagFormatException("invalidTagFormatException")).when(tagManager).createTag("/content/cq:tags/abbott/abbott-subscription/plan1", "plan1", "");
			 importerwithService.processCustomVariationsTagsMetadata(resourceResolver,SUBSCRIPTION,FLAVORS_PATH,token,mockedService);
		
	}
	
	@Test
	void testCreateAbbottCustomVariationTags() throws ClientProtocolException, IOException {

		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn("[\n{\n    \"value\":1,\n    \"label\":\"size\"\n    \n}\n    ]\n");
			 requestGet.when(()-> Request.Get(server+"/rest/V1/products/attributes/size/options" )).thenReturn(reqGet);
			 when(tagManager.resolve("/content/cq:tags/abbott/abbott-flavors/1")).thenReturn(tag);
			 importerwithService.processCustomVariationsTagsMetadata(resourceResolver,"size",FLAVORS_PATH,token,service);
		}
	}
	
	@Test
	void testCreateAbbottCustomVariationTagsException() throws ClientProtocolException, IOException, InvalidTagFormatException {

		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn("[\n{\n    \"value\":1,\n    \"label\":\"size\"\n    \n}\n    ]\n");
			 requestGet.when(()-> Request.Get(server+"/rest/V1/products/attributes/size/options" )).thenReturn(reqGet);
			 doThrow(new InvalidTagFormatException("invalidTagFormatException")).when(tagManager).createTag("/content/cq:tags/abbott/abbott-flavors/1", "1", "");
			 importerwithService.processCustomVariationsTagsMetadata(resourceResolver,"size",FLAVORS_PATH,token,service);
		}
	}


	@Test
	void testAddAndUpdateSimilacProducts() throws RepositoryException, WCMException, MalformedURLException, IOException, URISyntaxException {

		HashMap<Object,Object> labels = new HashMap<>();
		labels.put("value", 10);
		String nodeName = "ensure-max-protein-nutrition";
	    hits.add(hit1);
		MagentoProduct magentoProduct = mapper.readValue(product, MagentoProduct.class);
		when(vmp.get(LEVEL)).thenReturn(4);
		when(vmp.get("id")).thenReturn(218);
        when(vmp.get("name")).thenReturn("");
		when(vmp.get("discount")).thenReturn("");
		when(vmp.get("plan_id")).thenReturn("2");
		when(vmp.get("value")).thenReturn(labels);
		when(vmp.get("label")).thenReturn(labels);
        when(hit1.getResource()).thenReturn(resource);
		when(resource.getPath()).thenReturn(DEFAULT_CATEGORY);
		when(pageManager.create(CONTENT_PATH, nodeName, null, PRODUCT_NODE)).thenReturn(page);
		when(resource.getPath()).thenReturn(CONTENT_PATH);
		buildNode();
		when(resourceResolver.adaptTo(AssetManager.class)).thenReturn(assetMgr);
		when(magentoIdentityProvider.getServer()).thenReturn(server);
		String href1 = server +"/pdf//e/n/ensure-max-protein-milk-chocolate-front-new-v2_2.pdf";
		String href2 = server +"/pdf/e/n/ensure-max-protein-high-protein-less-sugar_sld-2_2_2.jpg";
		URL.setURLStreamHandlerFactory(urlStreamHandlerFactory);
    	mockHttpUrlStreamHandler = new MockHttpUrlStreamHandler();
    	when(urlStreamHandlerFactory.createURLStreamHandler("https")).thenReturn(mockHttpUrlStreamHandler);
    	mockHttpUrlStreamHandler.addConnection(new URL(href1), httpURLConnection);
    	mockHttpUrlStreamHandler.addConnection(new URL(href2), httpURLConnection);
        String imagedata = "{\n    \"PublishedAt\":9,\n    \"product\":\"similac\"\n    \n}";
        InputStream inputStream = new ByteArrayInputStream(imagedata.getBytes());
        when(httpURLConnection.getInputStream()).thenReturn(inputStream);
        when(session.getValueFactory()).thenReturn(valueFactory);
		when(resourceResolver.getResource(CONTENT_PATH + "/66899/ensure-max-protein-milk-chocolate-front-new-v2.jpg")).thenReturn(resource);
        when(resourceResolver.getResource(CONTENT_PATH + "/66899l")).thenReturn(resource);
		when(resourceResolver.getResource(CONTENT_PATH + "/66899/Similac_PM_Form_2.pdf")).thenReturn(resource);
        when(resource.getParent()).thenReturn(resource);
		when(resource.getPath()).thenReturn("/content/similac/");
        when(productRootCatConfigService.getStoreName()).thenReturn(SIMILAC);
		when(config.requiredShortening()).thenReturn(true);
		when(config.requiredAssets()).thenReturn(true);
		when(config.assetsPrefix()).thenReturn("/pdf");
		when(config.assetsRootPath()).thenReturn(CONTENT_PATH);
		importerwithService.activate(config);
		importerwithService.bindReplicator(replicator);
		importerwithService.bindMagentoIdentityProvider(magentoIdentityProvider);
		importerwithService.bindConfigurationFactory(productRootCatConfigService);
		importerwithService.addAndUpdateProducts(resourceResolver,CONTENT_PATH,magentoProduct,token,service,SIMILAC,server);

	}
		
	
    @Test
	void testDeleteProduct() throws JsonMappingException, JsonProcessingException, RepositoryException {
		
	    hits.add(hit1);
		MagentoProduct magentoProduct = mapper.readValue(deletedProduct, MagentoProduct.class);
		when(hit1.getProperties()).thenReturn(vmp);
		when(vmp.get(LEVEL)).thenReturn(4);
		when(vmp.get("id")).thenReturn(218);
		when(hit1.getResource()).thenReturn(resource);
		when(resource.getPath()).thenReturn(DEFAULT_CATEGORY);
		when(resourceResolver.getResource("/var/commerce/products/abbott/66/6689/66899")).thenReturn(resource);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		importerwithService.bindReplicator(replicator);
		importerwithService.bindMagentoIdentityProvider(magentoIdentityProvider);
		importerwithService.bindConfigurationFactory(productRootCatConfigService);
		importerwithService.deleteProductPage(resourceResolver,SIMILAC,magentoProduct,CONTENT_PATH,token,service ,server);

		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			when(content.asString()).thenReturn(deletedProduct);
			requestGet.when(()-> Request.Get(server+productPath )).thenReturn(reqGet);
			importerwithService.deleteProductPage(resourceResolver,ABBOTT,magentoProduct,CONTENT_PATH,token,service ,server);

		 }
		
	}
    
    @Test
    void testAddandUpdateAbbottProducts() throws ClientProtocolException, IOException, RepositoryException {
    	hits.add(hit1);
    	when(hit1.getProperties()).thenReturn(vmp);
		when(vmp.get(LEVEL)).thenReturn(4);
		when(vmp.get("id")).thenReturn(218);
		when(hit1.getResource()).thenReturn(resource);
		when(resource.getPath()).thenReturn("/content/abbott/");
		when(mockedService.createValidJcrName(PRODUCT_NODE)).thenReturn("ensure-max-protein-nutrition");
    	 MagentoProduct magentoProduct = mapper.readValue(deletedProduct, MagentoProduct.class);		
    	 when(productRootCatConfigService.getStoreName()).thenReturn(SIMILAC);
    	 when(pageManager.getPage("/content/abbott/en/path/ensure-max-protein/ensure-max-protein")).thenReturn(page);
    	 when(pageManager.getPage("/content/abbott/en/path/ensure-max-protein")).thenReturn(page);
    	 when(page.getPath()).thenReturn(CONTENT_PATH);
    	 try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(deletedProduct);
			 requestGet.when(()-> Request.Get(server +productPath ) ).thenReturn(reqGet);			
			 importerwithService.addAndUpdateProducts(resourceResolver,CONTENT_PATH,magentoProduct,token,service,ABBOTT,server);
		
		}
    	 
    }
    
    @Test
    void testAddandUpdateAbbottProductsException() throws ClientProtocolException, IOException, WCMException, RepositoryException, ReplicationException {
    	
    	MagentoProduct magentoProduct = mapper.readValue(deletedProduct, MagentoProduct.class);		
    	 when(productRootCatConfigService.getStoreName()).thenReturn(SIMILAC);
    	 when(pageManager.create( CONTENT_PATH, "ensure-max-protein",null, PRODUCT_NODE)).thenReturn(page);
    	 when(page.getPath()).thenReturn(CONTENT_PATH);
    	 when(resource.adaptTo(Node.class)).thenReturn(node);
    	 doThrow(new RepositoryException("repositoryException")).when(node).getNodes();
    	 doThrow(new ReplicationException("replicationException")).when(replicator).replicate(session,ReplicationActionType.ACTIVATE,CONTENT_PATH);
     	
    	 try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(deletedProduct);
			 requestGet.when(()-> Request.Get(server +productPath ) ).thenReturn(reqGet);			
			 importerwithService.addAndUpdateProducts(resourceResolver,CONTENT_PATH,magentoProduct,token,service,ABBOTT,server);
		
		}
    	 
    }
    
    
    @Test
    void testAddandUpdateNewSimilacProducts() throws ClientProtocolException, IOException, RepositoryException {
    	MagentoProduct magentoProduct = mapper.readValue(deletedProduct, MagentoProduct.class);
    	 when(productRootCatConfigService.getStoreName()).thenReturn(SIMILAC);
    	 when(pageManager.getPage("/content/abbott/en/path/ensure-max-protein-nutrition")).thenReturn(null,page);
    	 when(resource.getPath()).thenReturn(CONTENT_PATH);
    	 buildNode();
    	 try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(server + productPath ) ).thenReturn(reqGet);		
			 importerwithService.addAndUpdateProducts(resourceResolver,CONTENT_PATH,magentoProduct,token,service,SIMILAC,server);
		
		}
    	 
    }

    @Test
    void testAddandUpdateProperties() throws ClientProtocolException, IOException, RepositoryException {
    	MagentoProduct magentoProduct = mapper.readValue(productData, MagentoProduct.class);		
    	 when(productRootCatConfigService.getStoreName()).thenReturn(SIMILAC);
    	 when(pageManager.getPage("/content/abbott/en/path/alimentum-19-8ozcan-64719e-1")).thenReturn(page);
    	 buildNode();
    	 when(mvp.containsKey("message")).thenReturn(true);
    	 try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
		 when(content.asString()).thenReturn(deletedProduct);
			 requestGet.when(()-> Request.Get(server + productPath ) ).thenReturn(reqGet);
			 importerwithService.addAndUpdateProducts(resourceResolver,CONTENT_PATH,magentoProduct,token,service,SIMILAC,server);
		
		}
    	 
    }

}
class MockHttpUrlStreamHandler extends URLStreamHandler {
	public static final Logger log = LoggerFactory.getLogger(MockHttpUrlStreamHandler.class);

    private Map<URI, HttpURLConnection> connections = new HashMap<>();
    HttpURLConnection conn = mock(HttpURLConnection.class);
 
    @Override
    protected URLConnection openConnection(URL url) throws IOException {
       try {
		return connections.get(url.toURI());
	} catch (URISyntaxException e) {
		log.error("URI Syntax exception while getting the url path :{}", e.getMessage());
	
	}
	return conn;
    	
    }
 
    public void resetConnections() {
        connections = new HashMap<>();
    }
 
    public MockHttpUrlStreamHandler addConnection(URL url, HttpURLConnection urlConnection) throws URISyntaxException {
        connections.put(url.toURI(), urlConnection);
        return this;
    }
}
