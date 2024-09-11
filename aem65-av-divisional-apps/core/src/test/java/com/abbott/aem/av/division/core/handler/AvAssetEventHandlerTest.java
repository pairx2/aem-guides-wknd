package com.abbott.aem.av.division.core.handler;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFactory;
import javax.jcr.ValueFormatException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.observation.ResourceChange;
import org.apache.sling.api.resource.observation.ResourceChange.ChangeType;
import org.apache.sling.api.resource.observation.ResourceChangeListener;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class AvAssetEventHandlerTest {

	ResourceChange resourceChange;

	protected static final String EIFU_SERVICE = "eifu-system-user";

	private static final String CATEGORY_UNIT = "categoryTitle";

	private static final String JCR_METADATA = "/jcr:content/metadata";

	private static final String ACTION_PATH = "/content/dam/av/manuals-eifu/global/ARTEN600259382_A.PDF/jcr:content/metadata";

	private static final String TAG = "av:manualseifu/US/en/hcp/vascular/peripheral-intervention/closure-systems/prostar-xl";

	private static final String AVTAG = "av:manualseifu/US/en/hcp/peripheral-intervention/closure-systems/prostar-xl";

	@InjectMocks
	AvAssetEventHandler avAssetEventHandler;

	@Mock
	Session session;

	@Mock
	Value value;

	@Mock
	ResourceResolverFactory resResolverFactory;

	@Mock
	TagManager tagManager;

	@Mock
	ModifiableValueMap mvp;

	@Mock
	ResourceResolver resolver;

	@Mock
	Resource resource;

	@Mock
	ValueFactory vfac;

	@Mock
	Property prop;

	@Mock
	ResourceChangeListener resourceChangeListener;

	Value[] valueArray;

	@Mock
	Tag tag;

	@Mock
	Replicator replicator;

	@Test
	void testOnChange() throws Exception {
		MockitoAnnotations.initMocks(this);
		avAssetEventHandler.resolverFactory = resResolverFactory;
		Map<String, Object> param = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, EIFU_SERVICE);
		when(resResolverFactory.getServiceResourceResolver(param)).thenReturn(resolver);
		when(resolver.getResource(ACTION_PATH)).thenReturn(resource);
		Node node = Mockito.mock(Node.class);
		when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(prop);
		when(prop.isMultiple()).thenReturn(true);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(tagManager.resolve(ArgumentMatchers.anyString())).thenReturn(tag);
		when(tag.getTitle()).thenReturn("hcp");
		when(node.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		when(node.hasProperty(CATEGORY_UNIT)).thenReturn(false);
		when(vfac.createValue(TAG)).thenReturn(value);
		valueArray = new Value[1];
		valueArray[0] = vfac.createValue(TAG);
		when(prop.getValues()).thenReturn(valueArray);
		when(value.getString()).thenReturn(TAG);
		List<ResourceChange> resourceChanges = new ArrayList<>();
		resourceChanges.add(new ResourceChange(ChangeType.CHANGED, ACTION_PATH, false));
		avAssetEventHandler.onChange(resourceChanges);
	}

	@Test
	void testAvOnChange() throws Exception {
		MockitoAnnotations.initMocks(this);
		avAssetEventHandler.resolverFactory = resResolverFactory;
		Map<String, Object> param = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, EIFU_SERVICE);
		when(resResolverFactory.getServiceResourceResolver(param)).thenReturn(resolver);
		when(resolver.getResource(ACTION_PATH)).thenReturn(resource);
		Node node = Mockito.mock(Node.class);
		when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(prop);
		when(prop.isMultiple()).thenReturn(true);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(tagManager.resolve(ArgumentMatchers.anyString())).thenReturn(tag);
		when(tag.getTitle()).thenReturn("hcp");
		when(node.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		when(node.hasProperty(CATEGORY_UNIT)).thenReturn(false);
		when(vfac.createValue(AVTAG)).thenReturn(value);
		valueArray = new Value[1];
		valueArray[0] = vfac.createValue(AVTAG);
		when(prop.getValues()).thenReturn(valueArray);
		when(value.getString()).thenReturn(AVTAG);
		List<ResourceChange> resourceChanges = new ArrayList<>();
		resourceChanges.add(new ResourceChange(ChangeType.CHANGED, ACTION_PATH, false));
		avAssetEventHandler.onChange(resourceChanges);
	}

	@Test
	void testException() throws ReplicationException, LoginException, PathNotFoundException, RepositoryException {
		MockitoAnnotations.initMocks(this);
		avAssetEventHandler.resolverFactory = resResolverFactory;
		Map<String, Object> param = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, EIFU_SERVICE);
		when(resResolverFactory.getServiceResourceResolver(param)).thenReturn(resolver);
		when(resolver.getResource(ACTION_PATH)).thenReturn(resource);
		Node node = Mockito.mock(Node.class);
		when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(prop);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(node.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		when(node.hasProperty(CATEGORY_UNIT)).thenReturn(false);
		List<ResourceChange> resourceChanges = new ArrayList<>();
		resourceChanges.add(new ResourceChange(ChangeType.CHANGED, ACTION_PATH, false));
		doThrow(new ReplicationException("Exception occurred")).when(replicator).replicate(session,
				ReplicationActionType.ACTIVATE, ACTION_PATH.replace(JCR_METADATA, ""));
		doThrow(new RepositoryException("Exception occurred")).when(prop).isMultiple();
		avAssetEventHandler.onChange(resourceChanges);

	}

	@Test
	void testValueException() throws ReplicationException, LoginException, PathNotFoundException, RepositoryException {
		MockitoAnnotations.initMocks(this);
		avAssetEventHandler.resolverFactory = resResolverFactory;
		Map<String, Object> param = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, EIFU_SERVICE);
		when(resResolverFactory.getServiceResourceResolver(param)).thenReturn(resolver);
		when(resolver.getResource(ACTION_PATH)).thenReturn(resource);
		Node node = Mockito.mock(Node.class);
		when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(prop);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(node.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		when(node.hasProperty(CATEGORY_UNIT)).thenReturn(false);
		List<ResourceChange> resourceChanges = new ArrayList<>();
		resourceChanges.add(new ResourceChange(ChangeType.CHANGED, ACTION_PATH, false));
		doThrow(new ValueFormatException("Exception occurred")).when(prop).isMultiple();
		avAssetEventHandler.onChange(resourceChanges);

	}

	@Test
	void testPathNotFoundException()
			throws ReplicationException, LoginException, PathNotFoundException, RepositoryException {
		MockitoAnnotations.initMocks(this);
		avAssetEventHandler.resolverFactory = resResolverFactory;
		Map<String, Object> param = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, EIFU_SERVICE);
		when(resResolverFactory.getServiceResourceResolver(param)).thenReturn(resolver);
		when(resolver.getResource(ACTION_PATH)).thenReturn(resource);
		Node node = Mockito.mock(Node.class);
		when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(prop);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(node.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		when(node.hasProperty(CATEGORY_UNIT)).thenReturn(false);
		List<ResourceChange> resourceChanges = new ArrayList<>();
		resourceChanges.add(new ResourceChange(ChangeType.CHANGED, ACTION_PATH, false));
		doThrow(new PathNotFoundException("Exception occurred")).when(prop).isMultiple();
		avAssetEventHandler.onChange(resourceChanges);

	}

}