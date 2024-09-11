package com.abbott.aem.adc.freestylelibrede.services.impl;

import java.util.Collections;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;
import java.util.HashMap;
import java.util.Map;
import java.util.Locale;

import lombok.Getter;

import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.JcrConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.DamConstants;
import com.day.cq.dam.api.Asset;
import com.abbott.aem.adc.freestylelibrede.services.SickFundService;
import com.day.cq.dam.commons.util.DamUtil;

@Component(
        immediate = true,
        service = SickFundService.class)
public class SickFundServiceImpl implements SickFundService {
	private static final Logger LOG = LoggerFactory.getLogger(SickFundServiceImpl.class);
    protected final Map<String, String> resolveSickFundPdfs(Resource resource) {
        Iterator<Asset> assetItr = DamUtil.getAssets(resource);
        Map<String, String> languageToPdfMap = new HashMap<>();
        while (assetItr.hasNext()) {
            Asset asset = assetItr.next();
            String name = asset.getName();
            // sample document name DOC1_DE.pdf.
            // Getting locale(DE) from the name.
            String language = name.substring(name.lastIndexOf('_') + 1, name.lastIndexOf('.'));
            Locale locale = new Locale(language);
            if (StringUtils.isNotBlank(locale.getLanguage())) {
                languageToPdfMap.put(locale.getLanguage(), asset.getPath());
            }
        }
        return languageToPdfMap;
    }

    @Override
    public List<SickFundDocument> listSickFundDocuments(Resource resource) {
        List<SickFundDocument> list = new ArrayList<>();
        Iterator<Asset> assetItr = DamUtil.getAssets(resource);
        while (assetItr.hasNext()) {
            SickFundDocument document = fromAsset(assetItr.next());

            if (StringUtils.isNotBlank(document.getLanguage())) {
                list.add(document);
            }
        }

        return list;
    }

    @Override
    public List<SickFund> listSickFunds(ResourceResolver resolver, String sickFundPdfPath) {
        List<SickFund> sickFunds = new ArrayList<>();

        if (null != sickFundPdfPath) {
            Resource pdfDamResource = resolver.getResource(sickFundPdfPath);
            if (null != pdfDamResource) {
                Iterator<Resource> resIterator = pdfDamResource.listChildren();
                while (resIterator.hasNext()) {
                    Resource sickFundResource = resIterator.next();
                    if (!JcrConstants.JCR_CONTENT.equals(sickFundResource.getName())) {
                        sickFunds.add(new SickFundImpl(sickFundResource.getName(), listSickFundDocuments(sickFundResource)));
                    }
                }
            }
        }
        return sickFunds;
    }

    private SickFundDocument fromAsset(Asset asset) {

        String dcLanguage = asset.getMetadataValue(DamConstants.DC_LANGUAGE);
        if (dcLanguage != null && dcLanguage.length() > 2) {
            dcLanguage = dcLanguage.substring(0, 2).toLowerCase();
        }

        return new SickFundDocumentImpl(dcLanguage, asset.getPath());
    }


    private class SickFundImpl implements SickFund {
        private final String name;
        @Getter
        private final List<SickFundDocument> documents;

        private SickFundImpl(String name, List<SickFundDocument> documents) {
            this.name = name;
            this.documents = (documents == null ? null : Collections.unmodifiableList(documents));
        }

        public String getName() {
            return name;
        }

    }


    private class SickFundDocumentImpl implements SickFundDocument {

        private final String language;
        private final String path;

        private SickFundDocumentImpl(String language, String path) {
            this.language = language;
            this.path = path;
        }

        @Override
        public String getLanguage() {
            return language;
        }

        @Override
        public String getPath() {
            return path;
        }
    }
    
    @Override
    public Map<String, String> getContentFragmentRootPath(ResourceResolver resolver, String fragmentPath) {
		Map<String, String> sickFundMap = new HashMap<>();
		Resource rs = null;
		rs = resolver.getResource(fragmentPath);
		if (rs != null) {
			for (Resource child : rs.getChildren()) {
				try {
					ValueMap vm = child.getValueMap();
					if (!(child.getName().equalsIgnoreCase("master"))) {
						sickFundMap.put(child.getName(), vm.get("main", String.class));
					}
				} catch (RuntimeException ex) {
					LOG.error("Something went wrong while determining which model to use for resource {}",
							child.getPath(), ex);
				}
			}
		}
		return sickFundMap;
	}
}
