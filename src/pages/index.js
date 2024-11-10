import HomePage from '@scenes/Home';
export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: {
        header: (await import(`../../public/locales/${locale}/header.json`)).default,
        home: (await import(`../../public/locales/${locale}/home.json`)).default,
        common: (await import(`../../public/locales/${locale}/common.json`)).default,
        footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
      },
    },
  };
};

const Home = (props) => {
  return <HomePage translation="home" {...props} />;
};

export default Home;
