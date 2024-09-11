package com.abbott.magento.identity.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MagentoCustomerTest {

    MagentoCustomer customer;

    MagentoCustomer.Addresse addresse;

    MagentoCustomer.Addresse.Region region;

    @BeforeEach
    @Test
    void setUp() {
        region = new MagentoCustomer.Addresse.Region("regionCode", "regionName", 10L);
        addresse = new MagentoCustomer.Addresse(1L, 2L, region, 7L, "IN", new String[]{"street"}, "comp", "tel", "postcode", "city", "fname", "lname", true, true);
        MagentoCustomer.Addresse[] addresses = {addresse};
        customer = new MagentoCustomer(1L, 2L, "bill", "ship", "date", "updateDate", "createDate", "email", "fname", "lname", "1", 4L, 5L, addresses);
        customer = new MagentoCustomer(8L, 9L, "test bill", "test ship", "test date", "test updateDate", "test createDate", "test email", "test fname", "test lname", "2", 6L, 5L, addresses);

    }
}