import { useEffect } from 'react';
import styles from './Pagination.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const t = useTranslations('products');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles['pagination']}>
      <button
        className={`${styles['pagination__arrow']} ${styles['pagination__arrow-prev']}`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <Image
          src={'/images/products/pagination-arrow.svg'}
          width={33}
          height={33}
          alt={t('pagination.showMore')}
        />
      </button>
      <div className={styles['pagination__pages']}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`${styles['pagination__page']} ${
              currentPage === i + 1 ? styles['active'] : ''
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className={`${styles['pagination__arrow']} ${styles['pagination__arrow-next']}`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <Image
          src={'/images/products/pagination-arrow.svg'}
          width={33}
          height={33}
          alt={t('pagination.showMore')}
        />
      </button>
    </div>
  );
};

export default Pagination;

