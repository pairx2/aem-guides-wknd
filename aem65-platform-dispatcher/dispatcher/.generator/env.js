const path = require('path')

module.exports = {
  root: path.resolve('..'),
  vhostPath: path.resolve('../src/conf.d/available_vhosts'),
  farmPath: path.resolve('../src/conf.dispatcher.d/available_farms'),
  resources: path.resolve('../resources'),
  vhostSymLinks: path.resolve('../src/conf.d/enabled_vhosts'),
  farmSymLinks: path.resolve('../src/conf.dispatcher.d/enabled_farms'),
  /*mappingPath: '../../mappings/src/main/content/jcr_root',
  localMappingPath: '../../mappings-local/src/main/content/jcr_root',
  mapDirName: [ 'dev', 'dev2', 'dev2preview', 'qa', 'qa2', 'stage', 'prod', 'preview' ],
  externalizerConfigModulePath: '../../domainconfig'*/
}
