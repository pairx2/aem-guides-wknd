package com.abbott.magento.core.connector.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MagentoAddress {
        public final String regionCode;
        public final String countryId;
        public final String[] street;
        public final String telephone;
        public final String postcode;
        public final String city;
        public final String firstname;
        public final String lastname;

        @SuppressWarnings("PackageAccessibility")
        @JsonCreator
        public MagentoAddress(@JsonProperty("regionCode") String regionCode, @JsonProperty("countryId") String countryId, @JsonProperty("street") String[] street, @JsonProperty("telephone") String telephone, @JsonProperty("postcode") String postcode, @JsonProperty("city") String city, @JsonProperty("firstname") String firstname, @JsonProperty("lastname") String lastname){
            this.regionCode = regionCode;
            this.countryId = countryId;
            this.street = street;
            this.telephone = telephone;
            this.postcode = postcode;
            this.city = city;
            this.firstname = firstname;
            this.lastname = lastname;
        }
}


