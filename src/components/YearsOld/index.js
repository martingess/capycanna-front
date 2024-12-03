import { Modal, Box } from '@mui/material';
import styles from './YearsOld.module.scss';
import { useTranslations } from 'next-intl';
import { ButtonCO } from '@UI';

const YearsOld = ({ open, handleClose, reload }) => {
  const t = useTranslations('common');
  return (
    <Modal open={open} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 426,
          bgcolor: '#ffffff',
          boxShadow: 0,
          p: 4,
          borderRadius: '8px',
          outline: 'none',
        }}
      >
        <div className={styles['years']}>
          <h3 className={styles['years__title']}>{t('yearsOld.title')}</h3>
          <div className={styles['years__buttons']}>
            <ButtonCO theme="orange" className={styles['years__button']} onClick={handleClose}>
              {t('yearsOld.yes')}
            </ButtonCO>
            <ButtonCO theme="orange" className={styles['years__button']} onClick={reload}>
              {t('yearsOld.no')}
            </ButtonCO>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default YearsOld;
