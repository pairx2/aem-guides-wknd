package com.abbott.magento.identity;

import com.abbott.magento.identity.models.ExternalUserImpl;
import com.abbott.magento.identity.models.MagentoCustomer;
import com.abbott.magento.services.IdentityProvider;
import org.apache.jackrabbit.oak.spi.security.authentication.external.*;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Credentials;
import javax.jcr.SimpleCredentials;
import javax.security.auth.login.LoginException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;


@Component(immediate = true, enabled = true,service = IdentityProvider.class)
@Designate(ocd = MagentoIdentityProvider.Config.class)
public class MagentoIdentityProvider implements IdentityProvider{
	private static final Logger log = LoggerFactory.getLogger(MagentoIdentityProvider.class);
	public static final String PN_MEMBERS = "members";
	public static final String PN_GROUPS = "groups";
	private String adminUsername;
	private String adminPassword;
	private String magentoAdminTokenKey;
	private String[] storeId;
	private String server;
	private String name;
	private MagentoIdentityConnector identityConnector = new MagentoIdentityConnector();

	@ObjectClassDefinition(name = "Magento Identity Provider", description = "Magento Identity Provider")
	public static @interface Config {

		@AttributeDefinition(name = "Provider Name", description = "Name of this provider configuration. This is used to reference this provider by the login modules.")
		String paramName() default "magento";

		@AttributeDefinition(name = "ADMIN_USERNAME", description = "Admin password on Magento 2 Server")
		String adminUserName() default "";

		@AttributeDefinition(name = "ADMIN_PASSWORD", description = "Admin password on Magento 2 Server")
		String adminPassword() default "";

		@AttributeDefinition(name = "SERVER", description = "Magento 2 Server")
		String serverUrl() default "https://staging-secure.abbottstore.com";

		@AttributeDefinition(name = "STORE_ID", description = "Store ID for products import")
		String[] storeId() default { "abbott|1", "glucerna|2", "similac|3", "new_similac|4" };

		@AttributeDefinition(name = "MAGENTO ADMIN TOKEN KEY", description = "Admin token to get response from Magento Server")
		String magentoAdminTokenKey() default "";
	}

	@Activate
	protected final void activate(final Config config) {

		adminUsername = config.adminUserName();
		adminPassword = config.adminPassword();
		magentoAdminTokenKey = "Bearer " + config.magentoAdminTokenKey();
		server = config.serverUrl();
		storeId = config.storeId();
		identityConnector.setServer(server);
		log.debug("admin username: {} magentoAdminTokenKey: {}", adminUsername, magentoAdminTokenKey);
	}

	@Deactivate
	private void deactivate() {
		// nothing to do
	}

	@Override
	public String getServer() {
		return server;
	}

	@Override
	public String getAdminUser() {
		return adminUsername;
	}

	@Override
	public String getAdminPassword() {
		return adminPassword;
	}

	@Override
	public String getMagentoAdminTokenKey() {
		return magentoAdminTokenKey;
	}

	public String getName() {
		return name;
	}

	public ExternalIdentity getIdentity() throws ExternalIdentityException {
		return null;
	}

	public ExternalUser getUser() throws ExternalIdentityException {
		log.debug("getUSER");
		return null;
	}

	public ExternalGroup getGroup() throws ExternalIdentityException {
		log.debug("GetGROUP");
		return null;
	}

	public Iterator<ExternalUser> listUsers() throws ExternalIdentityException {
		log.debug("listUSER");
		return null;
	}

	public Iterator<ExternalGroup> listGroups() throws ExternalIdentityException {
		log.debug("listGROUP");
		return null;
	}

	public ExternalUser authenticate(Credentials credentials) throws ExternalIdentityException, LoginException {
		log.debug("START of AUTH");
		if (!(credentials instanceof SimpleCredentials)) {
			throw new LoginException("invalid credentials class " + credentials.getClass());
		}

		try {

			log.debug("START of AUTH");

			SimpleCredentials sc = (SimpleCredentials) credentials;
			String username = sc.getUserID();
			String password = sc.getPassword().toString();
			log.debug("getting token: {}, email: {} ", server, sc.getUserID());
			String token = identityConnector.getToken(username, password);
			log.debug("got token: {}, email: {}", server, sc.getUserID());

			MagentoCustomer customer = identityConnector.getCustomer(token);

			ExternalIdentityRef ref = new ExternalIdentityRef(customer.email, getName());

			HashMap<String, Object> properties = new HashMap<>();

			properties.put("id", customer.email);
			properties.put("fullname", customer.firstname + " " + customer.lastname);
			properties.put("givenname", customer.firstname);
			properties.put("familyname", customer.lastname);
			properties.put("email", customer.email);
			properties.put("store-id", customer.storeId);
			properties.put("magento-user-id", customer.id);
			properties.put("token", token);
			properties.put("gender", customer.gender);
			String groupName = identityConnector.getGroupName(customer.groupId, magentoAdminTokenKey);
			properties.put(PN_GROUPS, "[" + groupName + "]");

			ExternalUser user = new ExternalUserImpl(getName(), ref, customer.email, properties);
			log.debug("USER: {}", user);
			return user;

		} catch (IOException e) {
			throw new LoginException("invalid user or password");
		}
	}

	public String[] getStoreId() {
		log.debug("storeId {}", storeId);
		return storeId.clone();
	}

}
