import BonusProgram from '@scenes/BonusProgram';

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: {
      header: (await import(`../../public/locales/${locale}/header.json`)).default,
      bonusProgram: (await import(`../../public/locales/${locale}/bonusProgram.json`)).default,
      common: (await import(`../../public/locales/${locale}/common.json`)).default,
      footer: (await import(`../../public/locales/${locale}/footer.json`)).default,
    },
  },
});
const BonusProgramPage = () => {
  return <BonusProgram />;
};

export default BonusProgramPage;
