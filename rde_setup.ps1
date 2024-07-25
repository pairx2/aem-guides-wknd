# Update plugins
aio plugins:install @adobe/aio-cli-plugin-cloudmanager

#Setup RDE for AEM as a Cloud Service
Write-Output "***Setting Up RDE***"
aio config:set cloudmanager_orgid 297215F354E746E90A4C98A4@AdobeOrg
Write-Output "***Cloud Manager OrgId Setup Done***"
aio config:set cloudmanager_programid 30802
Write-Output "***Cloud Manager Program Id Setup Done***"
aio config:set cloudmanager_environmentid 1394203
Write-Output "***Cloud Manager Environment Id Setup Done***"
aio login -d -f
Write-Output "***Cloud Manager Login Done***"

# Reset RDE. This will delete all the existing code packages and configurations.
Write-Output "***Resetting RDE***"
#aio aem:rde:reset
Write-Output "***Reset Done***"

# Deploy
Write-Output "***Starting Deployment***"
#Commented as we will deploy ALL. This contains all of the following. 
aio aem:rde:install all/target/aem-guides-wknd.all-3.2.1-SNAPSHOT.zip 
Write-Output "***Deployed Code packages (ALL)***"
#aio aem:rde:install -t osgi-bundle core/target/*.jar
#Write-Output "***Deployed Core***"
#aio aem:rde:install ui.apps/target/*.zip
#Write-Output "***Deployed UI.Apps***"
#aio aem:rde:install -t osgi-config ui.config/target/*.zip
#Write-Output "***Deployed UI.Config***"

aio aem:rde:install -t content-package ui.content/target/aem-guides-wknd.ui.content-3.2.1-SNAPSHOT.zip
Write-Output "***Deployed UI.Content***"
aio aem:rde:install -q -t frontend ui.frontend/target/aem-guides-wknd.ui.frontend-3.2.1-SNAPSHOT.zip
Write-Output "***Deployed UI.Frontend***"

Write-Output "***Deployment Completed***"
