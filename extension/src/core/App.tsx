import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';

import { PagesStoreProvider } from 'pages';

import { router } from './router';
import { RootStoreProvider, useRootStore } from './RootStore';

export const Pages = observer(() => {
  const rootStore = useRootStore();

  useEffect(() => {
    const disposer = autorun(() => {
      if (rootStore.vault.password) {
        if (rootStore.wallet.accounts.length === 0) {
          const accounts = rootStore.vault.retrieveAccounts();
          rootStore.wallet.setAccounts(accounts);
        }

        rootStore.vault.syncAccounts();
      }
    });
    return () => disposer();
  }, []);

  // console.log(
  //   rootStore.wallet.accounts.map((a) => ({ ...a })),
  //   rootStore.tokens.tokens.map((a) => ({ ...a }))
  // );

  return <RouterProvider router={router} />;
});

export const App: FC = () => {
  return (
    <RootStoreProvider>
      <PagesStoreProvider>
        <Pages />
      </PagesStoreProvider>
    </RootStoreProvider>
  );
};
