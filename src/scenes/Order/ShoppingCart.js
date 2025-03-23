import { useTranslations } from 'next-intl';
import styles from './Order.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { ProductCount, ButtonCO, SliderComponent } from '@UI';
import { useRouter } from 'next/router';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getVatValue } from './utils';

const EnterCode = ({ label, title, value, setValue, placeholder }) => {
  const t = useTranslations('order');

  return (
    <div className={styles['enter-code-wrapper']}>
      {value && <div className={styles['code-label']}>{label}</div>}
      <p className={styles['code-title']}>{title}</p>
      <TextField
        style={{ width: '100%' }}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={(theme) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px !important',
            backgroundColor: '#fff',
            outline: '1px solid rgba(34, 27, 21, 0.20)',
            paddingRight: '0',
            height: '40px',
            paddingLeft: '5px',
            overflow: 'hidden',
            [theme.breakpoints.up('md')]: {
              height: '50px',
              paddingLeft: '10px',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
            outline: 'none',
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#221B15',
            opacity: 0.5,
            fontSize: '12px',
            [theme.breakpoints.up('md')]: {
              fontSize: '14px',
            },
          },
        })}
        InputProps={{
          style: {
            borderRadius: '8px !important',
            paddingRight: '0',
          },
          endAdornment: (
            <InputAdornment
              position="end"
              sx={(theme) => ({
                '& .MuiIconButton-root': {
                  backgroundColor: '#b8432b',
                  borderRadius: '0 8px 8px 0',
                  padding: '11px 11px',
                  [theme.breakpoints.up('md')]: {
                    padding: '14px 11px',
                  },
                },
              })}
            >
              <IconButton>
                <ArrowForwardIosIcon style={{ color: '#fff', width: '16px' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

const ShoppingCart = ({ setActiveTab, totalBasketPrice, basketItems, setBasketItems }) => {
  const router = useRouter();
  const t = useTranslations('order');
  const maxCapacity = 150;

  const [isDiscountOpened, setIsDiscountOpened] = useState(false);
  const [isPromocodeOpened, setIsPromocodeOpened] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  const [discountSliderValue, setDiscountSliderValue] = useState(0);

  const [discountValue, setDiscountValue] = useState(100);
  const [promoValue, setPromoValue] = useState('');
  const [giftValue, setGiftValue] = useState('');

  const getBasketFill = (totalBasketPrice) => {
    return (totalBasketPrice / maxCapacity) * 100;
  };

  const removeItemFromBasket = (id) => {
    const updatedBasketItems = basketItems.filter((item) => item.id !== id);
    setBasketItems(updatedBasketItems);
  };

  const onCountIncrement = (id) => {
    const updatedBasketItems = basketItems.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setBasketItems(updatedBasketItems);
  };

  const onCountDecrement = (id) => {
    const updatedBasketItems = basketItems.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count <= 1 ? 1 : item.count - 1 };
      }
      return item;
    });
    setBasketItems(updatedBasketItems);
  };

  const handleProductsRedirect = () => {
    router.push('/products/vape');
  };

  const bodySpecs = (weight, flowerVariety, hhc) => (
    <div className={styles['body-specs']}>
      <p className={styles['specs-text']}>{weight}</p>
      <div className={styles['specs-divider']} />
      <p className={styles['specs-text']}>{`${t('shoppingCart.item.variety')} ${flowerVariety}`}</p>
      <div className={styles['specs-divider']} />
      <p className={styles['specs-text']}>{`${t('shoppingCart.item.hhc')} ${hhc}`}</p>
    </div>
  );

  return (
    <section className={styles['main-template']}>
      <div className={styles['basket-wrapper']}>
        <div className={styles['basket-fill']}>
          <div
            className={styles['fill-bar']}
            style={{ width: `${getBasketFill(totalBasketPrice)}%` }}
          ></div>
          <p className={styles['fill-text']}>{t('shoppingCart.barText')}</p>
        </div>
        {!!basketItems?.length ? (
          basketItems.map((item) => (
            <>
              <div key={item?.id} className={styles['basket-item']}>
                <div className={styles['item-image-wrapper']}>
                  <Image
                    src={typeof item?.image === 'string' ? item?.image : item?.image[0]}
                    alt="product-image"
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, 222px"
                  />
                </div>
                <div className={styles['item-body']}>
                  <div className={styles['body-header']}>
                    <p className={styles['header-text']}>{item?.title}</p>
                    <p className={styles['header-price']}>
                      {(item?.price * item?.count).toFixed(2)} €
                    </p>
                  </div>
                  <div className={styles['body-specs__desk']}>
                    {bodySpecs(item?.weight, item?.flowerVariety, item?.hhc)}
                  </div>
                  <ProductCount
                    value={item?.count}
                    onIncrement={() => onCountIncrement(item?.id)}
                    onDecrement={() => onCountDecrement(item?.id)}
                  />
                </div>
                <button
                  className={styles['item-remove']}
                  onClick={() => removeItemFromBasket(item?.id)}
                >
                  <Image src="/images/common/close.svg" alt="remove-icon" width={20} height={20} />
                </button>
              </div>
              <div className={styles['body-specs__mobile']}>
                {bodySpecs(item?.weight, item?.flowerVariety, item?.hhc)}
              </div>
            </>
          ))
        ) : (
          <div className={styles['basket-empty']}>
            <div className={styles['basket-empty__content']}>
              <h2 className={styles['content-title']}>{t('shoppingCart.emptyBasket.title')}</h2>
              <h3 className={styles['content-subtitle']}>
                {t('shoppingCart.emptyBasket.subtitle')}
              </h3>
              <ButtonCO
                theme="orange"
                className={styles['content-btn']}
                onClick={handleProductsRedirect}
              >
                {t('shoppingCart.emptyBasket.button')}
              </ButtonCO>
            </div>
          </div>
        )}
      </div>
      <div className={styles['sidebar-wrapper']}>
        <div>
          <h2 className={styles['sidebar-title']}>{t('shoppingCart.sidebar.title')}</h2>
          <div className={styles['amount-row']}>
            <p>{t('shoppingCart.sidebar.subtotal')}</p>
            <p>{totalBasketPrice} €</p>
          </div>
          <div className={styles['amount-row']}>
            {t('shoppingCart.sidebar.priceVat')}
            <p>{getVatValue(totalBasketPrice)} €</p>
          </div>
          <div className={styles['amount-row']}>
            {t('shoppingCart.sidebar.delivery')}
            <p>{t('shoppingCart.sidebar.deliveryValue')}</p>
          </div>
          <div className={`${styles['amount-row']} ${styles['amount-row__total']}`}>
            {t('shoppingCart.sidebar.total')}
            <p style={{ fontWeight: '600' }}>
              {(+getVatValue(totalBasketPrice) + totalBasketPrice).toFixed(2)} €
            </p>
          </div>
          <div className={styles['divider']} />
        </div>
        {/* discount */}
        <div className={styles['block-item']}>
          <div
            className={styles['dropdown']}
            onClick={() => setIsDiscountOpened(!isDiscountOpened)}
          >
            <span className={styles['dropdown__title']}>{t('shoppingCart.sidebar.discount')}</span>
            <Image
              style={{
                transform: isDiscountOpened ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.2s',
              }}
              src={'/images/products/filter-arrow.svg'}
              width={14}
              height={14}
              alt="filter-icon"
            />
          </div>
          {isDiscountOpened && (
            <div className={styles['dropdown-content']}>
              <p className={styles['subtitle']}>{t('shoppingCart.sidebar.discountDesc')}</p>
              <div className={styles['bonuses']}>
                <input
                  className={styles['bonuses-input']}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
                <p className={styles['bonuses-text']}>
                  {t('shoppingCart.sidebar.discountBar.bonuses')}
                </p>
                <p className={styles['bonuses-text']}>=</p>
                <p className={`${styles['bonuses-text']} ${styles['bonuses-text__green']}`}>
                  {t('shoppingCart.sidebar.discountBar.discount')}
                </p>
              </div>
              <SliderComponent
                min={0}
                max={100}
                value={discountSliderValue}
                onChange={setDiscountSliderValue}
              />
            </div>
          )}
          <div className={styles['divider']} />
        </div>
        {/* promocode */}
        <div className={styles['block-item']}>
          <div
            className={styles['dropdown']}
            onClick={() => setIsPromocodeOpened(!isPromocodeOpened)}
          >
            <span className={styles['dropdown__title']}>{t('shoppingCart.sidebar.promocode')}</span>
            <Image
              style={{
                transform: isPromocodeOpened ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.2s',
              }}
              src={'/images/products/filter-arrow.svg'}
              width={14}
              height={14}
              alt="filter-icon"
            />
          </div>
          {isPromocodeOpened && (
            <div className={styles['dropdown-content']}>
              <EnterCode
                label={'-10 €'}
                value={promoValue}
                setValue={setPromoValue}
                title={t('shoppingCart.sidebar.promocodeDesc')}
                placeholder={'12345LPFAEROADWAD'}
              />
            </div>
          )}
          <div className={styles['divider']} />
        </div>
        {/* gift sertificate */}
        <div className={styles['block-item']}>
          <div className={styles['dropdown']} onClick={() => setIsGiftOpened(!isGiftOpened)}>
            <span className={styles['dropdown__title']}>{t('shoppingCart.sidebar.gift')}</span>
            <Image
              style={{
                transform: isGiftOpened ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.2s',
              }}
              src={'/images/products/filter-arrow.svg'}
              width={14}
              height={14}
              alt="filter-icon"
            />
          </div>
          {isGiftOpened && (
            <div className={styles['dropdown-content']}>
              <EnterCode
                label={'-10 €'}
                value={giftValue}
                setValue={setGiftValue}
                title={t('shoppingCart.sidebar.giftDesc')}
                placeholder={'12345LPFAEROADWAD'}
              />
            </div>
          )}
        </div>

        {!!basketItems?.length && (
          <ButtonCO
            theme="orange"
            className={styles['next-btn']}
            onClick={() => setActiveTab('payment')}
          >
            {t('shoppingCart.sidebar.continue')}
          </ButtonCO>
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;
