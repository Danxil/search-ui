import Switch from './switch';
import styles from './styles.module.css';

const Settings = ({ onChange }: { onChange: () => void }) => {
  return <div className={styles.settings}>
    <label className={styles.sortBlock}>
      Sort by publication date:
      <Switch name='sort' value='asc' onChange={onChange} />
    </label>
  </div>
}

export default Settings;