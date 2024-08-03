import { FC, ReactElement } from 'react';
import { clsx } from 'clsx';

import { CyclSymbolColored } from 'components/icons/brand';
import { Button } from 'components';

import styles from './GameCard.module.scss';

export type GameCardProps = {
  title: string;
  description: string;
  picture: { src: string; alt?: string } | ReactElement;
  state: 'active' | 'pending';
};

export const GameCard: FC<GameCardProps> = (props) => {
  const { picture, state, title, description } = props;
  const isActiveState = state === 'active';
  const renderPicture = () => {
    if ('src' in picture) {
      return (
        <img src={picture.src} alt={picture.alt || 'Game Picture'} className={styles.picture} />
      );
    }
    return picture;
  };
  return (
    <div className={clsx(styles.root, { [styles.active]: isActiveState })}>
      <svg
        className={styles.rect}
        width="100%"
        height="100%"
        viewBox="0 0 280 428"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="279"
          height="427"
          rx="24.5"
          stroke="url(#paint0_linear_3293_8560)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3293_8560"
            x1="3.04065"
            y1="234.076"
            x2="228.786"
            y2="154.111"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#ED1FFF" />
            <stop offset="0.164386" stop-color="#7867FC" />
            <stop offset="0.292124" stop-color="#46B5D4" />
            <stop offset="0.463949" stop-color="#24FCDC" />
            <stop offset="0.820802" stop-color="#52FA54" />
            <stop offset="1" stop-color="#F5923C" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.pictureWrapper}>{renderPicture()}</div>
      <div className={styles.content}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.footer}>
          {isActiveState && (
            <div className={styles.playButton}>
              <Button style={{ '--width': '124px' }}>
                <span>Play</span>
              </Button>
            </div>
          )}
          <span className={styles.state}>{isActiveState ? 'Active' : 'Pending...'}</span>
          {isActiveState && <CyclSymbolColored className={styles.coin} />}
        </div>
      </div>
    </div>
  );
};
