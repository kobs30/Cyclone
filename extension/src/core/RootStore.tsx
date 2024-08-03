import { createContext, FC, ReactNode, useContext } from 'react';

import {
  NetworkController,
  VaultController,
  TransactionController,
  Wallet,
  TokensController,
} from 'global/stores';

export class RootStore {
  constructor() {
    this.network = new NetworkController();
    this.vault = new VaultController(this);
    this.transaction = new TransactionController(this);
    this.tokens = new TokensController(this);
    this.wallet = new Wallet(this);
  }

  wallet: Wallet;
  tokens: TokensController;
  network: NetworkController;
  vault: VaultController;
  transaction: TransactionController;

  resetTokens = () => {
    this.tokens = new TokensController(this);
  };
}

const rootStoreContext = createContext<RootStore | null>(null);

export const useRootStore = () => {
  const context = useContext(rootStoreContext);
  if (!context) {
    throw Error(
      'RootStoreProvider is not used! Please provide rootStoreContext before using useRootStore'
    );
  }
  return context;
};

const rootStore = new RootStore();

export type RootStoreProviderProps = {
  children: ReactNode;
};

export const RootStoreProvider: FC<RootStoreProviderProps> = ({ children }) => {
  return <rootStoreContext.Provider value={rootStore}>{children}</rootStoreContext.Provider>;
};
