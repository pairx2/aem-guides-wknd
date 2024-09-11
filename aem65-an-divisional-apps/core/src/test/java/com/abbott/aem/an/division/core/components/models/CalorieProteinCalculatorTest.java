package com.abbott.aem.an.division.core.components.models;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class CalorieProteinCalculatorTest {

	private static final String RESOURCE_1 = "/content/an/ensure/language-master/esparami/quiero-ser-mas-saludabl";
	private final AemContext ctx = new AemContext();

	private CalorieProteinCalculator calorieProteinCalculator1;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(CalculatorSelect.class);
		ctx.load().json("/com/abbott/aem/an/division/core/components/models/calorieCalculatorModel.json", RESOURCE_1);
		ctx.currentResource(RESOURCE_1);

		calorieProteinCalculator1 = ctx.request().adaptTo(CalorieProteinCalculator.class);

		assertTrue(calorieProteinCalculator1 instanceof CalorieProteinCalculator);
	}

	@Test
	void testGetRteDescription() {
		String rteDescription = "Calcule aquí el requerimiento calórico de su paciente con las variables indicadas. Recuerde que el resultado debe ser ajustado según las necesidades del paciente y el tipo se Sarcopenia que puede estar presentando.";
		String testValue = calorieProteinCalculator1.getRteDescription();
		assertEquals(rteDescription, testValue);
	}

	@Test
	void testGetRteTitle() {
		String rteTitle = "¿CUÁL ES EL REQUERIMIENTO CALÓRICO DE SU PACIENTE?";
		String testValue = calorieProteinCalculator1.getRteTitle();
		assertEquals(rteTitle, testValue);
	}

	@Test
	void testGetRteNote() {
		String rteNote = "*Ecuación de Harris-Benedict modificada con actividad física.";
		String testValue = calorieProteinCalculator1.getRteNote();
		assertEquals(rteNote, testValue);
	}

	@Test
	void testGetCalorieCalHeading() {
		String calorieCalHeading = "Parámetros corporales";
		String testValue = calorieProteinCalculator1.getCalorieCalHeading();
		assertEquals(calorieCalHeading, testValue);
	}

	@Test
	void testGetCalorieCalGender() {
		String calorieCalGender = "Género";
		String testValue = calorieProteinCalculator1.getCalorieCalGender();
		assertEquals(calorieCalGender, testValue);
	}

	@Test
	void testGetCalorieCalActivities() {
		String calorieCalActivities = "Actividad Física";
		String testValue = calorieProteinCalculator1.getCalorieCalActivities();
		assertEquals(calorieCalActivities, testValue);
	}

	@Test
	void testGetCalorieActivityVeryLight() {
		String calorieActivityVeryLight = "Muy poca o nula";
		String testValue = calorieProteinCalculator1.getCalorieActivityVeryLight();
		assertEquals(calorieActivityVeryLight, testValue);
	}

	@Test
	void testGetCalorieActivityLight() {
		String calorieActivityLight = "Ligera";
		String testValue = calorieProteinCalculator1.getCalorieActivityLight();
		assertEquals(calorieActivityLight, testValue);
	}

	@Test
	void testGetCalorieActivityModerate() {
		String calorieActivityModerate = "Moderada";
		String testValue = calorieProteinCalculator1.getCalorieActivityModerate();
		assertEquals(calorieActivityModerate, testValue);
	}

	@Test
	void testGetCalorieActivityHigh() {
		String calorieActivityHigh = "Alta";
		String testValue = calorieProteinCalculator1.getCalorieActivityHigh();
		assertEquals(calorieActivityHigh, testValue);
	}

	@Test
	void testGetCalorieActivityVeryHigh() {
		String calorieActivityVeryHigh = "Muy alta";
		String testValue = calorieProteinCalculator1.getCalorieActivityVeryHigh();
		assertEquals(calorieActivityVeryHigh, testValue);
	}

	@Test
	void testGetCalorieFieldsRequired() {
		String calorieFieldsRequired = "Todos los campos son necesarios";
		String testValue = calorieProteinCalculator1.getCalorieFieldsRequired();
		assertEquals(calorieFieldsRequired, testValue);
	}

	@Test
	void testGetCalorieClearFields() {
		String calorieClearFields = "Limpiar Campos";
		String testValue = calorieProteinCalculator1.getCalorieClearFields();
		assertEquals(calorieClearFields, testValue);
	}

	@Test
	void testGetCalorieViewResult() {
		String calorieViewResult = "Ver resultado";
		String testValue = calorieProteinCalculator1.getCalorieViewResult();
		assertEquals(calorieViewResult, testValue);
	}

	@Test
	void testGetCalorieResult() {
		String calorieResult = "Resultados";
		String testValue = calorieProteinCalculator1.getCalorieResult();
		assertEquals(calorieResult, testValue);
	}

	@Test
	void testGetCalorieStaticResult() {
		String calorieStaticResult = "1745";
		String testValue = calorieProteinCalculator1.getCalorieStaticResult();
		assertEquals(calorieStaticResult, testValue);
	}

	@Test
	void testGetCalorieKiloCalories() {
		String calorieKiloCalories = "Kcal";
		String testValue = calorieProteinCalculator1.getCalorieKiloCalories();
		assertEquals(calorieKiloCalories, testValue);
	}

	@Test
	void testGetCalorieRecommendationHeading() {
		String calorieRecommendationHeading = "Cantidad de consumo recomendada por día.";
		String testValue = calorieProteinCalculator1.getCalorieRecommendationHeading();
		assertEquals(calorieRecommendationHeading, testValue);
	}

	@Test
	void testGetCalorieProductRecommendation() {
		String calorieProductRecommendation = "Producto recomendado:";
		String testValue = calorieProteinCalculator1.getCalorieProductRecommendation();
		assertEquals(calorieProductRecommendation, testValue);
	}

	@Test
	void testGetCaloriePDF() {
		String caloriePDF = "Descargar dieta en PDF";
		String testValue = calorieProteinCalculator1.getCaloriePDF();
		assertEquals(caloriePDF, testValue);
	}
}
