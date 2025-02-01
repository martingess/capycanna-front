import { mockProducts } from '../../../data/mockProducts';
import ProductItem from '@/scenes/ProductPage';

export async function getServerSideProps({ params, locale }) {
  const product = mockProducts.find((p) => p.id == params.productId);
  return {
    props: {
      product: product || null,
      params: params,
      messages: {
        header: (await import(`../../../../public/locales/${locale}/header.json`)).default,
        productItem: (await import(`../../../../public/locales/${locale}/productItem.json`))
          .default,
        common: (await import(`../../../../public/locales/${locale}/common.json`)).default,
        footer: (await import(`../../../../public/locales/${locale}/footer.json`)).default,
      },
    },
  };
}

const ProductPage = ({ product, params }) => {
  return <ProductItem product={product} params={params} />;
};

export default ProductPage;
