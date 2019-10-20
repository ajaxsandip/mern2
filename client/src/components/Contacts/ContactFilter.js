import React, { useRef, useContext } from 'react';
import ContactContext from '../../Context/Contacts/ContactContext';

const ContactFilter = () => {
  const contactcontext = useContext(ContactContext);
  const { filtercontacts, clearfilter } = contactcontext;
  const text = useRef(' ');

  const onChange = e => {
    if (text.current.value !== '') {
      filtercontacts(e.target.value);
    } else {
      clearfilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Search'
        name='text'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
