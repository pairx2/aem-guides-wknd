package com.abbott.aem.an.division.core.components.models;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ProteinCalFirstLevelTest {

	private static final String RESOURCE_1 = "/content/an/ensure/language-master/esparami/quiero-ser-mas-saludabl";
	private final AemContext ctx = new AemContext();

	private ProteinCalFirstLevel proteinCalFirstLevel1;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(CalculatorSelect.class);
		ctx.load().json("/com/abbott/aem/an/division/core/components/models/proteinCalculatorModel.json", RESOURCE_1);
		ctx.currentResource(RESOURCE_1);
		proteinCalFirstLevel1 = ctx.request().adaptTo(ProteinCalFirstLevel.class);
		assertTrue(proteinCalFirstLevel1 instanceof ProteinCalFirstLevel);
	}

	@Test
	void testGetLessProteinDescription() {
		String lessProteinDescription = "Desc";
		String actual = proteinCalFirstLevel1.getLessProteinDescription();
		assertEquals(lessProteinDescription, actual);
	}

	@Test
	void testGetEqualProteinDescription() {
		String equalProteinDescription = "Desc";
		String actual = proteinCalFirstLevel1.getEqualProteinDescription();
		assertEquals(equalProteinDescription, actual);
	}

	@Test
	void testGetMoreProteinDescription() {
		String moreProteinDescription = "Desc";
		String actual = proteinCalFirstLevel1.getMoreProteinDescription();
		assertEquals(moreProteinDescription, actual);
	}

	@Test
	void testGetProteinCalHeading() {
		String proteinCalHeading = "Ingrese los siguientes datos:";
		String actual = proteinCalFirstLevel1.getProteinCalHeading();
		assertEquals(proteinCalHeading, actual);
	}

	@Test
	void testGetProteinCalGender() {
		String proteinCalGender = "Género";
		String actual = proteinCalFirstLevel1.getProteinCalGender();
		assertEquals(proteinCalGender, actual);
	}

	@Test
	void testGetProteinCalAge() {
		String proteinCalAge = "Edad";
		String actual = proteinCalFirstLevel1.getProteinCalAge();
		assertEquals(proteinCalAge, actual);
	}

	@Test
	void testGetProteinCalHeight() {
		String proteinCalHeight = "Talla";
		String actual = proteinCalFirstLevel1.getProteinCalHeight();
		assertEquals(proteinCalHeight, actual);
	}

	@Test
	void testGetProteinCalWeight() {
		String proteinCalWeight = "Peso";
		String actual = proteinCalFirstLevel1.getProteinCalWeight();
		assertEquals(proteinCalWeight, actual);
	}

	@Test
	void testGetProteinCalActivities() {
		String proteinCalActivities = "Actividad Física";
		String actual = proteinCalFirstLevel1.getProteinCalActivities();
		assertEquals(proteinCalActivities, actual);
	}

	@Test
	void testGetProteinActivityVeryLight() {
		String proteinActivityVeryLight = "Muy poca o nula";
		String actual = proteinCalFirstLevel1.getProteinActivityVeryLight();
		assertEquals(proteinActivityVeryLight, actual);
	}

	@Test
	void testGetProteinActivityLight() {
		String proteinActivityLight = "Ligera";
		String actual = proteinCalFirstLevel1.getProteinActivityLight();
		assertEquals(proteinActivityLight, actual);
	}

	@Test
	void testGetProteinActivityModerate() {
		String proteinActivityModerate = "Moderada";
		String actual = proteinCalFirstLevel1.getProteinActivityModerate();
		assertEquals(proteinActivityModerate, actual);
	}

	@Test
	void testGetProteinActivityHigh() {
		String proteinActivityHigh = "Alta";
		String actual = proteinCalFirstLevel1.getProteinActivityHigh();
		assertEquals(proteinActivityHigh, actual);
	}

	@Test
	void testGetProteinActivityVeryHigh() {
		String proteinActivityVeryHigh = "Muy alta";
		String actual = proteinCalFirstLevel1.getProteinActivityVeryHigh();
		assertEquals(proteinActivityVeryHigh, actual);
	}

	@Test
	void testGetProteinFieldsRequired() {
		String proteinFieldsRequired = "Todos los campos son necesarios";
		String actual = proteinCalFirstLevel1.getProteinFieldsRequired();
		assertEquals(proteinFieldsRequired, actual);
	}

	@Test
	void testGetProteinSubmitButton() {
		String proteinSubmitButton = "Inicio";
		String actual = proteinCalFirstLevel1.getProteinSubmitButton();
		assertEquals(proteinSubmitButton, actual);
	}

	@Test
	void testGetProteinSupply() {
		String proteinSupply = "Aporte de proteínas:";
		String actual = proteinCalFirstLevel1.getProteinSupply();
		assertEquals(proteinSupply, actual);
	}

	@Test
	void testGetProteinResults() {
		String proteinResults = "Resultados:";
		String actual = proteinCalFirstLevel1.getProteinResults();
		assertEquals(proteinResults, actual);
	}

	@Test
	void testGetProteinTotalRequirement() {
		String proteinTotalRequirement = "Total requerimiento proteinico paciente:";
		String actual = proteinCalFirstLevel1.getProteinTotalRequirement();
		assertEquals(proteinTotalRequirement, actual);
	}

	@Test
	void testGetProteinTotalConsumption() {
		String proteinTotalConsumption = "Total consumo proteínas:";
		String actual = proteinCalFirstLevel1.getProteinTotalConsumption();
		assertEquals(proteinTotalConsumption, actual);
	}

	@Test
	void testGetProteinQuery() {
		String proteinQuery = "¿El paciente cubrió su requerimiento de proteína al día? ";
		String actual = proteinCalFirstLevel1.getProteinQuery();
		assertEquals(proteinQuery, actual);
	}

	@Test
	void testGetProteinTotal() {
		String proteinTotal = "Total:";
		String actual = proteinCalFirstLevel1.getProteinTotal();
		assertEquals(proteinTotal, actual);
	}

}
