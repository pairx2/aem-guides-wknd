
"use strict";

use( ["/libs/wcm/foundation/components/utils/ResourceUtils.js","/libs/sightly/js/3rd-party/q.js" ], function(ResourceUtils, Q){
    let prodPromise = Q.defer(), company = {},
        productsPath = granite.resource.path + "/products";

    company.products = undefined;

    ResourceUtils.getResource(productsPath)
            .then(function (prodParent) {
                return prodParent.getChildren();
            })
            .then(function(products) {
                addProduct(products, 0);
            });

    function addProduct(products, currIndex){
        if(!company.products){
            company.products = [];
        }

        if (currIndex >= products.length) {
            prodPromise.resolve(company);
            return;
        }

        let productRes = products[currIndex],
            properties = productRes.properties;

        let product = {
            path: productRes.path,
            name: properties["product"],
            tile: properties["tile"]

        };

        ResourceUtils.getResource(productRes.path + "/components")
            .then(function (compParent) {
                return compParent.getChildren();
            })
            .then(function(components) {
                addComponent(product, components, 0);
            });

        company.products.push(product);

        addProduct(products, (currIndex + 1));
    }

    function addComponent(product, components, currIndex){
        if(!product.components){
            product.components = [];
        }

        if (currIndex >= components.length) {
            return;
        }

        let compRes = components[currIndex],
            properties = compRes.properties;

        let component = {
            path: compRes.path,
            name: properties.component,
            protein: properties.protein,
            image: properties.image,
            imageOnSelect: properties.imageOnSelect
        };

        product.components.push(component);

        addComponent(product, components, (currIndex + 1));
    }

    return prodPromise.promise;
} );