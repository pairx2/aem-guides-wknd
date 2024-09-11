package com.abbott.aem.an.similac.integration.nutrition;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;

import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import lombok.Getter;
import lombok.Setter;

/**
 * ServingSizes <br>
 * ServingSizes is the Pojo class to hold the details of individual
 * ServingSizes. <br>
 * Version Number: 1.0
 *
 * @author bhano.r, saikrishna.s
 */
public class ServingSizes {

	/** The serving size name. */
	@SerializedName("ServingSizeName")
	@Expose
	private String servingSizeName;

	/** The footnotes. */
	@SerializedName("Footnotes")
	@Expose
	@Setter
	@Getter
	private FootNote[] footnotes;

	/** The nutritional info. */
	@SerializedName("NutritionalInfo")
	@Expose
	@Setter
	@Getter
	private NutritionalInfo[] nutritionalInfo;

	/** The nutrient data list. */
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
	 * @param nutritionalInfoArray the nutritional info
	 */
	public void handleNutrintionaInfo(NutritionalInfo[] nutritionalInfoArray) {
		nutrientDataList = new ArrayList<>();
		vitaminsDataList = new ArrayList<>();
		mineralsDataList = new ArrayList<>();
		if (nutritionalInfoArray == null || nutritionalInfoArray.length == 0) {
			return;
		}
		for (NutritionalInfo nutritionalsInfo : nutritionalInfoArray) {
			if (nutritionalsInfo.getNutritionCategory().equalsIgnoreCase(CommonConstants.NUTRIENT_DATA)) {
				checkNutritientData(nutritionalsInfo);
				nutrientDataList.add(nutritionalsInfo);
			} else if (nutritionalsInfo.getNutritionCategory().equalsIgnoreCase(CommonConstants.VITAMINS)) {
				checkVitaminsData(nutritionalsInfo);
				vitaminsDataList.add(nutritionalsInfo);
			} else if (nutritionalsInfo.getNutritionCategory().equalsIgnoreCase(CommonConstants.MINERALS)) {
				checkMineralsData(nutritionalsInfo);
				mineralsDataList.add(nutritionalsInfo);
			}
		}
	}

	/**
	 * Check nutritient data.
	 *
	 * @param nutritionalInfo the ni
	 */
	private void checkNutritientData(NutritionalInfo nutritionalInfo) {
		if (StringUtils.isNotBlank(nutritionalInfo.getNutritionValue())) {
			servingNutritions = true;
		}
		if (StringUtils.isNotBlank(nutritionalInfo.getPercentDV())) {
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
	 * Gets the sorted nutrient data list.
	 *
	 * @return the nutrient data list
	 */
	public List<NutritionalInfo> getNutrientDataList() {
		return Collections.unmodifiableList(nutrientDataList);
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Arrays.hashCode(footnotes);
		result = prime * result + Arrays.hashCode(nutritionalInfo);
		result = prime * result + Objects.hash(mineralsDataList, nutrientDataList, servingMineralNutritions,
				servingMineralNutritionsDv, servingNutritions, servingNutritionsDv, servingSizeName,
				servingVitaminNutritions, servingVitaminNutritionsDv, vitaminsDataList);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof ServingSizes)) {
			return false;
		}
		ServingSizes other = (ServingSizes) obj;
		return Arrays.equals(footnotes, other.footnotes) && Objects.equals(mineralsDataList, other.mineralsDataList)
				&& Objects.equals(nutrientDataList, other.nutrientDataList)
				&& Arrays.equals(nutritionalInfo, other.nutritionalInfo)
				&& servingMineralNutritions == other.servingMineralNutritions
				&& servingMineralNutritionsDv == other.servingMineralNutritionsDv
				&& servingNutritions == other.servingNutritions && servingNutritionsDv == other.servingNutritionsDv
				&& Objects.equals(servingSizeName, other.servingSizeName)
				&& servingVitaminNutritions == other.servingVitaminNutritions
				&& servingVitaminNutritionsDv == other.servingVitaminNutritionsDv
				&& Objects.equals(vitaminsDataList, other.vitaminsDataList);
	}

}
