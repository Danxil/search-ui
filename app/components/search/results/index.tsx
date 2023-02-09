import type { Comment as CommentType } from '../comment';
import Comment from '../comment';

export default ({ comments }: { comments: CommentType[] }) => {
  return (
    <ul>
      {comments.map((row: CommentType) => (
        <Comment {...row} key={`${row.text}${row.articleLink}`} />
      ))}
    </ul>
  );
};
