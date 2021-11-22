import * as React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import AppHeader from './modules/views/AppHeader';
import withRoot from './modules/withRoot';

function Index() {
  return (
    <React.Fragment>
      <AppHeader />
      <ProductHero />
      <ProductCategories />
      <ProductHowItWorks />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
