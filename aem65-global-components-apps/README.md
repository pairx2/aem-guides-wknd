# AEM Platform Project (6.5)

This project holds all the common modules, third party libraries, reusable components that can be leveraged across all sites. It also holds all the AEM OSGi configs that is applicable for the entire instance.

## Modules
* all: Combines the entire project code including the core bundle. This also embeds all the third party bundles & packages.
* parent: Parent is the Heartbeat of this project or the cental control point for all the build needs. This controls the build versions, validations, dependencies, plugins, profiles, etc.
* core: Java bundle containing all core functionality like OSGi services, listeners or schedulers, as well as component-related Java code such as servlets or request filters.
* ui.apps.structure: It's mainly to define the repository structure that will be defined in ui.apps. Utilized for validation purpose only and contains only the pom.xml.
* ui.apps: contains the /apps (and /etc) parts of the project, ie JS & CSS clientlibs, components, templates. This does not contain the config
* ui.content: contains global config (/conf/global), or any common mutable content.
* ui.tests: Java bundle containing JUnit tests that are executed server-side. This bundle is not to be deployed onto production.
* ui.launcher: contains glue code that deploys the ui.tests bundle (and dependent bundles) to the server and triggers the remote JUnit execution.

## How to build

To build all the modules run in the project root directory the following command with Maven 3:

    mvn (clean & install are part of the default goal)

If you have a running AEM instance you can build and package the whole project and deploy into AEM with

    mvn -PautoInstallPackage

Or to deploy it to a publish instance, run

    mvn -PautoInstallPackagePublish

Or alternatively

    mvn -PautoInstallPackage -Daem.port=4503

Or to deploy only the bundle to the author, run

    mvn -PautoInstallBundle

## Testing

There are three levels of testing contained in the project:

* unit test in core: this show-cases classic unit testing of the code contained in the bundle. To test, execute:

    mvn clean test

* server-side integration tests: this allows to run unit-like tests in the AEM-environment, ie on the AEM server. To test, execute:

    mvn clean verify -PintegrationTests


## ClientLibs

The frontend module is made available using an [AEM ClientLib](https://helpx.adobe.com/experience-manager/6-5/sites/developing/using/clientlibs.html). When executing the NPM build script, the app is built and the [`aem-clientlib-generator`](https://github.com/wcm-io-frontend/aem-clientlib-generator) package takes the resulting build output and transforms it into such a ClientLib.

A ClientLib will consist of the following files and directories:

- `css/`: CSS files which can be requested in the HTML
- `css.txt` (tells AEM the order and names of files in `css/` so they can be merged)
- `js/`: JavaScript files which can be requested in the HTML 
- `js.txt` (tells AEM the order and names of files in `js/` so they can be merged
- `resources/`: Source maps, non-entrypoint code chunks (resulting from code splitting), static assets (e.g. icons), etc.

## Maven settings

The project comes with the auto-public repository configured. To setup the repository in your Maven settings, refer to:

    http://helpx.adobe.com/experience-manager/kb/SetUpTheAdobeMavenRepository.html
