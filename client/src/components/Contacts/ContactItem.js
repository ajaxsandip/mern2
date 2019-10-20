import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ConatctContext from '../../Context/Contacts/ContactContext';
const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;
  const contactContext = useContext(ConatctContext);
  const { deleteCOntact, setcurrent } = contactContext;

  const onDelete = () => {
    deleteCOntact(_id);
  };

  const edititem = () => {
    setcurrent(_id);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-white')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
          {/* {type} */}
        </span>
      </h3>
      <ul>
        <li>{email}</li>
        <li>{phone}</li>
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={edititem}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};
export default ContactItem;
