import * as React from "react";
import ImageSlider from "../components/ImageSlider";
import graphQLQuery from '../services/product.service.js';
const ImageSliderContainer = ({ data }) => {
  const { imageArray, thumpPreloadCount = 6, thumbPreloadImage } = data;
  const youtubeVideoFormation = (data) => {
    var videoDataSplit, videocodesplit, finalVideo;
    if (data.indexOf('watch') > 0) {
      var result;
      videoDataSplit = data.split('?')
      videocodesplit = videoDataSplit[1].split('&')
      videocodesplit.forEach(function (part) {
        var item = part.split("=");
        if (item[0] == 'v') {
          result = item[1]
        }
      }); 
      finalVideo = 'https://www.youtube.com/embed/' + result;
    } else {
      videoDataSplit = data.split('/')
      finalVideo = 'https://www.youtube.com/embed/' + videoDataSplit[videoDataSplit.length - 1];
    }
    return finalVideo+ "?enablejsapi=1";
  }

  const fetchData = (data) => {
   
    let ajaxConfig = {
      url: `${ABBOTT.config.getEndpointUrl('GRAPH_QL')}?query=${graphQLQuery.generateProductVideoQuery(data)}`,
      method: "get",
      contentType: "application/json",
      headers:
      {
        "Store": ABBOTT.config.storeName
      }
    };

    ABBOTT.http.makeAjaxCall(ajaxConfig).done(res => {
      var videoData = [];
      if(res.data.products.items.length>0){
        var selectedObj = res.data.products.items.filter((obj) => {
          return obj.sku == data.skuValue
        })
        selectedObj.map((data) => {
          videoData = data.media_gallery.filter((obj) => {
            return obj.video_content
          })
        })
        imageArray.map((data) => {
          data['type'] = 'image';
        })
        if (videoData.length > 0) {
          imageArray.map((data) => {
            videoData.map((vdata, index) => {
              var videoDataSplit = vdata.url.split('\/')
              var selectedImgPath = videoDataSplit[videoDataSplit.length - 1]
              if (data.original.indexOf(selectedImgPath) >0) {            
                data['video_content'] = youtubeVideoFormation(vdata.video_content.video_url)
                data['video_id']= "video"+ index;
                data['video_title']=vdata.video_content.video_title;
                data['type'] = 'video';
              }
            })
          })
        } else {
          imageArray.map((data) => {
            data['type'] = 'image'
          })
        }
  
      }else{
        imageArray.map((data) => {
          data['type'] = 'image'
        })
      }
     
      $("#overlay").hide();
      $('.image-gallery-thumbnail, .image-gallery-bullet').eq(0).click();
    }).fail(function () {
      window.location = errorCodeData.errorPageURL;
      $("#overlay").hide();
    });
  }
  React.useEffect(() => {
   var skuValue = $("#pdp-sku").attr('data-sku'); 
    if(skuValue){
      fetchData({
        skuValue
      });
    }else{
      imageArray.map((data) => {
        data['type'] = 'image'
      })
    } 
  });

  return (

    <ImageSlider
      items={imageArray}
      lazyLoad={true}
      infinite={false}
      autoPreload={false}
      showBullets={true}
      thumpPreloadCount={thumpPreloadCount}
      thumbPreloadImage={thumbPreloadImage}
      showFullscreenButton={
        true
      }
      showPlayButton={
        false
      }
      showThumbnails={true}
      showIndex={false}
      showNav={true}
      isRTL={false}
      thumbnailPosition={'bottom'}
      additionalclassName="app-image-gallery"
    />
  );
};

export default ImageSliderContainer;
