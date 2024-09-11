package com.abbott.aem.an.similac.core.models;

import static com.abbott.aem.an.similac.core.utils.CommonConstants.AMAZON;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.OFFER_TYPE;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.TARGET_OFFLINE;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.TARGET_ONLINE;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.TPG;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.UNIQUE_ID;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.RetailerBean;
import com.abbott.aem.an.similac.core.beans.RetailerBean.Retailer;
import com.abbott.aem.an.similac.core.beans.RetailerSelectedBean;

/**
 * RetailerModel is the SlingModel to hold the details of retailer components
 * 
 * @author Cognizant
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = {
		@ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class RetailerModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(RetailerModel.class);

	private static final String LABEL = "label";

	private static final String RETAILER_DESCRIPTION = "retailerDescription";

	private static final String VALUE = "value";
	
	private static final String AVAILABLE = "isAvailable";
	
	private static final String LINE_ONE = "lineOneTxt";
	
	private static final String LINE_TWO = "lineTwoTxt";

	private static final String IMAGE_URL = "imgUrl";

	private static final String IMAGE_SM_URL = "imgSMUrl";

	private static final String PAGE_URL = "pageUrl";
	
	private static final String EVENT_LABEL = "retailerEventLabel";
	
	private static final String SELECT_EVENT_LABEL = "selectEventLabel";

	@SlingObject
	private Resource resource;

	@ChildResource(name = "retailerList")
	private Resource retailerList;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String retailerNote;

	@ValueMapValue
	private String subTitle;

	@ValueMapValue
	private String retailerPageUrl;

	@ValueMapValue
	private String error;
	
	@ValueMapValue
	private String selectRetailerLabel;

	@ValueMapValue
	private String deSelectRetailerLabel;
	
	@ValueMapValue
	private String deSelectRetailerEventLabel;
		
	@ValueMapValue
	private String selectedRetailer;
	
	@ValueMapValue
	private String selectedRetailerNote;

	@ValueMapValue
	private String amazonNote;

	@ValueMapValue
	private String targetOnlineNote;

	@ValueMapValue
	private String targetInStoreNote;

	@ValueMapValue
	private String tpgNote;
	
	@ValueMapValue
	private String submitButtonLabel;
	
	@ValueMapValue
	private String cancelButtonLabel;
	
	@ValueMapValue
	private String amazonRO;
	
	@ValueMapValue
	private String tpgRO;
	
	@ValueMapValue
	private String targetOnlineRO;
	
	@ValueMapValue
	private String targetOfflineRO;

	private RetailerBean retailerBean;
	
	private RetailerSelectedBean retailerSelected = new RetailerSelectedBean();

	private Map<String, Retailer> retailerMap = new LinkedHashMap<>();

	@PostConstruct
	private void initMethod() {
		populateRetailer();
	}

	/**
	 * This method will populate the Retailer object
	 */
	public void populateRetailer() {

		retailerBean = new RetailerBean();
		retailerBean.setTitle(title);
		retailerBean.setRetailerNote(retailerNote);
		retailerBean.setSubTitle(subTitle);
		retailerBean.setRetailerPageUrl(retailerPageUrl);
		retailerBean.setError(error);
		retailerBean.setSelectRetailerLabel(selectRetailerLabel);
		retailerBean.setDeSelectRetailerLabel(deSelectRetailerLabel);
		retailerBean.setDataGtmLabel(deSelectRetailerEventLabel);
		retailerBean.setRetailersList(getRetailerList(retailerList));
		retailerBean.setRetailerSelected(getRetailerSelected());
	}


	/**
	 * This methods will return the retailer map
	 * 
	 * @param retailerResource
	 * @return Map<String, Retailer>
	 */
	public Map<String, Retailer> getRetailerList(Resource retailerResource) {

		Node node = retailerResource.adaptTo(Node.class);
		if (node == null) {
			return retailerMap;
		}
		try {
			NodeIterator nodeIterator = node.getNodes();
			while (nodeIterator.hasNext()) {
				Node currentRetailerNode = nodeIterator.nextNode();
				Retailer retailer = populateRetailerList(currentRetailerNode);
				if (retailer.getLabel() != null) {
					if (currentRetailerNode.hasProperty(UNIQUE_ID)) {
						retailerMap.put(currentRetailerNode.getProperty(UNIQUE_ID).getValue().getString(), retailer);
					} else {
						retailerMap.put(retailer.getValue().toLowerCase(), retailer);
					}
				}
			}
		} catch (RepositoryException e) {
			LOGGER.error("Exception in getRetailerList :: ",e);
		}

		return retailerMap;
	}

	/**
	 * This methods will populate the retailer object
	 * 
	 * @param childNode
	 * @return Retailer
	 * @throws RepositoryException
	 */
	private Retailer populateRetailerList(Node childNode) throws RepositoryException {

		Retailer retailer = new RetailerBean().new Retailer();
		if (childNode.hasProperty(LABEL)) {
			retailer.setLabel(childNode.getProperty(LABEL).getValue().getString());
		}
		if (childNode.hasProperty(RETAILER_DESCRIPTION)) {
			retailer.setRetailerDescription(childNode.getProperty(RETAILER_DESCRIPTION).getValue().getString());
		}
		if (childNode.hasProperty(VALUE)) {
			retailer.setValue(childNode.getProperty(VALUE).getValue().getString());
		}
		if (childNode.hasProperty(AVAILABLE)) {
			retailer.setIsAvailable(childNode.getProperty(AVAILABLE).getValue().getBoolean());
		}
		if (childNode.hasProperty(LINE_ONE)) {
			retailer.setLineOneTxt(childNode.getProperty(LINE_ONE).getValue().getString());
		}
		if (childNode.hasProperty(LINE_TWO)) {
			retailer.setLineTwoTxt(childNode.getProperty(LINE_TWO).getValue().getString());
		}
		if (childNode.hasProperty(IMAGE_URL)) {
			retailer.setImgUrl(childNode.getProperty(IMAGE_URL).getValue().getString());
		}
		if (childNode.hasProperty(IMAGE_SM_URL)) {
			retailer.setImgSMUrl(childNode.getProperty(IMAGE_SM_URL).getValue().getString());
		}
		if (childNode.hasProperty(PAGE_URL)) {
			retailer.setPageUrl(childNode.getProperty(PAGE_URL).getValue().getString());
		}
		if (childNode.hasProperty(OFFER_TYPE)) {
			retailer.setOfferType(childNode.getProperty(OFFER_TYPE).getValue().getString());
		}
		if (childNode.hasProperty(EVENT_LABEL)) {			
				retailer.setDataGtmLabel(childNode.getProperty(EVENT_LABEL).getValue().getString()); 			
		}
		if (childNode.hasProperty(SELECT_EVENT_LABEL)) {
			retailer.setDataGtmSelectLabel(childNode.getProperty(SELECT_EVENT_LABEL).getValue().getString());			
		}
		return retailer;
	}

	/**
	 * Populate the Retailer Selected Bean object
	 * 
	 * @return The populated Retailer Selected Bean object
	 */
	private RetailerSelectedBean getRetailerSelected() {
		Map<String, String> retailerOption = new LinkedHashMap<>();
		retailerOption.put(AMAZON, amazonRO);
		retailerOption.put(TPG, tpgRO);
		retailerOption.put(TARGET_ONLINE, targetOnlineRO);
		retailerOption.put(TARGET_OFFLINE, targetOfflineRO);

		retailerSelected.setSelectedRetailer(selectedRetailer);
		retailerSelected.setSelectedRetailerNote(selectedRetailerNote);
		retailerSelected.setAmazonNote(amazonNote);
		retailerSelected.setTargetInStoreNote(targetInStoreNote);
		retailerSelected.setTargetOnlineNote(targetOnlineNote);
		retailerSelected.setTpgNote(tpgNote);
		retailerSelected.setSubmitButtonLabel(submitButtonLabel);
		retailerSelected.setCancelButtonLabel(cancelButtonLabel);
		retailerSelected.setRetailerOption(retailerOption);
		return retailerSelected;
	}

	/**
	 * This methods will return the retailer bean object
	 * 
	 * @return RetailerBean
	 */
	public RetailerBean getRetailer() {
		return retailerBean;
	}

}