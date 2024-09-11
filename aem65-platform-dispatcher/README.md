# Dispatcher

This repository contains the dispatcher configurations as well as related
infrastructure code, like mappings and environment variables.

## Generator

A node.js bases generator is used to generate the vhosts and dispatcher farm
files from yaml based configuration. The generator is located in `./dispatcher/.generator`.
The configurations are in `./dispatcher/resources/**/*.yml` and the templates for in
`./dispatcher/resources/templates`.

## Dispatcher

The AEM SDK contains a docker script to run a local dispatcher, https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/developing/aem-as-a-cloud-service-sdk.html?lang=en#developing

There are two shell scripts to validate and deploy the configuration to the docker container and
run it, `validate.sh` and `dispatcher.sh`. The AEM SDK is expected at `../aem-sdk` (see paths in the scripts).

Note: Only tested on MacOS, AEM SDK supports Windows as well, but Windows scripts need to be created. 
