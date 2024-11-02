import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { IconArrowSmall } from '@UI';
import useWindowDimensions from '@/hooks/useWindowDimensions';

import cn from 'classnames';
import styles from './FaqSection.module.scss';

const FaqItem = ({ question, answer, idx }) => {
  const { width } = useWindowDimensions();
  const bodyBlock = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const sheet = document.styleSheets[0];
    let ruleIndex;
    for (let i = 0; i < sheet.cssRules.length; i++) {
      if (sheet.cssRules[i].selectorText === `#faq_wrap${idx}`) {
        ruleIndex = i;
        break;
      }
    }

    if (isOpen) {
      sheet.insertRule(
        `#faq_wrap${idx} { height: ${bodyBlock.current.scrollHeight + 20}px; }`,
        sheet.cssRules.length,
      );
    } else {
      sheet.insertRule(`#faq_wrap${idx} { height: 0px; }`, sheet.cssRules.length);
    }
  }, [isOpen, width, idx]);

  return (
    <div
      className={cn(styles['faq__item'], { [styles['active']]: isOpen })}
      id={`Q${idx}`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      onClick={toggleOpen}
    >
      <div className={styles['faq__item-wrap']}>
        <div className={styles['faq__item-top']}>
          <div className={styles['faq__item-title-wrap']}>
            <span className={styles['faq__item-count']}>
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
            </span>
            <h4 className={styles['faq__item-title']} itemProp="name">
              {question}
            </h4>
          </div>
          <IconArrowSmall className={styles['faq__item-icon']} />
        </div>
        <div
          className={cn(styles['faq__item-bottom'], { [styles['active']]: isOpen })}
          ref={bodyBlock}
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
          id={`faq_wrap${idx}`}
        >
          <div
            className={styles['faq__item-bottom-desk']}
            dangerouslySetInnerHTML={{ __html: answer }}
            itemProp="text"
            id={`faq${idx}_desc`}
          />
        </div>
      </div>
    </div>
  );
};

const FaqSection = ({ translation, features }) => {
  const t = useTranslations(translation || 'home');

  let list = Array.isArray(t.raw('faq.list')) ? t.raw('faq.list') : [];
  list = list.filter((item) => item.question || item.answer);

  return (
    <section className={styles['faq']} id="faq">
      <div className={styles['faq__title-container']}>
        <h2 className={styles['faq__title']}>{t('faq.title')}</h2>
      </div>
      <div className={styles['faq__items']} itemScope itemType="https://schema.org/FAQPage">
        {list?.map(({ question, answer }, idx) => (
          <FaqItem key={question} question={question} answer={answer} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
