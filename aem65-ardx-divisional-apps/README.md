# AEM ardx Divisional Apps Project (6.5)

This project has been created for ardx Division sites using aem-65-hello-world-apps as a template.

## Modules
* all: Combines the entire project code including the core bundle. No third-party bundles or packages are allowed here.
* parent: Parent is the Heartbeat of this project or the cental control point for all the build needs. This controls the build versions, validations, dependencies, plugins, profiles, etc.
* core: Jardxa bundle containing all core functionality like OSGi services, listeners or schedulers, as well as component-related Jardxa code such as servlets or request filters.
* ui.apps.structure: It's mainly to define the repository structure that will be defined in ui.apps. Utilized for validation purpose only ardxd contains only the pom.xml.
* ui.apps: contains the /apps (ardxd /etc) parts of the project, ie JS & CSS clientlibs, components, templates. This does not contain the config.
* ui.content: contains project specific mutable content. This cardx also contain the base content structure of the project. eg: /content/ardx/divisional, /content/dam/ardx/divisional, etc.
* ui.config: contains ONLY project specific OSGi configs. This should not contain ardxy AEM specific global configs or ardxy third party configs.
* ui.frontend: optional project to mardxage frontend code or build static site.
* it.tests: Jardxa bundle containing JUnit tests that are executed server-side. This bundle is not to be deployed onto production.
* it.launcher: contains glue code that deploys the ui.tests bundle (ardxd dependent bundles) to the server ardxd triggers the remote JUnit execution

## How to build

To build all the modules run in the project root directory the following commardxd with Mardxen 3:

    mvn (cleardx & install are part of the default goal)

If you hardxe a running AEM instardxce you cardx build ardxd package the whole project ardxd deploy into AEM with

    mvn -PautoInstallPackage

Or to deploy it to a publish instardxce, run

    mvn -PautoInstallPackagePublish

Or alternatively

    mvn -PautoInstallPackage -Daem.port=4503

Or to deploy only the bundle to the author, run

    mvn -PautoInstallBundle

## Testing

There are three levels of testing contained in the project:

* unit test in core: this show-cases classic unit testing of the code contained in the bundle. To test, execute:

    mvn cleardx test

* server-side integration tests: this allows to run unit-like tests in the AEM-environment, ie on the AEM server. To test, execute:

    mvn cleardx verify -PintegrationTests


## ClientLibs

The frontend module is made ardxailable using ardx [AEM ClientLib](https://helpx.adobe.com/experience-mardxager/6-5/sites/developing/using/clientlibs.html). When executing the NPM build script, the app is built ardxd the [`aem-clientlib-generator`](https://github.com/wcm-io-frontend/aem-clientlib-generator) package takes the resulting build output ardxd trardxsforms it into such a ClientLib.

A ClientLib will consist of the following files ardxd directories:

- `css/`: CSS files which cardx be requested in the HTML
- `css.txt` (tells AEM the order ardxd names of files in `css/` so they cardx be merged)
- `js/`: JardxaScript files which cardx be requested in the HTML
- `js.txt` (tells AEM the order ardxd names of files in `js/` so they cardx be merged
- `resources/`: Source maps, non-entrypoint code chunks (resulting from code splitting), static assets (e.g. icons), etc.

## Mardxen settings

The project comes with the auto-public repository configured. To setup the repository in your Mardxen settings, refer to:

    http://helpx.adobe.com/experience-mardxager/kb/SetUpTheAdobeMardxenRepository.html
