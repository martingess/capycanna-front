import styles from './CopyData.module.scss';

import { IconClipboard } from '@UI';

const CopyData = ({ data, title }) => {
  const copyData = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(data);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = data;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      alert('Copy failed');
    }
  };

  const value = data?.length > 18 ? `${data.slice(0, 18)}...` : data;

  return (
    <div className={styles['copy']}>
      <p className={styles['copy__title']}>{title}</p>
      <div className={styles['copy__data']}>
        <p className={styles['copy__data-text']}>{value}</p>
        <IconClipboard onClick={copyData} className={styles['copy__data-copy']} />
      </div>
    </div>
  );
};

export default CopyData;
