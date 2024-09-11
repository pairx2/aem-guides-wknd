package com.abbott.aem.adc.freestylelibrede.models;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.models.spi.Injector;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.CsrConfigurationService;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.services.TreeTagService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class WebToCaseModelTest extends BaseModelTest<WebToCaseModel> {

    public final AemContext context = new AemContext();

    @Mock
    TreeTagService treeTagService;

    @InjectMocks
    ExternalizeInjector externalizeInjector = new ExternalizeInjector();
    @Mock
    ExternalizerService externalizerService;

    @Mock
    CsrConfigurationService csrConfigurationService;

    @InjectMocks
    private WebToCaseModel model;

    private final List<TreeTag> treeTagList = new ArrayList<>();

    private TreeTag treeTag = new TreeTag("","",null);

    @BeforeEach
    void setup(){
        Mockito.when(externalizerService.externalizeIfNecessary(any(),any())).thenReturn("www.freestylelibre.de/page");
        context.registerService( Injector.class,externalizeInjector);
        context.registerService(TreeTagService.class, treeTagService);
        context.registerService(ExternalizerService.class, externalizerService);
        context.registerService(CsrConfigurationService.class,csrConfigurationService);
        treeTagList.add(treeTag);

        Mockito.when(treeTagService.resolveTreeTags(Mockito.any(),Mockito.any(),Mockito.anyString(),Mockito.anyInt(),Mockito.anyBoolean())).thenReturn(treeTagList);



        model = (WebToCaseModel) loadModel(WebToCaseModel.class);

    }

    @Test
    void getHeading() {
        Assert.assertEquals("Web2Case Title",model.getHeading());
    }

    @Test
    void getPrivacyPolicy() {
        Assert.assertEquals("www.freestylelibre.de/page",model.getPrivacyPolicy());
    }

    @Test
    void getSalutationID() {
        Assert.assertEquals("id_salutation",model.getSalutationID());
    }

    @Test
    void getFirstNameID() {
        Assert.assertEquals("id_fn",model.getFirstNameID());
    }

    @Test
    void getLastNameID() {
        Assert.assertEquals("id_ln",model.getLastNameID());
    }

    @Test
    void getEmailID() {
        Assert.assertEquals("id_email",model.getEmailID());
    }

    @Test
    void getKvnrID() {
        Assert.assertEquals("id_kvnr",model.getKvnrID());
    }

    @Test
    void getCustomerID() {
        Assert.assertEquals("id_customer",model.getCustomerID());
    }

    @Test
    void getZipcodeID() {
        Assert.assertEquals("id_zipcode",model.getZipcodeID());
    }

    @Test
    void getStreetID() {
        Assert.assertEquals("id_street",model.getStreetID());
    }

    @Test
    void getCityID() {
        Assert.assertEquals("id_city",model.getCityID());
    }

    @Test
    void getProductCategoryID() {
        Assert.assertEquals("id_pc",model.getProductCategoryID());
    }

    @Test
    void getContactCategoryID() {
        Assert.assertEquals("id_cc",model.getContactCategoryID());
    }

    @Test
    void getContactReasonID() {
        Assert.assertEquals("id_cr",model.getContactReasonID());
    }

    @Test
    void getCallBackCaseID() {
        Assert.assertEquals("id_callback",model.getCallBackCaseID());
    }

    @Test
    void getRetURL() {
        Assert.assertEquals("www.freestylelibre.de/page",model.getRetURL());
    }

    @Test
    void getRootTag() {
        Assert.assertEquals("/content/cq:tags/adc/freestylelibrede/web-to-case",model.getRootTag());
    }

    @Test
    void getProductCategoryTags() {
        Assert.assertEquals(treeTagList,model.getProductCategoryTags());
        Mockito.verify(treeTagService).resolveTreeTags(Mockito.any(),Mockito.any()
                ,eq("/content/cq:tags/adc/freestylelibrede/web-to-case"),eq(3),eq(true));
    }

    @Test
    void getSalesforceURL() {
        Mockito.when(csrConfigurationService.getEndpoint()).thenReturn("http://www.salesforce.com");
        Assert.assertEquals("http://www.salesforce.com",model.getSalesforceURL());
    }

    @Test
    void getSalesforceOrgId(){
        Mockito.when(csrConfigurationService.getOrgId()).thenReturn("org-1234");
        Assert.assertEquals("org-1234",model.getSalesforceOrgId());
    }

     @Test
    public void doNotCallTreeTagIfNoRootTag(){
        model = (WebToCaseModel) loadModel("/com.abbott.aem.adc.freestylelibrede.models.WebToCaseModelNoRootTag.json",WebToCaseModel.class);
        Mockito.verifyZeroInteractions(treeTagService);
    }

}