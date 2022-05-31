import { useDeleteContactMutation } from 'redux/services';

import { FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import s from './Contacts.module.css';

const ContactsItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const removeContact = () => {
    deleteContact(id);
    Notify.info(`Contact ${name} deleted from phone book`);
  };
  return (
    <li className={s.item}>
      <div>
        <p className={s.text}>
          <FaUserAlt size={14} /> {name}
        </p>
        <p className={s.text}>
          <FaPhoneAlt size={14} /> {number}
        </p>
      </div>

      <button
        type="submit"
        onClick={removeContact}
        className={s.deleteButton}
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactsItem;
