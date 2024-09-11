package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.abbott.aem.an.similac.core.beans.ErrorBean;
import com.day.cq.wcm.api.Page;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GlobalVariableModel {

	@ScriptVariable
	private Page currentPage;

	@SlingObject
	private Resource resource;

	private String errorURI;

	private boolean displayTable = false;

	private String errorCodeJson;

	@Getter
	private List<ErrorBean> errorCodeData;

	@RequestAttribute
	private String errorPath;

	@PostConstruct
	public void activate() {
		if (currentPage.getPath().contains("utility-pages/error-dictionary")) {
			displayTable = true;
		}

		populateErrorCodeJsonData();
	}

	private void populateErrorCodeJsonData() {
		Resource parentResource = resource.getResourceResolver().getResource(errorPath);
		if (parentResource == null) {
			return;
		}

		errorURI = parentResource.getValueMap().get("errorURI", String.class);
		LinkHelperModel linkModel = new LinkHelperModel();
		linkModel.setLinkHref(errorURI);
		errorURI = linkModel.getLinkHref();

		if (!parentResource.hasChildren()) {
			return;
		}

		Resource codeParent = parentResource.getChild("errorCodeData");

		JsonArray errorCodeInfo = new JsonArray();
		errorCodeData = new ArrayList<>();
		Iterator<Resource> codeIterator = codeParent.listChildren();

		while (codeIterator.hasNext()) {
			Resource errorCode = codeIterator.next();
			ValueMap properties = errorCode.getValueMap();
			JsonObject codeJson = new JsonObject();

			String codeString = properties.get("errorCode", String.class);
			String codeMessage = properties.get("errorMessage", String.class);

			codeJson.add("errorCode", new JsonPrimitive(codeString));
			codeJson.add("errorMessage", new JsonPrimitive(codeMessage));
			errorCodeInfo.add(codeJson);

			ErrorBean error = new ErrorBean();
			error.setErrorCode(codeString);
			error.setErrorMessage(codeMessage);
			errorCodeData.add(error);
		}
		JsonObject errorCodes = new JsonObject();
		errorCodes.addProperty("errorPageURL", errorURI);
		errorCodes.add("errorCodeInfo", errorCodeInfo);
		errorCodeJson = errorCodes.toString();
	}

	public boolean isDisplayTable() {
		return displayTable;
	}

	public String getErrorCodeJson() {
		return errorCodeJson;
	}

	public String getErrorURI() {
		return errorURI;
	}
}
