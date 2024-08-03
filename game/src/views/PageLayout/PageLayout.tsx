import { FC, ReactNode } from 'react';

import { PageLayoutHeader } from './PageLayoutHeader';
import styles from './PageLayout.module.scss';

export type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout: FC<PageLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.root}>
      <PageLayoutHeader />
      <div className={styles.content}>{children}</div>
      <div></div>
    </div>
  );
};
