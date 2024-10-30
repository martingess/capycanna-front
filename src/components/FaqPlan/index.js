'use client';
import { useState, useRef } from 'react';
import { IconFaqArrow, CollapseExpand } from '@UI';
import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import styles from './FaqPlan.module.scss';

const FaqItem = ({ question, answer, idx }) => {
  const bodyBlock = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={clsx(styles['faq_elem'], {
        [styles['is-open']]: isOpen,
      })}
      id={`Q${idx}`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button type="button" className={styles['faq_elem-header']} onClick={toggleOpen}>
        <h3 itemProp="name" className={styles['faq_elem-title']}>
          {question}
        </h3>
        <IconFaqArrow className={styles['faq_elem-icon']} />
      </button>
      <CollapseExpand isOpen={isOpen}>
        <div
          className={styles['faq_elem-body']}
          ref={bodyBlock}
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <div
            className={styles['faq_elem-text']}
            itemProp="text"
            id={`faq${idx}_desc`}
            suppressHydrationWarning="true"
            dangerouslySetInnerHTML={{
              __html: answer,
            }}
          ></div>
        </div>
      </CollapseExpand>
    </div>
  );
};

const FaqPlan = ({ translations }) => {
  const t = useTranslations(translations);
  const faqList = Array.isArray(t.raw('items')) ? t.raw('items') : [];

  return (
    <div className={styles['faq']}>
      <h5 className={styles['faq_title']}>{t('title')}</h5>
      <div className={styles['faq_list']}>
        {faqList.map(({ question, answer }, index) => (
          <FaqItem key={`faq-${index}`} question={question} answer={answer} idx={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default FaqPlan;
