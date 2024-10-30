import { IconLoad } from '@UI';
import styles from './Loader.module.scss';

export const Loader = (...props) => {
  return (
    <div className={styles['loader']}>
      <IconLoad className={styles['loader__spinner']} {...props} />
    </div>
  );
};
