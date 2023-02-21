
import type { ForwardedRef} from 'react';
import { forwardRef } from 'react';
import { Virtuoso } from 'react-virtuoso';

import type { Comment as CommentType } from './comment';
import Comment from './comment';
import styles from './styles.module.css';

const Item = forwardRef(function Item(props, ref: ForwardedRef<HTMLDivElement>) {
  return <div {...props} ref={ref} data-virtuilized-row />
})

const Results = (
  { comments, loadMore }: { comments: CommentType[]; loadMoreActive: boolean; loadMore: () => void }
) => {

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Found comments</h3>
      {/* <ul className={styles.list}>
        {comments.map((row: CommentType) => (
          <Comment {...row} key={`${row.text}${row.articleLink}`} />
        ))}
      </ul> */}
      {/* <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMore}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            itemCount={itemCount}
            onItemsRendered={onItemsRendered}
            ref={ref}
          />
        )}
      </InfiniteLoader> */}
      <Virtuoso
        style={{ height: '400px' }}
        totalCount={comments.length}
        components={{ Item }}
        itemContent={index => <Comment
          {...comments[index]}
          key={`${comments[index].text}${comments[index].articleLink}`}
        />}
      />
    </div>
  );
};

export default Results;