import React, { useState, useContext, useEffect } from 'react';
import ConatctContext from '../../Context/Contacts/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ConatctContext);

  const { addform, current, updatecontact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setcontact(current[0]);
    } else {
      setcontact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);
  const [contact, setcontact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const onChange = e => {
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addform(contact);
    } else {
      updatecontact(contact);
    }

    setcontact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };
  const { name, email, phone, type } = contact;
  return (
    <form>
      <h2 className='tex-primary'>
        {!current ? 'Add Contact' : 'Edit Contact'}
      </h2>
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='Phone No.'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional{' '}
      <div>
        <input
          type='submit'
          value={!current ? 'Add Contact' : 'Update Contact'}
          className='btn btn-primary btn-block'
          onClick={onSubmit}
        />
      </div>
    </form>
  );
};

export default ContactForm;
