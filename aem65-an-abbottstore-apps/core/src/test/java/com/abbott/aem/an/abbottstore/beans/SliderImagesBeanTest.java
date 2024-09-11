package com.abbott.aem.an.abbottstore.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class SliderImagesBeanTest {

    SliderImagesBean sliderImagesBean = new SliderImagesBean();

    @BeforeEach
    void setUp() {
        sliderImagesBean.setMediaImage("/image.jpg");
        sliderImagesBean.setThumbImage("/thumb.jpg");
    }

    @Test
    void getThumbImage() {
        assertNotNull(sliderImagesBean.getThumbImage());
    }

    @Test
    void getMediaImage() {
        assertNotNull(sliderImagesBean.getMediaImage());
    }
}