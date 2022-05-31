import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/actions';
import { getFilter } from 'redux/selectors';
import s from './Filter.module.css';

export default function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <label className={s.label}>
      <p className={s.title}>Filter contacts by name or number</p>
      <input
        type="text"
        value={value}
        onChange={e => dispatch(changeFilter(e.target.value))}
        placeholder="Search..."
      />
    </label>
  );
}
