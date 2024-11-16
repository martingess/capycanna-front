import { IconCurrency, IconArrowDown } from '@UI';
import { useEffect, useState } from 'react';
import { selectCurrency, setCurrency } from '@store/user/userSlices';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Currency.module.scss';
import { currencies } from '@data';
import { capitalizeFirstLetter } from '@utils';
import cn from 'classnames';

const Currency = ({ open = false, handleOpen = () => {} }) => {
  const { code: currencyCode } = useSelector(selectCurrency);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  const handleCurrencyChange =
    ({ code, symbol }) =>
    () => {
      dispatch(setCurrency({ code, symbol }));
    };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles['currency']}>
      <div
        className={cn(styles['currency__wrapper'], {
          [styles['open']]: open,
        })}
        onClick={handleOpen}
      >
        <div className={styles['currency__top']}>
          <IconCurrency className={styles['currency__icon']} />
          {isClient && (
            <p className={styles['currency__name']}>{capitalizeFirstLetter(currencyCode)}</p>
          )}
          <IconArrowDown className={styles['currency__arrow']} />
        </div>
        <div className={styles['currency__list']}>
          {Object.entries(currencies).map(
            ([code, sim]) =>
              isClient && (
                <p
                  className={cn(styles['currency__item'], {
                    [styles['active']]: currencyCode === code,
                  })}
                  key={code}
                  onClick={handleCurrencyChange({ code, symbol: sim })}
                >
                  {capitalizeFirstLetter(code)}
                </p>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Currency;
