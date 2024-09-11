package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.ProductTile;
import com.abbott.aem.platform.common.components.models.commerce.utils.CommerceConstants;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ExporterConstants;
import com.shopify.graphql.support.SchemaViolationError;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Model(adaptables = SlingHttpServletRequest.class, adapters = ProductTile.class, resourceType = ProductTileImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ProductTileImpl extends CifAuthoredProductImpl implements ProductTile {
    protected static final String RESOURCE_TYPE = "abbott-platform/components/commerce/producttile/v1/producttile";
    protected static final String PRODUCT_BADGE = "productBadge";
    protected static final String CTA_OVERRIDE = "ctaOverride";
    protected static final String PDP_LINK_URL = "pdpLinkUrl";
    protected static final String PRICE_TO_SHOW = "priceToShow";
    protected static final String BADGE = "badge";
    protected static final String BADGE_TEXT_VALUE = "badge_text_value";
    protected static final String INCLUDES = "includes";
    protected static final String NORMAL = "normal";
    protected static final String SINGLE_PURCHASE = "singlePurchase";
    protected static final String OUT_OF_STOCK_TITLE = "outOfStockTitle";
    protected static final String OUT_OF_STOCK_MESSAGE = "outOfStockMessage";
    protected static final String STOCK_ALERT_LINK_TEXT = "stockAlertLinkText";
    protected static final String STOCK_ALERT_STATIC_TEXT = "stockAlertStaticText";
    protected static final String SHOW_FREE_DELIVERY_LABEL = "showFreeDeliveryLabel";
    protected static final String VIEW_PRODUCT_TRACKING = "viewProductAATracking";
    protected static final String ADD_TO_CART_AA_TRACKING = "addToCartAATracking";
    protected static final String ENABLE_LOYALTY_POINTS = "enableLoyaltyPoints";
    protected static final String SHOW_BUY_NOW_BUTTON = "showBuyNowButton";
    protected static final String SUBSCRIPTION_OPTIONS = "subscriptionOptions";

    @Override
    @PostConstruct
    public void initModel(){
        try {
            //Standalone product, authored at component level
            productRetriever = product.getProductRetriever();
            if (productRetriever!=null) {
                String sku = properties.get(SELECTION_PROPERTY, String.class);
                log.debug("Product Sku authored: {}", sku);
                if (StringUtils.isNotBlank(sku)) {
                    productRetriever.setIdentifier(sku);
                }
            productRetriever.extendProductQueryWith(p -> p.addCustomSimpleField(BADGE));
            productRetriever.extendProductQueryWith(p -> p.addCustomSimpleField(BADGE_TEXT_VALUE));
            productRetriever.extendProductQueryWith(p -> p.addCustomSimpleField(INCLUDES));
            } else{
                log.debug("productRetriever is null. Cannot initialize ProductTileImpl model");
            }
            }
        catch(Exception e){
            log.debug("Unexpected Exception caught: " + e.getMessage());
        }
    }

    @Override
    public String getBadge() {
        try {
            return Objects.nonNull(properties.get(PRODUCT_BADGE)) && StringUtils.isNotBlank(properties.get(PRODUCT_BADGE).toString()) ? properties.get(PRODUCT_BADGE).toString() : productRetriever.fetchProduct().getAsString(BADGE_TEXT_VALUE);
        } catch (SchemaViolationError e) {
            log.info("Unable to get the 'badge_text_value' attribute {}, maybe it doesn't exist for this store", e.getMessage(), e);
            return StringUtils.EMPTY;
        } catch (RuntimeException e) {
            log.error("fetchProduct() failed at {} while getting the 'badge_text_value' attribute", currentPage.getPath());
            return StringUtils.EMPTY;
        }
    }

    @Override
    public List<String> getIncludes() {
        List<String> includes = new ArrayList<>();
        try {
            for (String option : productRetriever.fetchProduct().getAsString(INCLUDES).split(",")) {
                if (StringUtils.isNotBlank(option.trim())) {
                    includes.add(option.trim());
                }
            }
        } catch(SchemaViolationError e) {
            log.info("Unable to get the 'includes' attribute {}, maybe it doesn't exist for this store", e.getMessage(), e);
        } catch (RuntimeException e) {
            log.error("fetchProduct() failed at {} while getting the 'includes' attribute", currentPage.getPath());
        }
        return includes;
    }

    @Override
    public String getCtaOverride() {
        return Objects.nonNull(properties.get(CTA_OVERRIDE)) && StringUtils.isNotBlank(properties.get(CTA_OVERRIDE).toString()) ? properties.get(CTA_OVERRIDE).toString() : CommerceConstants.ADD_TO_CART;
    }

    @Override
    public String getPdpLinkUrl() {
        if (Objects.nonNull(properties.get(PDP_LINK_URL)) && StringUtils.isNotBlank(properties.get(PDP_LINK_URL).toString())) {
            String pdpUrl = properties.get(PDP_LINK_URL).toString();
            return PageUtil.getUrl(pdpUrl,request.getResourceResolver());
        }
        return StringUtils.EMPTY;
    }

    @Override
    public String getPriceToShow() {
        return Objects.nonNull(properties.get(PRICE_TO_SHOW)) && StringUtils.isNotBlank(properties.get(PRICE_TO_SHOW).toString()) ? properties.get(PRICE_TO_SHOW).toString() : NORMAL;
    }

    @Override
    public String getSku(){
        return properties.get(SELECTION_PROPERTY, String.class);
    }

    @Override
    public String getOutOfStockTitle() {
        return properties.get(OUT_OF_STOCK_TITLE, String.class);
    }

    @Override
    public String getOutOfStockMessage() {
        return properties.get(OUT_OF_STOCK_MESSAGE, String.class);
    }

    @Override
    public String getStockAlertLinkText() {
        return properties.get(STOCK_ALERT_LINK_TEXT, String.class);
    }

    @Override
    public String getStockAlertStaticText() {
        return properties.get(STOCK_ALERT_STATIC_TEXT, String.class);
    }

    @Override
    public String isShowFreeDeliveryLabel() {
        return properties.get(SHOW_FREE_DELIVERY_LABEL, String.class);
    }

    @Override
    public String isViewProductAATracking() {
        return properties.get(VIEW_PRODUCT_TRACKING, String.class);
    }

    @Override
    public String isAddToCartAATracking() {
        return properties.get(ADD_TO_CART_AA_TRACKING, String.class);
    }

    @Override
    public String isEnableLoyaltyPoints() { return properties.get(ENABLE_LOYALTY_POINTS, String.class);}

    @Override
    public String isShowBuyNowButton() {
        return properties.get(SHOW_BUY_NOW_BUTTON, String.class);
    }

    @Override
    public String getSubscriptionOptions() {
        return Objects.nonNull(properties.get(SUBSCRIPTION_OPTIONS)) && StringUtils.isNotBlank(properties.get(SUBSCRIPTION_OPTIONS).toString()) ? properties.get(SUBSCRIPTION_OPTIONS).toString() : SINGLE_PURCHASE;

    }
}
