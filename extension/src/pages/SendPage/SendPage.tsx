import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageLayout } from 'layouts';
import { Send } from 'views';

import styles from './SendPage.module.scss';

export const SendPage: FC = () => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  return (
    <PageLayout
      back={confirm ? () => setConfirm(false) : '/'}
      title={confirm ? 'Confirm Transaction' : 'Send'}
    >
      <div className={styles.root}>
        <Send
          confirm={confirm}
          onConfirmCancel={() => setConfirm(false)}
          onConfirm={() => navigate('/')}
          onSubmit={() => setConfirm(true)}
        />
      </div>
    </PageLayout>
  );
};
