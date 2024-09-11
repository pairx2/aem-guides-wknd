package com.abbott.aem.cloud.platform.core.services;

import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import com.adobe.cq.xf.ExperienceFragmentLinkRewriterProvider;
import com.adobe.cq.xf.ExperienceFragmentVariation;


@Component(immediate = true, service = ExperienceFragmentLinkRewriterProvider.class)
@ServiceDescription("XF to Target link rewriter")
@Designate(ocd = ExperienceFragmentTargetRewriter.Configuration.class)
public class ExperienceFragmentTargetRewriter implements ExperienceFragmentLinkRewriterProvider {

    private String[] stripPaths;

    @ObjectClassDefinition(name = "XF to Target Link Rewriter Config")
    public @interface Configuration {
        @AttributeDefinition(name = "Paths to Strip",
                description = "Iterates and removes paths from XF Target URLs",
                type = AttributeType.STRING)
        String[] strip_paths() default {};
    }

    @Activate
    protected void activate(Configuration config) {
        this.stripPaths = config.strip_paths();
    }


    @Override
    public String rewriteLink(String link, String tag, String attribute) {
        if (StringUtils.isBlank(link)) {
            return link;
        }

        for (String stripPath : stripPaths) {
            link = link.replaceAll(stripPath, "");
        }

        return link;
    }

    @Override
    public boolean shouldRewrite(ExperienceFragmentVariation experienceFragmentVariation) {
        return true;
    }

    @Override
    public int getPriority() {
        return 0;
    }
}