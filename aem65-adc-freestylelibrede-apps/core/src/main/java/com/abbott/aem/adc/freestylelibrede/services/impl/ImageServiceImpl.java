package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.services.ImageService;
import com.day.cq.dam.api.Asset;
import org.osgi.service.component.annotations.Component;

import java.util.HashMap;
import java.util.Map;

@Component(immediate = true, service = ImageService.class)
public class ImageServiceImpl implements ImageService {
    @Override
    public Map<String, String> getRenditions(Asset asset) {
        Map<String, String> renditions = new HashMap<>();
        if (asset == null) {
            return renditions;
        }
        asset.getRenditions().forEach(r -> {
            String[] nameSplit = r.getName().split("\\.");
            if (nameSplit.length > 3) {
                String width = nameSplit[nameSplit.length - 3];
                String height = nameSplit[nameSplit.length - 2];
                renditions.put(width + "_" + height, r.getPath());
            } else {
                renditions.put(r.getName(), r.getPath());
            }
        });
        return renditions;
    }
}
