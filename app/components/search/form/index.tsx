import Button from '@mui/base/ButtonUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';

import { Form } from '@remix-run/react';
import { SOURCES } from './constants';
import Select, { Option } from './select';

import styles from './styles.module.css';

export default ({
  initSearchStr,
  initSource,
}: {
  initSearchStr: string;
  initSource: typeof SOURCES[number]['id'];
}) => {
  return (
    <Form method="get" action="/">
      <Select
        name="source"
        btnClassName={styles.formItem}
        defaultValue={initSource}
      >
        {SOURCES.map(({ id, text }) => (
          <Option value={id} key={id}>
            {text}
          </Option>
        ))}
      </Select>
      <input
        className={`${styles.formItem} ${styles.formItem}`}
        type="text"
        name="q"
        defaultValue={initSearchStr}
      />
      <Button type="submit">Send</Button>
    </Form>
  );
};
