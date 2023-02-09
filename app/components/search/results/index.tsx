import Comment, { Comment as CommentType } from "../comment";

export default ({ comments }: { comments: CommentType[] }) => {
  return (
    <ul>
      {comments.map((row: CommentType) => (
        <Comment {...row} key={`${row.text}${row.articleLink}`} />
      ))}
    </ul>
  );
};
