import styles from './SliderArrow.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

const SliderArrow = ({ isRight = false, onClick, isDisabled = false, style }) => {
  return (
    <button
      onClick={isDisabled ? null : onClick}
      className={clsx(styles['arrow-wrapper'], {
        [styles['arrow__right']]: isRight,
        [styles['arrow__left']]: !isRight,
      })}
      style={style}
      disabled={isDisabled}
    >
      <Image src="/icons/slider-arrow.svg" alt="slider-arrow" width={50} height={50} />
    </button>
  );
};

export { SliderArrow };
