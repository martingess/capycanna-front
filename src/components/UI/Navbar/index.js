import { ButtonCO } from '@UI';
import { motion } from 'framer-motion';

import clsx from 'clsx';
import styles from './Navbar.module.scss';

const NavBar = ({ text, onClick, isDisabled }) => {
  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles['navbar']}
    >
      <div className={styles['wrapper']}>
        <ButtonCO onClick={onClick} disabled={isDisabled}>
          {text}
        </ButtonCO>
      </div>
    </motion.div>
  );
};

export { NavBar };
