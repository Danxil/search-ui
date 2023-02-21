import type { ComponentProps} from 'react';
import { useRef } from 'react';

import DateRangeFilter from './dateRangeFilter';
import styles from './styles.module.css';
import Switch from './switch';

const SORT_SWITCH_VALUE = 'asc';

const Settings = ({
  onChange,
  initSort,
  initFilter
}: {
  onChange: () => void;
  initSort: string;
  initFilter: ComponentProps<typeof DateRangeFilter>['initValue']
}) => {
  const defaultChecked = useRef(initSort === 'asc').current;

  return <div className={styles.settings}>
    <label className={styles.sortBlock}>
      Sort by publication date
      <Switch name='sort' value={SORT_SWITCH_VALUE} defaultChecked={defaultChecked} onChange={onChange} />
    </label>
    <label className={styles.filterBlock}>
      Filter by publication date
      <div className={styles.dateRangeFilter}>
        <DateRangeFilter onChange={onChange} initValue={initFilter} />
      </div>
    </label>
  </div>
}

export default Settings;