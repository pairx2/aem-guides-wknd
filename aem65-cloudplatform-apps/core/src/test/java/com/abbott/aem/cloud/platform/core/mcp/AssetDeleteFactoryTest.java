package com.abbott.aem.cloud.platform.core.mcp;

import com.day.cq.replication.Replicator;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AssetDeleteFactoryTest {
    @InjectMocks
    private AssetDeleteFactory assetDeleteFactory;

    private final AemContext context = new AemContext();

    @Mock
    private Replicator replicator;

    @BeforeEach
    void onBefore() {
        context.registerService(Replicator.class, replicator);
    }

    @Test
    void testGetName() {
        String expected  = "Abbott Asset Delete";
        assertEquals(expected, assetDeleteFactory.getName());
    }

    @Test
    void testCreateProcessDefinitionInstance() {
        assertNotNull(assetDeleteFactory.createProcessDefinitionInstance());
    }
}