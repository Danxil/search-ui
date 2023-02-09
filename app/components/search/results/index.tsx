import type { Comment as CommentType } from '../comment';
import Comment from '../comment';

import styles from './styles.module.css';

const Results = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Found comments</h3>
      <ul className={styles.list}>
        {comments.map((row: CommentType) => (
          <Comment {...row} key={`${row.text}${row.articleLink}`} />
        ))}
      </ul>
    </div>
  );
};

export default Results;