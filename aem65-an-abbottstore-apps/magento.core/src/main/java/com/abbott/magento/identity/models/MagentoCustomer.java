package com.abbott.magento.identity.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public final class MagentoCustomer {

    public static final String GENDER_FEMALE_ID = "2";
    public static final String GENDER_FEMALE_VALUE = "female";
    public static final String GENDER_MALE_ID = "1";
    public static final String GENDER_MALE_VALUE = "male";

    public final long id;
    public final long groupId;
    public final String defaultBilling;
    public final String defaultShipping;
    public final String createdAt;
    public final String updatedAt;
    public final String createdIn;
    public final String email;
    public final String firstname;
    public final String lastname;
    public final String gender;
    public final long storeId;
    public final long websiteId;
    public final Addresse [] addresses;

    @JsonCreator
    public MagentoCustomer(@JsonProperty("id") long id, @JsonProperty("groupId") long groupId, @JsonProperty("defaultBilling") String defaultBilling, @JsonProperty("defaultShipping") String defaultShipping, @JsonProperty("createdAt") String createdAt, @JsonProperty("updatedAt") String updatedAt, @JsonProperty("createdIn") String createdIn, @JsonProperty("email") String email, @JsonProperty("firstname") String firstname, @JsonProperty("lastname") String lastname, @JsonProperty("gender") String gender, @JsonProperty("storeId") long storeId, @JsonProperty("websiteId") long websiteId, @JsonProperty("addresses") Addresse[] addresses){
        this.id = id;
        this.groupId = groupId;

        if(!(gender==null || gender.isEmpty()) && gender.equals(GENDER_FEMALE_ID)){
            this.gender = GENDER_FEMALE_VALUE;
        }
        else if(!(gender==null || gender.isEmpty()) && gender.equals(GENDER_MALE_ID)){
            this.gender = GENDER_MALE_VALUE;
        }
        else{
            this.gender = "";
        }

        this.defaultBilling = defaultBilling;
        this.defaultShipping = defaultShipping;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdIn = createdIn;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.storeId = storeId;
        this.websiteId = websiteId;
        this.addresses = addresses;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Addresse {
        public final long id;
        public final long customerId;
        public final Region region;
        public final long regionId;
        public final String countryId;
        public final String[] street;
        public final String company;
        public final String telephone;
        public final String postcode;
        public final String city;
        public final String firstname;
        public final String lastname;
        public final boolean defaultShipping;
        public final boolean defaultBilling;

        @JsonCreator
        public Addresse(@JsonProperty("id") long id, @JsonProperty("customerId") long customerId, @JsonProperty("region") Region region, @JsonProperty("regionId") long regionId, @JsonProperty("countryId") String countryId, @JsonProperty("street") String[] street, @JsonProperty("company") String company, @JsonProperty("telephone") String telephone, @JsonProperty("postcode") String postcode, @JsonProperty("city") String city, @JsonProperty("firstname") String firstname, @JsonProperty("lastname") String lastname, @JsonProperty("defaultShipping") boolean defaultShipping, @JsonProperty("defaultBilling") boolean defaultBilling){
            this.id = id;
            this.customerId = customerId;
            this.region = region;
            this.regionId = regionId;
            this.countryId = countryId;
            this.street = street;
            this.company = company;
            this.telephone = telephone;
            this.postcode = postcode;
            this.city = city;
            this.firstname = firstname;
            this.lastname = lastname;
            this.defaultShipping = defaultShipping;
            this.defaultBilling = defaultBilling;
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static final class Region {
            public final String regionCode;
            public final String regionName;
            public final long regionId;

            @JsonCreator
            public Region(@JsonProperty("regionCode") String regionCode, @JsonProperty("region") String regionName, @JsonProperty("regionId") long regionId){
                this.regionCode = regionCode;
                this.regionName = regionName;
                this.regionId = regionId;
            }
        }
    }
}
