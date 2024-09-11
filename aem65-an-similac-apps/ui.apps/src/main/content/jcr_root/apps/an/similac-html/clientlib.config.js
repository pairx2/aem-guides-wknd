let timestamp = Date.now().toString();
module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,

    // path to the clientlib root folder (output)
    clientLibRoot: "./../similac/clientlibs",

    libs: [
	{
        name: "clientlib-similac-base",
        allowProxy: true,
        categories: ["apps.similac.base"],
        serializationFormat: "xml",
		cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;languageIn=ECMASCRIPT_2015;languageOut=ECMASCRIPT_2015;compilationLevel=whitespace;"],
		longCacheKey: '' + timestamp,
        assets: {
            js: [
                "dist/similac-base/js/jquery-3.5.1.min.js",
				"dist/similac-base/js/jquery-ui.min.js",
				"dist/similac-base/js/popper.min.js",
				"dist/similac-base/js/bootstrap.min.js",
				"dist/similac-base/js/vendor-common.react.js",
				"dist/similac-base/js/jquery.cookie.js",
				"dist/similac-base/js/equal-height.js",
                "dist/similac-base/js/purify.min.js",
				"dist/similac-base/js/mark.min.js"
				
            ],
            css: [
                "dist/similac-base/css/*.css"
            ]
        }
    },
	{
        name: "clientlib-similac-base-for-abbott-globals",
        allowProxy: true,
        categories: ["apps.similac.base.abbottglobals"],
        serializationFormat: "xml",
		cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;languageIn=ECMASCRIPT_2015;languageOut=ECMASCRIPT_2015;compilationLevel=whitespace;"],
		longCacheKey: '' + timestamp,
        assets: {
            js: [
                "dist/similac-base/js/jquery-3.5.1.min.js",
				"dist/similac-base/js/jquery-ui.min.js",
				"dist/similac-base/js/popper.min.js",
				"dist/similac-base/js/bootstrap.min.js",
				"dist/similac-base/js/jquery.cookie.js",
				"dist/similac-base/js/equal-height.js",
                "dist/similac-base/js/purify.min.js",
				"dist/similac-base/js/mark.min.js",
				"dist/similac-base/js/sweetalert.min.js"			
            ],
            css: [
                "dist/similac-base/css/*.css"
            ]
        }
    },	
	{
        name: "clientlib-similac-magento-base",
        allowProxy: true,
        categories: ["apps.similac.magento.base"],
        serializationFormat: "xml",
		cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {
            js: [
				"dist/similac-base/js/vendor-common.react.js",
				"dist/similac-base/js/jquery.cookie.js",
				"dist/similac-base/js/equal-height.js",
                "dist/similac-base/js/purify.min.js",
				"dist/similac-common/js/magento-common.js"
            ],
            css: [
                "dist/similac-base/css/*.css"
            ]
        }
    },
	{
        name: "clientlib-similac-products",
        allowProxy: true,
        categories: ["apps.similac.products"],
        serializationFormat: "xml",
		embed: ["similac.globalconfig","similac.globalheader", "similac.globalfooter","similac.globalbreadcrumb","similac.button","similac.subscribe","similac.card-product","similac.disruptor","similac.tabs","similac.product-comparison","similac.product-faq","similac.product-info","similac.product-description","similac.product-landing","similac.form-elements","similac.image-slider-v2","similac.user-profile", "similac.announcement","similac.list"],
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;languageIn=ECMASCRIPT_2015;languageOut=ECMASCRIPT_2015;compilationLevel=whitespace;"],
		longCacheKey: '' + timestamp,
        assets: {
            css: [
                "dist/similac-common/css/*.css",
				"dist/similac-component/css/modal-box.css"
            ],
			js: [
				"dist/similac-component/js/products/products.react.js",
                "dist/similac-component/js/user_login_dialog/user_login_dialog.react.js",
				"dist/similac-component/js/logout_popup/logout_popup.react.js"
            ],
			resources: [
				{src: "dist/resources/fonts/*.*", dest: "/fonts/"},
				{src: "dist/resources/img/*.*", dest: "/img/"}
            ]
        }
    },
	{
        name: "clientlib-similac-commons",
        allowProxy: true,
        categories: ["apps.similac.commons"],
        serializationFormat: "xml",
		embed: ["similac.globalconfig","similac.globalheader", "similac.globalfooter","similac.globalbreadcrumb","similac.button","similac.form-elements","similac.hero","similac.card","similac.subscribe","similac.card-product","similac.disruptor","similac.list","similac.tabs","similac.article","similac.landing","similac.text-image","similac.image","similac.image.v2","similac.videoplayer","similac.product-landing","core.wcm.components.image.v2","similac.product-info", "similac.find-retailer","similac.video-embed","similac.globaltable","similac.user-profile","similac.announcement"],
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;languageIn=ECMASCRIPT_2015;languageOut=ECMASCRIPT_2015;compilationLevel=whitespace;"],
		longCacheKey: '' + timestamp,
        assets: {
            css: [
                "dist/similac-common/css/*.css",
                "dist/similac-component/css/google.css",
				"dist/similac-component/css/modal-box.css",				
				"dist/similac-component/css/accordion.css",
				"dist/similac-component/css/filters.css",
				"dist/similac-component/css/form-elements.css",
				"dist/similac-component/css/global-error.css"
            ],
			js: [
				"dist/similac-component/js/user_login_dialog/user_login_dialog.react.js",
				"dist/similac-component/js/logout_popup/logout_popup.react.js",
				"dist/similac-common/js/form-element.js",
                "dist/similac-common/js/welcome-form.js"
            ],
			resources: [
				{src: "dist/resources/fonts/*.*", dest: "/fonts/"},
				{src: "dist/resources/img/*.*", dest: "/img/"}
            ]
        }
    },
	{
        name: "global-config",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.globalconfig"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             js: [
				"dist/similac-common/js/gtm.datalayer.js",
                "dist/similac-common/js/social-login.js",              
				"dist/similac-common/js/main.js",
                "dist/similac-common/js/config.js",
				"dist/similac-common/js/service.api.js",
				"dist/similac-common/js/service.login.js",
				"dist/similac-common/js/utils.js"                
            ]
        }
    },
	{
        name: "global-header",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.globalheader"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/global-header.css",
				"dist/similac-component/css/second-nav.css",
				"dist/similac-component/css/mini-cart.css",
                "dist/similac-component/css/login.css",
                "dist/similac-component/css/global-error.css"
            ]
        }
    },
	{
        name: "global-footer",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.globalfooter"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/global-footer.css"
            ]
        }
    },
	{
        name: "global-table",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.globaltable"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/table.css"
            ]
        }
    },
	{
        name: "global-breadcrumb",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.globalbreadcrumb"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/bread-crumb.css"
            ]
        }
    },
	{
        name: "button",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.button"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/button.css"
            ]
        }
    },
	{
        name: "form-elements",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.form-elements"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/form-elements.css",
                "dist/similac-component/css/registration.css",
				"dist/similac-component/css/checkbox.css",
				"dist/similac-component/css/radio.css",
				"dist/similac-component/css/radio-button.css",
				"dist/similac-component/css/calendar.css"
            ]
        }
    },
	{
        name: "hero",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.hero"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/hero-banner.css"
            ]
        }
    },
	{
        name: "home-card",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.card"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/card.css",
				"dist/similac-component/css/card-new.css",
				"dist/similac-component/css/card-templ-1.css",
				"dist/similac-component/css/article-landing-card.css"				
            ]
        }
    },
	{
        name: "subscribe",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.subscribe"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/ribbon.css"
            ]
        }
    },
	{
        name: "card-product",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.card-product"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/card-product.css"
            ],
			js: [
                "dist/similac-component/js/card-product/card-product.js"
            ]
        }
    },
	{
        name: "disruptor",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.disruptor"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/disruptor.css",
				"dist/similac-component/css/drawer.css"
            ]
        }
    },
	{
        name: "list",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.list"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/list.css"
            ]
        }
    },
	{
        name: "tabs",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.tabs"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/tab-content.css",
				"dist/similac-component/css/tabs.css"
            ],
			js: [
				"dist/similac-component/js/tab/polyfills.js",
				"dist/similac-component/js/tab/tab.js",
				"dist/similac-component/js/tab/tabs.js"
            ]
        }
    },
	{
        name: "image-slider",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.imageslider"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/image-slider.css"
            ]
        }
    },
	{
        name: "product-description",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.product-description"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/product-description.css"
            ]
        }
    },
	{
        name: "product-faq",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.product-faq"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/product-faq.css"
            ]
        }
    },
	{
        name: "product-comparison",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.product-comparison"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/product-comparison.css"
            ]
        }
    },
	{
        name: "product-info",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.product-info"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/product-info.css"
            ],
			 js: [
                "dist/similac-component/js/product-info/product-info.js"
            ]
        }
    },
	{
        name: "text-image",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.text-image"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/reversible-cart-block.css"
            ]
        }
    },
	{
        name: "landing",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.landing"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/landing.css"
            ]
        }
    },
	{
        name: "article",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.article"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/article.css"
            ]
        }
    },
	{
        name: "image",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.image"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/image.css"
            ]
        }
    },
	{
        name: "registration",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.registration"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             js: [
                "dist/similac-component/js/registration/registration.react.js"
            ]
        }
    },
	{
        name: "image-slider-v2",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.image-slider-v2"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/image-slider.css"
            ],
			 js: [
			    "dist/similac-component/js/video-player/youtube-iframe-api.js",
                "dist/similac-component/js/product_images/product_images.react.js"
            ]
        }
    },
	{
        name: "forget-password",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.forget-password"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/password-reset.css"
            ],
			 js: [
                "dist/similac-component/js/forgot_password/forgot_password.react.js",
				"dist/similac-component/js/reset_password/reset_password.react.js"
            ]
        }
    },
	{
        name: "fast-registration",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.fast-registration"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/fast-register.css"
            ],
			 js: [
                "dist/similac-component/js/fast_registration/fast_registration.react.js"
            ]
        }
    },
	{
        name: "product-landing",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.product-landing"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/products.css"
            ]
        }
    },
	{
        name: "similac-login",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.login"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {
          js: [
          		"dist/similac-component/js/login/login.react.js"
          ]
        }
    },
    {
        name: "similac-pwa-login",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.pwa.login"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {         
          css: [
            "dist/similac-component/css/pwa-login.css"
			],
			 js: [
          	"dist/similac-component/js/pwa_login/pwa_login.react.js"
          ]
        }
    },
    {
        name: "similac-pure-bliss",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["pure.bliss"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {         
          css: [
            "dist/similac-component/css/pure-bliss.css"
			],
            js: [
             "dist/similac-component/js/pure-bliss/pure-bliss.js"
            ]
        }
    },
    {
        name: "similac-pwa-confirmation",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["pwa.confirmation"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {         
          css: [
            "dist/similac-component/css/pwa-confirmation.css"
			]
        }
    },
    {
        name: "similac-pwa-scan-bonus",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["pwa.scan.bonus"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {         
          css: [
            "dist/similac-component/css/pwa-scan-bonus.css"
			]
        }
    },
    {
        name: "similac-pwa-scan-limit",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["pwa.scan.limit"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {         
          css: [
            "dist/similac-component/css/pwa-scan-limit.css"
			]
        }
    },
    {
        name: "similac-locate-qr",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["pwa.qrcode"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {         
          css: [
            "dist/similac-component/css/pwa-qrcode.css"
			]
        }
    },
    {
        name: "similac-pwa-wrong-qrcode",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["pwa.wrong.qrcode"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {         
          css: [
            "dist/similac-component/css/pwa-wrong-qrcode.css"
			]
        }
    },
	{
        name: "checkout-login",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["checkout.login"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/login.css"
            ],
			 js: [
				"dist/similac-component/js/checkout_Login/checkout_Login.react.js"
            ]
        }
    },
	{
        name: "find-retailer",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.find-retailer"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/find-retailer.css"
            ],
			js: [
				"dist/similac-component/js/find_retailer/find_retailer.js"
            ]
        }
    },
	{
        name: "contact-us",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.contact-us"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {
			js: [
				"dist/similac-component/js/contact_us/contact_us.react.js"
            ]
        }
    },
	{
        name: "user-profile",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.user-profile"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/side-nav.css",				
				"dist/similac-component/css/personal-info.css",
				"dist/similac-component/css/profile.css",
				"dist/similac-component/css/my-rewards.css",
				"dist/similac-component/css/donut.css"
            ],
			 js: [
                "dist/similac-component/js/personal_info/personal_info.react.js",
				"dist/similac-component/js/my_rewards/my_rewards.react.js",
				"dist/similac-component/js/left_menu/left_menu.react.js",
				"dist/similac-common/js/donut.js"
				
            ]
        }
    },
	{
        name: "account-linking",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.account-linking"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             js: [
                "dist/similac-component/js/account_linking/account_linking.react.js"
            ]
        }
	},
	{
        name: "do-sign-in",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.do-sign-in"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             js: [
                "dist/similac-component/js/digital_offer_signin/digital_offer_signin.react.js"
            ]
        }
    },
    {
        name: "universal-offers-pwa",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.universal-offers"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/card-offerv2.css",
				"dist/similac-component/css/video-player.css",
				"dist/similac-component/css/overlay.css"
            ],
			 js: [
                "dist/similac-component/js/my_offersv2_pwa/my_offersv2_pwa.react.js"
            ]
        }
    },
	{
        name: "my-offers",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.my-offers"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/card-offer.css",
				"dist/similac-component/css/video-player.css",
            ],
			 js: [
                "dist/similac-component/js/my_offers/my_offers.react.js"
            ]
        }
    },
	{
        name: "do-retailer-sign-in",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.do-retailer-sign-in"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
			 js: [
                "dist/similac-component/js/digital_offer_retailer_signin/digital_offer_retailer_signin.react.js"
            ]
        }
    },
	{
        name: "do-retailer-selection",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.do-retailer-selection"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
			js: [
				"dist/similac-component/js/retailer_selection/retailer_selection.react.js"
            ],
			css: [
				"dist/similac-component/css/retailer-selection.css"
			]
        }
    },
	{
        name: "diaper-decoder",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.diaper-decoder"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
			js: [
				"dist/similac-component/js/diaper-decoder/diaper-decoder.js"
            ],
			css: [
				"dist/similac-component/css/diaper-decoder.css"
			]
        }
    },
	{
        name: "sitemap",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.sitemap"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/site-map.css"
            ]
        }
    },
	{
        name: "tummy-tool",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.tummy-tool"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/tummy-trouble.css"
            ],
			 js: [
                "dist/similac-component/js/tummy-trouble/tummy-trouble.js"
				
            ]
        }
    },
	{
        name: "tummy-results",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.tummy-results"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {
            css: [
                "dist/similac-component/css/tummy-results.css"
            ],
			js: [
                "dist/similac-component/js/tummy-results/tummy-results.js"
				
            ]
        }
    },
	{
        name: "faq",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.faq"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: { 
            css: [
				"dist/similac-component/css/faq.css"
            ],
			js: [
				"dist/similac-component/js/faq/faq.js"
			]
		}
	},
	{
        name: "video-embed",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.video-embed"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: { 
		
			js: [
			    "dist/similac-component/js/video-player/youtube-iframe-api.js",
				"dist/similac-component/js/video-player/video-player.js"				
			]
		}
	},
	{
        name: "formula-finder",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.formula-finder"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
            css: [
				"dist/similac-component/css/formula-finder.css"
            ],
			js: [
				"dist/similac-component/js/formula-finder/formula-finder.js"
			]
		}
	},
	{
        name: "formula-finder-results",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.formula-finder-results"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
            css: [
				"dist/similac-component/css/formula-finder-results.css"
            ]
		}
	},
	{
        name: "search-results",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.search-results"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
            css: [
				"dist/similac-component/css/global-search.css"
            ],
			js: [
				"dist/similac-component/js/global-search/global-search.react.js"
			]
		}
	},
	{
        name: "unsubscribe",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.unsubscribe"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
            css: [
				"dist/similac-component/css/unsubscribe.css",
				"dist/similac-component/css/registration.css"
            ],
			js: [
				"dist/similac-component/js/unsubscribe/unsubscribe.react.js"
			]
		}
	},
	{
        name: "products-subscription",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.prod-subscription"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
            css: [
				"dist/similac-component/css/subscription-products.css"
            ],
			js: [
				"dist/similac-component/js/subscription-products/subscription-products.react.js"
			]
		}
	},
	{
        name: "mailing-address",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.mailing-address"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
            
			js: [
				"dist/similac-component/js/mailing_address/mailing_address.react.js"
			]
		}
	},
	{
        name: "announcement",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.announcement"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/announcement.css"
            ]
        }
	},
	{
        name: "customtable",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.customtable"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/custom-table.css"
            ]
        }
	},
	{
        name: "customtable",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.customtable"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        assets: {  
             css: [
                "dist/similac-component/css/custom-table.css"
            ]
        }
	},
	{
        name: "universal-offers",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.universal-offers"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/card-offerv2.css",
				"dist/similac-component/css/video-player.css",
				"dist/similac-component/css/overlay.css"
            ],
			 js: [
                "dist/similac-component/js/my_offersv2/my_offersv2.react.js"
            ]
        }
    },
    {
        name: "universal-retailer-selection",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.universal-retailer-selection"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
			js: [
				"dist/similac-component/js/retailer_selectionv2/retailer_selectionv2.react.js"
            ],
			css: [
				"dist/similac-component/css/retailer-selectionv2.css",
                "dist/similac-component/css/card-offerv2.css",
                "dist/similac-component/css/overlay.css"
			]
        }
    },
	{
        name: "universal-retailer-selection-pwa",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.universal-retailer-selection"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
			js: [
				"dist/similac-component/js/retailer_selectionv2_pwa/retailer_selectionv2_pwa.react.js"
            ],
			css: [
				"dist/similac-component/css/retailer-selectionv2.css",
                "dist/similac-component/css/card-offerv2.css",
                "dist/similac-component/css/overlay.css"
			]
        }
    },
    {
        name: "universal-retailer-coupon-pwa",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.universal-retailer-selection"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
			js: [
				"dist/similac-component/js/retailer_coupon_pwa/retailer_coupon_pwa.react.js"
            ],
			css: [
				"dist/similac-component/css/retailer-coupon-pwa.css"
			]
        }
    },
    {
        name: "universal-retailer-redeemcoupon-pwa",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.universal-retailer-selection"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: { 
			js: [
				"dist/similac-component/js/retailer_redeemcoupon_pwa/retailer_redeemcoupon_pwa.react.js"
            ],
			css: [
				"dist/similac-component/css/retailer-redeemcoupon-pwa.css"
			]
        }
    },
    {
        name: "product-innovation",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.virgo"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {
			css: [
                "dist/similac-component/css/virgoUpdate.css"
			]
        }
    },
	{
        name: "oasis-registration",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.oasis-registration"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {
			js: [
                "dist/similac-common/js/ssm-register-global.js"
			],
			css: [
                "dist/similac-component/css/ssm-register-global.css"
			]
        }
    },
	{
        name: "oasis-login",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.oasis-login"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {
			js: [
				"dist/similac-common/js/oasis-login.js"
			],
			css: [
				"dist/similac-component/css/oasis-login.css"
			]
        }
    },
    {
        name: "bio-engineering",
        path: "./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.bio-engineering"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        longCacheKey: '' + timestamp,
        assets: {
            js: [
                "dist/similac-common/js/be-global.js"
            ],
            css: [
                "dist/similac-component/css/be-global.css"
            ]
        }
    },
    {
        name: "account-settings-pwa",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.account-settings-pwa"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/account-settings.css"
            ],
			 js: [
            "dist/similac-component/js/account_settings/account_settings.react.js"
            ]
        }
    },
    {
        name: "sms-notification-pwa",
		path:"./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.sms-notification-pwa"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
		longCacheKey: '' + timestamp,
        assets: {  
             css: [
                "dist/similac-component/css/sms_notification.css"
            ],
			 js: [
            "dist/similac-component/js/sms_notification/sms_notification.react.js"
            ]
        }
    },
    {
        name: "change",
        path: "./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.change"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        longCacheKey: '' + timestamp,
        assets: {
            css: [
                "dist/similac-component/css/change.css"
            ]
        }
    },
    {
        name: "coupons-and-samples",
        path: "./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.couponsamples"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        longCacheKey: '' + timestamp,
        assets: {
            js: [
                "dist/similac-common/js/coupons-and-samples.js"
            ],
            css: [
                "dist/similac-component/css/coupons-and-samples.css"
            ]
        }
    },
    {
        name: "digital-rewards",
        path: "./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.digitalrewards"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        longCacheKey: '' + timestamp,
        assets: {
            css: [
                "dist/similac-component/css/digital-rewards.css"
            ]
        }
    },
    {
        name: "mobile-rewards",
        path: "./../similac/clientlibs/clientlib-components",
        allowProxy: true,
        categories: ["similac.mobilerewards"],
        serializationFormat: "xml",
        cssProcessor: ["default:none", "min:none"],
        jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
        longCacheKey: '' + timestamp,
        assets: {
            js: [
                "dist/similac-common/js/rewards-mobile.js"
            ],
            css: [
                "dist/similac-component/css/rewards-mobile.css"
            ]
        }
    }
	]
};