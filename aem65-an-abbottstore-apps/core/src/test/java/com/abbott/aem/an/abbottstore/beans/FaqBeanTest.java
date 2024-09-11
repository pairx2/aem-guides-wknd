package com.abbott.aem.an.abbottstore.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FaqBeanTest {

    FaqBean faqBean = new FaqBean();

    @BeforeEach
    void setUp() {
        faqBean.setAnswer("answer");
        faqBean.setQuestion("question");
    }

    @Test
    void getQuestion() {
        assertEquals("question", faqBean.getQuestion());
    }

    @Test
    void getAnswer() {
        assertEquals("answer", faqBean.getAnswer());
    }
}