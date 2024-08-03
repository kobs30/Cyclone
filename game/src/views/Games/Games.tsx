import { FC } from 'react';

import styles from './Games.module.scss';
import { GameCard, GameCardProps } from './GameCard/GameCard';

export const Games: FC = () => {
  const games: GameCardProps[] = [
    {
      title: 'Tossup',
      description: 'Cyclone testnet game',
      state: 'active',
      picture: {
        src: 'assets/images/game-tossup.png',
      },
    },
    {
      title: 'Klingon',
      state: 'active',
      description: 'Cyclone testnet game',
      picture: {
        src: 'assets/images/game-klingon.png',
      },
    },
    {
      title: 'Your game',
      state: 'pending',
      description: 'Glad to add your test games...',
      picture: {
        src: 'assets/images/game-placeholder.png',
      },
    },
    {
      title: 'Your game',
      state: 'pending',
      description: 'Glad to add your test games...',
      picture: {
        src: 'assets/images/game-placeholder.png',
      },
    },
    {
      title: 'Your game',
      state: 'pending',
      description: 'Glad to add your test games...',
      picture: {
        src: 'assets/images/game-placeholder.png',
      },
    },
    {
      title: 'Your game',
      state: 'pending',
      description: 'Glad to add your test games...',
      picture: {
        src: 'assets/images/game-placeholder.png',
      },
    },
  ];

  return (
    <div className={styles.root}>
      {games.map((g, index) => (
        <GameCard key={index} {...g} />
      ))}
    </div>
  );
};
