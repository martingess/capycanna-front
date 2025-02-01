import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { ButtonCO } from '@UI';
import styles from './DualRangeSlider.module.scss';
import { useTranslations } from 'next-intl';

const DualRangeSlider = ({ min, max, initialMin, initialMax, onChange }) => {
  const t = useTranslations('products');

  const [value, setValue] = useState([initialMin || min, initialMax || max]);
  const [minInputValue, setMinInputValue] = useState(initialMin);
  const [maxInputValue, setMaxInputValue] = useState(initialMax);

  const handleSliderChange = (_, newValue) => {
    setValue(newValue);
    onChange({ min: newValue[0], max: newValue[1] });
  };

  useEffect(() => {
    onChange({ min: value[0], max: value[1] });
  }, [value]);

  const handleApplyValues = () => {
    handleSliderChange(null, [minInputValue, maxInputValue]);
  };

  return (
    <>
      <div className={styles['inputs-wrapper']}>
        <input
          className={styles['input']}
          type="text"
          value={minInputValue}
          onChange={(e) => setMinInputValue(e.target.value)}
        />
        <div className={styles['inputs-divider']}></div>
        <input
          className={styles['input']}
          type="text"
          value={maxInputValue}
          onChange={(e) => setMaxInputValue(e.target.value)}
        />
        <ButtonCO theme="orange" className={styles['confirm-button']} onClick={handleApplyValues}>
          {t('filters.ok')}
        </ButtonCO>
      </div>
      <Slider
        value={[value[0], value[1]]}
        onChange={handleSliderChange}
        sx={{
          width: '96%',
          color: '#f39c12',
          height: '4px',
          margin: '0 4px',
          '& .MuiSlider-rail': {
            backgroundColor: '#F5A964',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#C54F1D',
          },
          '& .MuiSlider-thumb': {
            backgroundColor: '#C54F1D',
            width: '16px',
            height: '16px',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        }}
      />
    </>
  );
};

export default DualRangeSlider;
