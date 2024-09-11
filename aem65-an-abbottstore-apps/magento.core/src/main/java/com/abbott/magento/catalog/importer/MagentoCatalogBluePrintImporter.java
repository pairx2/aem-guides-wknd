/*package com.abbott.magento.catalog.importer;

import java.io.IOException;
import java.util.ArrayList;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.catalog.connector.models.MagentoCategory;
import com.adobe.cq.commerce.pim.api.CatalogBlueprintImporter;
import com.adobe.cq.commerce.pim.common.AbstractBlueprintImporter;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;


@Component(metatype = false, label = "Magento 2 Catalog Blueprint Importer",
        description = "Catalog blueprint importer for Magento 2")
@Service
@Properties(value = {
        @Property(name = "service.description", value = "Magento 2 catalog blueprint importer"),
        @Property(name = "service.vendor", value = "abbott Digital"),
        @Property(name = "commerceProvider", value = "magento", propertyPrivate = true)
})
public class MagentoCatalogBluePrintImporter extends AbstractBlueprintImporter implements CatalogBlueprintImporter {
    private static final Logger log = LoggerFactory.getLogger(MagentoCatalogBluePrintImporter.class);
    protected MagentoCategory baseCatagory;
    protected String currentCatalogPath;
    protected MagentoConnectorService magentoConnectorService;
    private String catalogName = "";
    String theme = "";
    private String catalogTemplate = "";
    private String sectionTemplate = "";
    private String productTemplate = "";

    @Override
    protected boolean validateInput(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String server = request.getParameter("server");
        this.catalogName = request.getParameter("catalogName");

       String theme = request.getParameter("theme");

            this.catalogTemplate = "";
            this.sectionTemplate = "";
            this.productTemplate = "";


        magentoConnectorService = new MagentoConnectorService(server, username, password);
        baseCatagory = magentoConnectorService.getCategories();

        String provider = request.getParameter("provider");
        if (provider == null || provider.length() == 0) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "No catalog provider specified.");
            return false;
        }

        return true;
    }

    @Override
    protected void doImport(ResourceResolver resourceResolver, Node storeRoot, boolean incrementalImport)
            throws RepositoryException, IOException {

        Session session = resourceResolver.adaptTo(Session.class);

        String storePath = storeRoot.getPath();
        currentCatalogPath = null;

        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        Page catalog = null;
        try {
            catalog = createCatalog(pageManager, storePath, catalogName, session);
        } catch (WCMException e) {
			log.error("error creating category {}", e);
        }
        currentCatalogPath = catalog.getPath();
        Node contentNode = catalog.getContentResource().adaptTo(Node.class);
        setProperty(contentNode, "templates/catalog", catalogTemplate);
        setProperty(contentNode, "templates/section", sectionTemplate);
        setProperty(contentNode, "templates/product", productTemplate);
        setProperty(contentNode, "target/jcr_title", catalogName);


        for (MagentoCategory c :baseCatagory.childCategories) {
            addSection(resourceResolver, c, session, new ArrayList<String>());
        }
    }

    private void addSection(ResourceResolver resourceResolver, MagentoCategory category, Session session, ArrayList<String> parentPath){
        //boolean isActive = category.is_active; // need to account for disable categories
        //long position = category.position; // consider using position to order in JCR

        String sectionTitle = category.name;
        parentPath.add(sectionTitle);
        String[] hierarchy = parentPath.toArray(new String[0]);

        try {
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            Page section = createSection(pageManager, currentCatalogPath, hierarchy, sectionTitle, session);
            category.path = section.getPath().replace(currentCatalogPath, "");
            Node contentNode = section.getContentResource().adaptTo(Node.class);
            String tagString = "magento2:category/" + category.id;

            if (StringUtils.isNotEmpty(tagString)) {
                String[] matchTags = tagString.split(",");
                createMissingTags(resourceResolver, matchTags);
                setProperty(contentNode, "filter/matchTags", "[magento2:category/" + category.id + "]");
            }

            setProperty(contentNode, "target/jcr_title", sectionTitle);
        } catch (Exception e) {
            logMessage("ERROR creating section " + sectionTitle, true);
            log.error("Failed to create section " + sectionTitle, e);
        }

        for (MagentoCategory c :category.childCategories) {
            addSection(resourceResolver, c, session, new ArrayList<String>(parentPath));
        }
    }
}
*/