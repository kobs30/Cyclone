import { useSearchParams } from 'react-router-dom';

import { TabsPanel, Games } from 'views';

import { Discord } from './Discord';
import { TurnArrow } from './TurnArrow';
import styles from './index.module.scss';
import { CycloneSymbol } from '../../components/icons/brand';

export const IndexPage = () => {
  const [searchParams] = useSearchParams();

  const renderTabContent = () => {
    switch (searchParams.get('tab')) {
      case 'games':
      default:
        return (
          <div className={styles.games}>
            <Games />
            <div className={styles.gamesLinks}>
              <a href="https://discord.gg/vCzbn3AXKv" target="_blank" className={styles.link}>
                <div className={styles.linkCircle}>
                  <Discord />
                </div>
                <div>
                  <span className={styles.linkTitle}>Join</span>
                  <span className={styles.linkDescription}>Community</span>
                </div>
              </a>
              <a href="#" target="_blank" className={styles.link}>
                <div className={styles.linkCircle}>
                  <TurnArrow />
                </div>
                <div>
                  <span className={styles.linkTitle}>Add game</span>
                  <span className={styles.linkDescription}>Make games?</span>
                </div>
              </a>
              <a href="https://cyclonechain.com" target="_blank" className={styles.link}>
                <div className={styles.linkCircle}>
                  <CycloneSymbol />
                </div>
                <div>
                  <span className={styles.linkTitle}>Web site</span>
                  <span className={styles.linkDescription}>Cyclone official</span>
                </div>
              </a>
            </div>
            {/*<div className={styles.gamesInfo}>*/}
            {/*  <Info />*/}
            {/*  <span className={styles.gamesInfoText}>*/}
            {/*    This platform will have everything necessary for any game creator to smoothly*/}
            {/*    announce and release their game.*/}
            {/*  </span>*/}
            {/*</div>*/}
          </div>
        );
    }
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Testnet Games</h1>
      <div className={styles.tabs}>
        <TabsPanel />
      </div>
      {renderTabContent()}
    </div>
  );
};
