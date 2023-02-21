import PropTypes from 'prop-types';
import styles from './Button.module.css';

export function Button({ onClick }) {
  return (
    <button onClick={onClick} className={styles.loader_button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
