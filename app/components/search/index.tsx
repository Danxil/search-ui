import Form from './form';
import Results from './results';

import styles from './styles.module.css';

export default ({
  initSearchStr,
  initSource,
  comments,
}: Parameters<typeof Form>[0] & Parameters<typeof Results>[0]) => {
  return (
    <div className={styles.container}>
      <Form initSearchStr={initSearchStr} initSource={initSource} />
      <Results comments={comments} />
    </div>
  );
};
