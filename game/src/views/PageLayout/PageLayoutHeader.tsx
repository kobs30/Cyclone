import { Button } from 'components';
import { WalletSymbolColored } from 'components/icons/brand';

import styles from './PageLayoutHeader.module.scss';

const WALLET_ICON_SIZE = 20;

export const PageLayoutHeader = () => {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <img src="assets/images/cyclone-logo.png" alt="Logo" className={styles.logo} />
        <Button
          style={{ '--width': '280px' }}
          variant="outlined"
          startIcon={<WalletSymbolColored width={WALLET_ICON_SIZE} height={WALLET_ICON_SIZE} />}
        >
          Wallet
        </Button>
      </div>
    </header>
  );
};
