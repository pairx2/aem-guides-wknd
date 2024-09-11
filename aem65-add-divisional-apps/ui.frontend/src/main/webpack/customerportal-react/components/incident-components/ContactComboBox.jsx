import React, {useEffect, useState} from "react";
import {ComboBox} from "@abbott/add-platform";
import {useTranslation} from "react-i18next";
import {useSharedContacts} from "../shared/Contacts";
import {contactsService} from "../services/ContactsService";

export const ContactComboBox = () => {
  const { t, i18n } = useTranslation();
  const {contacts,isLoading, isLoaded} = useSharedContacts();
  const {getContacts} = contactsService();
  const [contactId, setContactId] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [createContactName, setCreateContactName] = useState('');

  const onChange = (item) => {
    if (item) {
      setContactId(item.value);
      setContactName(item.label);
      setContactEmail(item.email);
      setContactPhone(item.phone);
      const event = new Event('contact-selected');
      document.dispatchEvent(event);
    } else {
      setContactId('');
      const event = new Event('contact-deselected');
      document.dispatchEvent(event);
    }
  }

  const onCreateChange = (value) => {
    setCreateContactName(value);
    const event = new Event('contact-create-selected');
    document.dispatchEvent(event);
  }

  useEffect(() => {
    if (contacts?.length > 0) {
      // have contacts
    } else {
      if (!isLoaded && (typeof Granite === 'undefined' || typeof Granite.author === 'undefined')) {
        getContacts(window.getUrlParameter('ci'));
      }
    }
  }, [contacts])

  return (
    <>
        <ComboBox
            label={t('select-contact')}
            options={contacts}
            onChange={onChange}
            creatable={true}
            onCreateChange={onCreateChange}
            formatCreateLabel={`${t('create-contact')}: `}
            isClearable={true}
            ></ComboBox>
        <input type="hidden" name="contactId" value={contactId} />
        <input type="hidden" name="contactName" value={contactName} />
        <input type="hidden" name="contactEmail" value={contactEmail} />
        <input type="hidden" name="contactPhone" value={contactPhone} />
        <input type="hidden" name="createContactName" value={createContactName} />
    </>
  );


};

export default ContactComboBox;
