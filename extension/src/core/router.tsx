import { createHashRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
  Login,
  Settings,
  Accounts,
  SendPage,
  IndexPage,
  ChoicePage,
  NotFoundPage,
  ResetCachePage,
  WelcomeBackPage,
  AccountDetailsPage,
} from 'pages';

import { useRootStore } from './RootStore';

export const AuthenticatedRoutes = observer(function WalletRoutes_() {
  const location = useLocation();

  const rootStore = useRootStore();

  if (rootStore.vault.areAccountsAvailable) {
    if (
      location.pathname !== '/welcome-back' &&
      location.pathname !== '/reset-cache' &&
      !rootStore.vault.password
    ) {
      return <Navigate to="/welcome-back" replace state={{ from: location }} />;
    }

    return <Outlet />;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
});

export const router = createHashRouter([
  {
    path: '/',
    element: <AuthenticatedRoutes />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: '/welcome-back',
        element: <WelcomeBackPage />,
      },
      {
        path: '/send',
        element: <SendPage />,
      },
      {
        path: '/accounts',
        element: <Accounts.AccountsPage />,
      },
      {
        path: '/accounts/import-account',
        element: <Accounts.ImportAccountPage />,
      },
      {
        path: '/accounts/add-account',
        element: <Accounts.AddAccountPage />,
      },
      {
        path: '/account-details/:accountAddress',
        element: <AccountDetailsPage />,
      },
      {
        path: '/reset-cache',
        element: <ResetCachePage />,
      },
      {
        path: '/settings',
        element: <Settings.SettingsPage />,
      },
      {
        path: '/settings/network-gateway',
        element: <Settings.NetworkGatewayPage />,
      },
      {
        path: '/settings/change-password',
        element: <Settings.ChangePasswordPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login.LoginPage />,
  },
  {
    path: '/login/new-account',
    element: <Login.NewAccountPage />,
  },
  {
    path: '/choice',
    element: <ChoicePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
