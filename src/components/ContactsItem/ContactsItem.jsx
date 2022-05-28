import { useDeleteContactMutation } from '../../redux/services';
import Loader from 'components/Loader';

import { FaUserAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import PropTypes from 'prop-types';
import s from './ContactsItem.module.css';

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
        <p className={s.text}>
          <FaClock size={14} /> {id}
        </p>
      </div>

      <button
        type="submit"
        onClick={removeContact}
        className={s.deleteButton}
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
        {isLoading && <Loader />}
      </button>
    </li>
  );
};

ContactsItem.propTypes = {
  // createdAt: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  // phone: PropTypes.string.isRequired,
};

export default ContactsItem;
