package com.abbott.aem.an.abbottstore.integration.nutrition;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 *
 * @author bhano.r, saikrishna.s
 * 
 *         ServingSizes
 * 
 *         ServingSizes is the Pojo class to hold the details of individual
 *         ServingSizes.
 * 
 *         Version Number: 1.0
 */
public class ServingSizes {

	/** The serving size name. */
	@SerializedName("ServingSizeName")
	@Expose
	private String servingSizeName;

	/** The footnotes. */
	@SerializedName("Footnotes")
	@Expose
	@Getter
	@Setter
	private FootNote[] footnotes;

	/** The nutritional info. */
	@SerializedName("NutritionalInfo")
	@Expose
	@Getter
	@Setter
	private NutritionalInfo[] nutritionalInfo;

	/** The nutrient data list. */
	@Getter
	private List<NutritionalInfo> nutrientDataList;

	/** The vitamins data list. */
	private List<NutritionalInfo> vitaminsDataList;

	/** The minerals data list. */
	private List<NutritionalInfo> mineralsDataList;

	/** The serving nutritions. */
	private boolean servingNutritions = false;

	/** The serving vitamin nutritions. */
	private boolean servingVitaminNutritions = false;

	/** The serving mineral nutritions. */
	private boolean servingMineralNutritions = false;

	/** The serving nutritions dv. */
	private boolean servingNutritionsDv = false;

	/** The serving vitamin nutritions dv. */
	private boolean servingVitaminNutritionsDv = false;

	/** The serving mineral nutritions dv. */
	private boolean servingMineralNutritionsDv = false;

	/**
	 * This method is used to get data based on category checks.
	 *
	 * @param nutritionalInfo the nutritional info
	 */
	public void handleNutrintionaInfo(NutritionalInfo[] nutritionalInfo) {
		nutrientDataList = new ArrayList<>();
		vitaminsDataList = new ArrayList<>();
		mineralsDataList = new ArrayList<>();
		if (nutritionalInfo != null && nutritionalInfo.length > 0) {
			for (NutritionalInfo ni : nutritionalInfo) {
				if (ni.getNutritionCategory().equalsIgnoreCase(CommonConstants.NUTRIENT_DATA)) {
					checkNutritientData(ni);
					nutrientDataList.add(ni);
				} else if (ni.getNutritionCategory().equalsIgnoreCase(CommonConstants.VITAMINS)) {
					checkVitaminsData(ni);
					vitaminsDataList.add(ni);
				} else if (ni.getNutritionCategory().equalsIgnoreCase(CommonConstants.MINERALS)) {
					checkMineralsData(ni);
					mineralsDataList.add(ni);
				}
			}
		}

	}

	/**
	 * Check nutritient data.
	 *
	 * @param ni the ni
	 */
	private void checkNutritientData(NutritionalInfo ni) {
		if (StringUtils.isNotBlank(ni.getNutritionValue())) {
			servingNutritions = true;
		}
		if (StringUtils.isNotBlank(ni.getPercentDV())) {
			servingNutritionsDv = true;
		}
	}

	/**
	 * Check vitamins data.
	 *
	 * @param ni the ni
	 */
	private void checkVitaminsData(NutritionalInfo ni) {
		if (StringUtils.isNotBlank(ni.getNutritionValue())) {
			servingVitaminNutritions = true;
		}
		if (StringUtils.isNotBlank(ni.getPercentDV())) {
			servingVitaminNutritionsDv = true;
		}
	}

	/**
	 * Check minerals data.
	 *
	 * @param ni the ni
	 */
	private void checkMineralsData(NutritionalInfo ni) {
		if (StringUtils.isNotBlank(ni.getNutritionValue())) {
			servingMineralNutritions = true;
		}
		if (StringUtils.isNotBlank(ni.getPercentDV())) {
			servingMineralNutritionsDv = true;
		}
	}

	/**
	 * Gets the serving size name.
	 *
	 * @return the serving size name
	 */
	public String getServingSizeName() {
		return servingSizeName;
	}

	/**
	 * Sets the serving size name.
	 *
	 * @param servingSizeName the new serving size name
	 */
	public void setServingSizeName(String servingSizeName) {
		this.servingSizeName = servingSizeName;
	}
	/**
	 * Gets the sorted vitamins data list.
	 *
	 * @return the vitamins data list
	 */
	public List<NutritionalInfo> getVitaminsDataList() {
		return vitaminsDataList.stream().sorted(Comparator.comparing(NutritionalInfo::getLineNumber))
				.collect(Collectors.toList());
	}

	/**
	 * Gets the sorted minerals data list.
	 *
	 * @return the minerals data list
	 */
	public List<NutritionalInfo> getMineralsDataList() {
		return mineralsDataList.stream().sorted(Comparator.comparing(NutritionalInfo::getLineNumber))
				.collect(Collectors.toList());
	}

	/**
	 * Checks if is serving nutritions.
	 *
	 * @return true, if is serving nutritions
	 */
	public boolean isServingNutritions() {
		return servingNutritions;
	}

	/**
	 * Checks if is serving vitamin nutritions.
	 *
	 * @return true, if is serving vitamin nutritions
	 */
	public boolean isServingVitaminNutritions() {
		return servingVitaminNutritions;
	}

	/**
	 * Checks if is serving mineral nutritions.
	 *
	 * @return true, if is serving mineral nutritions
	 */
	public boolean isServingMineralNutritions() {
		return servingMineralNutritions;
	}

	/**
	 * Checks if is serving nutritions dv.
	 *
	 * @return true, if is serving nutritions dv
	 */
	public boolean isServingNutritionsDv() {
		return servingNutritionsDv;
	}

	/**
	 * Checks if is serving vitamin nutritions dv.
	 *
	 * @return true, if is serving vitamin nutritions dv
	 */
	public boolean isServingVitaminNutritionsDv() {
		return servingVitaminNutritionsDv;
	}

	/**
	 * Checks if is serving mineral nutritions dv.
	 *
	 * @return true, if is serving mineral nutritions dv
	 */
	public boolean isServingMineralNutritionsDv() {
		return servingMineralNutritionsDv;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ServingSizes [servingSizeName=" + servingSizeName + ", footnotes=" + Arrays.toString(footnotes)
				+ ", nutritionalInfo=" + Arrays.toString(nutritionalInfo) + ", nutrientDataList=" + nutrientDataList
				+ ", vitaminsDataList=" + vitaminsDataList + ", mineralsDataList=" + mineralsDataList
				+ ", servingNutritions=" + servingNutritions + ", servingVitaminNutritions=" + servingVitaminNutritions
				+ ", servingMineralNutritions=" + servingMineralNutritions + ", servingNutritionsDv="
				+ servingNutritionsDv + ", servingVitaminNutritionsDv=" + servingVitaminNutritionsDv
				+ ", servingMineralNutritionsDv=" + servingMineralNutritionsDv + "]";
	}

}
