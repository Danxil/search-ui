import Button from '@mui/base/ButtonUnstyled';
import React from 'react';
import type { ReactNode } from 'react';

import styles from './styles.module.css';

const Form = ({
  children,
  renderSourceSelect,
  renderQueryInput,
  load
}: {
  children: ReactNode
  renderSourceSelect: () => ReactNode;
  renderQueryInput: () => ReactNode;
  load: () => void;
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Find insight</h1>
      <h2 className={styles.subTitle}>Search by comments</h2>
      <div className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.inputs}>
            {renderSourceSelect()}
            {renderQueryInput()}
          </div>
          <Button className={styles.submitBtn} onClick={load}>Search</Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default React.memo(Form);