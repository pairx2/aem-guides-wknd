package com.abbott.magento.catalog.connector.models;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@JsonIgnoreProperties(ignoreUnknown = true)
public final class MagentoProductList {


    public MagentoProduct[] getItems() {
        return items;
    }

    public void setItems(MagentoProduct[] items) {
        this.items = items;
    }

    public void setSearchCriteria(SearchCriteria searchCriteria) {
        this.searchCriteria = searchCriteria;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    @JsonProperty("items")
    public  MagentoProduct [] items;

    @JsonProperty("search_criteria")
    public SearchCriteria searchCriteria;

    @JsonProperty("total_count")
    public long totalCount;

public MagentoProductList() {
    }

    @JsonCreator
    public MagentoProductList(@JsonProperty("items") MagentoProduct[] items, @JsonProperty("search_criteria") SearchCriteria searchCriteria, @JsonProperty("total_count") long totalCount){
        this.items = items;
        this.searchCriteria = searchCriteria;
        this.totalCount = totalCount;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class SearchCriteria {
        public final FilterGroup [] filterGroups;
        public final long pageSize;
        public final long currentPage;

        @JsonCreator
        public SearchCriteria(@JsonProperty("filter_groups") FilterGroup[] filterGroups, @JsonProperty("page_size") long pageSize, @JsonProperty("current_page") long currentPage){
            this.filterGroups = filterGroups;
            this.pageSize = pageSize;
            this.currentPage = currentPage;
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static final class FilterGroup {

            @JsonCreator
            public FilterGroup(){
                // default implementation ignored
            }
        }
    }



    public SearchCriteria getSearchCriteria() {
        return searchCriteria;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public boolean isLast(){
        return (this.searchCriteria.currentPage >= maxPages());
    }

    public long maxPages(){

        return this.totalCount / this.searchCriteria.pageSize;

    }

    public long getNextPage(){
        return this.searchCriteria.currentPage + 1;
    }

    public List<MagentoProduct> getProducts(){
        return Arrays.asList(items);
    }

    public Map<String, MagentoProduct> getItemMap(){

        HashMap<String, MagentoProduct> itemsHash = new HashMap<>();
        for(MagentoProduct product: items){
            itemsHash.put(product.sku, product);
        }
        return itemsHash;
    }





}
