import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PageLayout } from 'views';
import { IndexPage } from 'pages/Index';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <IndexPage />
      </PageLayout>
    </BrowserRouter>
  );
};
