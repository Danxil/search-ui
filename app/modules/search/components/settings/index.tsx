import type { ReactNode} from 'react';
import React from 'react';

import styles from './styles.module.css';

const Settings = ({
  renderSortSwitch,
  renderDateRange,
}: {
  renderSortSwitch: () => ReactNode
  renderDateRange: () => ReactNode
}) => {
  return <div className={styles.settings}>
    <label className={`${styles.sortBlock} ${styles.settingsControl}`}>
      Sort by publication date
      {renderSortSwitch()}
    </label>
    <label className={`${styles.filterBlock} ${styles.settingsControl}`}>
      Filter by publication date
      <div className={`${styles.dateRangeFilter}`}>
        {renderDateRange()}
      </div>
    </label>
  </div>
}

export default React.memo(Settings);