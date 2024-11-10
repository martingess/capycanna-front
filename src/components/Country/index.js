import { IconCountry, IconArrowDown } from '@UI';
import { useEffect, useState } from 'react';
import { selectCountry, setCountry } from '@store/user/userSlices';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Country.module.scss';
import { countries } from '@data';
import cn from 'classnames';

const Country = () => {
  const { code: countryCode } = useSelector(selectCountry);
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  const handleCountryChange =
    ({ code, name }) =>
    () => {
      dispatch(setCountry({ code, name }));
    };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles['country']}>
      <div className={styles['country__wrapper']}>
        <div className={styles['country__top']}>
          <IconCountry className={styles['country__icon']} />
          {isClient && <p className={styles['country__name']}>{countryCode}</p>}
          <IconArrowDown className={styles['country__arrow']} />
        </div>
        <div className={styles['country__list']}>
          {Object.entries(countries).map(
            ([code, name]) =>
              isClient && (
                <p
                  className={cn(styles['country__item'], {
                    [styles['active']]: countryCode === code,
                  })}
                  key={code}
                  onClick={handleCountryChange({ code, name })}
                >
                  {code}
                </p>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Country;
