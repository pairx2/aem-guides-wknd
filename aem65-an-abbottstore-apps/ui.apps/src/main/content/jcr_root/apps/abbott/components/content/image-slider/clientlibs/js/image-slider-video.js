(function(ABBOTT) {
    ABBOTT.video = (function() {})();
    jQuery(function() {
        var $component = jQuery('#abbott-slider');
        if ($component.length) {
            getVideoInfo();
        }
        /**
         * @function
         * @desc Makes Ajax call to gets products which has video
         */
        function getVideoInfo() {
            var sku = jQuery("#pdp-sku").data('sku');
            // GraphQL query
            var query = '{ products( search: "' + sku + '" ) { total_count items { name sku media_gallery { url label ... on ProductVideo { video_content { media_type video_provider video_url video_title video_description video_metadata } } } } }}';
			// Make ajax call
            ABBOTT.http.makeAjaxCall({
                    url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
                    data: {
                        query: query
                    },
                    headers: {
                        "store": ABBOTT.utils.storeName
                    }
                })

                .done(function(res) {
                    if (res.errors) {
                        return;
                    }

                     var videoData,
					  damImageArray = window.productImagesJSON,
			          viewData = {
									data: []
								};

                    if (res.data.products.items.length > 0) {
                        var selectedObj = res.data.products.items.filter((obj) => {
                            return obj.sku == sku
                        })
                        selectedObj.map((data) => {
                            videoData = data.media_gallery.filter((obj) => {
                                return obj.video_content
                            })
                        })
						damImageArray.imageArray.map((data) => {
								data['type'] = 'image'
							})
                        if (videoData.length > 0) {
                            damImageArray.imageArray.map((data) => {
                                videoData.map((vdata, index) => {
                                    var videoDataSplit = vdata.url.split('\/')
                                    var selectedImgPath = videoDataSplit[videoDataSplit.length - 1]
                                    if (data.original.includes(selectedImgPath)) {
								        data['type'] = 'video';
										data['video'] = vdata.video_content.video_url;
							          
                                    }										
                                })

                            })

                        } else {
                            damImageArray.imageArray.map((data) => {
								data['type'] = 'image'
							})
                        }
                    } else {
                            damImageArray.imageArray.map((data) => {
								data['type'] = 'image'
							})
                        }
						 damImageArray.imageArray.map((item) => {
					  var jsonData = {};
					if(item.type == 'image'){
					    jsonData['img'] = item.original;
                        jsonData['thumb'] = item.thumbnail;
                        viewData.data.push(jsonData)
				}
				if(item.type == 'video'){
					jsonData['video'] = item.video;
                    jsonData['thumb'] = item.original;
                    viewData.data.push(jsonData)
				}
			})
				
				$('.fotorama').fotorama(viewData);
                $('.fotorama').fotorama();
						
                });
				
        }
    });



})(window.ABBOTT || (window.ABBOTT = {}));