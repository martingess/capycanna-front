import ProductsCategory from '@scenes/Products/productsCategory';

export async function getServerSideProps({ params, locale }) {
  return {
    props: {
      category: params.category,
      messages: {
        header: (await import(`../../../public/locales/${locale}/header.json`)).default,
        products: (await import(`../../../public/locales/${locale}/products.json`)).default,
        common: (await import(`../../../public/locales/${locale}/common.json`)).default,
        footer: (await import(`../../../public/locales/${locale}/footer.json`)).default,
      },
    },
  };
}

const CategoryPage = ({ category }) => {
  return <ProductsCategory category={category} />;
};

export default CategoryPage;
