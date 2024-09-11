package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.ScrollInteractions;
import com.abbott.aem.platform.common.components.models.ScrollInteractionsContainer;
import com.abbott.aem.platform.common.components.pojo.ScrollAnimationFactory;
import com.abbott.aem.platform.common.components.pojo.ScrollInteractionsAnimations;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Data
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { ScrollInteractionsContainer.class, ComponentExporter.class },
	   resourceType = { ScrollInteractionsContainerImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ScrollInteractionsContainerImpl implements ScrollInteractionsContainer {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/scrollinteractionscontainer/v1/scrollinteractionscontainer";
	
	@JsonIgnore
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private ObjectMapper objectMapper = new ObjectMapper();
	
	@JsonIgnore
	@Self
	private SlingHttpServletRequest slingHttpServletRequest;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String title;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String animation;
	
	@Setter(AccessLevel.NONE)
	private List<ScrollInteractions> scrollInteractions;
	
	@Setter(AccessLevel.NONE)
	private String jsonConfig;
	
	@Setter(AccessLevel.NONE)
	private ScrollInteractionsAnimations scrollInteractionsAnimations;
	
	@PostConstruct
	public void init() {
		try {
			scrollInteractions = StreamSupport.stream(slingHttpServletRequest.getResource().getChildren().spliterator(), false)
					.filter(Objects::nonNull)
					.map(childResource -> childResource.adaptTo(ScrollInteractions.class))
					.collect(Collectors.toList());
			ScrollAnimationFactory scrollAnimationFactory = new ScrollAnimationFactory();
			scrollInteractionsAnimations = scrollAnimationFactory.createScrollInteractionsAnimations(animation, scrollInteractions);
			jsonConfig = objectMapper.writeValueAsString(scrollInteractions);
		} catch (JsonProcessingException e){
			log.error("Error occurred while processing the JSON object ", e.getMessage());
		} catch (RuntimeException e){
			log.error("Error occurred while processing the child nodes of scroll interaction container", e.getMessage());
		}
	}

}