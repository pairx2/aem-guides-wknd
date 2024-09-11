package com.abbott.aem.platform.common.components.models.impl.v1;
import com.abbott.aem.platform.common.components.models.AccountNavigation;
import com.abbott.aem.platform.common.components.models.AccountNavigationItem;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(AemContextExtension.class)

class AccountNavigationImplTest {

    private final AemContext ctx = new AemContext();

    @Mock
    private List<AccountNavigationItem> mocksectionItems;

    @Mock
    private AccountNavigationItem mockItem;

    @InjectMocks
    private AccountNavigationImpl accountNavigation;

    @Mock
    private Page mockPage;

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        when(mockPage.getPath()).thenReturn("/content/mypage");

        ctx.currentPage(mockPage);

        ctx.addModelsForClasses(AccountNavigationImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/AccountNavigationImplTest.json",
                "/content");
        ctx.currentResource("/content/accountnavigation");

    }

    @Test
    void testGetCustomerHeader() {
        final String expected = "Header";
        AccountNavigation  accountNavigation = ctx.request().adaptTo(AccountNavigation.class);
        String actual = accountNavigation.getCustomerHeader();
        assertEquals(expected, actual);
    }

    @Test
    void testGetLinkMultifield() {
        MockitoAnnotations.initMocks(this);
        AccountNavigationImpl accountNavigation = new AccountNavigationImpl();
        accountNavigation.linkMultifield = mocksectionItems;
        List<AccountNavigationItem> actualSectionItems = accountNavigation.getLinkMultifield();
        assertEquals(mocksectionItems, actualSectionItems);
    }

    @Test
    void testInitModel() {
        doNothing().when(mockItem).setActiveCss(anyString());

        List<AccountNavigationItem> mockLinkMultifield = Arrays.asList(mockItem);
        accountNavigation.linkMultifield = mockLinkMultifield;

        accountNavigation.initModel();

        verify(mockItem).setActiveCss("/content/mypage");
    }
}

