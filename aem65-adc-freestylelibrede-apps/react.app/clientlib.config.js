module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,
    // path to the clientlib root folder (output)
    clientLibRoot:
      "./../ui.apps/src/main/content/jcr_root/apps/adc/freestylelibrede/clientlibs",

    libs: [
      {
        name: "clientlib-react-vendor",
        allowProxy: true,
        categories: ["clientlib-react-vendor"],
        jsProcessor: ["default:none,min:none"],
        serializationFormat: "xml",
        assets: {
          js: ["dist/runtime.js", "dist/vendor.js"]
        }
     },
      {
        name: "clientlib-react",
        allowProxy: true,
        categories: ["clientlib-react"],
        jsProcessor: ["default:none,min:none"],
        serializationFormat: "xml",
        assets: {
          js: ["dist/main.js"],
          css: ["dist/main.css"],
          resources: ["dist/**/*.png"]
        }
     }
    ]
};

   