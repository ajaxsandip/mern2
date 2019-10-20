import React, { Fragment, useContext, useEffect } from 'react';
import ConatctContext from '../../Context/Contacts/ContactContext';
import ContactItem from './ContactItem';

const Contact = () => {
  const contactContext = useContext(ConatctContext);

  const { contacts, filtered, loadcontact } = contactContext;
  useEffect(() => {
    console.log('gggetetet');
    loadcontact();
  }, []);
  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        : contacts.map(contact => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
    </Fragment>
  );
};

export default Contact;
