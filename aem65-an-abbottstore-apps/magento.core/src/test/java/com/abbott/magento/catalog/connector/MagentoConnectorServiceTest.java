package com.abbott.magento.catalog.connector;

import com.abbott.magento.catalog.connector.models.*;
import com.abbott.magento.exception.CommerceException;
import com.abbott.magento.services.IdentityProvider;

import static com.abbott.magento.constants.MagentoConstants.X_ORIGIN_SECRET;
import static com.abbott.magento.constants.MagentoConstants.X_ORIGIN_SECRET_VALUE;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;
import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.fluent.Request;

import org.apache.http.client.fluent.Response;
import org.apache.http.entity.ContentType;
import org.apache.http.client.fluent.Content;

import static org.mockito.ArgumentMatchers.anyString;
import io.wcm.testing.mock.aem.junit5.AemContext;


@ExtendWith({MockitoExtension.class})
class MagentoConnectorServiceTest {
	private static final String AUTHORIZATION="Authorization";
	private static final String PRODUCTS="/rest/V1/products/";
	private static final String STORE_SKU = "66899";
	private static final String ABBOTT = "abbott";
	private static final String NEW_SIMILAC = "new_similac";
	private static final String SIMILAC = "similac";
	 String server = "https://test-server.abbott/unit-test";
	 String username = "username";
	 String password = "password";
	 String authToken;
	 String token = "Bearer ";
	 private static final int PAGE_SIZE = 2500;
	 
	 
	public final AemContext context = new AemContext();
	private final MagentoConnectorService service = new MagentoConnectorService(server,username,password);
	private ObjectMapper mapper = new ObjectMapper();
	String product = "{\r\n  \"id\": 627,\r\n  \"sku\": \"66899\",\r\n  \"name\": \"Ensure Max Protein\",\r\n  \"attribute_set_id\": 4,\r\n  \"price\": 29.97,\r\n  \"status\": 1,\r\n  \"visibility\": 4,\r\n  \"type_id\": \"simple\",\r\n  \"created_at\": \"2018-03-22 18:13:11\",\r\n  \"updated_at\": \"2023-10-19 12:44:40\",\r\n  \"weight\": 10,\r\n  \"extension_attributes\": {\r\n    \"website_ids\": [\r\n      1\r\n    ],\r\n    \"category_links\": [\r\n      {\r\n        \"position\": 11,\r\n        \"category_id\": \"19\"\r\n      },\r\n      {\r\n        \"position\": 26,\r\n        \"category_id\": \"20\"\r\n      }\r\n    ],\r\n    \"stock_item\": {\r\n      \"item_id\": 684,\r\n      \"product_id\": 627,\r\n      \"stock_id\": 1,\r\n      \"qty\": 553,\r\n      \"is_in_stock\": true,\r\n      \"is_qty_decimal\": false,\r\n      \"show_default_notification_message\": false,\r\n      \"use_config_min_qty\": true,\r\n      \"min_qty\": 0,\r\n      \"use_config_min_sale_qty\": 1,\r\n      \"min_sale_qty\": 1,\r\n      \"use_config_max_sale_qty\": true,\r\n      \"max_sale_qty\": 10000,\r\n      \"use_config_backorders\": true,\r\n      \"backorders\": 2,\r\n      \"use_config_notify_stock_qty\": true,\r\n      \"notify_stock_qty\": 1,\r\n      \"use_config_qty_increments\": true,\r\n      \"qty_increments\": 0,\r\n      \"use_config_enable_qty_inc\": true,\r\n      \"enable_qty_increments\": false,\r\n      \"use_config_manage_stock\": true,\r\n      \"manage_stock\": true,\r\n      \"low_stock_date\": null,\r\n      \"is_decimal_divided\": false,\r\n      \"stock_status_changed_auto\": 0\r\n    }\r\n  },\r\n  \"product_links\": [],\r\n  \"options\": [],\r\n  \"media_gallery_entries\": [\r\n    {\r\n      \"id\": 29555,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Nutrition Shake\",\r\n      \"position\": 1,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/e/n/ensure-max-protein-milk-chocolate-front-new-v2_2.jpg\"\r\n    },\r\n    {\r\n      \"id\": 29558,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Milk Chocolate Shake - High Protein. Less Sugar.\",\r\n      \"position\": 2,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/e/n/ensure-max-protein-high-protein-less-sugar_sld-2_2_2.jpg\"\r\n    }\r\n  ],\r\n  \"tier_prices\": [\r\n    {\r\n      \"customer_group_id\": 1,\r\n      \"qty\": 1,\r\n      \"value\": 29.97,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 3,\r\n      \"qty\": 1,\r\n      \"value\": 17.98,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    }\r\n    \r\n  ],\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"product_flavor\",\r\n      \"value\": \"Milk Chocolate\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_status\",\r\n      \"value\": \"1\"\r\n    },{\r\n      \"attribute_code\": \"url_key\",\r\n      \"value\": \"ensure-max-protein-nutrition-shake-milk-chocolate-11-fl-oz-tetra-case-of-12-66888\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"parent_sku\",\r\n      \"value\": \"con046\"\r\n    },\r\n     {\r\n      \"attribute_code\": \"size_or_weight\",\r\n      \"value\": \"11 fl oz Tetra\"\r\n    },{\r\n      \"attribute_code\": \"thumbnail\",\r\n      \"value\": \"/e/n/ensure-max-protein-milk-chocolate-front-new-v2.jpg\"\r\n    },{\r\n      \"attribute_code\": \"case_of_product\",\r\n      \"value\": \"Case of 12\"\r\n    },{\r\n      \"attribute_code\": \"description\",\r\n      \"value\": \"<ul>\\r\\n<li>30g PROTEIN: Each shake has 30g of high-quality protein\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"category_ids\",\r\n      \"value\": [\r\n        \"19\",\r\n        \"20\",\r\n        \"208\",\r\n        \"218\",\r\n        \"328\"\r\n      ]},{\r\n  \"id\": 627,\r\n  \"sku\": \"66899\",\r\n  \"name\": \"Ensure Max Protein\",\r\n  \"attribute_set_id\": 4,\r\n  \"price\": 29.97,\r\n  \"status\": 1,\r\n  \"visibility\": 4,\r\n  \"type_id\": \"simple\",\r\n  \"created_at\": \"2018-03-22 18:13:11\",\r\n  \"updated_at\": \"2023-10-19 12:44:40\",\r\n  \"weight\": 10,\r\n  \"extension_attributes\": {\r\n    \"website_ids\": [\r\n      1\r\n    ],\r\n    \"category_links\": [\r\n      {\r\n        \"position\": 11,\r\n        \"category_id\": \"19\"\r\n      },\r\n      {\r\n        \"position\": 26,\r\n        \"category_id\": \"20\"\r\n      }\r\n    ],\r\n    \"stock_item\": {\r\n      \"item_id\": 684,\r\n      \"product_id\": 627,\r\n      \"stock_id\": 1,\r\n      \"qty\": 553,\r\n      \"is_in_stock\": true,\r\n      \"is_qty_decimal\": false,\r\n      \"show_default_notification_message\": false,\r\n      \"use_config_min_qty\": true,\r\n      \"min_qty\": 0,\r\n      \"use_config_min_sale_qty\": 1,\r\n      \"min_sale_qty\": 1,\r\n      \"use_config_max_sale_qty\": true,\r\n      \"max_sale_qty\": 10000,\r\n      \"use_config_backorders\": true,\r\n      \"backorders\": 2,\r\n      \"use_config_notify_stock_qty\": true,\r\n      \"notify_stock_qty\": 1,\r\n      \"use_config_qty_increments\": true,\r\n      \"qty_increments\": 0,\r\n      \"use_config_enable_qty_inc\": true,\r\n      \"enable_qty_increments\": false,\r\n      \"use_config_manage_stock\": true,\r\n      \"manage_stock\": true,\r\n      \"low_stock_date\": null,\r\n      \"is_decimal_divided\": false,\r\n      \"stock_status_changed_auto\": 0\r\n    }\r\n  },\r\n  \"product_links\": [],\r\n  \"options\": [],\r\n  \"media_gallery_entries\": [\r\n    {\r\n      \"id\": 29555,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Nutrition Shake\",\r\n      \"position\": 1,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/e/n/ensure-max-protein-milk-chocolate-front-new-v2_2.jpg\"\r\n    },\r\n    {\r\n      \"id\": 29558,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Ensure Max Protein Milk Chocolate Shake - High Protein. Less Sugar.\",\r\n      \"position\": 2,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/e/n/ensure-max-protein-high-protein-less-sugar_sld-2_2_2.jpg\"\r\n    }\r\n  ],\r\n  \"tier_prices\": [\r\n    {\r\n      \"customer_group_id\": 1,\r\n      \"qty\": 1,\r\n      \"value\": 29.97,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 3,\r\n      \"qty\": 1,\r\n      \"value\": 17.98,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    }\r\n    \r\n  ],\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"parent_sku\",\r\n      \"value\": \"con046\"\r\n    }, {\r\n      \"attribute_code\": \"category_ids\",\r\n      \"value\": [\r\n        \"19\",\r\n        \"20\",\r\n        \"208\",\r\n        \"218\",\r\n        \"328\"\r\n      ]\r\n    }\r\n     ]\r\n}\r\n     ]\r\n}\r\n\r\n\t\t";
	String categoryData = "{\r\n  \"id\": 45,\r\n  \"parent_id\": 2,\r\n  \"name\": \"Infant and Child\",\r\n  \"is_active\": true,\r\n  \"position\": 4,\r\n  \"level\": 2,\r\n  \"children\": \"46,49,53,58,375,522,531,542\",\r\n  \"created_at\": \"2017-03-19 15:02:30\",\r\n  \"updated_at\": \"2022-01-31 17:17:49\",\r\n  \"path\": \"1/2/45\",\r\n  \"include_in_menu\": false,\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"display_mode\",\r\n      \"value\": \"PRODUCTS\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_anchor\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"path\",\r\n      \"value\": \"1/2/45\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"page_layout\",\r\n      \"value\": \"category-full-width\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"children_count\",\r\n      \"value\": \"50\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"custom_use_parent_settings\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"custom_apply_to_products\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"url_key\",\r\n      \"value\": \"infant-and-child\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"url_path\",\r\n      \"value\": \"infant-and-child\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"brand_carrier_number\",\r\n      \"value\": \"313273300\"\r\n    }\r\n  ]\r\n}";
	String categoriesData = "{\r\n  \"id\": 2,\r\n  \"parent_id\": 1,\r\n  \"name\": \"Default Category\",\r\n  \"is_active\": true,\r\n  \"position\": 1,\r\n  \"level\": 1,\r\n  \"product_count\": 694,\r\n  \"children_data\": [\r\n    {\r\n      \"id\": 3,\r\n      \"parent_id\": 2,\r\n      \"name\": \"Active Lifestyle\",\r\n      \"is_active\": true,\r\n      \"position\": 1,\r\n      \"level\": 2,\r\n      \"product_count\": 68,\r\n      \"children_data\": [\r\n        {\r\n          \"id\": 16,\r\n          \"parent_id\": 3,\r\n          \"name\": \"ZonePerfect\",\r\n          \"is_active\": true,\r\n          \"position\": 3,\r\n          \"level\": 3,\r\n          \"product_count\": 67,\r\n          \"children_data\": [\r\n            {\r\n              \"id\": 17,\r\n              \"parent_id\": 16,\r\n              \"name\": \"ZonePerfect Nutrition Bars\",\r\n              \"is_active\": true,\r\n              \"position\": 1,\r\n              \"level\": 4,\r\n              \"product_count\": 31,\r\n              \"children_data\": []\r\n            },\r\n            {\r\n              \"id\": 18,\r\n              \"parent_id\": 16,\r\n              \"name\": \"Kidz ZonePerfect Bars\",\r\n              \"is_active\": false,\r\n              \"position\": 2,\r\n              \"level\": 4,\r\n              \"product_count\": 0,\r\n              \"children_data\": []\r\n            },\r\n            {\r\n              \"id\": 193,\r\n              \"parent_id\": 16,\r\n              \"name\": \"ZonePerfect Revitalize Energy Bars\",\r\n              \"is_active\": false,\r\n              \"position\": 3,\r\n              \"level\": 4,\r\n              \"product_count\": 0,\r\n              \"children_data\": []\r\n            }\r\n          \r\n       ]\r\n    }\r\n  ]\r\n}\r\n ]\r\n}\r\n";
	String graphQlRes = "{\r\n  \"data\": {\r\n    \"categoryList\": [\r\n      {\r\n        \"children_count\": \"8\",\r\n        \"children\": [\r\n          {\r\n            \"id\": 46,\r\n            \"level\": 3,\r\n            \"name\": \"EleCare\",\r\n            \"path\": \"1/2/45/46\",\r\n            \"url_path\": \"infant-and-child/elecare\",\r\n            \"url_key\": \"elecare\",\r\n            \"meta_title\": null,\r\n            \"meta_keywords\": null,\r\n            \"meta_description\": null,\r\n            \"children\": [\r\n              {\r\n                \"id\": 47,\r\n                \"level\": 4,\r\n                \"name\": \"EleCare\",\r\n                \"path\": \"1/2/45/46/47\",\r\n                \"url_path\": \"infant-and-child/elecare/elecare\",\r\n                \"url_key\": \"elecare\",\r\n                \"meta_title\": null,\r\n                \"meta_keywords\": null,\r\n                \"meta_description\": null,\r\n                \"children\": []\r\n              }\r\n            ]\r\n          },\r\n          {\r\n            \"id\": 49,\r\n            \"level\": 3,\r\n            \"name\": \"Pedialyte\",\r\n            \"path\": \"1/2/45/49\",\r\n            \"url_path\": \"infant-and-child/pedialyte\",\r\n            \"url_key\": \"pedialyte\",\r\n            \"meta_title\": \"All Pedialyte Products on AbbottStore\",\r\n            \"meta_keywords\": \"Pedialyte Liters, Pedialyte Classic, Pedialyte Powder, Pedialyte AdvancedCare, Pedialyte AdvancedCare Plus\",\r\n            \"meta_description\": \"Pedialyte advanced rehydration products available on AbbottStore\",\r\n            \"children\": [\r\n              {\r\n                \"id\": 50,\r\n                \"level\": 4,\r\n                \"name\": \"Pedialyte Liquid\",\r\n                \"path\": \"1/2/45/49/50\",\r\n                \"url_path\": \"infant-and-child/pedialyte/pedialyte-liquid\",\r\n                \"url_key\": \"pedialyte-liquid\",\r\n                \"meta_title\": \"Pedialyte Liquid / AbbottStore\",\r\n                \"meta_keywords\": \"Pedialyte, rehydration drink, Pedialyte AdvancedCare, drinks that replace fluids and electrolytes\",\r\n                \"meta_description\": \"Get advanced rehydration from Pedialyte to quickly replace fluids and electrolytes. Feel better-fast\",\r\n                \"children\": []\r\n              }\r\n              \r\n            ]\r\n          }\r\n          \r\n        ]\r\n      }\r\n    ]\r\n  }\r\n}\r\n";
	String flavors = "[\r\n  {\r\n    \"label\": \" \",\r\n    \"value\": \"\"\r\n  },\r\n  {\r\n    \"label\": \"Chocolate\",\r\n    \"value\": \"5621\"\r\n  },\r\n  {\r\n    \"label\": \"Strawberry\",\r\n    \"value\": \"5622\"\r\n  },\r\n  {\r\n    \"label\": \"Vanilla\",\r\n    \"value\": \"5623\"\r\n  },\r\n  {\r\n    \"label\": \"Creamy Vanilla\",\r\n    \"value\": \"5624\"\r\n  },\r\n  {\r\n    \"label\": \"Milk Chocolate\",\r\n    \"value\": \"5625\"\r\n  }\r\n]";
	String productData = "{\r\n  \"id\": 1152,\r\n  \"sku\": \"64719e-1\",\r\n  \"name\": \"Similac® Alimentum®§§\",\r\n  \"attribute_set_id\": 4,\r\n  \"price\": 38.16,\r\n  \"status\": 2,\r\n  \"visibility\": 4,\r\n  \"type_id\": \"simple\",\r\n  \"created_at\": \"2020-04-20 15:52:02\",\r\n  \"updated_at\": \"2023-03-01 11:07:20\",\r\n  \"weight\": 2,\r\n  \"extension_attributes\": {\r\n    \"website_ids\": [\r\n      1,\r\n      3\r\n    ],\r\n    \"category_links\": [\r\n      {\r\n        \"position\": 317,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 171,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 10,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 17,\r\n        \"category_id\": \"45\"\r\n      }\r\n    ],\r\n    \"stock_item\": {\r\n      \"item_id\": 8601,\r\n      \"product_id\": 1152,\r\n      \"stock_id\": 1,\r\n      \"qty\": 0,\r\n      \"is_in_stock\": false,\r\n      \"is_qty_decimal\": false,\r\n      \"show_default_notification_message\": false,\r\n      \"use_config_min_qty\": true,\r\n      \"min_qty\": 0,\r\n      \"use_config_min_sale_qty\": 1,\r\n      \"min_sale_qty\": 1,\r\n      \"use_config_max_sale_qty\": true,\r\n      \"max_sale_qty\": 10000,\r\n      \"use_config_backorders\": true,\r\n      \"backorders\": 2,\r\n      \"use_config_notify_stock_qty\": true,\r\n      \"notify_stock_qty\": 1,\r\n      \"use_config_qty_increments\": true,\r\n      \"qty_increments\": 0,\r\n      \"use_config_enable_qty_inc\": true,\r\n      \"enable_qty_increments\": false,\r\n      \"use_config_manage_stock\": true,\r\n      \"manage_stock\": true,\r\n      \"low_stock_date\": \"2023-03-01 11:07:20\",\r\n      \"is_decimal_divided\": false,\r\n      \"stock_status_changed_auto\": 0\r\n    }\r\n  },\r\n  \"product_links\": [],\r\n  \"options\": [],\r\n  \"media_gallery_entries\": [\r\n    {\r\n      \"id\": 5574,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum\",\r\n      \"position\": 0,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-64719e-19-8-oz-powder-front_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5580,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Start feeling better today, within 24 hours\",\r\n      \"position\": 3,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-start-feeling-better-today_3.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5583,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Easy-to-digest hypoallergenic formula\",\r\n      \"position\": 4,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-easy-to-digest_1_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5586,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Number 1 pediatrician recommended brands based on combined recommendations of Similac and EleCare\",\r\n      \"position\": 5,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-recommended-brands_3.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5589,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac StrongMoms Rewards, Get up to $400 in rewards, visit similac.com/saveonalimentum to sign up and save. Offers may vary\",\r\n      \"position\": 6,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-strongmoms-offer_1_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5577,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\",\r\n      \"position\": 7,\r\n      \"disabled\": true,\r\n      \"types\": [\r\n        \"image\",\r\n        \"small_image\",\r\n        \"thumbnail\"\r\n      ],\r\n      \"file\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    }\r\n  ],\r\n  \"tier_prices\": [\r\n    {\r\n      \"customer_group_id\": 1,\r\n      \"qty\": 1,\r\n      \"value\": 43.49,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 2,\r\n      \"qty\": 1,\r\n      \"value\": 26.09,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 3,\r\n      \"qty\": 1,\r\n      \"value\": 26.09,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    }\r\n  ],\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"product_flavor\",\r\n      \"value\": \"Infant Formula\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"glucerna_funnel_index\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_subscription\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"image\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"url_key\",\r\n      \"value\": \"alimentum-19-8ozcan-64719e-1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"gift_message_available\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"allow_trial\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aw_sarp2_subscription_type\",\r\n      \"value\": \"3\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"description\",\r\n      \"value\": \"<p>For food allergies and colic symptoms due to protein sensitivity.</p>\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"small_image\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"options_container\",\r\n      \"value\": \"container2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"gift_wrapping_available\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"parent_sku\",\r\n      \"value\": \"con033\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aw_sarp2_subscription_options\",\r\n      \"value\": []\r\n    },\r\n    {\r\n      \"attribute_code\": \"thumbnail\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_title\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder / 19.8 oz can \"\r\n    },\r\n    {\r\n      \"attribute_code\": \"subscribe_customer_group\",\r\n      \"value\": \"0,1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_keyword\",\r\n      \"value\": \"similac alimentum, hypoallergenic bay formula, formula for babies with colic, formula for infants with protein sensitivity\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"size\",\r\n      \"value\": \"5857\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"jet_product_status\",\r\n      \"value\": \"not_uploaded\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_description\",\r\n      \"value\": \"Similac Alimentum is a nutritionally complete, hypoallergenic formula for infants, including those with colic symptoms due to protein sensitivity. Alimentum starts reducing colic symptoms due to protein sensitivity within 24 hours in most infants\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"msrp_display_actual_price_type\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"order_on_call\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_url\",\r\n      \"value\": \"/infant-and-child/similac/similac-alimentum/similac-alimentum-infant-formula-powder/alimentum-19-8ozcan-64719e-1.html\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"tax_class_id\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"dam_images\",\r\n      \"value\": \"/content/dam/abbott/images/64719e-1/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"required_options\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"one_time\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"has_options\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_form\",\r\n      \"value\": \"Powder\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"image_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"category_ids\",\r\n      \"value\": [\r\n        \"45\",\r\n        \"58\",\r\n        \"63\",\r\n        \"206\"\r\n      ]\r\n    },\r\n    {\r\n      \"attribute_code\": \"small_image_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"size_or_weight\",\r\n      \"value\": \"19.8 oz\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"thumbnail_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_name_flavour\",\r\n      \"value\": \"Similac Alimentum Infant Formula Powder\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_rush\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_returnable\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_recurring\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"mst_search_weight\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_featured\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_hazardous\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"group_size\",\r\n      \"value\": \"64719,64719e,64715e,64715\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"sub_brand\",\r\n      \"value\": \"Similac Alimentum\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"case_of_product\",\r\n      \"value\": \"null\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_status\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_y\",\r\n      \"value\": \"SELECT 3 CANS\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"brand\",\r\n      \"value\": \"Similac\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"brand_name\",\r\n      \"value\": \"Similac\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_x\",\r\n      \"value\": \"SELECT 6 CANS\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"custom_discount\",\r\n      \"value\": \"10\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"metabolic_state\",\r\n      \"value\": \"null\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"forms\",\r\n      \"value\": \"6807\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"active\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"rma_able\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"avalara_tax_id\",\r\n      \"value\": \"PF050001\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_y_min_update\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_x_max_update\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_sold_qty\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"amazon_purchase\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"plans\",\r\n      \"value\": \"7209\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_gpas\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_family_order\",\r\n      \"value\": \"10000\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"order_in_family\",\r\n      \"value\": \"10000\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_recurring_discount\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"disable_sale\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"threshold\",\r\n      \"value\": \"0\"\r\n    }\r\n  ]\r\n}";
	String productCategory = "{\r\n  \"id\": 1152,\r\n  \"sku\": \"64719e-1\",\r\n  \"name\": \"Similac® Alimentum®§§\",\r\n  \"attribute_set_id\": 4,\r\n  \"price\": 38.16,\r\n  \"status\": 2,\r\n  \"visibility\": 4,\r\n  \"type_id\": \"simple\",\r\n  \"created_at\": \"2020-04-20 15:52:02\",\r\n  \"updated_at\": \"2023-03-01 11:07:20\",\r\n  \"weight\": 2,\r\n  \"extension_attributes\": {\r\n    \"website_ids\": [\r\n      1,\r\n      3\r\n    ],\r\n    \"category_links\": [\r\n      {\r\n        \"position\": 317,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 171,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 10,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 17,\r\n        \"category_id\": \"45\"\r\n      }\r\n    ],\r\n    \"stock_item\": {\r\n      \"item_id\": 8601,\r\n      \"product_id\": 1152,\r\n      \"stock_id\": 1,\r\n      \"qty\": 0,\r\n      \"is_in_stock\": false,\r\n      \"is_qty_decimal\": false,\r\n      \"show_default_notification_message\": false,\r\n      \"use_config_min_qty\": true,\r\n      \"min_qty\": 0,\r\n      \"use_config_min_sale_qty\": 1,\r\n      \"min_sale_qty\": 1,\r\n      \"use_config_max_sale_qty\": true,\r\n      \"max_sale_qty\": 10000,\r\n      \"use_config_backorders\": true,\r\n      \"backorders\": 2,\r\n      \"use_config_notify_stock_qty\": true,\r\n      \"notify_stock_qty\": 1,\r\n      \"use_config_qty_increments\": true,\r\n      \"qty_increments\": 0,\r\n      \"use_config_enable_qty_inc\": true,\r\n      \"enable_qty_increments\": false,\r\n      \"use_config_manage_stock\": true,\r\n      \"manage_stock\": true,\r\n      \"low_stock_date\": \"2023-03-01 11:07:20\",\r\n      \"is_decimal_divided\": false,\r\n      \"stock_status_changed_auto\": 0\r\n    }\r\n  },\r\n  \"product_links\": [],\r\n  \"options\": [],\r\n  \"media_gallery_entries\": [\r\n    {\r\n      \"id\": 5574,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum\",\r\n      \"position\": 0,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-64719e-19-8-oz-powder-front_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5580,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Start feeling better today, within 24 hours\",\r\n      \"position\": 3,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-start-feeling-better-today_3.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5583,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Easy-to-digest hypoallergenic formula\",\r\n      \"position\": 4,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-easy-to-digest_1_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5586,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Number 1 pediatrician recommended brands based on combined recommendations of Similac and EleCare\",\r\n      \"position\": 5,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-recommended-brands_3.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5589,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac StrongMoms Rewards, Get up to $400 in rewards, visit similac.com/saveonalimentum to sign up and save. Offers may vary\",\r\n      \"position\": 6,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-strongmoms-offer_1_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5577,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\",\r\n      \"position\": 7,\r\n      \"disabled\": true,\r\n      \"types\": [\r\n        \"image\",\r\n        \"small_image\",\r\n        \"thumbnail\"\r\n      ],\r\n      \"file\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    }\r\n  ],\r\n  \"tier_prices\": [\r\n    {\r\n      \"customer_group_id\": 1,\r\n      \"qty\": 1,\r\n      \"value\": 43.49,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 2,\r\n      \"qty\": 1,\r\n      \"value\": 26.09,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 3,\r\n      \"qty\": 1,\r\n      \"value\": 26.09,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    }\r\n  ],\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"product_flavor\",\r\n      \"value\": \"Infant Formula\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"glucerna_funnel_index\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_subscription\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"image\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"url_key\",\r\n      \"value\": \"alimentum-19-8ozcan-64719e-1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"gift_message_available\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"allow_trial\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aw_sarp2_subscription_type\",\r\n      \"value\": \"3\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"description\",\r\n      \"value\": \"<p>For food allergies and colic symptoms due to protein sensitivity.</p>\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"small_image\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"options_container\",\r\n      \"value\": \"container2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"gift_wrapping_available\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"parent_sku\",\r\n      \"value\": \"con033\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aw_sarp2_subscription_options\",\r\n      \"value\": []\r\n    },\r\n    {\r\n      \"attribute_code\": \"thumbnail\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_title\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder / 19.8 oz can \"\r\n    },\r\n    {\r\n      \"attribute_code\": \"subscribe_customer_group\",\r\n      \"value\": \"0,1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_keyword\",\r\n      \"value\": \"similac alimentum, hypoallergenic bay formula, formula for babies with colic, formula for infants with protein sensitivity\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"size\",\r\n      \"value\": \"5857\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"jet_product_status\",\r\n      \"value\": \"not_uploaded\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_description\",\r\n      \"value\": \"Similac Alimentum is a nutritionally complete, hypoallergenic formula for infants, including those with colic symptoms due to protein sensitivity. Alimentum starts reducing colic symptoms due to protein sensitivity within 24 hours in most infants\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"msrp_display_actual_price_type\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"order_on_call\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_url\",\r\n      \"value\": \"/infant-and-child/similac/similac-alimentum/similac-alimentum-infant-formula-powder/alimentum-19-8ozcan-64719e-1.html\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"tax_class_id\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"dam_images\",\r\n      \"value\": \"/content/dam/abbott/images/64719e-1/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"required_options\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"one_time\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"has_options\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_form\",\r\n      \"value\": \"Powder\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"image_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"category_ids\",\r\n      \"value\": [\r\n        \"45\",\r\n        \"45\",\r\n        \"45\",\r\n        \"45\"\r\n      ]\r\n    },\r\n    {\r\n      \"attribute_code\": \"small_image_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"size_or_weight\",\r\n      \"value\": \"19.8 oz\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"thumbnail_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_name_flavour\",\r\n      \"value\": \"Similac Alimentum Infant Formula Powder\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_rush\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_returnable\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_recurring\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"mst_search_weight\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_featured\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_hazardous\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"group_size\",\r\n      \"value\": \"64719,64719e,64715e,64715\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"sub_brand\",\r\n      \"value\": \"Similac Alimentum\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"case_of_product\",\r\n      \"value\": \"null\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_status\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_y\",\r\n      \"value\": \"SELECT 3 CANS\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"brand\",\r\n      \"value\": \"Similac\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"brand_name\",\r\n      \"value\": \"Similac\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_x\",\r\n      \"value\": \"SELECT 6 CANS\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"custom_discount\",\r\n      \"value\": \"10\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"metabolic_state\",\r\n      \"value\": \"null\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"forms\",\r\n      \"value\": \"6807\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"active\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"rma_able\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"avalara_tax_id\",\r\n      \"value\": \"PF050001\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_y_min_update\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_x_max_update\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_sold_qty\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"amazon_purchase\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"plans\",\r\n      \"value\": \"7209\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_gpas\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_family_order\",\r\n      \"value\": \"10000\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"order_in_family\",\r\n      \"value\": \"10000\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_recurring_discount\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"disable_sale\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"threshold\",\r\n      \"value\": \"0\"\r\n    }\r\n  ]\r\n}";
	String stockStatus = "{\n  \"product_id\": 627,\n  \"stock_id\": 1,\n  \"qty\": 762,\n  \"stock_status\": 1,\n  \"stock_item\": {\n    \"item_id\": 1371,\n    \"product_id\": 627,\n    \"stock_id\": 1,\n    \"qty\": 760,\n    \"is_in_stock\": true,\n    \"is_qty_decimal\": false,\n    \"show_default_notification_message\": false,\n    \"use_config_min_qty\": true,\n    \"min_qty\": 0,\n    \"use_config_min_sale_qty\": 1,\n    \"min_sale_qty\": 1,\n    \"use_config_max_sale_qty\": true,\n    \"max_sale_qty\": 10000,\n    \"use_config_backorders\": true,\n    \"backorders\": 2,\n    \"use_config_notify_stock_qty\": true,\n    \"notify_stock_qty\": 1,\n    \"use_config_qty_increments\": true,\n    \"qty_increments\": 0,\n    \"use_config_enable_qty_inc\": true,\n    \"enable_qty_increments\": false,\n    \"use_config_manage_stock\": true,\n    \"manage_stock\": true,\n    \"low_stock_date\": null,\n    \"is_decimal_divided\": false,\n    \"stock_status_changed_auto\": 0\n  }\n}";
	String productPage = "{\"items\":[{\"id\":18,\"sku\":\"63477\",\"name\":\"EAS 100% Whey Protein Powder\",\"attribute_set_id\":4,\"price\":39.58,\"status\":1,\"visibility\":1,\"type_id\":\"simple\",\"created_at\":\"2017-04-15 18:11:33\",\"updated_at\":\"2021-01-14 14:24:53\",\"weight\":5,\"extension_attributes\":{\"website_ids\":[1]},\"product_links\":[],\"options\":[],\"media_gallery_entries\":[{\"id\":1430,\"media_type\":\"image\",\"label\":\"EAS 100% Whey Protein Powder Vanilla\",\"position\":2,\"disabled\":false,\"types\":[\"image\",\"small_image\",\"thumbnail\",\"swatch_image\"],\"file\":\"\\/e\\/a\\/eas_whey_2lb_vanilla_front.jpg\"},{\"id\":1431,\"media_type\":\"image\",\"label\":null,\"position\":3,\"disabled\":false,\"types\":[],\"file\":\"\\/1\\/0\\/100__whey_2lb_keyfeatures_vanilla.jpg\"}]}],\"search_criteria\":{\"filter_groups\":[],\"page_size\":399,\"current_page\":0},\"total_count\":908}";
	String sku = "sku";
	String aemUrl = "aemUrl";
	String damImages = "damImages";
	
	@Mock
	IdentityProvider magentoIdentityProvider;
    @Mock
	Response apiResponse;
	@Mock
	Request request;
	@Mock
	Content content;
	
	@BeforeEach
	void setUp() throws ClientProtocolException, IOException {
        lenient().when(request.addHeader(AUTHORIZATION,token)).thenReturn(request);
        lenient().when(request.addHeader(X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE)).thenReturn(request);
        lenient().when(request.execute()).thenReturn(apiResponse);
		lenient().when(apiResponse.returnContent()).thenReturn(content);

	}

	@Test()
	void testGetToken() throws ClientProtocolException,IOException {
		 
		 try(MockedStatic<Request> requestPost = mockStatic(Request.class)){
			 mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			 mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			 
			 com.abbott.magento.identity.models.AuthCredentials authCredentials = new com.abbott.magento.identity.models.AuthCredentials(
						username, password);
			 when(request.bodyString(mapper.writeValueAsString( authCredentials ), ContentType.APPLICATION_JSON)).thenReturn(request);
			  
			 when(content.asString()).thenReturn("token"); 
			 requestPost.when(()-> Request.Post(server+"/rest/V1/integration/admin/token")).thenReturn(request);
		     service.getToken();
			 Mockito.verify(request).execute();
		 
		 
		 }
		
 
	}

	@Test
	void testGetProductCategories() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(server +"/rest/V1/products/sku")).thenReturn(request);
		     service.getProductCategories(sku);
		     Mockito.verify(request).execute();
		 }
		
	}

	@Test
	void testGetProductStock() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(stockStatus);
			 requestGet.when(()-> Request.Get(server +"/rest/V1/stockStatuses/sku" )).thenReturn(request);
		     service.getProductStock(sku);
		}
		
	}

	

	@Test
	void testGetAbbottProducts() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(productPage);
			 requestGet.when(()-> Request.Get(server +"/rest/V1/products?searchCriteria[pageSize]=" + PAGE_SIZE + "&searchCriteria[currentPage]=0&searchCriteria[filterGroups][0][filters][0][field]=store_id&searchCriteria[filterGroups][0][filters][0][value]=3" )).thenReturn(request);
		     service.getAbbottProducts(SIMILAC,"3");
		     Mockito.verify(request).execute();
		}
				
	}

	

	@Test
	void testGetCategoryName() throws ClientProtocolException, IOException {
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(categoryData);
		     requestGet.when(()-> Request.Get(server +"/rest/V1/categories/45" )).thenReturn(request);
		     service.getCategoryName("45");
		     Mockito.verify(request).execute();
		}
	
	}

	@Test
	void testGetAbbottCategories() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(categoriesData);
			 requestGet.when(()-> Request.Get(server +"/rest/V1/categories" )).thenReturn(request);
		     service.getAbbottCategories();
		     Mockito.verify(request).execute();
		}
				
	}

	@Test
	void testGetAbbottCategoriesUsingGraphQL() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestPost = mockStatic(Request.class)){
			 
			 String categoryId = "45";
			 String query = "{\"query\":\"    {\\r\\n  categoryList(filters: {ids: {in: [\\\""+categoryId+"\\\"]}}) {\\r\\n    children_count\\r\\n    children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n     children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n      children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n        children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n      }\\r\\n      }\\r\\n    }\\r\\n    }\\r\\n  }\\r\\n}\\r\\n\",\"variables\":{}}";
			 Mockito.when(request.bodyString(query, ContentType.APPLICATION_JSON)).thenReturn(request);  
			  
			 when(content.asString()).thenReturn(graphQlRes);		 
			 requestPost.when(()-> Request.Post(server +"/graphql")).thenReturn(request);
		     service.getAbbottCategoriesUsingGraphQL(categoryId);
			 Mockito.verify(request).execute();
		
		 }
		
	}

	@Test
	void testGetAbbottVariationCategories() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(flavors);
			 requestGet.when(()-> Request.Get(server +"/rest/V1/products/attributes/flavors/options" )).thenReturn(request);
		     service.getAbbottVariationCategories("flavors", token);
		     Mockito.verify(request).execute();
		}
		
	}


	@Test
	void testGetCategories() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(categoriesData);
			 requestGet.when(()-> Request.Get(server +"/rest/V1/categories" )).thenReturn(request);
		     service.getCategories();
		     Mockito.verify(request).execute();
		}
		
	}

	@Test
	void testGetProductsbyPage() throws ClientProtocolException, IOException {
	
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			  
			 when(content.asString()).thenReturn(productPage);
			 requestGet.when(()-> Request.Get(server +"/rest/V1/products?searchCriteria[pageSize]=399&searchCriteria[currentPage]=0" )).thenReturn(request);
		     service.getProducts();
		     Mockito.verify(request).execute();
		}
		
	}

	@Test
	void testGetTierPrices() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 String json = "{\n" + "  \"skus\": [\"66899\"" + "  ]\n" + "}";
			 when(request.bodyString(json, ContentType.APPLICATION_JSON)).thenReturn(request);  
			  
			 when(content.asString()).thenReturn("test product variant");
			 requestGet.when(()-> Request.Post(server +"/rest/V1/products/tier-prices-information" )).thenReturn(request);
		     service.getTierPrices(STORE_SKU);
		     Mockito.verify(request).execute();
		
		}
		
	}

	@Test
	void testUpdateProductList() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			String dateString = "12/03/2000";
			StringBuilder url = new StringBuilder();
			url.append(server ).append("/rest/V1/products?")
					.append("searchCriteria[filter_groups][0][filters][0][field]=updated_at").append("&")
					.append("searchCriteria[filter_groups][0][filters][0][value]=").append(dateString).append("&")
					.append("searchCriteria[filter_groups][0][filters][0][condition_type]=gteq");
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(url.toString() )).thenReturn(request);
		     service.updateProductList(dateString);
		     Mockito.verify(request).execute();
		}
	}

	@Test
	void testGetStoreBasedProduct() throws ClientProtocolException, IOException, CommerceException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 String productPath = server + PRODUCTS + STORE_SKU;
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(productPath)).thenReturn(request);
		     service.getStoreBasedProduct(token,STORE_SKU,server);
		     Mockito.verify(request).execute();
		}
		
	}

	@Test
	void testGetProduct() throws ClientProtocolException, IOException, CommerceException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 String productPath = server + PRODUCTS + STORE_SKU;
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(productPath )).thenReturn(request);
		     service.getProduct(token,STORE_SKU);
		     Mockito.verify(request).execute();
		}
	
	}

	@Test
	void testGetProductSubscription() throws ClientProtocolException, IOException, CommerceException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 String productPath = server + PRODUCTS + STORE_SKU;
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(productPath)).thenReturn(request);
		     service.getProductSubscription(STORE_SKU,ABBOTT);
		     Mockito.verify(request).execute();
		}
		
	}
	
	@Test
	void testGetProductSubscriptionforSimilac() throws ClientProtocolException, IOException, CommerceException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			
			 String subscriptionPath = server + "/rest/"+NEW_SIMILAC+"/V1/products/"+STORE_SKU;
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(subscriptionPath)).thenReturn(request);
		     service.getProductSubscription(STORE_SKU,NEW_SIMILAC);
		     Mockito.verify(request).execute();
		}
	
	}

	@Test
	void testGetProductVariant() throws ClientProtocolException, IOException, CommerceException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(server +"/rest/V1/products/66899" )).thenReturn(request);
		     service.getProductVariant(STORE_SKU);
		     Mockito.verify(request).execute();
		}
		
	}
	
	@Test
	void testGetProductVariants() throws ClientProtocolException, IOException {

		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(server +"/rest/V1/configurable-products/66899/children" )).thenReturn(request);
		     service.getProductVariants(STORE_SKU);
		     Mockito.verify(request).execute();
		}
	
	}

	@Test
	void testGetProductForPrice() throws CommerceException, ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			
			 String productPath = server + PRODUCTS + STORE_SKU;
			 when(content.asString()).thenReturn(product);
			 requestGet.when(()-> Request.Get(productPath )).thenReturn(request);
		     service.getProductForPrice(STORE_SKU);		
		}
		
	}

	@Test
	void testUpdateURLPathInMagento() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestPost = mockStatic(Request.class)){
			
			 String productJson = "{\"product\":{\"custom_attributes\":[{\"attribute_code\":\"aem_url\",\"value\":\"aemUrl.html\"},{\"attribute_code\":\"dam_images\",\"value\":\"damImages\"}]}}";
			 when(request.bodyString(productJson, ContentType.APPLICATION_JSON)).thenReturn(request); 
			 Mockito.lenient().when(content.asString()).thenReturn("test token");			 
			 requestPost.when(()-> Request.Put(anyString())).thenReturn(request);
		     service.updateURLPathInMagento(sku,aemUrl,damImages,SIMILAC,server,magentoIdentityProvider);
		     Mockito.verify(request).execute();
		 }
		
	}

	@Test
	void testGetMagentoStoreCode() {
		
		String[] stores = {"/content/abbott/store","/content/glucerna/store","/content/similac/store","/content/an/similac/store",null};
		
		for (String store : stores) {
		
		service.getMagentoStoreCode(store);
		
		}
	
    }

	@Test
	void testCreateValidJcrName() {
		 String tag = "content/abbott/an/tags/test_Tags";
		 String validTag = service.createValidJcrName(tag);
		 assertEquals("content-abbott-antagstesttags", validTag);
	}

	@Test
	void testRegisterUser() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestPost = mockStatic(Request.class)){
			 String inputJson = "{\"username\":\"admin\",\"password\":\"admin\"}";
			 when(request.bodyString(inputJson, ContentType.APPLICATION_JSON)).thenReturn(request);			 
			 requestPost.when(()-> Request.Post(server +"/rest/V1/customers")).thenReturn(request);
		     service.registerUser(inputJson);
			
		 }
		
	
	}

	@Test
	void testGetAbbottSubscriptionVariationCategories() throws ClientProtocolException, IOException {
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 when(content.asString()).thenReturn("test subscription categories");
			 requestGet.when(()-> Request.Get(server +"/rest/V1/awSarp2/plan/search/?searchCriteria[filter_groups][0][filters][0][field]=plan_id&searchCriteria[filter_groups][0][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][condition_type]=gteq" )).thenReturn(request);
		
		     service.getAbbottSubscriptionVariationCategories(token);
		
		}
		
	}
	
	@Test
	void testGetTags() throws ClientProtocolException, IOException {
	
        MagentoProduct magentoProduct = mapper.readValue(productCategory, MagentoProduct.class);
   
        try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			
			 Mockito.lenient().when(content.asString()).thenReturn(categoryData);
			 requestGet.when(()-> Request.Get(anyString()) ).thenReturn(request);
		     service.getTags(magentoProduct);
		
		}
        
		
		
	}
    @Test
	void testGetProductsException() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			
			 when(request.execute()).thenThrow(mock(IOException.class));
			 requestGet.when(()-> Request.Get(anyString()) ).thenReturn(request);
			 assertNull(service.getProducts());
		}
	}
	
	@Test
	void testRegisterUserIOException() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestPost = mockStatic(Request.class)){
			 String userData = "{\"user\":\"admin\"}";
			when(request.bodyString(userData, ContentType.APPLICATION_JSON)).thenReturn(request);
			 when(request.execute()).thenThrow(mock(IOException.class));
			 requestPost.when(()-> Request.Post(anyString()) ).thenReturn(request);
			 assertNotNull(service.registerUser(userData));
		}
	}
	@Test
	void testUpdateURLPathIOException() throws ClientProtocolException, IOException {
		
		try(MockedStatic<Request> requestPut = mockStatic(Request.class)){
			
			 String productDataJson = "{\"product\":{\"custom_attributes\":[{\"attribute_code\":\"aem_url\",\"value\":\"aemUrl.html\"},{\"attribute_code\":\"dam_images\",\"value\":\"damImages\"}]}}";
			 when(request.bodyString(productDataJson, ContentType.APPLICATION_JSON)).thenReturn(request); 
			 when(request.execute()).thenThrow(mock(IOException.class));		 
			 requestPut.when(()-> Request.Put(anyString())).thenReturn(request);
		     service.updateURLPathInMagento(sku,aemUrl,damImages,SIMILAC,server,magentoIdentityProvider);
		     
		 }
		
	}
	
    @Test
	void testRequestIOException() throws IOException, CommerceException {
    	 String bodyquery = "{\"query\":\"    {\\r\\n  categoryList(filters: {ids: {in: [\\\"45\\\"]}}) {\\r\\n    children_count\\r\\n    children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n     children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n      children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n        children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n      }\\r\\n      }\\r\\n    }\\r\\n    }\\r\\n  }\\r\\n}\\r\\n\",\"variables\":{}}";
    	 
		 try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 MagentoProduct magentoProduct = mapper.readValue(productCategory, MagentoProduct.class);
			   
			 requestGet.when(()-> Request.Get(anyString()) ).thenReturn(request);
			 requestGet.when(()-> Request.Put(anyString()) ).thenReturn(request);
			 requestGet.when(()-> Request.Post(anyString()) ).thenReturn(request);
			 when(request.bodyString(bodyquery, ContentType.APPLICATION_JSON)).thenReturn(request);
			 when(request.execute()).thenThrow(mock(IOException.class));
			 assertNull( service.getProductCategories(STORE_SKU));
			 assertNotNull( service.getTags(magentoProduct));
			 assertNull( service.updateProductList("12/03/2021"));
			 assertNull( service.getCategories());
			 assertNull(service.getProductVariants(STORE_SKU));
			 assertNull( service.getAbbottVariationCategories("flavors", token));
			 assertNull( service.getAbbottCategories());
			 assertNotNull( service.getAbbottProducts(SIMILAC,"3"));
			 assertNull( service.getProductStock(STORE_SKU));
             assertNull(service.getCategoryName("48"));
             assertNull( service.getAbbottCategoriesUsingGraphQL("45"));
			 assertThrows(CommerceException.class,()-> service.getProduct(token,STORE_SKU));
			 assertThrows(CommerceException.class,()-> service.getProductSubscription(STORE_SKU,SIMILAC));
			 assertThrows(CommerceException.class,()-> service.getStoreBasedProduct(token,STORE_SKU,server));
			 assertThrows(CommerceException.class,()-> service.getProductVariant(STORE_SKU));
			 assertThrows(CommerceException.class,()-> service.getProductForPrice(STORE_SKU));
			}
		
		
	}

}
