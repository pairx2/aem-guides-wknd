package com.abbott.aem.epd.acare.core.models.components.impl;
import com.abbott.aem.epd.acare.core.models.ExternalUrlModel;
import com.abbott.aem.epd.acare.core.models.components.LinkItem;
import com.abbott.aem.epd.acare.core.models.components.SocialImage;
import com.adobe.cq.sightly.SightlyWCMMode;
import junitx.util.PrivateAccessor;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import org.apache.sling.api.resource.Resource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class FooterEmailImplTest {

    @Mock
    FooterEmailImpl footerEmail;


    AemContext ctx = new AemContext();
    @Mock
    ProxyComponentService proxyComponentService;
    @Mock
    Component component;
    @Mock
    Page currentPage;
    @Mock
    Resource resource;
    @Mock
    InheritanceValueMap ivm;
    @Mock
    HierarchyNodeInheritanceValueMap map;
    @Mock
    PageManager pageManager;


    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    public ExternalUrlModel externalizerModel;
    @Mock
    public SightlyWCMMode wcmmode;
    List<LinkItem> mockLinkItem;
    List<SocialImage> mockSocialImage;

    @BeforeEach
    void setUp() throws Exception
    {
        proxyComponentService = mock(ProxyComponentService.class);
        component = mock(Component.class);
        ProxyPaths path1 = null;
        String path="https://www.abc.com/content/example.html?1_exp";
        lenient().when(proxyComponentService.getProxyPath(component, path1)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(FooterEmailImpl.class);
        ctx.load().json("/com/abbott/aem/epd/acare/core/models/components/impl/FooterEmailImplTest.json", "/content/footeremail");
        ivm = mock(InheritanceValueMap.class);
        lenient().when(currentPage.getContentResource()).thenReturn(resource);
        lenient().when(ivm.getInherited("assetDomain",String.class)).thenReturn("assetDomain");
        lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
        pageManager = mock(PageManager.class);
        currentPage = mock(Page.class);
        resource = mock(Resource.class);
        map = mock(HierarchyNodeInheritanceValueMap.class);
        wcmmode = mock(SightlyWCMMode.class);
        externalizerModel=mock(ExternalUrlModel.class);

    }
    @Test
    void testInit() {
        footerEmail.init();
        assertNotNull(footerEmail);
    }
    @Test
    void testGetAssetDomain()
    {
        final String expected = "SampleAssetText";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setAssetDomain(expected);
        String actual = footerEmail.getAssetDomain();
        assertEquals(expected, actual);
    }
    @Test
    void testGetDisclaimerText()
    {
        final String expected = "sampleDisclaimerText";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setDisclaimerText(expected);
        String actual = footerEmail.getDisclaimerText();
        assertEquals(expected, actual);
    }

    @Test
    void testGetFooterType()
    {
        final String expected = "SampleFooterTypeText";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setFooterType(expected);
        String actual = footerEmail.getFooterType();
        assertEquals(expected, actual);

    }
    @Test
    void testGetTextColor()
    {
        final String expected = "Black";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setTextColor(expected);
        String actual = footerEmail.getTextColor();
        assertEquals(expected, actual);

    }
    @Test
    void testGetSubscriptionText()
    {
        final String expected = "SampleSubscriptionText";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setSubscriptionText(expected);
        String actual = footerEmail.getSubscriptionText();
        assertEquals(expected, actual);

    }

    @Test
    void testGetLinkText()
    {
        final String expected = "SampleLinkText";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setLinkText(expected);
        String actual = footerEmail.getLinkText();
        assertEquals(expected, actual);

    }

    @Test
    void testGetFooterCtaText()
    {
        final String expected = "SampleFooterCtaText";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setFooterCtaText(expected);
        String actual = footerEmail.getFooterCtaText();
        assertEquals(expected, actual);

    }

    @Test
    void testGetArrowAltText()
    {
        final String expected = "SampleArrowAltText";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setArrowAltText(expected);
        String actual = footerEmail.getArrowAltText();
        assertEquals(expected, actual);

    }
    @Test
    void testGetFooterHeading()
    {
        final String expected = "SampleFooterHeading";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setFooterHeading(expected);
        String actual = footerEmail.getFooterHeading();
        assertEquals(expected, actual);

    }
    @Test
    void testGetFooterSubheading()
    {
        final String expected = "SampleFooterSubheading";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setFooterSubheading(expected);
        String actual = footerEmail.getFooterSubheading();
        assertEquals(expected, actual);

    }
    @Test
    void testGetCard1AltText()
    {
        final String expected = "SampleCard1AltText";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setCard1AltText(expected);
        String actual = footerEmail.getCard1AltText();
        assertEquals(expected, actual);

    }

    @Test
    void testGetCard1Title()
    {
        final String expected = "SampleCard1Title";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setCard1Title(expected);
        String actual = footerEmail.getCard1Title();
        assertEquals(expected, actual);
    }
    @Test
    void testGetCard1Subtitle()
    {
        final String expected = "SampleCard1Subtitle";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setCard1Subtitle(expected);
        String actual = footerEmail.getCard1Subtitle();
        assertEquals(expected, actual);

    }
    @Test
    void testGetCard2AltText()
    {
        final String expected = "SampleCard2AltText";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setCard2AltText(expected);
        String actual = footerEmail.getCard2AltText();
        assertEquals(expected, actual);

    }
    @Test
    void testGetCard2Title()
    {
        final String expected = "SampleCard2Title";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setCard2Title(expected);
        String actual = footerEmail.getCard2Title();
        assertEquals(expected, actual);

    }
    @Test
    void testGetCard2Subtitle()
    {
        final String expected = "SampleCard2Subtitle";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setCard2Subtitle(expected);
        String actual = footerEmail.getCard2Subtitle();
        assertEquals(expected, actual);
    }
    @Test
    void testGetSocialTileColor()
    {
        final String expected = "SampleSocialTileColor";
        ctx.currentResource("/content/footeremail");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setSocialTileColor(expected);
        String actual = footerEmail.getSocialTileColor();
        assertEquals(expected, actual);
    }
    @Test
    void testGetShortTitle()
    {
        final String expected = "SampleShortTitle";

        ctx.currentResource("/content/footeremail");

        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setShortTitle(expected);
        String actual = footerEmail.getShortTitle();
        assertEquals(expected, actual);
    }
    @Test
    void testGetImageTileColor()
    {
        final String expected = "Black";

        ctx.currentResource("/content/footeremail");

        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setImageTileColor(expected);
        String actual = footerEmail.getImageTileColor();
        assertEquals(expected, actual);
    }
    @Test
    void testGetImageTileAltText()
    {
        final String expected = "SampleImageTitleAltText";

        ctx.currentResource("/content/footeremail");

        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setImageTileAltText(expected);
        String actual = footerEmail.getImageTileAltText();
        assertEquals(expected, actual);
    }
    @Test
    void testGetLeftLogoAltText()
    {
        final String expected = "SampleLeftLogoAltText";

        ctx.currentResource("/content/footeremail");

        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setLeftLogoAltText(expected);
        String actual = footerEmail.getLeftLogoAltText();
        assertEquals(expected, actual);
    }
    @Test
    void testGetRightLogoAltText()
    {
        final String expected = "SampleRightLogoAltText";

        ctx.currentResource("/content/footeremail");

        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setRightLogoAltText(expected);
        String actual = footerEmail.getRightLogoAltText();
        assertEquals(expected, actual);
    }
    @Test
    void testGetLogoTileColor()
    {
        final String expected = "Black";

        ctx.currentResource("/content/footeremail");

        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        footerEmail.setLogoTileColor(expected);
        String actual = footerEmail.getLogoTileColor();
        assertEquals(expected, actual);
    }
   @Test
    void testGetLeftLogoLink() throws Exception{
        final String expected="https://www.abc.com/content/example.html?1_exp";
        lenient().when(externalizerModel.getExternalizedUrl(expected)).thenReturn("https://www.abc.com/content/example.html?1_exp");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        PrivateAccessor.setField(footerEmail,"leftLogoLink","https://www.abc.com/content/example.html?1_exp");
        footerEmail.setExternalizerModel(externalizerModel);
        String actual= footerEmail.getLeftLogoLink();

        assertEquals(expected, actual);

    }
    @Test
    void testGetRightLogoLink() throws Exception{
        final String expected="https://www.abc.com/content/sample.html?1_exp";
        lenient().when(externalizerModel.getExternalizedUrl(expected)).thenReturn("https://www.abc.com/content/sample.html?1_exp");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        PrivateAccessor.setField(footerEmail,"rightLogoLink","https://www.abc.com/content/sample.html?1_exp");
        footerEmail.setExternalizerModel(externalizerModel);
        String actual= footerEmail.getRightLogoLink();

        assertEquals(expected, actual);

    }

    @Test
    void testGetBGColor(){
        String expected ="#ffffff";
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        footerEmail.init();
        String actual = footerEmail.getBGColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetLeftLogo() throws Exception{
        String expected ="assetDomainSampleleftLogo";
        FooterEmailImpl footerEmail = new FooterEmailImpl(currentPage);
        footerEmail.init();
        lenient().when(wcmmode.isDisabled()).thenReturn(true);
        PrivateAccessor.setField(footerEmail,"leftLogo","SampleleftLogo");
        PrivateAccessor.setField(footerEmail,"assetDomain","assetDomain");
        footerEmail.setWcmmode(wcmmode);
        String actual=footerEmail.getLeftLogo();
        assertEquals(expected,actual);
    }

    @Test
    void testGetRightLogo() throws Exception{
        String expected ="assetDomainSamplerightLogo";
        FooterEmailImpl footerEmail = new FooterEmailImpl(currentPage);
        footerEmail.init();
        lenient().when(wcmmode.isDisabled()).thenReturn(true);
        PrivateAccessor.setField(footerEmail,"rightLogo","SamplerightLogo");
        PrivateAccessor.setField(footerEmail,"assetDomain","assetDomain");
        footerEmail.setWcmmode(wcmmode);
        String actual=footerEmail.getRightLogo();
        assertEquals(expected,actual);
    }

    @Test
    void testGetImageTileIf() throws Exception{
        String expected ="assetDomainSampleimageTile";
        FooterEmailImpl footerEmail = new FooterEmailImpl(currentPage);
        footerEmail.init();
        lenient().when(wcmmode.isDisabled()).thenReturn(true);
        PrivateAccessor.setField(footerEmail,"imageTile","SampleimageTile");
        PrivateAccessor.setField(footerEmail,"assetDomain","assetDomain");
        footerEmail.setWcmmode(wcmmode);
        String actual=footerEmail.getImageTile();
        assertEquals(expected,actual);

    }
    @Test
    void testGetImageTileElse() throws Exception{
        String expected ="SampleimageTile";
        FooterEmailImpl footerEmail = new FooterEmailImpl(currentPage);
        footerEmail.init();
        lenient().when(wcmmode.isDisabled()).thenReturn(false);
        PrivateAccessor.setField(footerEmail,"imageTile","SampleimageTile");
        PrivateAccessor.setField(footerEmail,"assetDomain","assetDomain");
        footerEmail.setWcmmode(wcmmode);
        String actual=footerEmail.getImageTile();
        assertEquals(expected,actual);

    }

    @Test
    void testGetFirstCardImageIf() throws Exception{
        String expected ="assetDomainSampleFirstCardimageTile";
        FooterEmailImpl footerEmail = new FooterEmailImpl(currentPage);
        footerEmail.init();
        lenient().when(wcmmode.isDisabled()).thenReturn(true);
        PrivateAccessor.setField(footerEmail,"card1Image","SampleFirstCardimageTile");
        PrivateAccessor.setField(footerEmail,"assetDomain","assetDomain");
        footerEmail.setWcmmode(wcmmode);
        String actual=footerEmail.getFirstCardImage();
        assertEquals(expected,actual);

    }
    @Test
    void testGetFirstCardImageElse() throws Exception{
        String expected ="SampleFirstCardimageTile";
        FooterEmailImpl footerEmail = new FooterEmailImpl(currentPage);
        footerEmail.init();
        lenient().when(wcmmode.isDisabled()).thenReturn(false);
        PrivateAccessor.setField(footerEmail,"card1Image","SampleFirstCardimageTile");
        PrivateAccessor.setField(footerEmail,"assetDomain","assetDomain");
        footerEmail.setWcmmode(wcmmode);
        String actual=footerEmail.getFirstCardImage();
        assertEquals(expected,actual);

    }
    @Test
    void testGetSecondCardImageIf() throws Exception{
        String expected ="assetDomainSampleSecondCardimageTile";
        FooterEmailImpl footerEmail = new FooterEmailImpl(currentPage);
        footerEmail.init();
        lenient().when(wcmmode.isDisabled()).thenReturn(true);
        PrivateAccessor.setField(footerEmail,"card2Image","SampleSecondCardimageTile");
        PrivateAccessor.setField(footerEmail,"assetDomain","assetDomain");
        footerEmail.setWcmmode(wcmmode);
        String actual=footerEmail.getSecondCardImage();
        assertEquals(expected,actual);

    }
    @Test
    void testGetSecondCardImageElse() throws Exception{
        String expected ="SampleSecondCardimageTile";
        FooterEmailImpl footerEmail = new FooterEmailImpl(currentPage);
        footerEmail.init();
        lenient().when(wcmmode.isDisabled()).thenReturn(false);
        PrivateAccessor.setField(footerEmail,"card2Image","SampleSecondCardimageTile");
        PrivateAccessor.setField(footerEmail,"assetDomain","assetDomain");
        footerEmail.setWcmmode(wcmmode);
        String actual=footerEmail.getSecondCardImage();
        assertEquals(expected,actual);

    }
    @Test
    void testGetArrowImage() throws Exception{
        String expected ="assetDomainSampleArrowimageTile";
        FooterEmailImpl footerEmail = new FooterEmailImpl(currentPage);
        footerEmail.init();
        lenient().when(wcmmode.isDisabled()).thenReturn(true);
        PrivateAccessor.setField(footerEmail,"arrowImage","SampleArrowimageTile");
        PrivateAccessor.setField(footerEmail,"assetDomain","assetDomain");
        footerEmail.setWcmmode(wcmmode);
        String actual=footerEmail.getArrowImage();
        assertEquals(expected,actual);

    }

    @Test
    void testGetSubscriptionLink() throws Exception{
        final String expected="https://www.abc.com/content/subscription.html";
        lenient().when(externalizerModel.getExternalizedUrl(expected)).thenReturn("https://www.abc.com/content/subscription.html");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        PrivateAccessor.setField(footerEmail,"subscriptionLink","https://www.abc.com/content/subscription.html");
        footerEmail.setExternalizerModel(externalizerModel);
        String actual= footerEmail.getSubscriptionLink();
        assertEquals(expected, actual);

    }

    @Test
    void testGetCard1Link() throws Exception{
        final String expected="https://www.abc.com/content/subscriptionCard1.html";
        lenient().when(externalizerModel.getExternalizedUrl(expected)).thenReturn("https://www.abc.com/content/subscriptionCard1.html");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        PrivateAccessor.setField(footerEmail,"card1Link","https://www.abc.com/content/subscriptionCard1.html");
        footerEmail.setExternalizerModel(externalizerModel);
        String actual= footerEmail.getCard1Link();
        assertEquals(expected, actual);

    }
    @Test
    void testGetCard2Link() throws Exception{
        final String expected="https://www.abc.com/content/subscriptionCard2.html";
        lenient().when(externalizerModel.getExternalizedUrl(expected)).thenReturn("https://www.abc.com/content/subscriptionCard2.html");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        PrivateAccessor.setField(footerEmail,"card2Link","https://www.abc.com/content/subscriptionCard2.html");
        footerEmail.setExternalizerModel(externalizerModel);
        String actual= footerEmail.getCard2Link();
        assertEquals(expected, actual);

    }

    @Test
    void testGetFooterCtaLink() throws Exception{
        final String expected="https://www.abc.com/content/footerCta.html";
        lenient().when(externalizerModel.getExternalizedUrl(expected)).thenReturn("https://www.abc.com/content/footerCta.html");
        FooterEmailImpl footerEmail= new FooterEmailImpl(currentPage);
        PrivateAccessor.setField(footerEmail,"footerCtaLink","https://www.abc.com/content/footerCta.html");
        footerEmail.setExternalizerModel(externalizerModel);
        String actual= footerEmail.getFooterCtaLink();
        assertEquals(expected, actual);

    }

    @Test
    void testGetLinkItem(){
        MockitoAnnotations.initMocks(this);
        FooterEmailImpl footerEmailImpl = new FooterEmailImpl(currentPage);
        footerEmailImpl.linkItem = mockLinkItem;
        List<LinkItem> actuallinkItem = footerEmailImpl.getLinkItem();
        assertEquals(mockLinkItem,actuallinkItem);

    }

    @Test
    void testGetSocialImage(){
        MockitoAnnotations.initMocks(this);
        FooterEmailImpl footerEmailImpl = new FooterEmailImpl(currentPage);
        footerEmailImpl.socialImage = mockSocialImage;
        List<SocialImage> actualSocialImage = footerEmailImpl.getSocialImage();
        assertEquals(mockSocialImage,actualSocialImage);
    }


}