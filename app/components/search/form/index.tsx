import Button from '@mui/base/ButtonUnstyled';

import { Form as RefmixForm } from '@remix-run/react';
import { SOURCES } from './constants';
import Select, { Option } from './select';

import styles from './styles.module.css';

const Form = ({
  initSearchStr,
  initSource,
}: {
  initSearchStr: string;
  initSource: typeof SOURCES[number]['id'];
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Find insight</h1>
      <h2 className={styles.subTitle}>Search by comments</h2>
      <RefmixForm className={styles.form} method="get" action="/">
        <Select
          name="source"
          btnClassName={`${styles.formItem} ${styles.sourceControl}`}
          defaultValue={initSource}
        >
          {SOURCES.map(({ id, text }) => (
            <Option value={id} key={id}>
              {text}
            </Option>
          ))}
        </Select>
        <input
          className={`${styles.formItem} ${styles.searchControl}`}
          type="text"
          name="q"
          placeholder="Search phrase"
          defaultValue={initSearchStr}
        />
        <Button className={styles.submitBtn} type="submit">Search</Button>
      </RefmixForm>
    </div>
  );
};

export default Form;