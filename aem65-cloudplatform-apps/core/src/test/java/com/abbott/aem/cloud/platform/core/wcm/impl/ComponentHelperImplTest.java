package com.abbott.aem.cloud.platform.core.wcm.impl;

import com.abbott.aem.cloud.platform.core.wcm.ComponentEditType;
import com.day.cq.wcm.api.AuthoringUIMode;
import com.day.cq.wcm.api.WCMMode;
import com.day.cq.wcm.api.components.Component;
import com.day.cq.wcm.api.components.ComponentEditConfig;
import com.day.cq.wcm.api.components.ComponentManager;
import com.day.cq.wcm.api.components.DropTarget;
import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ComponentHelperImplTest {

    public AemContext context = new AemContext();

    private ComponentHelperImpl componentHelper;

    @BeforeEach
    void setUp() {
        componentHelper = new ComponentHelperImpl();
    }

    @Test
    void testIsDesignMode() {
        SlingHttpServletRequest request = context.request();
        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.DESIGN);

        assertTrue(componentHelper.isDesignMode(request));
    }

    @Test
    void testIsDisabledMode() {
        SlingHttpServletRequest request = context.request();
        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.DISABLED);

        assertTrue(componentHelper.isDisabledMode(request));
    }

    @Test
    void testIsEditMode() {
        SlingHttpServletRequest request = context.request();
        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.EDIT);

        assertTrue(componentHelper.isEditMode(request));
    }

    @Test
    void testIsPreviewMode() {
        SlingHttpServletRequest request = context.request();
        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.PREVIEW);

        assertTrue(componentHelper.isPreviewMode(request));
    }

    @Test
    void testIsReadOnlyMode() {
        SlingHttpServletRequest request = context.request();
        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.READ_ONLY);

        assertTrue(componentHelper.isReadOnlyMode(request));
    }

    @Test
    void testIsAuthoringModeInDesignMode() {
        SlingHttpServletRequest request = context.request();
        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.DESIGN);

        assertTrue(componentHelper.isAuthoringMode(request));
    }

    @Test
    void testIsAuthoringModeInEditMode() {
        SlingHttpServletRequest request = context.request();
        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.EDIT);

        assertTrue(componentHelper.isAuthoringMode(request));
    }

    @Test
    void testIsTouchAuthoringMode() {
        SlingHttpServletRequest request = context.request();
        request.setAttribute(AuthoringUIMode.class.getName(), AuthoringUIMode.TOUCH);

        assertTrue(componentHelper.isTouchAuthoringMode(request));
    }

    @Test
    void testPrintEditBlock_whenImageEdit() {
        ResourceResolver resourceResolver = mock(ResourceResolver.class);
        Resource resource = mock(Resource.class);
        ComponentManager componentManager = mock(ComponentManager.class);
        Component component = mock(Component.class);
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();

        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.EDIT);
        request.setResource(resource);
        when(resource.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(ComponentManager.class)).thenReturn(componentManager);

        when(componentManager.getComponentOfResource(resource)).thenReturn(component);
        when(component.getTitle()).thenReturn("Image");

        assertTrue(componentHelper.printEditBlock(request, response, ComponentEditType.IMAGE, false));
        String responseContent = response.getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"cq-image-placeholder\" alt=\"Image\" title=\"Image\"/>"));
    }

    @Test
    void testPrintEditBlock_whenImageDragAndDrop() {
        preparePrintEditBlockTest("ImageDragAndDrop", "media", "image");

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.DROPTARGETS, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"ImageDragAndDrop cq-image-placeholder\" alt=\"Drop Target: ImageDragAndDrop\" title=\"Drop Target: ImageDragAndDrop\"/>"));
    }

    @Test
    void testPrintEditBlock_whenVideoDragAndDrop() {
        preparePrintEditBlockTest("VideoDragAndDrop", "media", "video");

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.DROPTARGETS, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"VideoDragAndDrop cq-video-placeholder\" alt=\"Drop Target: VideoDragAndDrop\" title=\"Drop Target: VideoDragAndDrop\"/>"));
    }

    @Test
    void testPrintEditBlock_whenFlashDragAndDrop() {
        preparePrintEditBlockTest("FlashDragAndDrop", "media", "flash");

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.DROPTARGETS, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"FlashDragAndDrop cq-flash-placeholder\" alt=\"Drop Target: FlashDragAndDrop\" title=\"Drop Target: FlashDragAndDrop\"/>"));
    }

    @Test
    void testPrintEditBlock_whenFileDragAndDrop() {
        preparePrintEditBlockTest("FileDragAndDrop", "media", ".*");

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.DROPTARGETS, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"FileDragAndDrop cq-file-placeholder\" alt=\"Drop Target: FileDragAndDrop\" title=\"Drop Target: FileDragAndDrop\"/>"));
    }

    @Test
    void testPrintEditBlock_whenPageDragAndDrop() {
        preparePrintEditBlockTest("PageDragAndDrop", "page", "page");

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.DROPTARGETS, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"PageDragAndDrop cq-reference-placeholder\" alt=\"Drop Target: PageDragAndDrop\" title=\"Drop Target: PageDragAndDrop\"/>"));
    }

    @Test
    void testPrintEditBlock_whenMediaGroupIsEmpty() {
        preparePrintEditBlockTest("PageDragAndDrop", "", "");

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.DROPTARGETS, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"PageDragAndDrop cq-none-placeholder\" alt=\"Drop Target: PageDragAndDrop\" title=\"Drop Target: PageDragAndDrop\"/>"));
    }

    @Test
    void testPrintEditBlock_whenParagraphDragAndDrop() {
        preparePrintEditBlockTest("ParagraphDragAndDrop", "paragraph", "page");

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.DROPTARGETS, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"ParagraphDragAndDrop cq-reference-placeholder\" alt=\"Drop Target: ParagraphDragAndDrop\" title=\"Drop Target: ParagraphDragAndDrop\"/>"));
    }

    @Test
    void testPrintEditBlock_whenTextDragAndDrop() {
        preparePrintEditBlockTest("TextDragAndDrop", "text", "page");

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.DROPTARGETS, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"TextDragAndDrop cq-text-placeholder\" alt=\"Drop Target: TextDragAndDrop\" title=\"Drop Target: TextDragAndDrop\"/>"));
    }

    @Test
    void testPrintEditBlock_whenDefaultTextDragAndDrop() {
        preparePrintEditBlockTest("TextDragAndDrop", "media", null);

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.DROPTARGETS, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<img src=\\\"cq/ui/resources/0.gif\\\" class=\"TextDragAndDrop cq-text-placeholder\" alt=\"Drop Target: TextDragAndDrop\" title=\"Drop Target: TextDragAndDrop\"/>"));
    }

    @Test
    void testPrintEditBlock_whenEditingNoIconType() {
        preparePrintEditBlockTest("NoIconEdit", "media", "image");

        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.NOICON, null));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("<dt>NoIconEdit Component</dt>"));
    }

    @Test
    void testPrintEditBlock_noEditInDesignMode() {
        context.request().setAttribute(WCMMode.class.getName(), WCMMode.DESIGN);
        assertFalse(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.IMAGE));
        String responseContent = context.response().getOutputAsString();
        assertEquals("", responseContent);
    }

    @Test
    void testPrintEditBlock_whenNoneEditPlaceholder() {
        context.request().setAttribute(WCMMode.class.getName(), WCMMode.EDIT);
        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.NONE, false));
        String responseContent = context.response().getOutputAsString();
        assertEquals("<!-- Edit Mode Placeholder is specified as: NONE -->", responseContent);
    }

    @Test
    void testPrintEditBlock_whenNoCqComponent() {
        context.request().setAttribute(WCMMode.class.getName(), WCMMode.EDIT);
        assertTrue(componentHelper.printEditBlock(context.request(), context.response(), ComponentEditType.TEXT, false));
        String responseContent = context.response().getOutputAsString();
        assertTrue(responseContent.contains("Could not resolve CQ Component type."));
    }

    @Test
    void testPrintEditBlock_whenIOException() throws IOException {
        preparePrintEditBlockTest("exception", "media", "");
        SlingHttpServletResponse response = mock(SlingHttpServletResponse.class);
        doThrow(new IOException("IOE")).when(response).getWriter();

        assertFalse(componentHelper.printEditBlock(context.request(), response, ComponentEditType.IMAGE, false));
        String responseContent = context.response().getOutputAsString();
        assertEquals("", responseContent);
    }

    @Test
    void testPrintEditBlockOrNothing_whenInAuthoringMode() {
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        request.setAttribute(WCMMode.class.getName(), WCMMode.EDIT);

        assertFalse(componentHelper.printEditBlockOrNothing(request, response, ComponentEditType.IMAGE));
        String responseContent = response.getOutputAsString();
        assertEquals("", responseContent);
    }

    @Test
    void testPrintEditBlockOrNothingInPreviewMode() throws IOException {
        SlingHttpServletRequest request = context.request();
        SlingHttpServletResponse response = context.response();
        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.PREVIEW);

        assertFalse(componentHelper.printEditBlockOrNothing(request, response, ComponentEditType.IMAGE, true));

        String responseContent = response.getWriter().toString();
        assertFalse(responseContent.contains("<img src=\"cq/ui/resources/0.gif\" class=\"cq-image-placeholder\" alt=\"Image\" title=\"Image\" />"));
    }

    @Test
    void testPrintDDEditBlock() {
        preparePrintEditBlockTest("PrintDD", "media", "image");

        assertTrue(componentHelper.printDDEditBlock(context.request(), context.response(), "PrintDD", false));
        String responseContent = context.response().getOutputAsString();
        assertEquals("<img src=\\\"cq/ui/resources/0.gif\\\"  class=\"PrintDD cq-image-placeholder\" alt=\"Drop Target: PrintDD\" title=\"Drop Target: PrintDD\"/>", responseContent);
    }

    @Test
    void testPrintDDEditBlock_whenIOException() throws IOException {
        preparePrintEditBlockTest("Exception", "media", "image");
        SlingHttpServletResponse response = mock(SlingHttpServletResponse.class);
        doThrow(new IOException("IOE")).when(response).getWriter();

        assertFalse(componentHelper.printDDEditBlock(context.request(), response, "Exception", false));
        String responseContent = context.response().getOutputAsString();
        assertEquals("", responseContent);
    }

    @Test
    void testPrintDDEditBlock_whenDragAnDropTargetNotMatched() {
        preparePrintEditBlockTest("PrintDD", "media", "image");

        assertTrue(componentHelper.printDDEditBlock(context.request(), context.response(), "name", false));
        String responseContent = context.response().getOutputAsString();
        assertEquals("", responseContent);
    }

    @Test
    void testPrintDDEditBlock_whenNoEditMode() {
        context.request().setAttribute(WCMMode.class.getName(), WCMMode.DESIGN);

        assertFalse(componentHelper.printDDEditBlock(context.request(), context.response(), "name", true));
        String responseContent = context.response().getOutputAsString();
        assertEquals("", responseContent);
    }


    @Test
    void testGetDDEditBlock() {
        context.request().setAttribute(WCMMode.class.getName(), WCMMode.DESIGN);

        assertNull(componentHelper.getDDEditBlock(context.request(), "name", true));
    }
    
    void preparePrintEditBlockTest(String type, String group, String accept) {
        ResourceResolver resourceResolver = mock(ResourceResolver.class);
        Resource resource = mock(Resource.class);
        ComponentManager componentManager = mock(ComponentManager.class);
        Component component = mock(Component.class);
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();

        request.setAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME, WCMMode.EDIT);
        request.setResource(resource);
        when(resource.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(ComponentManager.class)).thenReturn(componentManager);

        when(componentManager.getComponentOfResource(resource)).thenReturn(component);
        when(component.getTitle()).thenReturn(type);

        ComponentEditConfig editConfig = mock(ComponentEditConfig.class);
        DropTarget dropTarget = mock(DropTarget.class);
        Map<String, DropTarget> dropTargets = new HashMap<>();
        dropTargets.put(type, dropTarget);
        when(component.getEditConfig()).thenReturn(editConfig);
        when(component.isEditable()).thenReturn(true, false);
        when(component.isDesignable()).thenReturn(true, false);
        when(editConfig.getDropTargets()).thenReturn(dropTargets);
        when(dropTarget.getId()).thenReturn(type);
        when(dropTarget.getName()).thenReturn(type);
        String [] groupType = !group.isEmpty() ? new String[]{group} : new String[]{};
        String [] acceptType = (Objects.isNull(accept) || !accept.isEmpty())  ? new String[]{accept} : new String[]{};
        when(dropTarget.getGroups()).thenReturn(groupType);
        when(dropTarget.getAccept()).thenReturn(acceptType);
    }

    @Test
    void testGetEditIconImgTag(){
        String actual = componentHelper.getEditIconImgTag(ComponentEditType.REFERENCE);
        assertEquals("<img src=\\\"cq/ui/resources/0.gif\\\"  class=\"cq-reference-placeholder\" alt=\"REFERENCE\" title=\"REFERENCE\" />", actual);
    }
}