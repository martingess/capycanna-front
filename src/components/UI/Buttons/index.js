import Link from 'next/link';
import styles from './Buttons.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

export const Button = ({ children, load, className, outside, ...props }) => {
  return outside ? (
    <a className={clsx(styles.button, className, { [styles.load]: load })} {...props}>
      <span>{children}</span>
    </a>
  ) : (
    <Link className={clsx(styles.button, className, { [styles.load]: load })} {...props}>
      <span>{children}</span>
    </Link>
  );
};

export const ButtonCO = ({
  children,
  theme,
  loading,
  className,
  icon: Icon,
  disabled,
  type = 'button',
  ...rest
}) => (
  <button
    className={clsx(styles.buttonCO, styles[`buttonCO_${theme}`], className, {
      [styles['isDisabled']]: disabled,
    })}
    type={type}
    {...rest}
  >
    {Icon && <Icon className={styles['buttonCO_icon']} />}
    {loading ? (
      <Image
        src="/images/load.gif"
        width={30}
        height={30}
        alt="load"
        placeholder="empty"
        className={styles['buttonCO_isLoad']}
        priority={true}
        quality={100}
      />
    ) : (
      <span>{children}</span>
    )}
  </button>
);
