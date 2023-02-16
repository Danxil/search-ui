import type { DateRange} from '@mui/x-date-pickers-pro/DateRangePicker';
import type { Moment } from 'moment';
import { useState } from 'react';

import DateRangeFilter from './dateRangeFilter';
import styles from './styles.module.css';
import Switch from './switch';

const Settings = ({ onChange }: { onChange: () => void }) => {
  return <div className={styles.settings}>
    <label className={styles.sortBlock}>
      Sort by publication date
      <Switch name='sort' value='asc' onChange={onChange} />
    </label>
    <label className={styles.filterBlock}>
      Filter by publication date
      <div className={styles.dateRangeFilter}>
        <DateRangeFilter onChange={onChange} />
      </div>
    </label>
  </div>
}

export default Settings;