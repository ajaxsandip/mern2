import React from 'react';
import Contact from '../Contacts/Contact';
import ContactForm from '../Contacts/ContactForm';
import ContactFilter from '../Contacts/ContactFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter></ContactFilter>
        <Contact></Contact>
      </div>
    </div>
  );
};

export default Home;
