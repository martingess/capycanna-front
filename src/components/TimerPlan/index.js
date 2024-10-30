import { useEffect } from 'react';
import { ButtonCO } from '@UI';
import { useSelector, useDispatch } from 'react-redux';
import styles from './TimerPlan.module.scss';
import { gaEventDispatch } from '@utils';
import {
  setMinutesDiscount,
  setSecondsDiscount,
  selectMinutesDiscount,
  selectSecondsDiscount,
} from '@store/billing/billingSlices';

const TimerPlan = ({ plan, handleSubmit }) => {
  const dispatch = useDispatch();
  const minutes = useSelector(selectMinutesDiscount);
  const seconds = useSelector(selectSecondsDiscount);

  const clickButton = () => {
    handleSubmit();
    gaEventDispatch({ event: 'header_get_my_plan_click' });
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        dispatch(setSecondsDiscount(seconds - 1));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          gaEventDispatch({ event: 'timer_off' });
          dispatch(setMinutesDiscount(9));
          dispatch(setSecondsDiscount(59));
        } else {
          dispatch(setMinutesDiscount(minutes - 1));
          dispatch(setSecondsDiscount(59));
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  useEffect(() => {
    sessionStorage?.setItem('minutes', JSON.stringify(minutes));
    sessionStorage?.setItem('seconds', JSON.stringify(seconds));
  }, [minutes, seconds]);

  return (
    <div className={styles['timer']}>
      <div className={styles['timer_left']}>
        <p>60% discount reserved for:</p>
        <h2>
          {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>
      <ButtonCO className={styles['timer_button']} disabled={!plan} onClick={clickButton}>
        Get My Plan
      </ButtonCO>
    </div>
  );
};

export default TimerPlan;
