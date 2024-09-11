package com.abbott.aem.adc.freestylelibrede.services;

import com.day.cq.dam.api.Asset;

import java.util.Map;

public interface ImageService {

    Map<String,String> getRenditions(Asset asset);
}
