package com.abbott.aem.bts.cybersecurity.components.model.impl;

import com.abbott.aem.bts.cybersecurity.components.model.CyberSecurityLayoutContainer;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class CyberSecurityLayoutContainerImplTest {

    private final AemContext ctx = new AemContext();

    @BeforeEach
    public void setUp() throws Exception {
        ctx.addModelsForClasses(CyberSecurityLayoutContainerImpl.class);
        ctx.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/cyberSecurityLayoutContainer.json", "/content");
    }

    @Test
    void testGetFileReference() {
        final String expected = "/content/dam/bts/cybersecurity/test.jpg";
        ctx.currentResource("/content/cyberSecurityLayoutContainer");
        CyberSecurityLayoutContainer cyberSecurityLayoutContainer = ctx.request().adaptTo(CyberSecurityLayoutContainer.class);
        String actual = cyberSecurityLayoutContainer.getFileReference();
        assertEquals(expected, actual);
    }

    @Test
    void testGetContainerVariation() {
        final String expected = "test";
        ctx.currentResource("/content/cyberSecurityLayoutContainer");
        CyberSecurityLayoutContainer cyberSecurityLayoutContainer = ctx.request().adaptTo(CyberSecurityLayoutContainer.class);
        String actual = cyberSecurityLayoutContainer.getContainerVariation();
        assertEquals(expected, actual);
    }

    @Test
    void testGetColumnList() {
        final List<Integer> expected = Arrays.asList(new Integer[]{1, 2, 3, 4, 5});
        ctx.currentResource("/content/cyberSecurityLayoutContainer");
        CyberSecurityLayoutContainer cyberSecurityLayoutContainer = ctx.request().adaptTo(CyberSecurityLayoutContainer.class);
        List<Integer> actual = cyberSecurityLayoutContainer.getColumnList();
        assertEquals(expected, actual);
        assertEquals(5, cyberSecurityLayoutContainer.getColumnCount());
    }

}
