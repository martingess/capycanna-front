import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { mockProducts } from '../../data/mockProducts';
import Head from 'next/head';
import Breadcrumbs from '@components/Breadcrumbs';
import styles from './Products.module.scss';
import { ButtonCO, Radio } from '@UI';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ProductsSorting from '@components/ProductsSorting';
import ProductCard from '@components/ProductCard';
import Pagination from '@components/Pagination';
import DualRangeSlider from '@components/DualRangeSlider';
import CheckboxFilter from './Filters/checkboxFilter';
// import { gql, useQuery } from '@apollo/client';

// const GET_PRODUCTS = gql`
//   query GetProducts {
//     products(options: { take: 20 }) {
//       items {
//         id
//         name
//         slug
//         description
//       }
//       totalItems
//     }
//   }
// `;

const ProductsCategory = ({ category }) => {
  const t = useTranslations('products');
  const router = useRouter();
  const products = mockProducts.filter((product) => product.category === category);

  // const { loading, error, data } = useQuery(GET_PRODUCTS);

  const byProductsArray = Array.isArray(t.raw('filters.byProducts'))
    ? t.raw('filters.byProducts')
    : [];
  const byCannabinoidsArray = Array.isArray(t.raw('filters.byCannabinoids'))
    ? t.raw('filters.byCannabinoids')
    : [];
  const byYourNeedsArray = Array.isArray(t.raw('filters.byYourNeeds'))
    ? t.raw('filters.byYourNeeds')
    : [];
  const allProducts = [...byProductsArray, ...byCannabinoidsArray, ...byYourNeedsArray];

  const selectedCategoryObject = allProducts.find((filter) => filter.key === category);

  const [isByProductsOpened, setIsByProductsOpened] = useState(false);
  const [isByCannabinoidsOpened, setIsByCannabinoidsOpened] = useState(false);
  const [isByYourNeedsOpened, setIsByYourNeedsOpened] = useState(false);

  const [selectedCategoryItem, setSelectedCategoryItem] = useState(
    selectedCategoryObject || allProducts[0],
  );

  const [currentSorting, setCurrentSorting] = useState('ascendingPrice');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [isMobileFilterOpened, setIsMobileFilterOpened] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);

  // Filtering logic
  useEffect(() => {
    setSelectedCategoryItem(selectedCategoryObject || allProducts[0]);
  }, [selectedCategoryObject]);

  const handleSelection = (item) => {
    if (isMobileFilterOpened) {
      setIsMobileFilterOpened(false);
    }
    setSelectedCategoryItem(item);
    router.push(`/products/${item.key}`);
  };

  const handleApplyFilter = (item) => {
    setIsMobileFilterOpened(false);
    router.push(`/products/${item.key}`);
  };

  const handleCancelFilter = () => {
    setIsMobileFilterOpened(false);
  };

  // Custom filtering logic
  const [isRangeFilterOpened, setIsRangeFilterOpened] = useState(true);
  const [isCheckBoxFilterOpened, setIsCheckBoxFilterOpened] = useState(true);
  const [isRadioFilterOpened, setIsRadioFilterOpened] = useState(true);

  const [filtersState, setFiltersState] = useState(() => {
    const initialState = {};
    selectedCategoryObject?.filtering.forEach((filter) => {
      if (filter.type === 'range') {
        initialState[filter.title] = { min: filter.min, max: filter.max };
      } else if (filter.type === 'checkbox') {
        initialState[filter.title] =
          filter.initialValue?.key === 'all'
            ? filter.params.map((param) => param.key)
            : [filter.initialValue.key];
      } else if (filter.type === 'radio') {
        initialState[filter.title] = filter.initialValue?.key || null;
      }
    });
    return initialState;
  });

  const handleRangeChange = (newRange, title) => {
    setFiltersState((prev) => ({
      ...prev,
      [title]: newRange,
    }));
  };

  const handleCheckboxChange = (key, title) => {
    setFiltersState((prev) => {
      const currentSelections = prev[title] || [];
      const isSelected = currentSelections.includes(key);

      const allOptions = selectedCategoryObject.filtering
        .find((filter) => filter.title === title)
        .params.map((param) => param.key);

      const allKey = 'all';

      if (key === allKey) {
        return {
          ...prev,
          [title]: isSelected ? [] : allOptions,
        };
      } else {
        const updatedSelections = isSelected
          ? currentSelections.filter((item) => item !== key)
          : [...currentSelections, key];

        const nonAllOptions = allOptions.filter((option) => option !== allKey);
        const isAllSelected = nonAllOptions.every((option) => updatedSelections.includes(option));

        return {
          ...prev,
          [title]: isAllSelected ? allOptions : updatedSelections.filter((item) => item !== allKey),
        };
      }
    });
  };

  const handleRadioChange = (key, title) => {
    setFiltersState((prev) => ({
      ...prev,
      [title]: key,
    }));
  };

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    switch (currentSorting) {
      case 'ascendingPrice':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'descendingPrice':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'mostPopular':
        return b.isPopular - a.isPopular;
      case 'onSale':
        return b.discount ? 1 : -1;
      default:
        return 0;
    }
  });

  const handleSortChange = (key) => {
    setCurrentSorting(key);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <section className={styles['products']}>
        <Breadcrumbs productTitle={categoryName} />
        <div className={styles['products__title-wrapper']}>
          <h1 className={styles['products__title']}>{categoryName}</h1>
          <div className={styles['list-header']}>
            <div className={styles['applied-filters']}></div>
            <div className={styles['settings']}>
              <div className={styles['settings__sorting']}>
                <ProductsSorting
                  onSort={handleSortChange}
                  isListOpen={isSortingOpen}
                  setIsListOpen={setIsSortingOpen}
                  setIsMobileFilterOpened={setIsMobileFilterOpened}
                />
              </div>
              <div className={styles['settings__layout']}></div>
            </div>
          </div>
        </div>
        <div className={styles['products__wrapper']}>
          <div className={styles['filters']}>
            <div className={styles['filter-header__mobile']}>
              <div className={styles['filter-header__sorting']}>
                <ProductsSorting
                  onSort={handleSortChange}
                  isListOpen={isSortingOpen}
                  setIsListOpen={setIsSortingOpen}
                  setIsMobileFilterOpened={setIsMobileFilterOpened}
                />
              </div>
              <span
                className={styles['filter-header__title']}
                onClick={() => {
                  setIsMobileFilterOpened(!isMobileFilterOpened);
                  setIsSortingOpen(false);
                }}
              >
                {t('filters.title')}
              </span>
              <span className={styles['filter-header__icon']}>
                <Image
                  src={'/images/products/filter-icon.svg'}
                  width={24}
                  height={24}
                  alt="filter-icon"
                />
              </span>
            </div>
            <div className={styles['filters__wrapper']}>
              <div
                className={`${styles['filters__main']} ${!isMobileFilterOpened && styles['filters__mobile-closed']}`}
              >
                <div className={styles['filter-header']}>
                  <div className={styles['filter-header__sorting']}>
                    <ProductsSorting
                      onSort={handleSortChange}
                      isListOpen={isSortingOpen}
                      setIsListOpen={setIsSortingOpen}
                      setIsMobileFilterOpened={setIsMobileFilterOpened}
                    />
                  </div>
                  <span
                    className={styles['filter-header__title']}
                    onClick={() => {
                      setIsMobileFilterOpened(!isMobileFilterOpened);
                      setIsSortingOpen(false);
                    }}
                  >
                    {t('filters.title2')}
                  </span>
                  <span className={styles['filter-header__icon']}>
                    <Image
                      src={'/images/products/categories-filter.svg'}
                      width={24}
                      height={24}
                      alt="categories-filter-icon"
                    />
                  </span>
                </div>
                <div className={styles['block-item']}>
                  <div
                    className={styles['dropdown']}
                    onClick={() => setIsByProductsOpened(!isByProductsOpened)}
                  >
                    <span className={styles['dropdown__title']}>
                      {t('filters.byProductsTitle')}
                    </span>
                    <Image
                      style={{
                        transform: isByProductsOpened ? 'rotate(0deg)' : 'rotate(180deg)',
                        transition: 'transform 0.2s',
                      }}
                      src={'/images/products/filter-arrow.svg'}
                      width={14}
                      height={14}
                      alt="filter-icon"
                    />
                  </div>
                  {isByProductsOpened &&
                    byProductsArray.map((item) => {
                      return (
                        <Radio
                          key={item.key}
                          id={item.key}
                          label={item.label}
                          name={'product-filter'}
                          value={item.key}
                          isChecked={selectedCategoryItem.key === item.key}
                          handleSelection={() => handleSelection(item)}
                        />
                      );
                    })}
                </div>
                <div className={styles['block-item']}>
                  <div
                    className={styles['dropdown']}
                    onClick={() => setIsByCannabinoidsOpened(!isByCannabinoidsOpened)}
                  >
                    <span className={styles['dropdown__title']}>
                      {t('filters.byCannabinoidsTitle')}
                    </span>
                    <Image
                      style={{
                        transform: isByCannabinoidsOpened ? 'rotate(0deg)' : 'rotate(180deg)',
                        transition: 'transform 0.2s',
                      }}
                      src={'/images/products/filter-arrow.svg'}
                      width={14}
                      height={14}
                      alt="filter-icon"
                    />
                  </div>
                  {isByCannabinoidsOpened &&
                    byCannabinoidsArray.map((item) => (
                      <Radio
                        key={item.key}
                        id={item.key}
                        label={item.label}
                        name={'product-filter'}
                        value={item.key}
                        isChecked={selectedCategoryItem.key === item.key}
                        handleSelection={() => handleSelection(item)}
                      />
                    ))}
                </div>
                <div className={styles['block-item']}>
                  <div
                    className={styles['dropdown']}
                    onClick={() => setIsByYourNeedsOpened(!isByYourNeedsOpened)}
                  >
                    <span className={styles['dropdown__title']}>
                      {t('filters.byYourNeedsTitle')}
                    </span>
                    <Image
                      style={{
                        transform: isByYourNeedsOpened ? 'rotate(0deg)' : 'rotate(180deg)',
                        transition: 'transform 0.2s',
                      }}
                      src={'/images/products/filter-arrow.svg'}
                      width={14}
                      height={14}
                      alt="filter-icon"
                    />
                  </div>
                  {isByYourNeedsOpened &&
                    byYourNeedsArray.map((item) => (
                      <Radio
                        key={item.key}
                        id={item.key}
                        label={item.label}
                        name={'product-filter'}
                        value={item.key}
                        isChecked={selectedCategoryItem.key === item.key}
                        handleSelection={() => handleSelection(item)}
                      />
                    ))}
                </div>
              </div>
              {/* filters__custom */}
              <div
                className={`${styles['filters__custom']} ${!isMobileFilterOpened && styles['filters__mobile-closed']}`}
              >
                <div className={styles['filter-header']}>
                  <div className={styles['filter-header__sorting']}>
                    <ProductsSorting
                      onSort={handleSortChange}
                      isListOpen={isSortingOpen}
                      setIsListOpen={setIsSortingOpen}
                      setIsMobileFilterOpened={setIsMobileFilterOpened}
                    />
                  </div>
                  <span
                    className={styles['filter-header__title']}
                    onClick={() => {
                      setIsMobileFilterOpened(!isMobileFilterOpened);
                      setIsSortingOpen(false);
                    }}
                  >
                    {t('filters.title')}
                  </span>
                  <span className={styles['filter-header__icon']}>
                    <Image
                      src={'/images/products/filter-icon.svg'}
                      width={24}
                      height={24}
                      alt="filter-icon"
                    />
                  </span>
                </div>
                <div>
                  {selectedCategoryObject?.filtering?.map((filter, idx) => (
                    <div key={idx}>
                      {filter.type === 'range' && (
                        <div className={styles['block-item']}>
                          <div
                            className={styles['dropdown']}
                            onClick={() => setIsRangeFilterOpened(!isRangeFilterOpened)}
                          >
                            <span className={styles['dropdown__title']}>{filter.title}</span>
                            <Image
                              style={{
                                transform: isRangeFilterOpened ? 'rotate(0deg)' : 'rotate(180deg)',
                                transition: 'transform 0.2s',
                              }}
                              src={'/images/products/filter-arrow.svg'}
                              width={14}
                              height={14}
                              alt="filter-icon"
                            />
                          </div>
                          {isRangeFilterOpened && (
                            <div>
                              <DualRangeSlider
                                min={filter.min}
                                max={filter.max}
                                initialMin={filtersState[filter.title]?.min || filter.min}
                                initialMax={filtersState[filter.title]?.max || filter.max}
                                onChange={(newRange) => handleRangeChange(newRange, filter.title)}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      {filter.type === 'checkbox' && (
                        <CheckboxFilter
                          className={styles['block-item']}
                          filter={filter}
                          isCheckBoxFilterOpened={isCheckBoxFilterOpened}
                          setIsCheckBoxFilterOpened={setIsCheckBoxFilterOpened}
                          filtersState={filtersState}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      )}
                      {filter.type === 'radio' && (
                        <div className={styles['block-item']}>
                          <div
                            className={styles['dropdown']}
                            onClick={() => setIsRadioFilterOpened(!isRadioFilterOpened)}
                          >
                            <span className={styles['dropdown__title']}>{filter.title}</span>
                            <Image
                              style={{
                                transform: isRadioFilterOpened ? 'rotate(0deg)' : 'rotate(180deg)',
                                transition: 'transform 0.2s',
                              }}
                              src={'/images/products/filter-arrow.svg'}
                              width={14}
                              height={14}
                              alt="filter-icon"
                            />
                          </div>
                          {isRadioFilterOpened &&
                            filter.params.map((param) => (
                              <Radio
                                key={param.key}
                                id={param.key}
                                label={param.label}
                                name={filter.title}
                                value={param.key}
                                isChecked={filtersState[filter.title] === param.key}
                                handleSelection={() => handleRadioChange(param.key, filter.title)}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`${styles['filters__buttons']} ${!isMobileFilterOpened && styles['filters__mobile-closed']}`}
              >
                <ButtonCO
                  theme="orange"
                  className={styles['apply__button']}
                  onClick={() => handleApplyFilter(selectedCategoryItem)}
                >
                  {t('filters.buttons.applyFilter')}
                </ButtonCO>
                <div className={styles['cancel__button']} onClick={handleCancelFilter}>
                  {t('filters.buttons.cancelFilter')}
                </div>
              </div>
            </div>
          </div>
          <div className={styles['products']}>
            <div className={styles['list']}>
              {paginatedProducts.map((product) => (
                <Link key={product.id} href={`/products/${category}/${product.id}`}>
                  <ProductCard product={product} t={t} />
                </Link>
              ))}
            </div>
            {endIndex < sortedProducts.length && (
              <button className={styles['show-more']} onClick={handleLoadMore}>
                <Image
                  src={'/images/products/show-more.svg'}
                  width={40}
                  height={40}
                  alt={t('pagination.showMore')}
                />
                <span>{t('pagination.showMore')}</span>
              </button>
            )}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <div className={styles['text-block-wrapper']}>
          <h3>{t('textBlock.title1')}</h3>
          <p>{t('textBlock.p1')}</p>
          <h3>{t('textBlock.title2')}</h3>
          <p>{t('textBlock.p2')}</p>
          <h3>{t('textBlock.title1')}</h3>
          <p>{t('textBlock.p1')}</p>
          <h3>{t('textBlock.title2')}</h3>
          <p>{t('textBlock.p2')}</p>
        </div>
      </section>
    </div>
  );
};

export default ProductsCategory;
