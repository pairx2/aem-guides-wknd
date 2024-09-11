const fs = require('fs')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const cliProgress = require('cli-progress')
const handlebars = require("handlebars");
const env = require('./env')
const getResources = require('./getResources')

const generateSites = function () {

  const progressBar = new cliProgress.Bar({
    format: 'Progress: [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Entry: {entryname}'
  }, cliProgress.Presets.shades_classic)

  const resources = getResources()

  let projectDirectory = env.root
  let sites = []

  let vhostTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.vhost.hbs', "utf8"));
  let farmTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.farm.hbs', "utf8"));
  /*let rootMappingTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.rootMapping.hbs', "utf8"));
  let mappingTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.mapping.hbs', "utf8"));
  let anSimilacMappingTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.anSimilacMapping.hbs', "utf8"));
  let extensionlessMappingTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.extensionlessMapping.hbs', "utf8")); 
  let extensionlessMappingWithoutSlashTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.extensionlessMappingWithoutSlash.hbs', "utf8"));   
  let externalizerConfigTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.externalizer.hbs', "utf8"));
  let stageExternalizerConfigTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.stageexternalizer.hbs', "utf8"));  
  let prodExternalizerConfigTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.prodexternalizer.hbs', "utf8"));
  let domainVariablesTemplate = handlebars.compile(fs.readFileSync(projectDirectory + '/resources/templates/template.variables.hbs', "utf8"));*/

  // clean generated mappings
  /*rimraf.sync(env.mappingPath)
  rimraf.sync(`${env.localMappingPath}/etc/map.publish.local/http/local.*`);*/

  progressBar.start(resources.length, 0)
  for (let i = 0; i < resources.length; i++) {

    const entry = resources[i]

    if (!Array.isArray(entry.markets)) {
      entry.markets = [{
        path: entry.market,
        languages: entry.languages
      }]
    }
    entry.primaryMarket = entry.markets[0].path
    entry.primaryLanguage = entry.markets[0].languages[0]

	entry.loginPage = entry.loginPage ? entry.loginPage : "login"
    entry.faviconPath = entry.faviconPath ? entry.faviconPath : "/etc.clientlibs/abbott-platform/clientlibs/favicons/clientlib-favicon-abbott/resources/icon-192x192.png"
    entry.appleIconPath = entry.appleIconPath ? entry.appleIconPath : "/etc.clientlibs/abbott-platform/clientlibs/favicons/clientlib-favicon-abbott/resources"
    entry.www = parseBoolean(entry.www)
    entry.f7 = parseBoolean(entry.f7)
	entry.isMapEnabled = entry.isMapEnabled ? parseBoolean(entry.isMapEnabled) : true
    entry.enabled = parseBoolean(entry.enabled)
    entry.pagesInHome = parseBoolean(entry.pagesInHome)
    entry.multiMarket = parseBoolean(entry.multiMarket)
    entry.multiLanguage = parseBoolean(entry.multiLanguage)
	entry.sitemapAtRoot = parseBoolean(entry.sitemapAtRoot)
	entry.isFilterNeeded = parseBoolean(entry.isFilterNeeded)
    entry.isExtensionless = parseBoolean(entry.isExtensionless)
    entry.isExtensionlessWithoutSlash = parseBoolean(entry.isExtensionlessWithoutSlash)
	entry.isCloudSubdomainRequired = parseBoolean(entry.isCloudSubdomainRequired)
  entry.isCloudSubdomainRequiredOnUat = parseBoolean(entry.isCloudSubdomainRequiredOnUat)
    entry.isXMLExtensionAllowed = parseBoolean(entry.isXMLExtensionAllowed)
    entry.allowErrorPageCaching = parseBoolean(entry.allowErrorPageCaching)

    entry.farmName = entry.name.replace(/[^a-zA-Z0-9]/g, '-')

    progressBar.increment(1, {
      entryname: entry.name
    })
    
    if(entry.division){
        if (entry.multiMarket) {
          entry.contentRoot = `/content/${entry.division}/${entry.site}`
        } else if (entry.multiLanguage) {
          entry.contentRoot = entry.primaryMarket ?`/content/${entry.division}/${entry.site}/${entry.primaryMarket}`:
          `/content/${entry.division}/${entry.site}`
        } else {
          entry.contentRoot = entry.primaryMarket ?`/content/${entry.division}/${entry.site}/${entry.primaryMarket}/${entry.primaryLanguage}`:`/content/${entry.division}/${entry.site}/${entry.primaryLanguage}` 
        }
    } else {
        if (entry.multiMarket) {
          entry.contentRoot = `/content/${entry.site}`
        } else if (entry.multiLanguage) {
          entry.contentRoot = entry.primaryMarket ?`/content/${entry.site}/${entry.primaryMarket}`:
          `/content/${entry.site}`
        } else {
          entry.contentRoot = entry.primaryMarket ?`/content/${entry.site}/${entry.primaryMarket}/${entry.primaryLanguage}`:`/content/${entry.site}/${entry.primaryLanguage}` 
        }    
    }
    
    let vhostFileName = projectDirectory + '/src/conf.d/available_vhosts/0_' + entry.name + '.vhost';
    let farmFileName = projectDirectory + '/src/conf.dispatcher.d/available_farms/zzz_' + entry.name + '.farm';

    fs.writeFileSync(vhostFileName, vhostTemplate(entry))
    fs.writeFileSync(farmFileName, farmTemplate(entry))

    if (entry.enabled) {
      const vhostRelativePath = `../available_vhosts/0_${entry.name}.vhost`
      const farmRelativePath = `../available_farms/zzz_${entry.name}.farm`

      fs.symlink(vhostRelativePath, `${env.vhostSymLinks}/0_${entry.name}.vhost`, (err) => {
        if (err && err.code != 'EEXIST') {
          console.log(err);
        }
      })
      fs.symlink(farmRelativePath, `${env.farmSymLinks}/zzz_${entry.name}.farm`, (err) => {
        if (err && err.code != 'EEXIST') {
          console.log(err);
        }
      })
    }

    
	/*if(entry.isMapEnabled){
		
    // generate mappings
    env.mapDirName.forEach( envName => {

      let envDirName = ''

      if (envName == 'prod') {
		  if(entry.f7){
			envDirName = `f7aya7rugada.${entry.name}`
		  } else if(entry.www) {
			envDirName = `www.${entry.name}`
		  } else {
			envDirName = `${entry.name}`
		  }
      } else if (envName == 'stage') {
        envDirName = `staging.${entry.name}`
      } else if (envName.includes('preview')) {
        envDirName = `${envName}.${entry.name}`
      } else if (entry.isCloudSubdomainRequired) {
        if(entry.name == "abbott.com"){
          envDirName = `${envName}.aem.${entry.name}`
        }else{
          envDirName = `${envName}.cloud.${entry.name}`
        }
      } else {
        envDirName = `${envName}.${entry.name}`
      }

      mkdirp.sync(`${env.mappingPath}/etc/map.publish.${envName}/https/${envDirName}`)
      let rootMappingFileName = `${env.mappingPath}/etc/map.publish.${envName}/.content.xml`;
      let httpsMappingFileName = `${env.mappingPath}/etc/map.publish.${envName}/https/.content.xml`;
      let mappingFileName = `${env.mappingPath}/etc/map.publish.${envName}/https/${envDirName}/.content.xml`;
      fs.writeFileSync(rootMappingFileName, rootMappingTemplate(entry))
      fs.writeFileSync(httpsMappingFileName, rootMappingTemplate(entry))
      if (entry.isExtensionless) {
        fs.writeFileSync(mappingFileName, extensionlessMappingTemplate(entry));          
      } else if (entry.isExtensionlessWithoutSlash){
        fs.writeFileSync(mappingFileName, extensionlessMappingWithoutSlashTemplate(entry));
      } else if (entry.name == 'similac.com'){
        fs.writeFileSync(mappingFileName, anSimilacMappingTemplate(entry));
      } else {
        fs.writeFileSync(mappingFileName, mappingTemplate(entry));
      }
    })

    // Local mapping creation
    mkdirp.sync(`${env.localMappingPath}/etc/map.publish.local/http/local.${entry.name}`)
    let localMappingFileName = `${env.localMappingPath}/etc/map.publish.local/http/local.${entry.name}/.content.xml`;
    fs.writeFileSync(localMappingFileName, mappingTemplate(entry))

    sites.push({
      id: entry.division ? (entry.name == 'cloud.freestylelibre.de' ? 'adc_freestylelibre_de' : (entry.division + '_' + entry.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase())) : entry.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() ,
		  varId: entry.division ? (entry.division.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase() + '_' + entry.name.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()):(entry.name.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()),
      name: entry.name,
      www: entry.www,
      f7: entry.f7,
      isExtensionless: entry.isExtensionless,
      isExtensionlessWithoutSlash: entry.isExtensionlessWithoutSlash,
	  isCloudSubdomainRequired: entry.isCloudSubdomainRequired
    })

  }*/

  }

  // generate externalizer config

  /*let externalizerConfigDir = `${env.externalizerConfigModulePath}/src/main/content/jcr_root/apps/abbott-cloudplatform/domainconfig/config`
  let stageExternalizerConfigDir = `${env.externalizerConfigModulePath}/src/main/content/jcr_root/apps/abbott-cloudplatform/domainconfig/config.stage`
  let prodExternalizerConfigDir = `${env.externalizerConfigModulePath}/src/main/content/jcr_root/apps/abbott-cloudplatform/domainconfig/config.prod`
  let domainVariablesDir = `${env.externalizerConfigModulePath}/variables`

  mkdirp.sync(externalizerConfigDir)
  fs.writeFileSync(`${externalizerConfigDir}/com.day.cq.commons.impl.ExternalizerImpl.cfg.json`, externalizerConfigTemplate({sites: sites}))
  mkdirp.sync(prodExternalizerConfigDir)
  fs.writeFileSync(`${prodExternalizerConfigDir}/com.day.cq.commons.impl.ExternalizerImpl.cfg.json`, prodExternalizerConfigTemplate({sites: sites}))
  mkdirp.sync(stageExternalizerConfigDir)
  fs.writeFileSync(`${stageExternalizerConfigDir}/com.day.cq.commons.impl.ExternalizerImpl.cfg.json`, stageExternalizerConfigTemplate({sites: sites}))  

  // clean up domains variables folder and recreate
  rimraf.sync(domainVariablesDir)
  mkdirp.sync(domainVariablesDir)

  env.mapDirName.forEach( envName => {
    let domainVariablesFileName = `${domainVariablesDir}/domain_variables_${envName}.json`

    let prefix = ''
    if (envName === 'prod') {
      sites.map(site => {
        if (site.www) {
          site.name = `www.${site.name}`
        }
        return site
      })
    } else if (envName === 'stage') {
      prefix = 'staging.'
    } else {
      prefix = envName + '.'
    }

    let externalizerData = {
      prefix: prefix,
      sites: sites
    }
    fs.writeFileSync(domainVariablesFileName, domainVariablesTemplate(externalizerData))
  })

  progressBar.stop()*/
}

const parseBoolean = function(value) {
  if ('yes' === value || 'true' === value) {
    return true
  }
  return false
}

handlebars.registerHelper('ifEquals', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

handlebars.registerHelper('ifNotEquals', function(v1, v2, options) {
  if(v1 != v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

console.log('Generating sites, symLinks, mappings and externalizer config...')
generateSites()
console.log('Site generation complete!')
