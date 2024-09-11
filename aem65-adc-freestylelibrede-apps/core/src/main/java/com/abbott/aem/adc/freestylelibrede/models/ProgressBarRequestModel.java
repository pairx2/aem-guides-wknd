package com.abbott.aem.adc.freestylelibrede.models;

import java.util.Collections;
import java.util.List;
import java.util.ListIterator;
import java.util.Optional;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.day.cq.wcm.api.PageManager;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/progress-bar")
public class ProgressBarRequestModel extends BaseComponentPropertiesImpl {

    @Self
    private Resource resource;
    private List<Step> steps;

	public int getCurrentStep() {
        if (getSteps() != null) {
        	PageManager pageManager = resource.getResourceResolver().adaptTo(PageManager.class);
    		String path = pageManager.getContainingPage(resource).getPath();

            ListIterator<Step> iterator = getSteps().listIterator();
            while (iterator.hasNext()) {
                if (iterator.next().getPagePath().equals(path)) {
                    return iterator.nextIndex();
                }
            }
        }
		return 0;
    }


    public List<Step> getSteps() {
        if (steps == null) {
            this.steps = Optional.ofNullable(resource.adaptTo(ProgressBarModel.class))
                    .map(ProgressBarModel::getSteps).orElse(null);
        }
        return steps == null ? null : Collections.unmodifiableList(steps);
    }
}
