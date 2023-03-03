
import type { ReactNode} from 'react';
import React from 'react';

import styles from './styles.module.css';


const Results = (
  { children }: { children: ReactNode }
) => {

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Found comments</h3>
      {children}
    </div>
  );
};

export default React.memo(Results);