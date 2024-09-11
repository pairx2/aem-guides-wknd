package com.abbott.aem.add.division.core.components.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.AccessLevel;
import lombok.Getter;

@Model(adaptables = Resource.class,
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
	 )
public class ProductMarketing  {
	
	private static final Logger log = LoggerFactory.getLogger(ProductMarketing.class);

	@ValueMapValue(name = "lookupService")
	@Getter(AccessLevel.PUBLIC)
	private String lookupServiceEndpoint;

	@Inject
	@Getter(AccessLevel.PUBLIC)
	protected String source;
	
	@Inject
	@Getter(AccessLevel.PUBLIC)
	private List<String> conditionLookupService;

	@Getter(AccessLevel.PUBLIC)
	private List<String> conditionItems;
	
	@Getter(AccessLevel.PUBLIC)
	private String conditionsTableHeader;
	
	@Inject
	@Getter(AccessLevel.PUBLIC)
	private List<String> productLookupService;

	@Inject
	@Getter(AccessLevel.PUBLIC)
	private List<String> tabularLookupService;

	@PostConstruct
	public void init()  {
						
		log.debug(" Inside initi method for ProductMarketing Component ");

		if (Objects.nonNull(conditionLookupService) && (!conditionLookupService.isEmpty()))
		{
			conditionsTableHeader = " ";
			String tempHeader = conditionLookupService.get(0);
			log.debug(" tempHeader {} ",tempHeader);
			int one = tempHeader.lastIndexOf("- ")-1;
			log.debug(" one {} ",one);
			conditionsTableHeader = tempHeader.substring(0, one);
			log.debug(" conditionsTableHeader {} ",conditionsTableHeader);
			
			conditionItems = new ArrayList<>();
			
			for (String items : conditionLookupService) {
			    
			    conditionItems.add(items.substring(items.lastIndexOf("- ")+1));
			}
		}
	}

	


}
