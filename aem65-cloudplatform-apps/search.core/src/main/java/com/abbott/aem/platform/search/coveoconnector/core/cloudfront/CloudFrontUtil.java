package com.abbott.aem.platform.search.coveoconnector.core.cloudfront;

import com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.tagging.TagManager;
import com.google.gson.Gson;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import java.util.HashMap;
import java.util.Map;

import static com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants.PREVIEW;


public class CloudFrontUtil 
{
	/**
	 * Instantiates a new CloudFrontUtil.
	 */
	private CloudFrontUtil()  {
		// Constructor
		
	}
	
	
	private static final Logger logger = LoggerFactory.getLogger(CloudFrontUtil.class);
	
	/** The Constant EXTERNALIZER_DOMAIN_NAME. */
	private static final String EXTERNALIZER_DOMAIN_NAME = "externalizerDomain";
	/** The Constant JCR_CONTENT_METADATA2. */
	private static final String JCR_CONTENT_METADATA2 = "/jcr:content/metadata";

	/** The Constant CONTENT_TYPE. */
	private static final String CONTENT_TYPE = "contentType";
	
	/** The Constant PUBLISH. */
	private static final String PUBLISH = "publish";
	
	/** The Constant HTML. */
    protected static final String HTML = ".html";
    
    /** The Constant CONTENT_FRAGMENT. */
    private static final String CONTENT_FRAGMENT = "contentFragment";
    
    /** The Constant READ_SERVICE. */
	protected static final String READ_SERVICE = "readService";
	
	/** The Constant VAR_DOMAINMAPPING. */
	private static final String VAR_SHORTURLMAPPINGS = "/var/shorturlconfig/urlmappings";
	
	
	/**
     * 
     * @param distributionId
	 * @param url
     * @return
     */
    public static String getEndPointURL( String distributionId, String url) {
        url = url.replace(CommonConstants.CLOUDFRONT_PROTOCOL, CommonConstants.HTTPS_PROTOCOL);
        StringBuilder endpointURL = new StringBuilder();
        endpointURL.append(url).append(CommonConstants.FORWARD_SLASH).append(distributionId/*"E3VN7ZWISKBD7Z"*/).append(CommonConstants.INVALIDATION_SUFFIX);
        logger.debug("endpointURL "+endpointURL);
        return endpointURL.toString();
    }
    
    public static String getInheritedValue(Resource resource, String propertyName, ResourceResolver resourceResolver) {
		    String path = resource.getPath();
			InheritanceValueMap inheritedPropperties;
			String contentType = resource.adaptTo(ValueMap.class).get(JcrConstants.JCR_PRIMARYTYPE).toString();
			if (propertyName.equalsIgnoreCase(EXTERNALIZER_DOMAIN_NAME) && contentType.equals(DamConstants.NT_DAM_ASSET)) {
				Resource res = resourceResolver.getResource(path + JCR_CONTENT_METADATA2);
				inheritedPropperties = new HierarchyNodeInheritanceValueMap(res);
				return inheritedPropperties.getInherited(propertyName, String.class);
			} else if(path.contains("experience-fragment")) {
				Resource res = resourceResolver.getResource(path+"/jcr:content");
				ValueMap vmp = res.adaptTo(ValueMap.class);
				return vmp.get(EXTERNALIZER_DOMAIN_NAME,String.class);
			}
			else {
				inheritedPropperties = new HierarchyNodeInheritanceValueMap(resource);
				return inheritedPropperties.getInherited(propertyName, String.class);
			}}
	
	public static  String getInheritedFragmentValue(Node node, String propertyName, ResourceResolver resourceResolver)
			throws RepositoryException {
		String propValue = "";
		TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		if (null != resourceResolver.getResource(node.getPath() + JCR_CONTENT_METADATA2)) {
			Node metaNode = resourceResolver.getResource(node.getPath() + JCR_CONTENT_METADATA2).adaptTo(Node.class);
			if (metaNode.hasProperty(propertyName)) {
				Property property = metaNode.getProperty(propertyName);
				if (StringUtils.equals(CONTENT_TYPE, property.getName())) {
					propValue = tagManager.resolve(property.getString()).getTitle();
				} else {
					propValue = property.getString();
				}
			} else {
				propValue = getInheritedFragmentValue(node.getParent(), propertyName, resourceResolver);
			}
		}
		return propValue;
	}
    
	public static String getExternalizeDomainName(Resource resource, ResourceResolver resourceResolver,
												  boolean isContentFragment) throws RepositoryException {
		String externalizerDomainName = null;
		if (isContentFragment) {
			externalizerDomainName = CloudFrontUtil.getInheritedFragmentValue(resource.adaptTo(Node.class), EXTERNALIZER_DOMAIN_NAME,
					resourceResolver);
		} else {
			externalizerDomainName = CloudFrontUtil.getInheritedValue(resource, EXTERNALIZER_DOMAIN_NAME, resourceResolver);
		}
		if (externalizerDomainName == null || externalizerDomainName.isEmpty()) {
			externalizerDomainName = PUBLISH;
		}

		return externalizerDomainName;
	}

	public static String resolveNonAsciiPath(String path) {
		int index =0;
		
		for(int i=0;i<path.length();i++){
			int liveIndex = (int)path.charAt(i);
			if(liveIndex>255 ) {
				index=i;
				break;
			}
		}
		path = path.substring(0, index).concat("*");
		return path;
	}
	
	public static String getShortURL(String path,String domain, ResourceResolver resolver) {
    	logger.debug("executing getShortURL:: path={}, domain={}", path, domain);

		Map<String,String> varMap = getMapping(VAR_SHORTURLMAPPINGS,"pathstoreplace",resolver);
    	String env=domain.split("\\.")[0];
    	String cloudEnv =env.concat(".cloud.");

    	if(env.equals("dev2")||env.equals("qa2")||env.equals("qa")||env.equals("dev")||env.equals("uat")
				||env.equals("staging")||env.equals("www") || "dev2preview".equals(env) || "preview".equals(env)) {
    		domain = domain.contains(cloudEnv)?domain.replace(cloudEnv, ""):domain.replace(env.concat("."), "");
    	}
    	if(domain.contains("aem.")) {
    		domain=domain.replace("aem.", "");
    	}

    	String domainWithoutEnv =null!=varMap? varMap.get(domain):null;
		logger.debug("getShortURL:: env={}, cloudEnv={}, domainWithoutEnv={}", env, cloudEnv, domainWithoutEnv);

    	if(null !=domainWithoutEnv && path.contains(domainWithoutEnv)) {
    		path = path.replace(domainWithoutEnv, "");
    	}
    	else {
    		logger.debug("Short url mapping not found at /var/shorturlconfig/urlmappings");
    	}
    	path = checkExtention(path,domain,resolver);
		logger.debug("end getShortURL:: path={}", path);
		return path;
	}
	
	public static  String checkExtention(String path, String domain, ResourceResolver resolver) {
			logger.debug("executing checkExtention, path={}, domain={}", path, domain);
			Resource configRes = resolver.getResource("/var/extensionlessMapping/urlmappings");
			ValueMap configValueMap = configRes.adaptTo(ValueMap.class);
			if (null != configValueMap) {
				    String extentionlesswithoutslash = configValueMap.get("extentionlessDomainsWithoutSlash", String.class);
				    String extentionlesswithslash = configValueMap.get("extentionlessDomainsWithSlash", String.class);
					logger.debug("Extention Mapping without slash" +extentionlesswithoutslash);
					logger.debug("Extention Mapping with slash" +extentionlesswithslash);
					if(extentionlesswithslash.contains(domain)) {
						path=path.replace(HTML, "/");
					}
					else if(extentionlesswithoutslash.contains(domain)) {
						path=path.replace(HTML, "");
					}
					
				
				
			}
			
		return path;
	}
	
	public static Map<String, Object> getResolverParams() {
		Map<String, Object> parameters = new HashMap<>();
		parameters.put(ResourceResolverFactory.SUBSERVICE, READ_SERVICE);
		return parameters;
	}
  	
	@SuppressWarnings("unchecked")
	public static Map<String, String> getMapping(String varDomainmappings,String key, ResourceResolver resolver) {
			logger.debug("executing getMapping, varDomainmappings={}, key={}", varDomainmappings, key);
			Map<String,String> map = new HashMap<String, String>();

			Resource configRes = resolver.getResource(varDomainmappings);
			ValueMap configValueMap = configRes.adaptTo(ValueMap.class);
			
			if (null != configValueMap) {
				
				    String fieldMappings = configValueMap.get(key, String.class);
					logger.debug("URLMappings" +fieldMappings);
					Gson gson = new Gson();
					map = gson.fromJson(fieldMappings, Map.class);
					
				
				
			}
			
		return map;
	}
	
	public static String getDomain(String content, ResourceResolver resolver) {
		try {
			Resource resource = resolver.getResource(content);
			Externalizer externalizer = resolver.adaptTo(Externalizer.class);
			 ValueMap itemValueMap = resource.adaptTo(ValueMap.class);
			boolean isContentFragment = itemValueMap.containsKey(CONTENT_FRAGMENT)
                    && itemValueMap.get(CONTENT_FRAGMENT, Boolean.class);
			String externalizerDomainName = CloudFrontUtil.getExternalizeDomainName(resource, resolver, isContentFragment);

			logger.debug("externalizerDomainName={}", externalizerDomainName);

			if(externalizerDomainName.equals(PUBLISH)) {
				logger.debug("Skipping cdn cache flush as Externalizer is not authored");
				return "";
			}
			String searchpage = externalizer.externalLink(resolver, externalizerDomainName, resolver.map("/content"));
			logger.debug("searchpage={}", searchpage);
			searchpage = searchpage.replace("https://", "").replace("/content", "");
			logger.debug("searchpage-cleaned={}", searchpage);
			return searchpage;
		}  catch (RepositoryException e) {
			logger.error("Repository Exception in getDomain",e);
		}
		return content;
	}

	public static String getPreviewDomain(String domain, String env, String agentId){
		if(isPreview(agentId)){
			if("dev2".equals(env)){
				return domain.replace(env, env + agentId).replace(".cloud", "")
						.replace(".aem", "");
			} else if("www".equals(env)){
				return domain.replace("www", agentId).replace(".cloud", "")
						.replace(".aem", "");
			}
		}
		return domain;
	}

	public static String getEnvironment(String domain){
		String env = domain.split("\\.")[0];
		if(!"dev2".equals(env) && !"qa2".equals(env) && !"qa".equals(env) && !"dev".equals(env) && !"uat".equals(env)
				&& !"staging".equals(env) && !"dev2preview".equals(env) && !"preview".equals(env) ) {
			env="www";
		}
		return env;
	}

	public static boolean isPreview(String agentId){
		return StringUtils.equalsIgnoreCase(agentId, PREVIEW);
	}
}