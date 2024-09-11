package com.abbott.magento.identity;


import static org.mockito.Mockito.lenient;
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

import io.wcm.testing.mock.aem.junit5.AemContext;


@ExtendWith({MockitoExtension.class})
class MagentoIdentityConnectorTest {
	private static final String AUTHORIZATION="Authorization";
	 String server = "https://dev-server.com";
	 String username = "username";
	 String password = "password";
	 String token = "Bearer ";
	 
	 
	public final AemContext context = new AemContext();
	private final MagentoIdentityConnector service = new MagentoIdentityConnector();
	private ObjectMapper mapper = new ObjectMapper();
	com.abbott.magento.identity.models.AuthCredentials authCredentials = new com.abbott.magento.identity.models.AuthCredentials(
			username, password);
	String productData = "{\r\n  \"id\": 1152,\r\n  \"sku\": \"64719e-1\",\r\n  \"name\": \"Similac® Alimentum®§§\",\r\n  \"attribute_set_id\": 4,\r\n  \"price\": 38.16,\r\n  \"status\": 2,\r\n  \"visibility\": 4,\r\n  \"type_id\": \"simple\",\r\n  \"created_at\": \"2020-04-20 15:52:02\",\r\n  \"updated_at\": \"2023-03-01 11:07:20\",\r\n  \"weight\": 2,\r\n  \"extension_attributes\": {\r\n    \"website_ids\": [\r\n      1,\r\n      3\r\n    ],\r\n    \"category_links\": [\r\n      {\r\n        \"position\": 317,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 171,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 10,\r\n        \"category_id\": \"45\"\r\n      },\r\n      {\r\n        \"position\": 17,\r\n        \"category_id\": \"45\"\r\n      }\r\n    ],\r\n    \"stock_item\": {\r\n      \"item_id\": 8601,\r\n      \"product_id\": 1152,\r\n      \"stock_id\": 1,\r\n      \"qty\": 0,\r\n      \"is_in_stock\": false,\r\n      \"is_qty_decimal\": false,\r\n      \"show_default_notification_message\": false,\r\n      \"use_config_min_qty\": true,\r\n      \"min_qty\": 0,\r\n      \"use_config_min_sale_qty\": 1,\r\n      \"min_sale_qty\": 1,\r\n      \"use_config_max_sale_qty\": true,\r\n      \"max_sale_qty\": 10000,\r\n      \"use_config_backorders\": true,\r\n      \"backorders\": 2,\r\n      \"use_config_notify_stock_qty\": true,\r\n      \"notify_stock_qty\": 1,\r\n      \"use_config_qty_increments\": true,\r\n      \"qty_increments\": 0,\r\n      \"use_config_enable_qty_inc\": true,\r\n      \"enable_qty_increments\": false,\r\n      \"use_config_manage_stock\": true,\r\n      \"manage_stock\": true,\r\n      \"low_stock_date\": \"2023-03-01 11:07:20\",\r\n      \"is_decimal_divided\": false,\r\n      \"stock_status_changed_auto\": 0\r\n    }\r\n  },\r\n  \"product_links\": [],\r\n  \"options\": [],\r\n  \"media_gallery_entries\": [\r\n    {\r\n      \"id\": 5574,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum\",\r\n      \"position\": 0,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-64719e-19-8-oz-powder-front_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5580,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Start feeling better today, within 24 hours\",\r\n      \"position\": 3,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-start-feeling-better-today_3.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5583,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Easy-to-digest hypoallergenic formula\",\r\n      \"position\": 4,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-easy-to-digest_1_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5586,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum, Number 1 pediatrician recommended brands based on combined recommendations of Similac and EleCare\",\r\n      \"position\": 5,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-recommended-brands_3.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5589,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac StrongMoms Rewards, Get up to $400 in rewards, visit similac.com/saveonalimentum to sign up and save. Offers may vary\",\r\n      \"position\": 6,\r\n      \"disabled\": false,\r\n      \"types\": [],\r\n      \"file\": \"/a/l/alimentum-strongmoms-offer_1_1.jpg\"\r\n    },\r\n    {\r\n      \"id\": 5577,\r\n      \"media_type\": \"image\",\r\n      \"label\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\",\r\n      \"position\": 7,\r\n      \"disabled\": true,\r\n      \"types\": [\r\n        \"image\",\r\n        \"small_image\",\r\n        \"thumbnail\"\r\n      ],\r\n      \"file\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    }\r\n  ],\r\n  \"tier_prices\": [\r\n    {\r\n      \"customer_group_id\": 1,\r\n      \"qty\": 1,\r\n      \"value\": 43.49,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 2,\r\n      \"qty\": 1,\r\n      \"value\": 26.09,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    },\r\n    {\r\n      \"customer_group_id\": 3,\r\n      \"qty\": 1,\r\n      \"value\": 26.09,\r\n      \"extension_attributes\": {\r\n        \"website_id\": 1\r\n      }\r\n    }\r\n  ],\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"product_flavor\",\r\n      \"value\": \"Infant Formula\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"glucerna_funnel_index\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_subscription\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"image\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"url_key\",\r\n      \"value\": \"alimentum-19-8ozcan-64719e-1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"gift_message_available\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"allow_trial\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aw_sarp2_subscription_type\",\r\n      \"value\": \"3\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"description\",\r\n      \"value\": \"<p>For food allergies and colic symptoms due to protein sensitivity.</p>\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"small_image\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"options_container\",\r\n      \"value\": \"container2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"gift_wrapping_available\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"parent_sku\",\r\n      \"value\": \"con033\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aw_sarp2_subscription_options\",\r\n      \"value\": []\r\n    },\r\n    {\r\n      \"attribute_code\": \"thumbnail\",\r\n      \"value\": \"/a/l/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_title\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder / 19.8 oz can \"\r\n    },\r\n    {\r\n      \"attribute_code\": \"subscribe_customer_group\",\r\n      \"value\": \"0,1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_keyword\",\r\n      \"value\": \"similac alimentum, hypoallergenic bay formula, formula for babies with colic, formula for infants with protein sensitivity\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"size\",\r\n      \"value\": \"5857\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"jet_product_status\",\r\n      \"value\": \"not_uploaded\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"meta_description\",\r\n      \"value\": \"Similac Alimentum is a nutritionally complete, hypoallergenic formula for infants, including those with colic symptoms due to protein sensitivity. Alimentum starts reducing colic symptoms due to protein sensitivity within 24 hours in most infants\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"msrp_display_actual_price_type\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"order_on_call\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_url\",\r\n      \"value\": \"/infant-and-child/similac/similac-alimentum/similac-alimentum-infant-formula-powder/alimentum-19-8ozcan-64719e-1.html\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"tax_class_id\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"dam_images\",\r\n      \"value\": \"/content/dam/abbott/images/64719e-1/alimentum-64719e-19-8-oz-powder-front-600x600-v2_1.jpg\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"required_options\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"one_time\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"has_options\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_form\",\r\n      \"value\": \"Powder\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"image_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"category_ids\",\r\n      \"value\": [\r\n        \"45\",\r\n        \"58\",\r\n        \"63\",\r\n        \"206\"\r\n      ]\r\n    },\r\n    {\r\n      \"attribute_code\": \"small_image_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"size_or_weight\",\r\n      \"value\": \"19.8 oz\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"thumbnail_label\",\r\n      \"value\": \"Similac Alimentum Hypoallergenic Infant Formula Powder, 19.8 oz can\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_name_flavour\",\r\n      \"value\": \"Similac Alimentum Infant Formula Powder\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_rush\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_returnable\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_recurring\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"mst_search_weight\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_featured\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_hazardous\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"group_size\",\r\n      \"value\": \"64719,64719e,64715e,64715\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"sub_brand\",\r\n      \"value\": \"Similac Alimentum\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"case_of_product\",\r\n      \"value\": \"null\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"aem_status\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_y\",\r\n      \"value\": \"SELECT 3 CANS\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"brand\",\r\n      \"value\": \"Similac\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"brand_name\",\r\n      \"value\": \"Similac\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_x\",\r\n      \"value\": \"SELECT 6 CANS\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"custom_discount\",\r\n      \"value\": \"10\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"metabolic_state\",\r\n      \"value\": \"null\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"forms\",\r\n      \"value\": \"6807\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"active\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"rma_able\",\r\n      \"value\": \"1\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"avalara_tax_id\",\r\n      \"value\": \"PF050001\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_y_min_update\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"cans_x_max_update\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_sold_qty\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"amazon_purchase\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"plans\",\r\n      \"value\": \"7209\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_gpas\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"product_family_order\",\r\n      \"value\": \"10000\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"order_in_family\",\r\n      \"value\": \"10000\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"is_recurring_discount\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"disable_sale\",\r\n      \"value\": \"0\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"threshold\",\r\n      \"value\": \"0\"\r\n    }\r\n  ]\r\n}";
	

	@Mock
	Response apiResponse;
	@Mock
	Request request;
	@Mock
	Content content;

	
	@BeforeEach
	void setUp() throws ClientProtocolException, IOException {
		MockitoAnnotations.openMocks(this);
		MagentoIdentityConnector.setServer(server);
		lenient().when(request.addHeader(AUTHORIZATION,token)).thenReturn(request);
		lenient().when(request.execute()).thenReturn(apiResponse);
		lenient().when(request.execute()).thenReturn(apiResponse);
		lenient(). when(apiResponse.returnContent()).thenReturn(content);

	}

	@Test()
	void testGetAdminToken() throws ClientProtocolException,IOException {
		 
		 try(MockedStatic<Request> requestPost = mockStatic(Request.class)){
			 mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			 when(request.bodyString(mapper.writeValueAsString(authCredentials), ContentType.APPLICATION_JSON)).thenReturn(request);
			 when(content.asString()).thenReturn("token");
			 requestPost.when(()-> Request.Post(server+"/rest/V1/integration/admin/token")).thenReturn(request);
			 MagentoIdentityConnector.getAdminToken(username,password);
			 Mockito.verify(request).execute();

		 }
		
 
	}
	
	@Test()
	void testGetCustomerToken() throws ClientProtocolException,IOException {
		 
		 try(MockedStatic<Request> requestPost = mockStatic(Request.class)){
			 mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			 
			Mockito.when(request.bodyString(mapper.writeValueAsString(authCredentials), ContentType.APPLICATION_JSON)).thenReturn(request);
			when(content.asString()).thenReturn(token);
			requestPost.when(()-> Request.Post(server+"/rest/V1/integration/customer/token")).thenReturn(request);
			service.getToken(username,password);
			Mockito.verify(request).execute();
			
		 }

	}

	
	@Test
	void testGetCustomer() throws ClientProtocolException, IOException{
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			
			 String customerDataPath = server + "/rest/V1/customers/me";
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(customerDataPath )).thenReturn(request);
		     service.getCustomer(token);
		     Mockito.verify(request).execute();
		}
	
	}
	
	@Test
	void testGetCustomerById() throws ClientProtocolException, IOException{
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 String id = "2";
			 String customerByIdPath = server + "/rest/V1/customers/"+id;
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(customerByIdPath )).thenReturn(request);
		     service.getCustomerById(id,token);
		     Mockito.verify(request).execute();
		}
	
	}
	
	@Test
	void testGetGroupName() throws IOException {
		
		try(MockedStatic<Request> requestGet = mockStatic(Request.class)){
			 long groupId = 25; 
			 String grpNamePath = server + "/rest/V1/customerGroups/"+ groupId;
			 when(content.asString()).thenReturn(productData);
			 requestGet.when(()-> Request.Get(grpNamePath )).thenReturn(request);
		    
		     service.getGroupName(groupId, token);
		     Mockito.verify(request).execute();
		}
		
	}


}
