
package com.abbott.aem.an.division.core.models.product;

import java.util.*;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServingSize {

    @JsonProperty("ServingSizeName")
    private String servingSizeName;
    @JsonProperty("Footnotes")
    private List<Footnote> footnotes = Collections.emptyList();
    @JsonProperty("NutritionalInfo")
    private List<NutritionalInfo> nutritionalInfo = Collections.emptyList();

    @JsonProperty("ServingSizeName")
    public String getServingSizeName() {
        return servingSizeName;
    }

    @JsonProperty("ServingSizeName")
    public void setServingSizeName(String servingSizeName) {
        this.servingSizeName = servingSizeName;
    }

    @JsonProperty("Footnotes")
    public List<Footnote> getFootnotes() {
        return new ArrayList<>(footnotes);
    }

    @JsonProperty("Footnotes")
    public void setFootnotes(List<Footnote> footnotes) {
        footnotes = new ArrayList<>(footnotes);
        this.footnotes = Collections.unmodifiableList(footnotes);
    }

    @JsonProperty("NutritionalInfo")
    public List<NutritionalInfo> getNutritionalInfo() {
        return new ArrayList<>(nutritionalInfo);
    }

    @JsonProperty("NutritionalInfo")
    public void setNutritionalInfo(List<NutritionalInfo> nutritionalInfo) {
        nutritionalInfo = new ArrayList<>(nutritionalInfo);
        this.nutritionalInfo = Collections.unmodifiableList(nutritionalInfo);
    }

    public Map<String,List<NutritionalInfo>> getGroupedNutritionalInfo() {
        return getNutritionalInfo()
                .stream()
                .collect(Collectors.groupingBy(NutritionalInfo::getNutritionCategory, LinkedHashMap::new, Collectors.toList()));
    }

}
