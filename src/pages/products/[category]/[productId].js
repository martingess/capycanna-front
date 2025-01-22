import { mockProducts } from '../../../data/mockProducts';

const ProductPage = ({ product, params }) => {
  console.log('product', product, params);
  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export async function getServerSideProps({ params, locale }) {
  const product = mockProducts.find((p) => p.id == params.productId);
  return {
    props: {
      product: product || null,
      params: params,
      messages: {
        header: (await import(`../../../../public/locales/${locale}/header.json`)).default,
        products: (await import(`../../../../public/locales/${locale}/products.json`)).default,
        common: (await import(`../../../../public/locales/${locale}/common.json`)).default,
        footer: (await import(`../../../../public/locales/${locale}/footer.json`)).default,
      },
    },
  };
}

export default ProductPage;
