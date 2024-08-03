import { FC, useRef } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { clsx } from 'clsx';

import { Filter } from 'components/icons';

import { Search } from './Search';
import styles from './TabsPanel.module.scss';

export const TabsPanel: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { label: 'Games', key: 'games' },
    { label: 'Upcoming', key: 'upcoming', disabled: true },
    { label: 'IGO', key: 'igo', disabled: true },
    { label: 'Kickstart', key: 'kickstart', disabled: true },
  ];

  const handleTabClick = (key: string) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        tab: key,
      }).toString(),
    });
  };

  const handleInputWrapperClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {tabs.map((t) => {
          const isActive =
            t.key === searchParams.get('tab') ||
            (t.key === tabs[0].key && !searchParams.get('tab'));
          return (
            <div
              key={t.key}
              role="button"
              onClick={() => !t.disabled && handleTabClick(t.key)}
              className={clsx(styles.tab, { [styles.active]: isActive })}
            >
              {t.label}
            </div>
          );
        })}
      </div>
      <div className={styles.search}>
        <div className={styles.inputWrapper} onClick={handleInputWrapperClick}>
          <Search />
          <input ref={inputRef} type="text" className={styles.input} placeholder="Search..." />
        </div>
        <div className={styles.filterButton}>
          <Filter />
          <span>Filter</span>
        </div>
      </div>
    </div>
  );
};
