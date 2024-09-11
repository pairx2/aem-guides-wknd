import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import ImageSlider from "../container/image-slider"

var data = window.productImagesJSON;


const divForPage =  document.getElementById('page-image-slider');
if(divForPage){
  ReactDOM.render(
    <ImageSlider data={data}/>,
    divForPage
  );
}

